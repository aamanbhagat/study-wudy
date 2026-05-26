## 1. The one-sentence answer
**A quadratic equation with given roots \(\alpha\) and \(\beta\) is formed by writing \((x - \alpha)(x - \beta) = 0\) and expanding it to the monic form \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\).**

Iska matlab yeh hai ki agar aapko dono roots pehle se pata hain, to aap seedha un roots ko use karke equation ko construct kar sakte hain bina kisi trial-and-error ke. Har quadratic ka graph ek parabola hota hai aur uske x-intercepts exactly wohi roots hote hain, isliye equation ko roots se wapas build karna ek direct reversal process hai.

Aap is technique ko tab use karte hain jab problem mein roots di gayi hon aur aapko actual equation chahiye, jaise competitive exams mein ya physics simulations mein jahaan motion ke endpoints known hote hain.

> [!NOTE]
> The single most important insight is that the coefficients of the quadratic are completely determined by the elementary symmetric sums of the roots: their sum controls the linear term and their product controls the constant term.

## 2. Why this matters — concrete and current
In aerospace trajectory design at NASA’s Jet Propulsion Laboratory, engineers form quadratics from known intercept times to solve for launch windows in orbital rendezvous problems.

In semiconductor device modelling at TSMC, device physicists construct quadratic equations whose roots represent the two bias points where a transistor’s transconductance crosses a design threshold, allowing rapid Monte-Carlo yield estimation.

In modern portfolio theory at Renaissance Technologies, risk models repeatedly build quadratics whose roots are the two volatility regimes of an asset; the sum and product then feed directly into mean-variance optimisation routines.

In fundamental physics, the characteristic equation for a damped harmonic oscillator at CERN’s beam-stabilisation systems is formed from the two known decay rates (roots) so that the feedback coefficients can be calculated in closed form.

In machine-learning regularisation at DeepMind, the loss surface along a single weight direction is approximated by a quadratic whose roots indicate the points where the regulariser begins to dominate; these roots are used to set adaptive learning-rate schedules.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Variables and constants  | Roots are specific values substituted into the variable   |
| Distributive law         | Expanding \((x - \alpha)(x - \beta)\) requires it         |
| Addition and multiplication of signed numbers | Sum \(\alpha + \beta\) and product \(\alpha\beta\) appear directly as coefficients |
| Monic polynomial form    | Standardised leading coefficient of 1 simplifies comparison |

Agar aap inme se kisi bhi concept ko shaky feel kar rahe hain, to pause karke unhe pehle revise kar lijiye.

## 4. Building the idea — from intuition to formalism

### Step 1 — Roots are the values that make the expression zero
Aap already jaante hain ki ek quadratic \(ax^2 + bx + c\) tab zero hota hai jab \(x\) uske roots ke barabar ho. Iska seedha matlab yeh hai ki \((x - \alpha)\) aur \((x - \beta)\) dono factors hain.

Example: roots 3 aur 5 ke liye factors \((x-3)\) aur \((x-5)\) hain.

Formal statement: Agar \(\alpha\) aur \(\beta\) roots hain to polynomial \((x - \alpha)(x - \beta)\) zero hota hai exactly unhi values par.

> [!WARNING]
> Agar aap sign galat likh dete hain (jaise \(x + \alpha\)) to roots sign flip ho jaayenge aur poora equation galat ban jaayega.

### Step 2 — Expand the product using distributive law
\((x - \alpha)(x - \beta)\) ko expand karne par \(x\cdot x + x\cdot(-\beta) + (-\alpha)\cdot x + (-\alpha)(-\beta)\) milta hai.

Example: numbers 3 aur 5 ke saath: \((x-3)(x-5) = x^2 - 5x - 3x + 15 = x^2 - 8x + 15\).

Formal statement: \((x - \alpha)(x - \beta) = x^2 - (\alpha + \beta)x + \alpha\beta\).

> [!WARNING]
> Students aksar \(\alpha + \beta\) ko subtract karna bhool jaate hain aur sirf product likh dete hain.

### Step 3 — Identify sum and product as coefficients
Expanded equation mein coefficient of \(x\) negative sum hota hai aur constant term product hota hai. Yeh identity har quadratic ke liye true hai.

Formal statement: For \(x^2 + px + q = 0\), sum of roots = \(-p\), product = \(q\).

### Step 4 — Scale if leading coefficient is not 1
Agar aapko \(a(x - \alpha)(x - \beta) = 0\) chahiye to poore equation ko \(a\) se multiply kar do.

Example: roots 2, 3 aur leading coefficient 4 → \(4(x-2)(x-3) = 4x^2 - 20x + 24\).

### Step 5 — Write the general monic quadratic with given roots
Textbook-grade form: The unique monic quadratic having roots \(\alpha, \beta\) is \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\).

## 5. Worked examples — har step show karo

**Example 1 — Simple integer roots**
- *Given:* Roots 4 and 7.
- *Find:* Monic quadratic equation.
- Step 1: Write factors \((x-4)(x-7)\). *Why:* Roots directly give linear factors with minus sign.
- Step 2: Expand: \(x^2 - 7x - 4x + 28 = x^2 - 11x + 28\). *Why:* Distributive law collects like terms.
- Final answer:  
  **\(x^2 - 11x + 28 = 0\)**
- *Reflection:* Easy numbers helped verify sum and product instantly; same logic scales to any numbers.

**Example 2 — One negative root**
- *Given:* Roots −2 and 5.
- *Find:* Monic quadratic.
- Step 1: \((x + 2)(x - 5)\). *Why:* Minus a negative becomes plus.
- Step 2: \(x^2 - 5x + 2x - 10 = x^2 - 3x - 10\). *Why:* Combine coefficients of \(x\) carefully.
- Final answer:  
  **\(x^2 - 3x - 10 = 0\)**
- *Reflection:* Sign handling is the only extra care needed; product is automatically negative.

**Example 3 — Non-monic leading coefficient**
- *Given:* Roots 1/2 and 3, leading coefficient 2.
- *Find:* Quadratic.
- Step 1: Start with monic form \(x^2 - (7/2)x + 3/2\).
- Step 2: Multiply by 2: \(2x^2 - 7x + 3\). *Why:* Each coefficient scales uniformly.
- Final answer:  
  **\(2x^2 - 7x + 3 = 0\)**
- *Reflection:* Always form monic first, then scale; avoids fraction mistakes.

**Example 4 — Roots given as expressions**
- *Given:* Roots \(2 + \sqrt{3}\) and \(2 - \sqrt{3}\).
- *Find:* Monic quadratic.
- Step 1: Sum = 4, product = \((2)^2 - (\sqrt{3})^2 = 1\). *Why:* Difference of squares simplifies product.
- Step 2: Equation \(x^2 - 4x + 1 = 0\).
- Final answer:  
  **\(x^2 - 4x + 1 = 0\)**
- *Reflection:* Irrational roots often cancel nicely in sum and product, giving rational coefficients.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing \(x + \alpha\) instead of \(x - \alpha\) | Confusing sign when moving term            | Always write “x minus root” literally        |
| Forgetting the minus in front of sum | Expanding without distributing negative    | Check expanded form: middle term is −(sum)   |
| Using product as coefficient of x | Mixing sum and product roles               | Label clearly: sum → linear, product → constant |
| Not scaling when a ≠ 1            | Jumping straight to non-monic              | Build monic first, multiply at last step     |
| Arithmetic slip with negative roots | Two negatives give positive product        | Compute product separately and verify        |
| Assuming roots are always real    | Problem states complex roots               | Same formula works; keep i in coefficients   |
| Dropping the = 0                  | Treating expression as equation            | Always write full equation with = 0          |

## 7. The textbook-precise statement
Let \(\alpha, \beta \in \mathbb{C}\). The unique monic quadratic polynomial over \(\mathbb{C}\) having roots \(\alpha\) and \(\beta\) (counting multiplicity) is given by
\[
(x - \alpha)(x - \beta) = x^2 - (\alpha + \beta)x + \alpha\beta.
\]
Consequently the equation \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\) is satisfied if and only if \(x = \alpha\) or \(x = \beta\). (Herstein, *Topics in Algebra*, 2e, §3.2, Polynomial Rings.)

## 8. Visual — diagram or schematic
```
Number line with roots
          α               β
----------|---------------|----------
          0               0
Factors: (x - α)      (x - β)
Product:          quadratic = 0
```

The diagram shows two points α and β on the real line; each linear factor vanishes at one point, and their product vanishes exactly at those two locations.

## 9. The memory technique
1. **The hook** — Picture two friends α and β standing on a number line; the quadratic is the “rope” stretched between them whose length and midpoint give the coefficients.
2. **What to overlearn** — Equation \(x^2 - (\text{sum})x + (\text{product}) = 0\); always form monic first.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days with fresh root pairs each time.
4. **First-principles fallback** — If you forget the formula, start again from \((x - \alpha)(x - \beta)\) and expand using distributivity.

## 10. What this unlocks
Mastering root-to-equation construction lets you move freely between factored and standard form, which is required for solving quadratic inequalities, sketching parabolas, and applying Vieta’s formulas in higher-degree polynomials.

- Next topic: Vieta’s formulas for cubic and quartic equations
- Vertex form and completing the square
- Relationship between roots and discriminant
- Forming equations for reciprocal roots

## 11. Self-check — five questions, no answers
1. Form the monic quadratic whose roots are −3 and 8.
2. A quadratic \(2x^2 + kx + 10 = 0\) has roots whose product is 5; find k.
3. Roots are \(3 + 2i\) and \(3 - 2i\); write the equation and verify both roots satisfy it.
4. Explain why changing only the sign of the linear coefficient flips both roots.
5. Given roots \(\sqrt{2}\) and \(-\sqrt{2}\), a student writes \(x^2 + 2 = 0\); identify the mistake and correct it.