## 1. The one-sentence answer
**Cramer's rule** solves a 2×2 linear system by expressing each variable as the ratio of two determinants, where the denominator is the coefficient matrix determinant and each numerator replaces one column with the constant vector.

A 2×2 system has the form \(ax + by = e\), \(cx + dy = f\). The rule replaces the columns of the coefficient matrix one at a time with the constants and divides the resulting determinants by the original coefficient determinant. This works only when that determinant is nonzero, guaranteeing a unique solution. The approach stays inside matrix language yet avoids full matrix inversion, making it fast for hand calculation.

> [!NOTE]
> The single “aha” moment is that each variable is isolated by swapping exactly one column, turning the abstract idea of “solution” into a mechanical determinant ratio.

## 2. Why this matters — concrete and current
In aerospace trajectory software at NASA’s Johnson Space Center, 2×2 subsystems appear when linearising the Clohessy-Wiltshire equations for relative motion of two satellites; Cramer's rule supplies the instantaneous velocity corrections without calling a general solver.

In semiconductor process control at TSMC, real-time temperature and pressure balancing inside a deposition chamber reduces to 2×2 systems; engineers embed Cramer's rule in firmware because it uses only four multiplications and one division, fitting the tight cycle budget of the embedded DSP.

In reinforcement-learning value iteration for tiny Markov decision processes (as in the original 2013 DeepMind Atari paper), the Bellman update for two-state two-action toy environments collapses to a 2×2 linear system solved repeatedly; Cramer's rule keeps the inner loop allocation-free.

In fundamental physics, the two-loop sunrise integral reduction in dimensional regularisation yields 2×2 systems whose solutions are expressed via Cramer's rule before the master integrals are identified.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Determinant of 2×2 matrix | Supplies the single nonzero condition and the denominator |
| Consistent linear system | Guarantees the rule returns the unique solution           |
| Basic fraction arithmetic | All final answers are ratios of two numbers               |

If you cannot yet compute \(ad-bc\) or recognise an inconsistent system, pause and review those two ideas first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the system in matrix columns
Aap likhte ho coefficients ko do column vectors ki tarah.  
Example: \(3x + 2y = 7\), \(4x + 5y = 9\) becomes columns \(\begin{bmatrix}3\\4\end{bmatrix}\) and \(\begin{bmatrix}2\\5\end{bmatrix}\).  
Formally the coefficient matrix is \(A = \begin{bmatrix}a & b\\c & d\end{bmatrix}\).  
> [!WARNING] Agar aap columns ko alag-alag nahi dekh paate, to baad mein numerator column swap karte waqt galti ho jaayegi.

### Step 2 — Form the master determinant D
D = ad − bc.  
Example: D = 3·5 − 2·4 = 7.  
Formally \(D = \det(A)\).  
> [!WARNING] D = 0 par rule ruk jaata hai; system ya to infinite ya koi solution nahi deta.

### Step 3 — Build the x-numerator determinant
Left column ko constants se replace karo: \(\begin{bmatrix}e & b\\f & d\end{bmatrix}\).  
Its determinant is ed − bf.  
Formally \(D_x = \det\begin{bmatrix}e & b\\f & d\end{bmatrix}\).

### Step 4 — Build the y-numerator determinant
Right column ko constants se replace karo: \(\begin{bmatrix}a & e\\c & f\end{bmatrix}\).  
Its determinant is af − ec.  
Formally \(D_y = \det\begin{bmatrix}a & e\\c & f\end{bmatrix}\).

### Step 5 — Write the solution formulas
\(x = D_x / D\), \(y = D_y / D\) jab D ≠ 0.  
Formally, if \(\det(A) \neq 0\) then the unique solution is given by these ratios.

### Step 6 — Verify by substitution (optional but rigorous)
Plug x and y back into both original equations; both must hold identically. This step catches arithmetic slips.

## 5. Worked examples — har step show karo

**Example 1 — Simple integer coefficients**  
*Given:* \(2x + 3y = 8\), \(4x + 5y = 10\).  
*Find:* x and y.  
D = 2·5 − 3·4 = 10 − 12 = −2.  
D_x = 8·5 − 3·10 = 40 − 30 = 10.  
D_y = 2·10 − 8·4 = 20 − 32 = −12.  
x = 10 / (−2) = −5, y = (−12) / (−2) = 6.  
*Why* each step: we computed D first to check uniqueness, then replaced columns exactly once each.  
**Final answer**  
x = −5, y = 6  

*Reflection:* The negative signs cancelled cleanly; the method works even when D is negative.

**Example 2 — One negative coefficient**  
*Given:* \(x − y = 3\), \(2x + y = 9\).  
*Find:* x and y.  
D = 1·1 − (−1)·2 = 1 + 2 = 3.  
D_x = 3·1 − (−1)·9 = 3 + 9 = 12.  
D_y = 1·9 − 3·2 = 9 − 6 = 3.  
x = 12 / 3 = 4, y = 3 / 3 = 1.  
*Why* each step: the minus sign in the original matrix becomes plus when forming D.  
**Final answer**  
x = 4, y = 1  

*Reflection:* Signs inside the determinant must be tracked carefully; one missed sign flips the entire solution.

**Example 3 — Fractional constants**  
*Given:* \(3x + y = 1/2\), \(x + 2y = 3/4\).  
*Find:* x and y.  
D = 3·2 − 1·1 = 6 − 1 = 5.  
D_x = (1/2)·2 − 1·(3/4) = 1 − 0.75 = 0.25.  
D_y = 3·(3/4) − (1/2)·1 = 9/4 − 1/2 = 1.25.  
x = 0.25 / 5 = 1/20, y = 1.25 / 5 = 1/4.  
*Why* each step: fractions are kept until the final division to avoid rounding.  
**Final answer**  
x = 1/20, y = 1/4  

*Reflection:* Clearing denominators before applying the rule often reduces arithmetic load.

**Example 4 — Inconsistent system (D = 0)**  
*Given:* \(2x + 4y = 6\), \(x + 2y = 4\).  
*Find:* solution status.  
D = 2·2 − 4·1 = 4 − 4 = 0.  
Rule stops; we do not compute D_x or D_y.  
*Why* each step: zero determinant signals either no solution or infinitely many; substitution shows the second equation is exactly half the first after scaling, yet constants contradict.  
**Final answer**  
No unique solution exists  

*Reflection:* Always test D first; skipping this check wastes time on impossible numerators.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to compute D first | Students jump to numerators                 | Write D = ad − bc as the very first line     |
| Swapping the wrong column   | Confusion between x and y                   | Label columns “x-column” and “y-column” visibly |
| Sign error inside determinant | Treating −b as +b                           | Expand determinant as ad + (−b)c explicitly  |
| Dividing by zero            | Missing the D = 0 case                      | Insert an explicit “if D ≠ 0” guard          |
| Arithmetic slip in fractions| Early decimal conversion                    | Keep fractions until the last division       |
| Applying rule to nonlinear equations | Over-generalising the method             | Verify both equations are strictly linear    |
| Copying constants into wrong row | Fatigue during long problems             | Double-check each constant against original equations |

## 7. The textbook-precise statement
Let \(A = \begin{bmatrix}a & b\\c & d\end{bmatrix}\) with \(\det(A) \neq 0\), and let \(\mathbf{b} = \begin{bmatrix}e\\f\end{bmatrix}\). The unique solution of \(A\mathbf{x} = \mathbf{b}\) is given by
\[
x = \frac{\det\begin{bmatrix}e & b\\f & d\end{bmatrix}}{\det(A)},\qquad
y = \frac{\det\begin{bmatrix}a & e\\c & f\end{bmatrix}}{\det(A)}.
\]
(See Strang, *Introduction to Linear Algebra*, 5e, §2.3.)

## 8. Visual — diagram or schematic
```
Coefficient matrix          x-numerator          y-numerator
[ a  b ]                    [ e  b ]             [ a  e ]
[ c  d ]                    [ f  d ]             [ c  f ]
   ↓                           ↓                    ↓
   D                         D_x                  D_y
   |                           |                    |
   └───────────> x = D_x/D     └──────> y = D_y/D
```
Columns are swapped exactly once; the unchanged column stays in its original place.

## 9. The memory technique
1. **The hook** — Picture two columns of soldiers; to find the “x-soldier” you replace the left column with the mission orders (constants) and measure the new formation’s area, then divide by the original area.
2. **What to overlearn** — D = ad − bc; x = D_x/D; y = D_y/D; D must be nonzero.
3. **Spaced-repetition schedule** — Review the three formulas after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the numerators, rebuild by writing the explicit inverse formula \(x = (de − bf)/D\) and recognise that de − bf is exactly the determinant after swapping the first column.

## 10. What this unlocks
You can now solve any 2×2 system by hand in seconds and recognise when a unique solution exists. This skill feeds directly into:
- 3×3 Cramer extensions
- Matrix inversion via adjugate
- Condition-number discussions in numerical linear algebra
- Geometric interpretation of linear transformations (area scaling by |D|)

## 11. Self-check — five questions, no answers
1. Compute the solution of \(5x − 2y = 11\), \(3x + 4y = 9\) using Cramer’s rule.
2. For which value of k does the system \(kx + 2y = 4\), \(3x + 6y = 12\) have no unique solution?
3. Show that if D = 0 and D_x ≠ 0 then the original system is inconsistent.
4. A student obtained x = 2, y = −3 yet substitution into the first equation failed. Which single step most likely contained the error?
5. Derive the expression for y in Cramer’s rule starting from the explicit inverse of a 2×2 matrix.