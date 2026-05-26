## 1. The one-sentence answer
**Partial fractions is the systematic decomposition of a proper rational function into a sum of simpler fractions whose denominators are the irreducible factors of the original denominator, allowing direct antiderivatives via standard logarithmic and arctangent forms.**

Aap ek rational function \( \frac{P(x)}{Q(x)} \) ko dekh rahe hain jahaan degree of \( P \) strictly less than degree of \( Q \). Jab \( Q(x) \) ko linear aur quadratic irreducible factors mein factorise karte hain, toh har factor ke hisaab se alag-alag partial fractions likhte hain. Yeh decomposition integration ko elementary functions tak le jaati hai.

Yeh technique tab kaam karti hai jab denominator ke roots real ya complex conjugate pairs mein aate hain. Linear factors se logarithms milte hain, repeated linear factors se negative powers, aur irreducible quadratics se arctangents.

> [!NOTE]
> The single most important insight is that the method works because the partial-fraction form is an identity: once the coefficients are found correctly, both sides are equal for all \( x \) except at the poles, so their integrals must also be equal wherever both are defined.

## 2. Why this matters — concrete and current
In aerospace trajectory optimisation, SpaceX’s guidance algorithms integrate rational expressions that arise from thrust-to-mass ratios; partial-fraction decomposition converts these into closed-form velocity and position updates that run in microseconds on flight computers.

Semiconductor process modelling at TSMC uses partial fractions to integrate carrier-density equations whose denominators contain repeated linear factors coming from Shockley–Read–Hall recombination; the resulting analytic expressions feed directly into TCAD simulators.

In machine-learning hardware verification, Google’s TPU team employs partial-fraction techniques when analysing the Laplace transforms of piecewise-linear activation schedules; the decomposed terms let them compute exact overflow probabilities instead of relying on Monte-Carlo sampling.

Control-theory papers on quadrotor attitude control (IEEE Transactions on Robotics, 2022) repeatedly decompose transfer functions containing irreducible quadratic factors so that the inverse Laplace transform yields damped-oscillator solutions used for gain scheduling.

Fundamental physics calculations at CERN’s beam-dynamics group factorise rational functions that appear in synchrotron-radiation integrals; the partial-fraction step reduces weeks of numerical quadrature to a few lines of symbolic output.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Polynomial factorisation over reals | Determines the exact shape of every partial-fraction term |
| Degree comparison              | Guarantees the fraction is proper before decomposition    |
| Method of equating coefficients| Solves the linear system for the unknown numerators       |
| Basic antiderivatives          | \( \int \frac{1}{x-a}\,dx = \ln|x-a| \), \( \int \frac{1}{x^2+b^2}\,dx = \frac1b\arctan\frac x b \) |

If any row is unfamiliar, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Factor the denominator completely
Aap pehle \( Q(x) \) ko linear aur irreducible quadratic factors mein todte hain.  
Concrete example: \( Q(x) = x^3 - x = x(x-1)(x+1) \).  
Formal statement: every polynomial with real coefficients factors uniquely (up to order) into linear factors and quadratic factors with negative discriminant.  
> [!WARNING]
> Missing a repeated root here will produce an under-determined system later; always check the multiplicity by taking derivatives or using synthetic division.

### Step 2 — Write the partial-fraction template for distinct linear factors
For each distinct linear factor \( (x - r) \) the template contains a single constant term \( \frac{A}{x-r} \).  
Example: \( \frac{1}{x(x-1)} = \frac{A}{x} + \frac{B}{x-1} \).  
Formal: \( \frac{P(x)}{(x-r_1)\cdots(x-r_k)} = \sum_i \frac{A_i}{x-r_i} \).

### Step 3 — Extend the template to repeated linear factors
A factor \( (x-r)^m \) requires \( m \) terms: \( \frac{A_1}{x-r} + \frac{A_2}{(x-r)^2} + \cdots + \frac{A_m}{(x-r)^m} \).  
Example: \( \frac{1}{(x-2)^3} \) expands to three terms with powers 1, 2 and 3 in the denominator.

### Step 4 — Add terms for each irreducible quadratic
An irreducible quadratic \( x^2 + px + q \) contributes a linear numerator: \( \frac{Bx+C}{x^2+px+q} \).  
Repeated quadratics follow the same pattern as repeated linears but with linear numerators of increasing degree.

### Step 5 — Clear the denominator and equate coefficients
Multiply both sides by \( Q(x) \) to obtain the polynomial identity \( P(x) = \) sum of numerator polynomials. Equate coefficients of corresponding powers of \( x \) to produce a linear system.

### Step 6 — Solve the linear system and verify
Use substitution at roots or matrix methods; substitute a test point outside the roots to confirm numerical identity.

### Step 7 — Integrate term by term
Each term integrates to a logarithm, negative power, or arctangent; assemble the antiderivative with a single constant of integration.

## 5. Worked examples — har step show karo

**Example 1 — Distinct linear factors**  
*Given:* \( \frac{3x+2}{x(x+1)} \)  
*Find:* \( \int \frac{3x+2}{x(x+1)}\,dx \)  
Multiply by \( x(x+1) \): \( 3x+2 = A(x+1) + Bx \).  
Set \( x=0 \): \( 2 = A \).  
Set \( x=-1 \): \( -1 = -B \Rightarrow B=1 \).  
*Why:* substitution at roots isolates each coefficient instantly.  
Integral: \( 2\ln|x| + \ln|x+1| + C \).  
**Final answer**  
\( 2\ln|x| + \ln|x+1| + C \)  

*Reflection:* the example is simple because all factors are distinct; the same substitution trick fails when multiplicity > 1.

**Example 2 — Repeated linear factor**  
*Given:* \( \frac{1}{(x-1)^2(x+2)} \)  
*Find:* its partial-fraction decomposition.  
Template: \( \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{x+2} \).  
Clear denominator: \( 1 = A(x-1)(x+2) + B(x+2) + C(x-1)^2 \).  
\( x=1 \): \( 1 = 3B \Rightarrow B=\frac13 \).  
\( x=-2 \): \( 1 = 9C \Rightarrow C=\frac19 \).  
Expand and equate \( x^2 \) coefficient: \( A + C = 0 \Rightarrow A=-\frac19 \).  
**Final answer**  
\( -\frac19\frac{1}{x-1} + \frac13\frac{1}{(x-1)^2} + \frac19\frac{1}{x+2} \)

*Reflection:* repeated factors force us to keep extra unknown constants; the extra equation comes from the highest power term.

**Example 3 — Irreducible quadratic**  
*Given:* \( \frac{x^2+1}{x(x^2+1)} \)  
*Find:* decomposition.  
Template: \( \frac{A}{x} + \frac{Bx+C}{x^2+1} \).  
Clear: \( x^2+1 = A(x^2+1) + Bx^2 + Cx \).  
Equate: \( x^2 \): \( 1 = A + B \), \( x \): \( 0 = C \), const: \( 1 = A \).  
Thus \( A=1 \), \( B=0 \), \( C=0 \).  
**Final answer**  
\( \frac{1}{x} \)

*Reflection:* the numerator degree already matched the quadratic factor, so the linear numerator vanished.

**Example 4 — Mixed repeated quadratic**  
*Given:* \( \frac{x}{(x^2+1)^2} \)  
*Find:* \( \int \frac{x}{(x^2+1)^2}\,dx \).  
Template: \( \frac{Ax+B}{x^2+1} + \frac{Cx+D}{(x^2+1)^2} \).  
Clear and equate: \( A=0 \), \( B=0 \), \( C=1 \), \( D=0 \).  
Integral of the surviving term is \( -\frac12\frac{1}{x^2+1} \).  
**Final answer**  
\( -\frac12\frac{1}{x^2+1} + C \)

*Reflection:* symmetry (odd numerator over even denominator) forced many coefficients to zero.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the linear numerator for quadratics | Students copy the linear-factor template    | Always write \( Bx+C \) for every irreducible quadratic |
| Treating repeated factors as distinct | Overlooking multiplicity in factorisation   | Compute gcd with derivative before writing template |
| Assuming the fraction is proper   | Degree of numerator ≥ denominator           | Perform polynomial division first            |
| Using only substitution when multiplicity > 1 | Substitution alone leaves the system under-determined | Combine substitution with coefficient equating |
| Sign errors in arctangent integrals | Forgetting the chain-rule factor            | Always differentiate the answer as a check   |

## 7. The textbook-precise statement
Let \( f(x) = \frac{P(x)}{Q(x)} \) be a proper rational function where \( P,Q\in\mathbb{R}[x] \), \( \deg P < \deg Q \), and \( Q \) factors as a product of powers of distinct monic linear polynomials and distinct monic irreducible quadratics. Then there exist unique real constants \( A_{i,j} \) and \( B_{k,\ell},C_{k,\ell} \) such that
\[
f(x)=\sum_i\sum_{j=1}^{m_i}\frac{A_{i,j}}{(x-r_i)^j}+\sum_k\sum_{\ell=1}^{n_k}\frac{B_{k,\ell}x+C_{k,\ell}}{(x^2+p_kx+q_k)^\ell}.
\]
Integration of each term on the right yields elementary functions (Stewart, *Calculus*, 9e, §7.4).

## 8. Visual — diagram or schematic
```text
Q(x) = (x-3)^2 (x^2+4)
          │         │
          ▼         ▼
   repeated linear  irreducible quadratic
          │         │
   A/(x-3) + B/(x-3)^2   +   (Cx+D)/(x^2+4)
```

## 9. The memory technique
1. **The hook** — picture each linear factor as a “pole” on the number line and each quadratic as a “cloud” floating above the axis; the partial-fraction terms are the separate “forces” coming from each pole or cloud.
2. **What to overlearn** — the three canonical templates: single linear, repeated linear up to power \( m \), and irreducible quadratic with linear numerator.
3. **Spaced-repetition schedule** — review the templates after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if the template is forgotten, start from the requirement that the sum must reproduce the original numerator after clearing the common denominator; equate coefficients of the resulting polynomial identity.

## 10. What this unlocks
Mastery of partial fractions immediately lets you integrate every rational function that appears in Laplace-transform tables, Fourier analysis, and residue calculus.  
- Next topics that rest on this: integration of rational functions of sine and cosine via the Weierstrass substitution, contour integration in complex analysis, and inverse Laplace transforms in control theory.

## 11. Self-check — five questions, no answers
1. Decompose \( \frac{2x+3}{(x-1)(x+2)} \) and integrate.
2. Why must the numerator of a quadratic-denominator term be linear rather than constant?
3. Find the partial-fraction decomposition of \( \frac{x^3}{(x-1)^3} \); note that the fraction is improper.
4. A student writes \( \frac{1}{(x-2)^2(x+3)} = \frac{A}{x-2} + \frac{B}{x+3} \). Which coefficient will be impossible to determine and why?
5. Differentiate the antiderivative obtained in Example 4 and verify that the original integrand is recovered.