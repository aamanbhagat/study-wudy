## 1. The one-sentence answer
**Vieta's formulas link the coefficients of a polynomial directly to the sum and product of its roots without finding the roots explicitly.**

For a quadratic equation the connection appears when you expand the factored form and match coefficients with the standard form. This gives two simple relations: if the roots are \(r_1\) and \(r_2\), then \(r_1 + r_2\) equals the negative of the linear coefficient divided by the quadratic coefficient, and \(r_1 \cdot r_2\) equals the constant term divided by the quadratic coefficient. The same principle extends to higher-degree polynomials by comparing elementary symmetric sums.

Aap already know that solving \(ax^2 + bx + c = 0\) can be messy when the discriminant is not a perfect square. Vieta lets you extract useful information about the roots even when you never compute them. In problems involving distance, area, or optimisation you often need only the sum or product, so the formulas save an entire solving step.

> [!NOTE]
> The deepest insight is that the coefficients are symmetric functions of the roots; once you see the polynomial as \((x - r_1)(x - r_2)\dots\), every coefficient is forced to be an elementary symmetric polynomial in the roots.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX trajectory teams use the sum of roots of the Keplerian time-of-flight polynomial to obtain the semi-major axis without solving the full quartic. In semiconductor device physics, the product of roots of the characteristic equation for a BJT amplifier directly gives the voltage gain term that appears in datasheets from Texas Instruments. In modern portfolio theory, quadratic risk models at BlackRock rely on Vieta to compute the trace and determinant of covariance sub-matrices, which are exactly the sum and product of eigenvalues. In computer-vision bundle adjustment at Meta, the sum of roots of the reprojection-error polynomial supplies an initial guess for Levenberg-Marquardt damping. In control theory for drone flight controllers, the product of closed-loop poles (roots) must equal the constant term of the characteristic polynomial; this single check verifies stability margins before any root-locus plot is drawn.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Standard quadratic form \(ax^2 + bx + c = 0\) | Supplies the coefficients that Vieta relates to roots     |
| Factored form \((x - r_1)(x - r_2)\) | The algebraic starting point that produces the symmetric sums |
| Polynomial expansion and coefficient matching | The mechanical step that converts roots into coefficients |
| Basic fraction arithmetic | Required when normalising leading coefficient to 1        |

If any row is unfamiliar, pause and review that idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Roots as unknown numbers
Aap treat the two solutions of a quadratic simply as two numbers \(r\) and \(s\). No formula for them is required yet; you only record that both satisfy the equation.

Example: suppose \(x^2 - 5x + 6 = 0\). The numbers 2 and 3 are roots because each makes the left side zero.

Formally, if \(r\) and \(s\) satisfy \(ar^2 + br + c = 0\) and \(as^2 + bs + c = 0\), then both are roots.

> [!WARNING]
> If you assume the polynomial has exactly two roots but forget multiplicity, later sum and product counts will be off by one.

### Step 2 — Write the monic polynomial
Divide the original equation by \(a\) so the leading coefficient becomes 1. The equation is now \(x^2 + (b/a)x + (c/a) = 0\).

This step removes the extra parameter and lets the constant term equal the product directly.

### Step 3 — Factor using the roots
Because \(r\) and \(s\) are roots, the monic polynomial factors as \((x - r)(x - s)\).

Expanding the right-hand side yields \(x^2 - (r + s)x + rs\).

### Step 4 — Equate coefficients
Compare the expanded form with the monic standard form:
\[
x^2 - (r + s)x + rs \equiv x^2 + \frac{b}{a}x + \frac{c}{a}.
\]
Matching the \(x\) coefficient immediately gives \(r + s = -\frac{b}{a}\). Matching the constant term gives \(rs = \frac{c}{a}\).

### Step 5 — State the two Vieta relations
For \(ax^2 + bx + c = 0\) with roots \(r_1, r_2\),
\[
r_1 + r_2 = -\frac{b}{a}, \qquad r_1 r_2 = \frac{c}{a}.
\]

### Step 6 — Verify consistency with the quadratic formula
Substitute the familiar expressions
\[
r_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]
into the sum and product; both identities hold identically, confirming the coefficient-matching argument.

## 5. Worked examples — har step show karo

**Example 1 — Sum and product for monic quadratic**  
*Given:* \(x^2 - 7x + 12 = 0\)  
*Find:* sum and product of roots.  
Step 1: identify \(a = 1\), \(b = -7\), \(c = 12\).  
Step 2: apply formulas directly.  
Sum = \(-b/a = 7\).  
Product = \(c/a = 12\).  
**7 and 12**  
*Reflection:* The equation is already monic, so no division is needed; the numbers are exactly the elementary symmetric sums.

**Example 2 — Non-monic coefficient**  
*Given:* \(2x^2 - 10x + 12 = 0\)  
*Find:* sum and product.  
Divide by 2 to reach monic form: \(x^2 - 5x + 6 = 0\).  
Sum = 5, product = 6.  
Alternatively, without dividing: sum = \(-(-10)/2 = 5\), product = \(12/2 = 6\).  
**5 and 6**  
*Reflection:* Scaling the leading coefficient changes both numerator and denominator equally, preserving the ratios.

**Example 3 — Roots with fractions**  
*Given:* \(x^2 - \frac{5}{3}x + \frac{2}{3} = 0\)  
*Find:* sum and product.  
Sum = \(\frac{5}{3}\), product = \(\frac{2}{3}\).  
**\(\frac{5}{3}\) and \(\frac{2}{3}\)**  
*Reflection:* Vieta works over rationals; no need to clear denominators first.

**Example 4 — Using sum and product to form the equation**  
*Given:* roots 4 and \(-3\).  
*Find:* monic quadratic.  
Sum = \(4 + (-3) = 1\), product = \(4 \cdot (-3) = -12\).  
Equation: \(x^2 - (sum)x + product = x^2 - x - 12 = 0\).  
**\(x^2 - x - 12 = 0\)**  
*Reflection:* The construction is the reverse of coefficient matching and is useful when roots are given by a geometry or physics condition.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the minus sign in sum  | Students recall “sum = b/a” without sign    | Always write the monic form first            |
| Applying formulas to non-monic equation without dividing | Habit of plugging numbers directly          | Divide by a or scale numerator and denominator together |
| Assuming two distinct real roots  | Overlooking repeated or complex roots       | Check discriminant before interpreting signs |
| Confusing sum with product when coefficients are swapped | Symmetric appearance of formulas            | Label sum as “linear” and product as “constant” |
| Using Vieta on cubic without third symmetric sum | Extending quadratic rule mechanically       | Write all three relations for degree 3       |
| Ignoring leading-coefficient sign when roots are negative | Sign errors propagate into product          | Keep a explicit until final simplification   |
| Treating constant term as product when a ≠ 1 | Missing the denominator                     | Always quote the normalised form             |

## 7. The textbook-precise statement
Let \(f(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_0\) be a polynomial of degree \(n\) with leading coefficient \(a_n \neq 0\) over a field \(F\). Suppose the roots \(r_1, r_2, \dots, r_n\) (counted with multiplicity) lie in some extension field. Then the coefficients satisfy
\[
a_{n-k} = a_n (-1)^k e_k(r_1,\dots,r_n)
\]
for each \(k = 0,1,\dots,n\), where \(e_k\) denotes the \(k\)-th elementary symmetric sum. In particular, for the quadratic case \(n=2\),
\[
r_1 + r_2 = -a_1/a_2, \qquad r_1 r_2 = a_0/a_2.
\]
This is stated precisely in Hall & Knight, *Higher Algebra*, 4th ed., §85.

## 8. Visual — diagram or schematic
```
          y
          ^
          |
      12 -+               • (root at x=3)
          |              /
      6  -+             /
          |            /
      0  -+-----------+-----------+--> x
          |    -2     0     2     4
          |   (root at x=2)
```
The parabola touches the x-axis at the two roots. The vertex x-coordinate is exactly half the sum of roots; the y-intercept equals the product scaled by the leading coefficient.

## 9. The memory technique
1. **The hook** — Picture two children on a seesaw whose weights are the roots; the balance point sits at “minus b over a”, and the product of weights sits under the constant term.  
2. **What to overlearn** — The two-line statement: “sum = −b/a, product = c/a” for monic quadratics, plus the sign pattern “− +”.  
3. **Spaced-repetition schedule** — Review the two formulas after 1 day, again after 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Expand \((x-r)(x-s)\) and match coefficients; the derivation itself is only four lines.

## 10. What this unlocks
Vieta's formulas open the door to symmetric-polynomial theory, resultants, and discriminant calculations. They are the direct prerequisite for:

- Studying the relations between roots and coefficients in cubic and quartic equations.
- Forming reciprocal equations and substitution techniques in Hall & Knight.
- Constructing minimal polynomials in field extensions.
- Applying Newton-Girard identities that convert power sums into elementary symmetric sums.
- Solving optimisation problems where only sum or product appears in the constraint.

## 11. Self-check — five questions, no answers
1. For \(3x^2 + 5x - 2 = 0\), compute the sum and product of the roots without solving.  
2. If the sum of roots is 4 and the product is −5, write the monic quadratic equation.  
3. A quadratic has roots \(2 + \sqrt{3}\) and \(2 - \sqrt{3}\). What is the constant term of its monic equation?  
4. Explain why the product of roots changes sign when the constant term changes sign, but the sum does not.  
5. Suppose a quadratic equation is known to have one root equal to 3; use Vieta to find the other root when the sum of roots is given as 7.