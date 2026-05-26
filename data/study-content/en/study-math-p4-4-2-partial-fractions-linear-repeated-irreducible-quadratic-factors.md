## 1. The one-sentence answer
**Partial fraction decomposition rewrites a proper rational function as a sum of simpler fractions whose denominators are the irreducible factors of the original denominator.**

A rational function is a ratio of two polynomials. When the denominator factors into linear or quadratic pieces, the original fraction can be expressed as a linear combination of fractions built from those pieces. Each simpler fraction integrates by elementary rules such as logarithms or arctangents.

The method works only after the fraction is proper (degree of numerator strictly less than degree of denominator) and after the denominator has been factored completely over the reals. The coefficients in the decomposition are found by clearing the common denominator and equating powers of the variable.

> [!NOTE]
> The decisive insight is that every rational function possesses an antiderivative expressible in elementary functions precisely because its partial-fraction form reduces integration to the two cases already solved: \(\int\frac{1}{x-a}\,dx\) and \(\int\frac{x+b}{x^2+px+q}\,dx\).

## 2. Why this matters — concrete and current
SpaceX uses partial-fraction techniques inside the Laplace-transform inversion routines that convert transfer functions of Falcon 9 attitude-control loops into explicit time-domain responses for thrust-vectoring commands.

Semiconductor foundries such as TSMC embed the same decomposition when they analytically integrate rational spectral densities that arise in compact transistor models; the resulting closed-form expressions feed directly into SPICE simulators used for 3 nm node verification.

Particle physicists at CERN apply partial fractions to reduce the rational integrands that appear in next-to-leading-order QCD cross-section calculations; the simplified integrals are then evaluated numerically inside the MadGraph5_aMC@NLO framework.

Machine-learning libraries such as PyTorch rely on analytic gradients of loss functions that contain rational activations; automatic-differentiation engines internally exploit partial-fraction forms to obtain exact expressions for certain low-dimensional subproblems before falling back to numerical methods.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Polynomial long division       | Converts improper fractions into a polynomial plus proper fraction |
| Complete factorization of polynomials over the reals | Supplies the linear and irreducible quadratic factors that determine the form of each partial fraction |
| Equating coefficients of polynomials | Produces the linear system solved for the unknown numerators |
| Basic antiderivatives of \(\frac{1}{x-a}\) and \(\frac{Ax+B}{x^2+px+q}\) | The explicit goal of the decomposition |

## 4. Building the idea — from intuition to formalism

### Step 1 — Factor the denominator completely
Any rational function whose denominator is a product of distinct linear and quadratic polynomials can be decomposed.  
Example: \(\frac{3x+2}{(x-1)(x+2)}\) already shows the two linear factors.  
Formally, if \(D(x)=\prod(x-r_i)^{m_i}\prod(q_j(x))^{n_j}\) where each \(q_j\) is irreducible quadratic, then the decomposition exists and is unique up to reordering.

> [!WARNING]
> Omitting a repeated factor or failing to confirm irreducibility of a quadratic produces an incorrect template and an inconsistent coefficient system.

### Step 2 — Write the partial-fraction template
For each linear factor \((x-r)^m\) introduce the sum \(\frac{A_1}{x-r}+\cdots+\frac{A_m}{(x-r)^m}\).  
For each irreducible quadratic \(q(x)^n\) introduce \(\frac{B_1x+C_1}{q(x)}+\cdots+\frac{B_nx+C_n}{q(x)^n}\).  
Example: \(\frac{3x+2}{(x-1)^2(x^2+1)}\) yields the template \(\frac{A}{x-1}+\frac{B}{(x-1)^2}+\frac{Cx+D}{x^2+1}\).

### Step 3 — Clear the denominator
Multiply both sides by the original denominator \(D(x)\). All denominators disappear and a polynomial identity remains.  
This step converts the problem into ordinary polynomial arithmetic.

### Step 4 — Expand and collect like powers
Expand the right-hand side and gather coefficients of corresponding powers of \(x\).  
The left-hand side is already a polynomial of known degree; equate coefficients on both sides to obtain a linear system.

### Step 5 — Solve the linear system
The number of unknowns equals the number of unknown coefficients, which equals \(\deg D(x)\).  
The system is always solvable when the template matches the factorization; Gaussian elimination or substitution yields the constants.

### Step 6 — Reassemble and integrate term by term
Substitute the constants back, producing a sum of elementary fractions. Each term integrates by the formulas already known for linear and quadratic denominators.

## 5. Worked examples — every step shown

**Example 1 — Distinct linear factors**  
*Given:* \(\frac{5x+7}{(x-2)(x+3)}\)  
*Find:* its partial-fraction decomposition.  

Multiply through by the denominator:  
\[5x+7=A(x+3)+B(x-2).\]  
*Why:* clears the common denominator, producing a polynomial identity.  

Substitute \(x=2\):  
\[17= A(5)\implies A=\frac{17}{5}.\]  
*Why:* isolates the coefficient belonging to the factor that vanishes at that root.  

Substitute \(x=-3\):  
\[-8=B(-5)\implies B=\frac{8}{5}.\]  
*Why:* same isolation for the second coefficient.  

Thus  
\[\frac{5x+7}{(x-2)(x+3)}=\frac{17/5}{x-2}+\frac{8/5}{x+3}.\]  
**Final answer**  
\[\frac{17/5}{x-2}+\frac{8/5}{x+3}\]  

*Reflection:* The cover-up method works only for distinct linear factors; any repetition forces the full coefficient-matching route.

**Example 2 — Repeated linear factor**  
*Given:* \(\frac{x+1}{(x-1)^2}\)  
*Find:* decomposition.  

Template: \(\frac{A}{x-1}+\frac{B}{(x-1)^2}\).  
Clear denominator:  
\[x+1=A(x-1)+B.\]  
*Why:* removes both powers at once.  

Set \(x=1\):  
\[2=B.\]  
Differentiate both sides and set \(x=1\):  
\[1=A.\]  
*Why:* differentiation lowers the multiplicity and isolates the next coefficient.  

**Final answer**  
\[\frac{1}{x-1}+\frac{2}{(x-1)^2}\]  

*Reflection:* Repeated factors generate higher-order poles; each differentiation recovers one more constant.

**Example 3 — Irreducible quadratic**  
*Given:* \(\frac{2x+3}{x^2+1}\)  
*Find:* decomposition (already irreducible).  

Template: \(\frac{Ax+B}{x^2+1}\).  
Clear:  
\[2x+3=Ax+B.\]  
Equate coefficients:  
\(A=2\), \(B=3\).  

**Final answer**  
\[\frac{2x+3}{x^2+1}\]  

*Reflection:* No further splitting occurs; the quadratic term is already in the form needed for arctangent integration after completing the square if necessary.

**Example 4 — Mixed factors**  
*Given:* \(\frac{4x^2+x-1}{(x-1)(x^2+4)}\)  
*Find:* decomposition.  

Template: \(\frac{A}{x-1}+\frac{Bx+C}{x^2+4}\).  
Clear:  
\[4x^2+x-1=A(x^2+4)+(Bx+C)(x-1).\]  
Expand and equate:  
\(x^2\): \(A+B=4\),  
\(x\): \(-B+C=1\),  
const: \(4A-C=-1\).  
Solution: \(A=3\), \(B=1\), \(C=2\).  

**Final answer**  
\[\frac{3}{x-1}+\frac{x+2}{x^2+4}\]  

*Reflection:* The system size equals the degree of the denominator; systematic row reduction prevents arithmetic slips.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using a linear numerator for a repeated linear factor | Students copy the distinct-factor template by rote | Count the multiplicity and add one term for each power |
| Treating a reducible quadratic as irreducible | Failure to check the discriminant before writing the template | Always compute \(b^2-4ac\); if it is a perfect square, factor into linears first |
| Forgetting to perform polynomial division on improper fractions | Degree of numerator not compared with denominator | Apply the degree test before any decomposition |
| Equating coefficients without expanding fully | Algebraic laziness | Expand every product and collect every power explicitly |
| Solving the system with a singular matrix | Duplicate or omitted factors make equations dependent | Verify that the factorization is complete and the template has exactly \(\deg D\) unknowns |
| Sign errors when substituting roots | Arithmetic slips under time pressure | Write the cleared equation before substituting and double-check each arithmetic line |
| Integrating the quadratic term without completing the square | Overlooking the arctangent form | Rewrite the numerator as a multiple of the derivative plus a constant remainder before splitting the integral |

## 7. The textbook-precise statement
Let \(f(x)=P(x)/Q(x)\) be a rational function where \(\deg P<\deg Q\) and \(Q\) factors as \(Q(x)=\prod_{i=1}^r(x-r_i)^{m_i}\prod_{j=1}^s q_j(x)^{n_j}\) with each \(q_j\) irreducible quadratic. Then there exist unique real constants \(A_{i,k}\) and \(B_{j,\ell},C_{j,\ell}\) such that
\[
\frac{P(x)}{Q(x)}=\sum_{i=1}^r\sum_{k=1}^{m_i}\frac{A_{i,k}}{(x-r_i)^k}+\sum_{j=1}^s\sum_{\ell=1}^{n_j}\frac{B_{j,\ell}x+C_{j,\ell}}{q_j(x)^\ell}.
\]
(Stewart, *Calculus*, 9e, §7.4, Theorem 1.)

## 8. Visual — diagram or schematic
```text
Rational function P/Q (deg P < deg Q)
          │
          ▼
Factor Q completely → linear powers + irreducible quadratic powers
          │
          ▼
Write template:  Σ A_k/(x-r)^k   +   Σ (Bx+C)/q(x)^ℓ
          │
          ▼
Multiply by Q(x) → polynomial identity
          │
          ▼
Expand & equate coefficients → linear system (size = deg Q)
          │
          ▼
Solve for all constants
          │
          ▼
Integrate term-by-term
```

## 9. The memory technique

**The hook**  
Picture the denominator as a building whose floors are the irreducible factors; each floor gets its own “tenant” fraction whose numerator is a simple polynomial of degree one less than the floor height.

**What to overlearn**  
1. The exact template for a linear factor of multiplicity \(m\) and for a quadratic of multiplicity \(n\).  
2. The fact that the total number of unknown coefficients equals \(\deg Q\).  
3. The cover-up shortcut works exclusively for distinct linear roots.

**Spaced-repetition schedule**  
Review the template table after 1 day, solve two mixed examples after 3 days, decompose an improper fraction after 7 days, teach the method to someone else after 16 days, and reconstruct the full theorem from the factorization step after 35 days.

**First-principles fallback**  
If the templates are forgotten, begin again from the statement that the vector space of rational functions with denominator dividing \(Q\) has dimension exactly \(\deg Q\); the partial-fraction basis is simply the standard basis for that space.

## 10. What this unlocks
Mastery of partial fractions converts every rational integrand into a finite combination of logarithms and arctangents, thereby completing the analytic integration of all rational functions.

- Laplace-transform inversion for linear ODEs  
- Residue calculus at simple and higher-order poles  
- Exact antiderivatives required by arc-length and surface-area integrals  
- Closed-form solutions in control-theory transfer functions  
- Rational-function quadrature rules used in finite-element stiffness matrices  

## 11. Self-check — five questions, no answers
1. Decompose \(\frac{3x-1}{(x+1)(x-2)(x-2)}\) and integrate the result from 0 to 1.  
2. Without solving for coefficients, write the partial-fraction template for \(\frac{x^3+1}{(x^2+2)^2(x-3)^3}\).  
3. Explain why the decomposition fails if the original fraction is improper and polynomial division is omitted.  
4. Given that the coefficient of \(x\) in the numerator of a quadratic term must be chosen so that one summand is a multiple of the derivative of the denominator, derive the splitting used for \(\int\frac{ax+b}{x^2+px+q}\,dx\).  
5. Construct a rational function whose partial-fraction decomposition contains both a repeated linear factor of order 3 and an irreducible quadratic of order 2; verify that the total number of unknown constants equals the degree of the denominator.