## 1. The one-sentence answer
**A quadratic equation with given roots \(\alpha\) and \(\beta\) is formed by expanding the product \((x - \alpha)(x - \beta) = 0\).**

This construction works because a quadratic polynomial of degree two has exactly two roots (counting multiplicity) in the complex numbers, so the monic polynomial whose zeros are precisely those roots must be the product of the corresponding linear factors. Expanding the product immediately yields the standard form \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\), in which the sum and product of the roots appear as coefficients.

The same idea extends at once to any field: once the roots are known, the polynomial is uniquely determined up to a nonzero scalar multiple. Scaling by a constant \(a\) produces the general equation \(a(x - \alpha)(x - \beta) = 0\), which is still satisfied exactly by \(\alpha\) and \(\beta\).

> [!NOTE]
> The sum and product of the roots are the only two symmetric functions needed; every other symmetric polynomial in the roots can be expressed in terms of these two.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX for Falcon 9 trajectory planning, the characteristic equation of a linearized two-body perturbation model is quadratic; its roots are the frequencies of small oscillations, and the polynomial is assembled directly from those frequencies so that the state-transition matrix can be written in closed form.

Semiconductor-device physicists at TSMC solve quadratic equations whose roots are the Fermi levels in a doped junction; the polynomial is formed from the known carrier concentrations so that the built-in potential appears as an explicit coefficient rather than a numerical root.

In the training loop of graph-convolutional networks for molecular property prediction (DeepMind’s AlphaFold-Multimer pipeline), the loss surface along certain symmetry axes reduces to a quadratic whose roots encode stable and unstable binding modes; the coefficients are obtained by substituting the known eigenvalues of the Hessian.

Control engineers at NASA’s Jet Propulsion Laboratory form quadratics from the desired closed-loop poles when tuning proportional-derivative compensators for reaction-wheel attitude control; the resulting gains are read off the expanded coefficients without iterative numerical solution.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Monic polynomial         | The leading coefficient is normalized to 1 before scaling |
| Linear factors           | Each root corresponds to a factor \((x - r)\)             |
| Expansion of products    | Required to obtain the coefficient form                   |
| Symmetric polynomials    | Sum and product are the elementary symmetric sums         |

## 4. Building the idea — from intuition to formalism

### Step 1 — A root forces a linear factor
If a number \(\alpha\) satisfies \(p(\alpha) = 0\), then \(x - \alpha\) divides \(p(x)\).  
Concrete example: \(p(x) = x^2 - 3x + 2\) vanishes at \(x = 1\), and \(x - 1\) divides it.  
Formal statement:  
\[
p(\alpha) = 0 \iff (x - \alpha) \text{ divides } p(x).
\]
> [!WARNING]
> Forgetting that the factor is exactly \((x - \alpha)\), not \((x + \alpha)\), reverses the sign of the root.

### Step 2 — Two roots give two linear factors
A quadratic therefore factors completely into two linear terms once both roots are known.  
Concrete example: roots 1 and 2 give factors \((x - 1)(x - 2)\).  
Formal statement: any monic quadratic with roots \(\alpha, \beta\) is identical to  
\[
(x - \alpha)(x - \beta).
\]

### Step 3 — Expand the product
Distribute:  
\[
(x - \alpha)(x - \beta) = x^2 - \beta x - \alpha x + \alpha\beta = x^2 - (\alpha + \beta)x + \alpha\beta.
\]
Formal statement:  
\[
(x - \alpha)(x - \beta) = x^2 - (\alpha + \beta)x + \alpha\beta.
\]

### Step 4 — Introduce a leading coefficient
Any nonzero scalar multiple still has the same roots:  
\[
a(x - \alpha)(x - \beta) = ax^2 - a(\alpha + \beta)x + a\alpha\beta.
\]

### Step 5 — Recover Vieta’s relations
Equating coefficients with the general monic quadratic \(x^2 + bx + c\) immediately produces the classical identities  
\[
\alpha + \beta = -b, \quad \alpha\beta = c.
\]

### Step 6 — State the formation rule
Given roots \(\alpha, \beta\) and leading coefficient \(a \neq 0\), the quadratic is  
\[
a(x - \alpha)(x - \beta) = 0.
\]

## 5. Worked examples — every step shown

**Example 1 — Distinct real roots**  
*Given:* roots 3 and −2.  
*Find:* monic quadratic.  
Step 1: write factors \((x - 3)(x + 2)\).  
*Why:* each root supplies one linear factor.  
Step 2: expand  
\[
x^2 + 2x - 3x - 6 = x^2 - x - 6.
\]  
*Why:* combine like terms after distribution.  
**Final answer**  
\[x^2 - x - 6 = 0\]

*Reflection:* The only arithmetic risk is a sign error when the second root is negative.

**Example 2 — Repeated root**  
*Given:* root 5 with multiplicity two.  
*Find:* monic quadratic.  
Step 1: factors \((x - 5)(x - 5)\).  
*Why:* multiplicity supplies identical factors.  
Step 2: expand  
\[
(x - 5)^2 = x^2 - 10x + 25.
\]  
**Final answer**  
\[x^2 - 10x + 25 = 0\]

*Reflection:* The sum is twice the root; the product is its square.

**Example 3 — Leading coefficient other than 1**  
*Given:* roots \(\frac12, -\frac13\), leading coefficient 6.  
*Find:* quadratic.  
Step 1: write \(6(x - \frac12)(x + \frac13)\).  
*Why:* scale after forming monic factors.  
Step 2: first multiply the binomials  
\[
(x - \frac12)(x + \frac13) = x^2 + (\frac13 - \frac12)x - \frac16 = x^2 - \frac16 x - \frac16.
\]  
Step 3: multiply by 6  
\[
6x^2 - x - 1.
\]  
**Final answer**  
\[6x^2 - x - 1 = 0\]

*Reflection:* Scaling distributes over every coefficient; the roots remain unchanged.

**Example 4 — Complex conjugate roots**  
*Given:* roots \(2 + i, 2 - i\).  
*Find:* monic quadratic with real coefficients.  
Step 1: form \((x - (2 + i))(x - (2 - i))\).  
*Why:* conjugates guarantee real coefficients.  
Step 2: expand  
\[
x^2 - 4x + (4 + 1) = x^2 - 4x + 5.
\]  
**Final answer**  
\[x^2 - 4x + 5 = 0\]

*Reflection:* The imaginary parts cancel automatically, leaving a real quadratic.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing \((x + \alpha)\) instead of \((x - \alpha)\) | Sign confusion with the definition of root  | Always test: substitute the root into the factor    |
| Forgetting to multiply by leading coefficient \(a\) | Treating every quadratic as monic           | Write \(a\) first, then expand                      |
| Adding instead of subtracting the sum | Mixing Vieta’s formulas with general form   | Remember the monic form has −(sum)                  |
| Treating repeated roots as distinct | Overlooking multiplicity                    | Write the factor twice when discriminant is zero    |
| Using product as coefficient of \(x\) | Swapping sum and product roles              | Keep sum with the linear term, product with constant|
| Assuming roots must be real       | Over-generalizing from early examples       | Allow complex numbers; coefficients may stay real   |
| Scaling only the constant term    | Incomplete distribution of \(a\)            | Multiply every term after expansion                 |

## 7. The textbook-precise statement
Let \(\mathbb{F}\) be a field and let \(\alpha, \beta \in \mathbb{F}\). For any \(a \in \mathbb{F}^\times\), the unique monic polynomial of degree two over \(\mathbb{F}\) having roots \(\alpha\) and \(\beta\) (counted with multiplicity) is \((x - \alpha)(x - \beta)\). Consequently the general quadratic equation with these roots is
\[
a(x - \alpha)(x - \beta) = 0.
\]
(Artin, *Algebra*, 2nd ed., §11.3, Prop. 11.3.2.)

## 8. Visual — diagram or schematic
```text
          (x - α)          (x - β)
              │                │
              ▼                ▼
          linear factor    linear factor
              │                │
              └──────┬─────────┘
                     │
                     ▼
              product of factors
                     │
                     ▼
          x² − (α+β)x + αβ     ← monic quadratic
                     │
                     ▼
               multiply by a
                     │
                     ▼
          a x² − a(α+β)x + a αβ   ← general quadratic
```

## 9. The memory technique

1. **The hook**  
   Picture two trees planted at positions \(\alpha\) and \(\beta\) on the number line; the quadratic is the “fence” whose posts sit exactly at those trees.

2. **What to overlearn**  
   - Monic form: \(x^2 - (\text{sum})x + (\text{product})\)  
   - General form: \(a(x - \alpha)(x - \beta)\)  
   - Vieta: sum = −b/a, product = c/a

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Re-derive by writing the two linear factors and expanding the product; the coefficients appear automatically.

## 10. What this unlocks
Mastery of root-to-coefficient conversion lets you move freely between factored and standard form, which is required for solving quadratics by factoring, applying Vieta’s formulas in optimization, and constructing characteristic polynomials in linear algebra.

- Next: quadratic formula derivation and discriminant analysis  
- Later: factoring higher-degree polynomials via rational-root theorem  
- Later still: symmetric polynomials and resultants in algebraic geometry

## 11. Self-check — five questions, no answers
1. Form the monic quadratic whose roots are −4 and 7.  
2. A quadratic \(2x^2 + px + 5 = 0\) has a double root; find that root and the value of \(p\).  
3. Given roots \(1 + \sqrt{2}\) and \(1 - \sqrt{2}\), write the monic quadratic with integer coefficients and verify both roots satisfy it.  
4. Explain why scaling the entire equation by any nonzero constant leaves the roots unchanged, yet scaling only the constant term generally changes them.  
5. Construct the quadratic with leading coefficient −1 whose roots are the reciprocals of the roots of \(x^2 - 3x + 2 = 0\).