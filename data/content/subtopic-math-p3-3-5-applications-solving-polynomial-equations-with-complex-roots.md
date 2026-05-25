## What it is
Solving polynomial equations with complex roots means finding all the values—both real and imaginary—that make a polynomial evaluate to zero. It relies heavily on the Fundamental Theorem of Algebra, which guarantees that a polynomial of degree $n$ has exactly $n$ roots in the complex plane, provided you count them with their multiplicities.

## Why it matters
In aerospace engineering and control theory, the roots of a system's characteristic polynomial dictate its physical stability. Complex roots indicate oscillatory behavior; if the real part of those complex roots is positive, your rocket's control system will amplify oscillations until the vehicle tears itself apart. In quantum mechanics and electrical engineering, complex roots allow us to solve differential equations modeling wave functions and RLC circuits by mapping differential operators to algebraic polynomials.

## When to study it
You must already possess absolute fluency in:
1. Polynomial long division and synthetic division.
2. The quadratic formula and completing the square.
3. Complex arithmetic (adding, multiplying, and finding the modulus/argument).
4. Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$) and De Moivre's Theorem.

If you cannot confidently find the roots of unity or divide a cubic by a linear binomial, stop and master those prerequisites first.

## How to study it (step by step)
1. **Review the Fundamental Theorem of Algebra:** Understand that the complex plane is "algebraically closed." Unlike the real number line, where $x^2 + 1 = 0$ is a dead end, the complex plane guarantees $n$ roots for an $n$-th degree polynomial.
2. **Master the Complex Conjugate Root Theorem:** Prove to yourself that if a polynomial has purely *real* coefficients, any complex roots must appear in conjugate pairs ($a \pm bi$). 
3. **Revisit the Quadratic Formula:** Solve quadratics with negative discriminants. Explicitly write the roots in the form $a \pm bi$.
4. **Factor by known complex roots:** Given a polynomial with real coefficients and one complex root $a + bi$, immediately write down its conjugate $a - bi$. Multiply $(z - (a+bi))(z - (a-bi))$ to get a real quadratic, then use polynomial long division to reduce the degree of the original polynomial.
5. **Solve pure power equations:** Use De Moivre's Theorem to solve equations of the form $z^n = w$. Find the principal root, then rotate it by $\frac{2\pi}{n}$ radians to find the remaining $n-1$ roots.

## Key ideas, with intuition

**1. The Complex Conjugate Root Theorem**
If $P(z)$ is a polynomial with *real* coefficients, and $z_0 = a + bi$ is a root, then $\overline{z_0} = a - bi$ is also a root. 
*Intuition:* When you multiply out factors to build a polynomial, the imaginary parts must perfectly annihilate each other to leave only real coefficients. The only way $(z - z_1)(z - z_2)$ produces real coefficients is if the sum $(z_1 + z_2)$ and the product $(z_1 z_2)$ are both real. This strictly requires $z_2 = \overline{z_1}$.

**2. The Geometry of Roots of Unity**
The equation $z^n = c$ (where $c$ is a complex number) always has exactly $n$ roots. 
*Intuition:* Multiplying complex numbers adds their angles. If you want a number that, when multiplied by itself $n$ times, lands on the angle of $c$, you can take the principal angle $\theta/n$. But you can also add full rotations before dividing: $(\theta + 2\pi k)/n$. Geometrically, this spaces the $n$ roots in a perfect regular $n$-gon centered at the origin.

**3. Degree Reduction via Quadratics**
If you know $a \pm bi$ are roots, their corresponding factors are $(z - (a+bi))$ and $(z - (a-bi))$. Multiplying these yields:
$$ z^2 - 2az + (a^2 + b^2) $$
Notice this quadratic has strictly real coefficients. You can divide any high-degree polynomial by this quadratic to strip away the complex roots and find the remaining roots.

## Worked example
**Problem:** Find all roots of $P(z) = z^3 - 3z^2 + 4z - 12 = 0$.

**Step 1: Find a real root.**
We can use factoring by grouping (or the Rational Root Theorem).
$$ z^2(z - 3) + 4(z - 3) = 0 $$
$$ (z^2 + 4)(z - 3) = 0 $$

**Step 2: Extract the real root.**
From the linear factor, we get:
$$ z - 3 = 0 \implies z = 3 $$

**Step 3: Solve the remaining quadratic.**
From the quadratic factor, we get:
$$ z^2 + 4 = 0 $$
$$ z^2 = -4 $$
Take the square root of both sides. Since $\sqrt{-1} = i$:
$$ z = \pm 2i $$

**Step 4: State all roots.**
The roots are $z = 3, 2i, -2i$. 

*Reflection:* The original polynomial is degree 3, and we found exactly 3 roots, satisfying the Fundamental Theorem of Algebra. The coefficients of $P(z)$ were real, and our complex roots appeared in a perfect conjugate pair ($\pm 2i$), satisfying the Complex Conjugate Root Theorem.

## Diagrams

Here is the plot of the roots from the worked example in the complex plane. Notice the symmetry across the real axis, which is the geometric manifestation of the Complex Conjugate Root Theorem.

```text
          Im
           ^
       2i -|---* (0 + 2i)
           |
           |
-----------+-----------*---> Re
           |           3
           |
      -2i -|---* (0 - 2i)
           |
```

## Memory technique — remember this forever
1. **The Visual Hook:** "The Conjugate Mirror." Imagine the real axis as a perfectly flat lake. For any polynomial with real coefficients, every complex root flying above the lake ($a + bi$) has a perfect reflection swimming directly below it ($a - bi$).
2. **Formulas to overlearn:**
   * The real quadratic formed by a conjugate pair: $(z - (a+bi))(z - (a-bi)) = z^2 - 2az + (a^2+b^2)$.
   * The $n$-th roots of a complex number $r e^{i\theta}$: $z_k = \sqrt[n]{r} e^{i(\frac{\theta + 2\pi k}{n})}$ for $k = 0, 1, \dots, n-1$.
3. **Spaced-repetition schedule:** Review this concept and re-derive the formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the quadratic expansion formula, simply write out $(z - z_1)(z - \overline{z_1})$ and foil it manually: $z^2 - z\overline{z_1} - zz_1 + z_1\overline{z_1}$. Factor out the $-z$ to get $z^2 - z(z_1 + \overline{z_1}) + |z_1|^2$. The imaginary parts cancel, leaving you with $z^2 - 2\text{Re}(z_1)z + |z_1|^2$.

## Common mistakes
1. **Applying the Conjugate Root Theorem to polynomials with complex coefficients.** If $P(z) = z^2 - iz + 2$, the roots do *not* have to come in conjugate pairs because the coefficients are not strictly real.
2. **Messing up the signs when expanding factors.** Students frequently write $(z + (a+bi))$ instead of $(z - (a+bi))$ when converting a root into a factor. A root $r$ always corresponds to the factor $(z - r)$.
3. **Forgetting the $\pm$ when taking square roots.** Writing $z^2 = -9 \implies z = 3i$ and losing the $-3i$ root entirely.

## Self-check
1. Find all roots of $z^2 - 4z + 13 = 0$.
2. A cubic polynomial with real coefficients has a leading coefficient of 1. Its roots include $z = -2$ and $z = 1 - 3i$. Expand these factors to find the polynomial in standard form $az^3 + bz^2 + cz + d$.
3. Find all four roots of $z^4 + 16 = 0$. Express them in both polar form and rectangular form ($a+bi$).