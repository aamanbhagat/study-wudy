## 1. The one-sentence answer
**Polynomial long division and synthetic division are exact algorithms that factor a polynomial dividend by a polynomial divisor to produce a unique quotient and remainder whose degree is strictly less than the divisor’s degree.**

Long division works for any divisor. It mirrors the integer long-division process: at each stage you multiply the current leading term of the divisor by a monomial chosen to cancel the current leading term of the dividend, subtract, and bring down the next term. The process terminates when the remaining polynomial has degree lower than the divisor.

Synthetic division is a compressed tabular version of long division that applies only when the divisor is monic and linear. It records only the successive coefficients and the constant root, replacing multiplication and subtraction with a single multiplication-and-addition step per coefficient.

> [!NOTE]
> The remainder theorem follows at once: evaluating the dividend at the root of the divisor equals the constant remainder, turning division into direct evaluation.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s Deep Space Network uses polynomial division to reduce high-degree Chebyshev approximations of planetary ephemerides before uploading compact coefficient tables to spacecraft flight software.

In semiconductor timing analysis, Synopsys PrimeTime performs polynomial division on delay models expressed as multivariate polynomials; the quotient supplies the dominant delay term while the remainder bounds the truncation error fed into static-timing sign-off.

Modern graphics pipelines in NVIDIA GPUs factor Bernstein polynomials via synthetic division when converting Bézier curves to power basis for hardware-accelerated clipping and intersection tests.

In control-theory software such as MATLAB’s Control System Toolbox, pole-placement routines divide the closed-loop characteristic polynomial by a candidate factor to verify that a chosen gain places all roots inside the unit disk.

Machine-learning libraries such as scikit-learn’s PolynomialFeatures pipeline internally divide the design-matrix Gram polynomial by its leading term to orthogonalize features before ridge regression, improving numerical stability for degrees greater than 10.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Degree of a polynomial   | Determines termination condition and degree of remainder  |
| Leading coefficient      | Supplies the multiplier at each division step             |
| Polynomial addition and subtraction | Required for the “subtract” phase of every step       |
| Monic linear divisor     | Enables the one-line arithmetic of synthetic division     |
| Evaluation of a polynomial at a point | Supplies the remainder when divisor is linear     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Align leading terms
You cancel the highest-degree term of the dividend by multiplying the divisor by a single monomial.  
Example: divide \(2x^3 + 3x^2 - 5x + 1\) by \(x - 2\). Leading terms give multiplier \(2x^2\).  
Formal statement: the first term of the quotient is
\[
q_1 = \frac{a_m}{b_k} x^{m-k},
\]
where \(a_m\) and \(b_k\) are the leading coefficients.  
> [!WARNING] Using the wrong leading term produces an immediate degree mismatch that propagates through every later coefficient.

### Step 2 — Multiply and subtract
Multiply the entire divisor by \(q_1\) and subtract the result from the dividend. The new leading term is now of lower degree.  
Formal step:
\[
P_1(x) = P(x) - q_1(x) \cdot D(x).
\]
> [!WARNING] Sign error in subtraction leaves the original leading term intact and the algorithm loops.

### Step 3 — Repeat until degree condition
Continue selecting the next monomial multiplier from the current remainder polynomial until its degree drops below \(\deg D\).  
The process yields
\[
P(x) = Q(x) \cdot D(x) + R(x), \quad \deg R < \deg D.
\]

### Step 4 — Specialize to monic linear divisor
When \(D(x) = x - c\), every multiplier is simply the next coefficient of the running remainder; multiplication by \(x\) becomes a horizontal shift and subtraction collapses to addition of \(c\) times the previous coefficient.  
This produces the synthetic-division tableau.

### Step 5 — Read quotient and remainder directly
The bottom row of the tableau, excluding the final entry, contains the coefficients of \(Q(x)\); the final entry is \(R\).

### Step 6 — Recover the factor theorem
Substituting \(x = c\) into the division identity immediately gives \(P(c) = R\), the remainder theorem.

## 5. Worked examples — every step shown

**Example 1 — Linear divisor, positive root**  
*Given:* \(P(x) = x^3 - 6x^2 + 11x - 6\), \(D(x) = x - 2\).  
*Find:* quotient and remainder.  
Divide leading terms: \(x^3 / x = x^2\).  
*Why:* cancels degree-3 term.  
Multiply: \(x^2(x-2) = x^3 - 2x^2\). Subtract:
\[
(x^3 - 6x^2 + 11x - 6) - (x^3 - 2x^2) = -4x^2 + 11x - 6.
\]
Next: \(-4x^2 / x = -4x\). Multiply and subtract yields \(3x - 6\).  
Next multiplier: \(3\). Final remainder \(0\).  
**\(Q(x) = x^2 - 4x + 3\), \(R = 0\)**

*Reflection:* remainder zero signals an exact factor; the same arithmetic works for any integer root.

**Example 2 — Non-monic linear divisor**  
*Given:* \(P(x) = 2x^3 + 5x^2 - x + 1\), \(D(x) = 2x - 1\).  
*Find:* quotient and remainder via long division.  
First multiplier: \(x^2\). Multiply, subtract, continue through three steps.  
**\(Q(x) = x^2 + 3x + 1\), \(R = 2\)**

*Reflection:* the leading coefficient of the divisor must be divided into each successive leading term; synthetic division cannot be used directly.

**Example 3 — Synthetic division with negative root**  
*Given:* \(P(x) = x^3 + 2x^2 - x - 2\), divide by \(x + 3\).  
Bring-down tableau with root \(-3\):
\[
\begin{array}{r|r}
-3 & 1 & 2 & -1 & -2 \\
   &   & -3 & 3  & -6 \\
\hline
   & 1 & -1 & 2  & -8 \\
\end{array}
\]
**\(Q(x) = x^2 - x + 2\), \(R = -8\)**

*Reflection:* the sign of the root is absorbed into the added multiples; no separate subtraction signs appear.

**Example 4 — Quadratic divisor**  
*Given:* divide \(x^4 + 3x^3 + 2x^2 + x + 1\) by \(x^2 + x + 1\).  
Long division yields two steps.  
**\(Q(x) = x^2 + 2x - 1\), \(R = 3x + 2\)**

*Reflection:* remainder degree equals divisor degree minus one; both long division and later factorization techniques remain applicable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to subtract the entire product | Mental carry-over from integer arithmetic   | Write the full multiplied polynomial before subtracting |
| Using synthetic division on quadratic divisor | Pattern-matching the word “division”        | Check that divisor is degree 1 and monic     |
| Sign error when root is negative  | Confusing “add the opposite” with “subtract”| Always add the multiple of the root          |
| Recording leading coefficient of non-monic divisor in synthetic row | Over-generalizing the algorithm             | Scale the polynomial or revert to long division |
| Stopping one term early           | Miscounting degree drop                     | Continue until remainder degree < divisor degree |
| Treating remainder as part of quotient | Misreading the final tableau entry          | Separate last entry explicitly as remainder  |
| Coefficient overflow in mental arithmetic | High-degree or large-integer problems       | Use a calculator or write coefficients in columns |

## 7. The textbook-precise statement
Let \(F\) be a field and let \(P, D \in F[x]\) with \(D \neq 0\). There exist unique \(Q, R \in F[x]\) such that
\[
P(x) = Q(x) D(x) + R(x), \quad \deg R < \deg D
\]
or \(R = 0\). When \(D(x) = x - c\), the constant \(R\) equals \(P(c)\). (Lang, *Algebra*, 3e, Ch. IV, §1.)

## 8. Visual — diagram or schematic
```text
Long division layout (coefficients only)
Dividend:  a3 a2 a1 a0
Divisor:   b1 b0
           ---------
Quotient:  q2 q1 q0
Remainder:      r1 r0   (deg < 1 for linear divisor)

Synthetic division tableau (root c)
c | a3  a2  a1  a0
  |     q2·c q1·c q0·c
  -------------------
    q2  q1  q0   r
```
Each arrow represents “multiply by c and add to next coefficient.”

## 9. The memory technique
1. **The hook** — picture a factory conveyor belt: each coefficient travels left to right; at every station it is multiplied by the root “stamp” and the result is added to the next arriving coefficient, exactly as synthetic division marches across the row.
2. **What to overlearn** — the division identity \(P = QD + R\) with \(\deg R < \deg D\); the synthetic row ends with remainder; \(P(c) = R\).
3. **Spaced-repetition schedule** — review identity and tableau at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — rebuild from the definition of polynomial multiplication: expand \(Q \cdot D\) and solve coefficient-wise for the unknown terms of \(Q\) until the remainder degree condition is met.

## 10. What this unlocks
Mastery supplies the algebraic engine for rational-root theorem tests, partial-fraction decomposition, and the Euclidean algorithm for polynomial gcds.  
- Factoring higher-degree polynomials over the integers  
- Constructing minimal polynomials in field extensions  
- Implementing fast polynomial gcd in computer-algebra systems  
- Reducing rational functions before integration or Laplace inversion  

## 11. Self-check — five questions, no answers
1. Perform long division of \(x^4 - 3x^2 + 2x + 5\) by \(x^2 - 1\) and state the remainder.  
2. Use synthetic division to decide whether \(x + 4\) is a factor of \(x^3 + 5x^2 + 2x - 8\).  
3. A student obtains remainder 7 when dividing by \(x - 2\). What is the value of the original polynomial at \(x = 2\)?  
4. Why does synthetic division fail when the divisor is \(2x - 1\)? Show the corrective scaling step.  
5. Given that \(P(x) = (x^2 + 1)Q(x) + 3x + 2\), what is the remainder when \(P\) is divided by \(x^2 + 1\)?