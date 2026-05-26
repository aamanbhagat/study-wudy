## 1. The one-sentence answer
**Cramer's rule solves a 2×2 linear system by expressing each variable as the ratio of two determinants, where the denominator is the coefficient determinant and the numerator is obtained by replacing one column of coefficients with the constant vector.**

A 2×2 system consists of two equations in two unknowns whose coefficients form a square array. The rule isolates each unknown by swapping that variable's column with the right-hand side constants and dividing the resulting determinant by the original coefficient determinant. This replaces the need for elimination or substitution with a direct formula built from four 2×2 determinants.

The approach works only when the coefficient determinant is nonzero; otherwise the system is either inconsistent or dependent. The four determinants are evaluated with the same subtraction-of-products pattern, which keeps arithmetic uniform and reveals the geometry of linear independence through a single number.

> [!NOTE]
> The single number that decides solvability is the determinant of the coefficient matrix; its sign and magnitude also encode the orientation and scaling that map the unit square onto the parallelogram formed by the two column vectors.

## 2. Why this matters — concrete and current
In semiconductor mask alignment, engineers solve 2×2 systems derived from measured overlay errors to compute translation and rotation corrections; Cramer's rule supplies the explicit corrections without iterative solvers, allowing real-time feedback on ASML lithography tools.

In rigid-body simulation for video-game physics engines, collision response between two line segments reduces to a 2×2 system whose solution gives the impulse magnitudes; studios such as Unity Technologies embed Cramer's rule in their 2-D contact solvers because the four-determinant form is branch-free and vectorizes cleanly on SIMD hardware.

In DC-circuit nodal analysis, Kirchhoff's laws for a two-loop network produce a 2×2 conductance matrix; power-electronics designers at Texas Instruments use Cramer's rule to obtain closed-form expressions for loop currents that appear directly in datasheets for motor-driver ICs.

In computer-vision homography estimation for mobile augmented-reality apps, the mapping between two image planes yields a 2×2 subsystem for translation after the rotation has been factored out; Apple’s ARKit pipeline evaluates these determinants at 60 fps to keep virtual objects anchored without floating-point division by near-zero values.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 2×2 determinant          | Supplies the four scalar values that appear in every ratio |
| Consistent linear system | Guarantees the coefficient determinant is nonzero         |
| Matrix column replacement| Defines how the numerator determinants are constructed    |

## 4. Building the idea — from intuition to formalism

### Step 1 — The coefficient determinant encodes linear independence
Two equations are independent precisely when their coefficient vectors are not scalar multiples of each other. The single number that detects this independence is the determinant of the 2×2 matrix whose rows (or columns) are those vectors.

Consider the system  
2x + 3y = 7  
4x + 5y = 11.  
The coefficient matrix is [[2,3],[4,5]] and its determinant equals 2·5−3·4 = −2 ≠ 0, so a unique solution exists.

Formally,  
$$D = ad - bc$$  
where the system is written  
ax + by = e,  
cx + dy = f.

> [!WARNING]
> Computing ad + bc instead of ad − bc inverts the sign and produces the wrong solution vector.

### Step 2 — Replace the first column to isolate x
To obtain an expression for x alone, replace the column of x-coefficients with the constants. The new determinant, divided by D, equals x.

In the example above the replacement yields [[7,3],[11,5]], whose determinant is 7·5−3·11 = −8. Therefore  
x = (−8) / (−2) = 4.

Formally,  
$$x = \frac{ed - bf}{D}.$$

> [!WARNING]
> Swapping rows instead of columns changes the sign of the numerator and yields −x.

### Step 3 — Replace the second column to isolate y
Replace the y-coefficient column with the constants. The resulting determinant divided by D gives y.

Continuing the example, [[2,7],[4,11]] has determinant 2·11−7·4 = −6, so  
y = (−6) / (−2) = 3.

Formally,  
$$y = \frac{af - ec}{D}.$$

> [!WARNING]
> Forgetting to negate the product ec produces the incorrect numerator af + ec.

### Step 4 — Verify consistency when D = 0
If D vanishes, at least one numerator must also vanish for solutions to exist; otherwise the system is inconsistent. This check is performed before any division.

### Step 5 — The complete rule
When D ≠ 0 the unique solution is given by the two ratios above. This is the textbook statement of Cramer's rule for 2×2 systems.

## 5. Worked examples — every step shown

**Example 1 — Integer coefficients, unique solution**  
*Given:*  
3x − y = 5  
x + 2y = 4  
*Find:* x and y.  

Compute D:  
$$D = 3\cdot2 - (-1)\cdot1 = 6 + 1 = 7.$$  
*Why:* subtract the product of the off-diagonal entries.  

Numerator for x:  
$$D_x = 5\cdot2 - (-1)\cdot4 = 10 + 4 = 14.$$  
*Why:* replace first column with constants and evaluate.  

Thus  
$$x = 14/7 = 2.$$  

Numerator for y:  
$$D_y = 3\cdot4 - 5\cdot1 = 12 - 5 = 7.$$  
*Why:* replace second column.  

Thus  
$$y = 7/7 = 1.$$  

**2**  
**1**

*Reflection:* The arithmetic stayed integer because the determinant divided evenly; this pattern generalises to any system whose solution is rational.

**Example 2 — Fractional solution**  
*Given:*  
2x + y = 1  
x − y = 2  
*Find:* x and y.  

$$D = 2\cdot(-1) - 1\cdot1 = -2 - 1 = -3.$$  
$$D_x = 1\cdot(-1) - 1\cdot2 = -1 - 2 = -3 \implies x = (-3)/(-3) = 1.$$  
$$D_y = 2\cdot2 - 1\cdot1 = 4 - 1 = 3 \implies y = 3/(-3) = -1.$$  

**1**  
**-1**

*Reflection:* The negative denominator propagated correctly; sign errors here are the most common source of wrong answers.

**Example 3 — Inconsistent system**  
*Given:*  
x + y = 1  
2x + 2y = 5  
*Find:* solution status.  

$$D = 1\cdot2 - 1\cdot2 = 0,$$  
$$D_x = 1\cdot2 - 1\cdot5 = 2 - 5 = -3 \neq 0.$$  
Because D = 0 and D_x ≠ 0 the system has no solution.

*Reflection:* The zero-denominator test must precede any division.

**Example 4 — Dependent system**  
*Given:*  
x + 2y = 3  
2x + 4y = 6  
*Find:* solution status.  

$$D = 1\cdot4 - 2\cdot2 = 0,$$  
$$D_x = 3\cdot4 - 2\cdot6 = 12 - 12 = 0.$$  
Both determinants vanish, so the equations describe the same line; infinitely many solutions exist.

*Reflection:* The identical rows produce identical zero determinants, signalling dependence.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Sign error in determinant   | Confusing ad − bc with ad + bc              | Always write the formula explicitly before substituting |
| Dividing when D = 0         | Skipping the preliminary check              | Compute D first; halt if zero                |
| Swapping rows instead of columns | Misremembering the replacement rule     | Visualise columns as the variable slots      |
| Forgetting the minus sign in D_y | Treating both numerators symmetrically | Write D_y = af − ec each time                |
| Arithmetic overflow with integers | Using large coefficients without simplification | Reduce fractions after each determinant      |
| Treating dependent and inconsistent identically | Not checking both D and D_x, D_y     | Always evaluate at least one numerator when D = 0 |
| Using the rule on non-square systems | Over-generalising the 2×2 formula        | Confirm exactly two equations and two unknowns |

## 7. The textbook-precise statement
Let  
$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix},\quad \mathbf{b} = \begin{pmatrix} e \\ f \end{pmatrix}.$$  
If det(A) ≠ 0, the unique solution of Ax = b is  
$$x = \frac{\det(A_x)}{\det(A)},\quad y = \frac{\det(A_y)}{\det(A)},$$  
where A_x replaces the first column of A by b and A_y replaces the second column. (See Lay, *Linear Algebra and Its Applications*, 6e, §3.3, Theorem 7.)

## 8. Visual — diagram or schematic
```text
Column picture of Cramer's rule
          x-column          y-column       constants
            a                 b              e
            c                 d              f

D   = | a b |   D_x = | e b |   D_y = | a e |
      | c d |         | f d |         | c f |

x = D_x / D ,   y = D_y / D
```
The diagram shows the three matrices whose determinants appear; each matrix is obtained from the coefficient matrix by at most one column substitution.

## 9. The memory technique

1. **The hook** — Picture three transparent sheets: the middle sheet holds the two coefficient columns; sliding the constant vector into the left slot produces D_x, into the right slot produces D_y. The ratios of the areas give the coordinates.
2. **What to overlearn** — The four formulas D = ad − bc, x = (ed − bf)/D, y = (af − ec)/D together with the precondition D ≠ 0.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the expressions by solving the system with elimination and factoring the resulting numerators; the algebra yields exactly the determinant ratios.

## 10. What this unlocks
Cramer's rule supplies the explicit inverse formula for 2×2 matrices and prepares the conceptual ground for the adjugate matrix in higher dimensions.  

- 3×3 and n×n Cramer's rule  
- Matrix inversion via adjugate  
- Geometric interpretation of determinants as signed areas  
- Condition numbers and numerical stability of linear solves  

## 11. Self-check — five questions, no answers
1. Solve the system 5x − 2y = 3, 3x + 4y = 7 using Cramer's rule and verify by substitution.  
2. For which values of k does the system x + ky = 1, kx + y = 1 have a unique solution?  
3. Construct a 2×2 system whose coefficient determinant is 1 yet whose solution contains fractions; solve it.  
4. A student computes D = ad + bc and obtains the correct numerical answer. Explain the coincidence and give a counter-example where the same mistake fails.  
5. Show that if the two equations are scalar multiples of each other, then D = D_x = D_y = 0.