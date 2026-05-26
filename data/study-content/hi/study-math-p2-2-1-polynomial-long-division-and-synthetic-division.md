## 1. The one-sentence answer
**Polynomial long division and synthetic division are exact algorithms that factor a dividend polynomial by a divisor polynomial to produce a unique quotient polynomial plus a remainder of strictly lower degree.**

Long division works exactly like the integer long-division process you already know, except every “digit” is now a term with a variable power. You subtract multiples of the divisor from the current dividend until nothing of equal or higher degree remains. Synthetic division is a compressed version of the same process that applies only when the divisor is linear and monic; it replaces subtraction with addition of the negated root and collapses the bookkeeping into a single row of coefficients.

The key algebraic fact is the division algorithm for polynomials: for any polynomials \(f(x)\) and \(d(x)\) with \(d(x) \neq 0\), there exist unique polynomials \(q(x)\) and \(r(x)\) such that
\[
f(x) = q(x) \cdot d(x) + r(x), \quad \deg(r) < \deg(d).
\]
This identity holds over any field, including the reals and complexes.

> [!NOTE]
> The remainder theorem is an immediate corollary: when you divide by \(x - c\), the remainder is exactly the constant \(f(c)\). That single number tells you both the value of the polynomial and whether \(c\) is a root.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s GMAT and ESA’s GODOT propagate orbits by converting high-degree Chebyshev polynomials into rational approximations; polynomial division supplies the quotient that becomes the new propagation kernel after each gravity-assist maneuver.

Modern compilers (LLVM, GCC) and computer-algebra systems (SymPy, Mathematica) factor polynomial expressions inside hot loops for automatic differentiation and loop-invariant code motion; synthetic division accelerates the repeated division by candidate linear factors when the compiler tries to prove that a loop index never hits a root.

Semiconductor timing analysis at TSMC and Intel uses polynomial division to reduce the characteristic equations that arise from RC-delay models; the quotient becomes the reduced-order model that static-timing tools evaluate millions of times per clock-tree synthesis run.

In algebraic signal processing, MATLAB’s `deconv` and SciPy’s `signal.deconvolve` implement polynomial long division to recover finite-impulse-response filters from observed convolution outputs; every LTE base-station channel-estimation block runs a variant of this step.

Control-theory software (MATLAB’s Control System Toolbox, Python’s python-control) cancels pole-zero pairs by dividing the plant transfer function by its known factors; synthetic division supplies the exact cancellation needed before root-locus or Nyquist plotting.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Degree of a polynomial   | Determines how many subtraction steps long division needs and when to stop. |
| Leading coefficient      | Scales the first term of the quotient in every step.      |
| Polynomial addition/subtraction | Core operation repeated at each stage of both algorithms. |
| Evaluation of \(f(c)\)   | Directly gives the remainder when the divisor is \(x-c\). |

If any row above is unfamiliar, pause and review basic polynomial arithmetic before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Align degrees and subtract leading-term multiples
You compare the highest-degree term of the current dividend with that of the divisor, form their ratio, and multiply the entire divisor by that monomial. Subtracting removes the leading term exactly.

Example: divide \(x^2 + 5x + 6\) by \(x + 2\). Leading terms give \(x^2 / x = x\). Multiply: \(x(x + 2) = x^2 + 2x\). Subtract yields \(3x + 6\).

Formal statement: let \(\mathrm{lc}(p)\) be the leading coefficient of \(p\). The first quotient term is
\[
q_1 = \frac{\mathrm{lc}(f)}{\mathrm{lc}(d)} x^{\deg(f)-\deg(d)}.
\]

> [!WARNING]
> Sign errors appear here most often; a missing minus sign propagates through every later coefficient.

### Step 2 — Bring down the next term and repeat
After subtraction you obtain a new polynomial of lower degree. Append the next unused coefficient from the original dividend and repeat the leading-term division.

Continuing the example: new dividend \(3x + 6\), ratio \(3x / x = 3\). Multiply: \(3(x + 2) = 3x + 6\). Subtract yields remainder 0.

### Step 3 — Record the quotient and remainder
All quotient terms collected so far form \(q(x)\); whatever is left (degree strictly less than divisor) is \(r(x)\).

### Step 4 — Specialise to linear monic divisor (synthetic division)
When \(d(x) = x - c\), the only multiplier needed at each step is the constant \(c\). All subtractions become additions of \(-c\) times the running total, collapsing the layout into one horizontal row.

Formal synthetic-division row for root \(c\):
\[
\begin{array}{r|r}
c & a_n & a_{n-1} & \cdots & a_0 \\
  &     & b_{n-1} & \cdots & b_0 \\
\hline
  & b_n & b_{n-1} & \cdots & r
\end{array}
\]
where each \(b_k = a_k + c \cdot b_{k+1}\).

### Step 5 — Verify the identity
Substitute the obtained \(q\) and \(r\) back into \(f = q\cdot d + r\) and confirm coefficient-wise equality. This single check catches arithmetic mistakes.

## 5. Worked examples — har step show karo

**Example 1 — Linear divisor, zero remainder**  
*Given:* \(f(x) = x^2 + 5x + 6\), \(d(x) = x + 2\).  
*Find:* \(q(x)\) and \(r(x)\).  

Divide \(x^2\) by \(x\) → \(x\).  
\(x(x + 2) = x^2 + 2x\). Subtract: \((x^2 + 5x + 6) - (x^2 + 2x) = 3x + 6\).  
Divide \(3x\) by \(x\) → \(3\).  
\(3(x + 2) = 3x + 6\). Subtract: remainder 0.  

*Why* each move: we systematically eliminate the highest remaining power.  

**Final answer**  
\(x^2 + 5x + 6 = (x + 3)(x + 2) + 0\).

*Reflection:* The example is easy because the divisor is a factor; the same layout works when the remainder is nonzero.

**Example 2 — Nonzero remainder**  
*Given:* \(f(x) = 2x^3 - 3x^2 + 4x - 1\), \(d(x) = x - 1\).  
*Find:* quotient and remainder via synthetic division.  

\[
\begin{array}{r|r}
1 & 2 & -3 & 4 & -1 \\
  &   & 2  & -1 & 3  \\
\hline
  & 2 & -1 & 3 & 2
\end{array}
\]

*Why* each entry: add the product of the root and the previous bottom-row value.  

**Final answer**  
\(2x^3 - 3x^2 + 4x - 1 = (2x^2 - x + 3)(x - 1) + 2\).

*Reflection:* The last bottom-row entry is always \(f(1)\), confirming the remainder theorem.

**Example 3 — Quadratic divisor (long division only)**  
*Given:* \(f(x) = x^3 + 3x^2 + 5x + 6\), \(d(x) = x^2 + x + 2\).  
Perform long division: first term \(x\), multiply, subtract, next term 2, multiply, subtract → remainder \(x + 2\).

**Final answer**  
\(x^3 + 3x^2 + 5x + 6 = (x + 2)(x^2 + x + 2) + (x + 2)\).

*Reflection:* Degree of remainder is now 1, matching \(\deg(d) - 1\).

**Example 4 — Missing terms and leading-coefficient scaling**  
*Given:* \(f(x) = 3x^4 + 0x^3 + 2x - 7\), \(d(x) = 3x - 1\).  
Insert zero coefficients, then apply synthetic division with root \(1/3\).

**Final answer**  
Quotient \(x^3 + \frac13 x^2 + \frac19 x + \frac{2}{27}\), remainder \(-\frac{61}{27}\).

*Reflection:* Scaling by the leading coefficient of the divisor is mandatory; forgetting it is the most common source of wrong quotients.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to insert zero coefficients | Students skip “missing” powers              | Write every power from highest to constant explicitly |
| Sign error on subtraction   | Mental arithmetic slips                     | Change subtraction into addition of the negated multiple |
| Using synthetic division for quadratic divisors | Pattern-matching without checking degree    | Verify divisor is monic linear before switching |
| Stopping one term too early | Miscounting degree of remainder             | Continue until degree of current polynomial < degree of divisor |
| Ignoring the leading-coefficient ratio | Treating all leading coefficients as 1      | Always compute \(\mathrm{lc}(f)/\mathrm{lc}(d)\) first |
| Copying the wrong root into synthetic row | Confusing \(x-c\) with \(x+c\)              | Write divisor as \(x - c\) and use \(+c\)    |
| Not verifying final identity| Over-trusting arithmetic                     | Multiply \(q\cdot d + r\) and compare with \(f\) |

## 7. The textbook-precise statement
Let \(F\) be a field and let \(F[x]\) be the ring of polynomials over \(F\). For any \(f,d\in F[x]\) with \(d\neq 0\), there exist unique \(q,r\in F[x]\) such that
\[
f = q\cdot d + r \quad\text{and}\quad \deg(r) < \deg(d)
\]
(or \(r=0\)). The polynomials \(q\) and \(r\) are called the quotient and remainder, respectively. When \(d(x)=x-c\), the remainder equals \(f(c)\). (Artin, *Algebra*, 2e, Chapter 10, Theorem 10.3.2.)

## 8. Visual — diagram or schematic
```
Long division layout (x²+5x+6) ÷ (x+2)

      x + 3
x+2 | x² + 5x + 6
      - (x² + 2x)
      -----------
            3x + 6
          - (3x + 6)
          -----------
                0
```
Each line shows the current dividend after subtraction; arrows indicate the next leading-term ratio.

## 9. The memory technique
1. **The hook** — Picture the long-division bracket as a “staircase”; each step you kick one stair down by subtracting a scaled copy of the divisor, exactly like walking down while carrying a polynomial “box”.
2. **What to overlearn** — The identity \(f(x) = q(x)d(x) + r(x)\) with \(\deg(r)<\deg(d)\); the synthetic-division recurrence \(b_k = a_k + c\cdot b_{k+1}\); remainder = \(f(c)\) for divisor \(x-c\).
3. **Spaced-repetition schedule** — Review the identity after 1 day, synthetic row after 3 days, full long-division example after 7 days, mixed trap question after 16 days, and a fresh problem after 35 days.
4. **First-principles fallback** — If the synthetic row is forgotten, revert to ordinary long division, align leading terms, and subtract; the coefficients will automatically match the synthetic numbers.

## 10. What this unlocks
Mastery lets you factor polynomials completely, locate real and complex roots, simplify rational functions, and prepare expressions for partial-fraction decomposition.

- Polynomial remainder theorem and factor theorem
- Rational-root theorem tests
- Partial-fraction decomposition in calculus
- Companion-matrix eigenvalue problems in linear algebra
- Control-system pole-zero cancellation

## 11. Self-check — five questions, no answers
1. Perform long division of \(x^3 - 2x^2 + 3x - 1\) by \(x - 1\) and state the remainder.
2. Use synthetic division to decide whether \(x = 2\) is a root of \(2x^3 - 7x^2 + 9x - 2\).
3. Divide \(x^4 + 1\) by \(x^2 + 1\) and give both quotient and remainder.
4. A student obtained remainder 5 when dividing by \(x - 2\). What is \(f(2)\)? If the student claims remainder 5 when dividing by \(x + 2\), what must be true?
5. Why does synthetic division fail for the divisor \(x^2 + 1\)? Show the first two steps of ordinary long division instead.