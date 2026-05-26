## 1. The one-sentence answer
**Simultaneous equations are solved by finding values of variables that satisfy every equation at once, using substitution, elimination, or cross-multiplication to reduce the system systematically.**

Two linear equations with two unknowns appear together in many problems. Each method removes one variable so the remaining equation becomes solvable in one step. After you obtain one variable, you substitute back to recover the second. The three techniques differ only in how they eliminate the extra variable, yet they always produce the same solution pair when the equations are consistent.

The core skill lies in choosing the least messy route for a given pair of equations rather than memorising steps blindly.

> [!NOTE]
> The single most important insight is that every valid method ultimately replaces the original two-equation system with one equivalent equation in one variable; once that reduction is performed correctly, the rest is ordinary algebra.

## 2. Why this matters — concrete and current
In electric-circuit design, Kirchhoff’s voltage and current laws produce simultaneous equations whose solution yields resistor currents; SPICE simulators inside Cadence and Siemens EDA tools solve millions of such systems every day during chip timing analysis.

Aircraft flight-management systems linearise fuel-flow and thrust equations around a cruise point; Boeing and Airbus flight computers solve these 2-by-2 blocks at 20 Hz to keep the aircraft inside its envelope.

Economists at the IMF and central banks estimate supply-and-demand curves from market data; the resulting equilibrium price and quantity are obtained by solving the simultaneous system that sets quantity supplied equal to quantity demanded.

Semiconductor foundries use simultaneous equations to balance dopant concentrations across multiple diffusion chambers; a single miscalculation can scrap an entire wafer lot worth several hundred thousand dollars.

Navigation satellites broadcast ephemeris data that ground receivers convert into simultaneous pseudorange equations; the receiver’s latitude, longitude and clock bias are recovered by solving four such equations, three of which reduce to the two-variable case after linearisation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear equation in one variable | You must solve the reduced single-variable equation after elimination |
| Collecting like terms and balancing both sides | Every algebraic manipulation preserves equality only when both sides receive the same operation |
| Distributive property    | Required when substituting an expression that contains parentheses |
| Consistent and inconsistent systems | Tells you in advance whether a unique solution exists before you begin calculation |

If any row above feels shaky, pause and review that idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise a 2-by-2 linear system
You are given two equations that must hold simultaneously for the same pair of numbers \(x\) and \(y\).  
Example: \(2x + 3y = 7\) and \(x - y = 1\).  
Formally, solve
\[
\begin{cases}
a_1x + b_1y = c_1 \\
a_2x + b_2y = c_2
\end{cases}
\]
for the ordered pair \((x,y)\).

> [!WARNING]
> Treating the two equations as unrelated single-variable problems produces two different answers that cannot both be true.

### Step 2 — Substitution: isolate one variable
Solve the simpler equation for one variable and replace that variable everywhere in the second equation.  
From the example above, \(x = y + 1\). Substitute into the first equation to obtain \(2(y+1) + 3y = 7\).

### Step 3 — Elimination: equalise coefficients
Multiply one or both equations so that the coefficient of one variable becomes identical, then add or subtract.  
Multiply the second equation by 2: \(2x - 2y = 2\). Subtract from the first: \(5y = 5\).

### Step 4 — Cross-multiplication for standard form
Rewrite both equations as \(a_1x + b_1y + c_1 = 0\) and \(a_2x + b_2y + c_2 = 0\). Then
\[
\frac{x}{b_1c_2 - b_2c_1} = \frac{y}{c_1a_2 - c_2a_1} = \frac{1}{a_1b_2 - a_2b_1}.
\]
This formula is derived from elimination after clearing constants.

### Step 5 — Back-substitution and verification
Once one variable is known, substitute it back into any original equation. Verify by plugging both values into the untouched equation; any discrepancy signals an arithmetic slip.

### Step 6 — Decide consistency before solving
Compute the determinant \(a_1b_2 - a_2b_1\). If it is zero and the equations are multiples of each other, the system is dependent; otherwise it is inconsistent. This check prevents wasted effort on impossible problems.

### Step 7 — Textbook-grade statement
A unique solution exists if and only if the coefficient determinant is nonzero. The solution set is then the singleton
\[
\left( \frac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1},\ 
\frac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1} \right).
\]

## 5. Worked examples — har step show karo

**Example 1 — Basic substitution**  
*Given:* \(x + y = 5\), \(2x - y = 1\).  
*Find:* \(x\) and \(y\).  
From the first equation, \(y = 5 - x\).  
Substitute: \(2x - (5 - x) = 1\) → \(3x - 5 = 1\) → \(3x = 6\) → \(x = 2\).  
Then \(y = 3\).  
*Why* each move: isolating \(y\) removes one variable; substitution produces a linear equation in \(x\) only.  
**Final answer**  
\[x = 2,\ y = 3\]  
*Reflection:* The example is easy because coefficients of \(y\) are already opposites; notice that elimination would have been even shorter.

**Example 2 — Elimination with scaling**  
*Given:* \(3x + 2y = 7\), \(5x - 4y = 3\).  
*Find:* solution.  
Multiply first by 2: \(6x + 4y = 14\). Add to second: \(11x = 17\) → \(x = 17/11\).  
Substitute back: \(y = (7 - 3\cdot17/11)/2 = 2/11\).  
*Why* scaling: coefficients of \(y\) become equal so addition cancels \(y\).  
**Final answer**  
\[x = \frac{17}{11},\ y = \frac{2}{11}\]  
*Reflection:* Fractions appear; keeping denominators until the end avoids rounding errors.

**Example 3 — Cross-multiplication**  
*Given:* \(2x + 3y - 7 = 0\), \(x - y - 1 = 0\).  
*Find:* values.  
\[
\frac{x}{3\cdot(-1) - (-y)\cdot7} = \frac{y}{(-7)\cdot1 - (-1)\cdot2} = \frac{1}{2\cdot(-1) - 1\cdot3}.
\]
Simplifies to \(x = 2\), \(y = 3\).  
*Why* the formula works: it is elimination written in determinant form.  
**Final answer**  
\[x = 2,\ y = 3\]  
*Reflection:* Useful when both equations are already in \(ax + by + c = 0\) form.

**Example 4 — Inconsistent system**  
*Given:* \(x + y = 4\), \(2x + 2y = 10\).  
*Find:* solution or state inconsistency.  
Determinant \(1\cdot2 - 2\cdot1 = 0\). Equations are not multiples, hence no solution.  
*Why* check first: prevents division by zero later.  
**Final answer**  
no solution (inconsistent)  
*Reflection:* Always test the determinant before investing time in arithmetic.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to multiply both sides when scaling | Student multiplies only one side to “make numbers nice” | Write the multiplier in front of the entire equation before distributing |
| Sign error when subtracting equations | Minus sign distributes incorrectly to every term | Change subtraction into “add the negative of every term” explicitly |
| Using the cross-multiplication formula with equations not in \(ax+by+c=0\) form | Constants remain on the right-hand side | Move every constant to the left before applying the formula |
| Solving for one variable but substituting into the wrong equation | Fatigue after long algebra | Label equations (1) and (2) and always substitute back into (1) |
| Treating dependent system as having unique solution | Student divides by zero determinant | Compute \(a_1b_2-a_2b_1\) before any elimination step |
| Rounding intermediate decimals | Early approximation destroys exact equality | Keep fractions in exact form until the final line |
| Swapping \(x\) and \(y\) answers at the end | Variables look symmetric on paper | Write the ordered pair \((x,y)\) and verify in both originals |

## 7. The textbook-precise statement
A system of two linear equations in two variables,
\[
a_1x+b_1y=c_1,\qquad a_2x+b_2y=c_2,
\]
possesses a unique solution if and only if the determinant \(D=a_1b_2-a_2b_1\neq0\). When \(D\neq0\) the unique solution is given by Cramer’s rule:
\[
x=\frac{b_1c_2-b_2c_1}{D},\qquad y=\frac{c_1a_2-c_2a_1}{D}.
\]
(Reference: Lay, *Linear Algebra and Its Applications*, 6e, §1.1, Theorem 2.)

## 8. Visual — diagram or schematic
```
Equation 1:  a1 x + b1 y = c1
Equation 2:  a2 x + b2 y = c2
               |          |
          solve one     scale & add/subtract
               |          |
               v          v
          y = f(x)     new equation in x only
               |          |
               +----------+
                         |
                         v
                    find x, back-sub y
```

## 9. The memory technique
**The hook**  
Picture two rivers meeting at a point; each equation is a straight riverbank. The intersection point is the only place both banks exist together—solve for that single coordinate pair.

**What to overlearn**  
Determinant test \(D = a_1b_2 - a_2b_1 \neq 0\) for uniqueness; substitution step “replace the isolated variable everywhere”; elimination step “make one coefficient identical then add or subtract”.

**Spaced-repetition schedule**  
Review the determinant test after 1 day, solve one fresh pair after 3 days, teach the three methods to someone else after 7 days, attempt a mixed set after 16 days, and revisit inconsistent/dependent cases after 35 days.

**First-principles fallback**  
If the formula is forgotten, start from the two original equations, isolate one variable from the simpler equation, substitute, and simplify; the algebra itself rebuilds the answer without any mnemonic.

## 10. What this unlocks
Mastery of two-variable simultaneous equations lets you move directly into matrices, vectors, and systems with three or more variables that appear in linear algebra and multivariable calculus.

- Matrix row reduction (Gaussian elimination) is simply organised elimination written with augmented matrices.
- Finding intersection of planes in 3-D space reduces to solving three simultaneous equations.
- Equilibrium analysis in microeconomics and steady-state circuit analysis both rely on the same consistency check.
- Least-squares regression begins by setting partial derivatives to zero, producing a larger simultaneous system whose solution gives the best-fit line.

## 11. Self-check — five questions, no answers
1. Solve \(4x - 3y = 10\) and \(2x + y = 5\) by any method and state the ordered pair.  
2. Without solving, decide whether \(x + 2y = 3\) and \(2x + 4y = 7\) has a solution.  
3. Rewrite \(3x = 2y + 1\) and \(x + y = 4\) in \(ax + by + c = 0\) form, then apply cross-multiplication.  
4. A student obtained \(x = 2\), \(y = 3\) but the pair fails to satisfy the second original equation. What is the most probable mistake?  
5. Create a 2-by-2 system whose solution is \((1/2, -3)\) and verify it satisfies both equations you wrote.