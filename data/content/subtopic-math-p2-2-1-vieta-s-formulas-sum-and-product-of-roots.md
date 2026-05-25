## What it is

Vieta's formulas are mathematical relations that directly connect the coefficients of a polynomial to the sums and products of its roots. For a quadratic equation, they provide an immediate shortcut to find the sum and the product of the two solutions without requiring you to actually solve for the roots themselves. 

## Why it matters

Vieta's formulas allow you to analyze systems without brute-force calculation. In control theory and aerospace engineering, the stability of a rocket's flight path is determined by the roots of a "characteristic polynomial." Vieta's formulas let engineers look at the coefficients of that polynomial and immediately deduce if the roots have negative real parts (indicating a stable system) or positive real parts (indicating a catastrophic divergence). In pure math, they are the ultimate tool for factoring complex expressions and constructing polynomials from known constraints.

## When to study it

You must already be comfortable with:
1. Expanding binomials (e.g., $(x-a)(x-b)$).
2. The standard form of a quadratic equation: $ax^2 + bx + c = 0$.
3. The concept of a "root" (the values of $x$ that make the polynomial equal zero).

If you do not know how to multiply two binomials together or what a root is, return to introductory polynomial arithmetic.

## How to study it (step by step)

1. **Derive it yourself:** Write down the factored form of a generic quadratic: $a(x-r_1)(x-r_2) = 0$. Expand it algebraically.
2. **Match coefficients:** Take your expanded form and equate it, term by term, to the standard form $ax^2 + bx + c = 0$. 
3. **Isolate the relations:** Solve for the sum $(r_1 + r_2)$ and the product $(r_1 r_2)$ in terms of $a$, $b$, and $c$. 
4. **Drill the forward path:** Write down 5 random quadratic equations. Calculate the sum and product of their roots using your formulas. Do not use the quadratic formula.
5. **Drill the reverse path:** Pick two random numbers to be roots. Calculate their sum and product, and use Vieta's formulas to instantly write down the quadratic equation they belong to.
6. **Extend to cubics (Advanced):** Expand $(x-r_1)(x-r_2)(x-r_3) = 0$ and find the formulas for a cubic equation. Observe the alternating signs.

## Key ideas, with intuition

**Idea 1: Polynomials are built from their roots.**
If a quadratic has roots $r_1$ and $r_2$, it can always be written as:
$$P(x) = a(x - r_1)(x - r_2)$$
where $a$ is a scaling factor that stretches or compresses the parabola but does not change where it crosses the x-axis.

**Idea 2: Expansion reveals the coefficients.**
Assume $a=1$ for a moment. Expand the factored form:
$$(x - r_1)(x - r_2) = x^2 - r_2 x - r_1 x + r_1 r_2$$
$$= x^2 - (r_1 + r_2)x + (r_1 r_2)$$
Notice the structure: the coefficient of the $x$ term is the *negative sum* of the roots, and the constant term is the *product* of the roots.

**Idea 3: Matching to standard form.**
Now take the standard form $ax^2 + bx + c = 0$ and divide by $a$ to make the leading coefficient 1:
$$x^2 + \frac{b}{a}x + \frac{c}{a} = 0$$
By equating this to our expanded form $x^2 - (r_1 + r_2)x + (r_1 r_2) = 0$, we get Vieta's formulas directly:
$$r_1 + r_2 = -\frac{b}{a}$$
$$r_1 r_2 = \frac{c}{a}$$

## Worked example

**Problem:** Let $r_1$ and $r_2$ be the roots of the equation $3x^2 - 5x + 2 = 0$. Without solving for $r_1$ and $r_2$, find the value of $r_1^2 + r_2^2$.

**Step 1: Extract the sum and product using Vieta's formulas.**
Identify the coefficients: $a = 3$, $b = -5$, $c = 2$.
Sum of roots: $r_1 + r_2 = -\frac{b}{a} = -\frac{-5}{3} = \frac{5}{3}$
Product of roots: $r_1 r_2 = \frac{c}{a} = \frac{2}{3}$

**Step 2: Relate the target expression to the sum and product.**
We need $r_1^2 + r_2^2$. We know from algebra that:
$$(r_1 + r_2)^2 = r_1^2 + 2r_1 r_2 + r_2^2$$
Rearranging this gives a highly useful identity:
$$r_1^2 + r_2^2 = (r_1 + r_2)^2 - 2r_1 r_2$$

**Step 3: Substitute and solve.**
$$r_1^2 + r_2^2 = \left(\frac{5}{3}\right)^2 - 2\left(\frac{2}{3}\right)$$
$$r_1^2 + r_2^2 = \frac{25}{9} - \frac{4}{3}$$
$$r_1^2 + r_2^2 = \frac{25}{9} - \frac{12}{9} = \frac{13}{9}$$

*Reflection:* By manipulating the algebraic identity $(r_1+r_2)^2$, we transformed a problem about individual roots into a problem about their sum and product. This bypassed the quadratic formula entirely, saving time and preventing arithmetic errors with square roots.

## Diagrams

Vieta's sum formula has a direct geometric meaning. The axis of symmetry of a parabola is exactly halfway between its roots.

```text
          y
          ^
          |      Parabola: y = ax^2 + bx + c
          |
    \     |     /
     \    |    /
      \   |   /
-------*--|--*--------> x
      r1  | r2
          |
          | Axis of symmetry
          | x = -b / (2a)
          V
```

The midpoint of $r_1$ and $r_2$ is their average: 
$$\text{Midpoint} = \frac{r_1 + r_2}{2}$$
Substitute Vieta's sum formula ($r_1 + r_2 = -b/a$):
$$\text{Midpoint} = \frac{-b/a}{2} = -\frac{b}{2a}$$
This proves why the vertex of a parabola is always at $x = -b/(2a)$.

## Memory technique — remember this forever

1. **The Mnemonic:** "Sum has the Subtraction, Product is Positive." 
   * Sum $= -b/a$ (Subtraction/negative sign)
   * Product $= c/a$ (Positive sign)
2. **The Formulas to Overlearn:**
   * $$r_1 + r_2 = -\frac{b}{a}$$
   * $$r_1 r_2 = \frac{c}{a}$$
3. **Spaced-Repetition Schedule:** Review this derivation and these formulas in 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you ever forget the formulas or the signs, do not guess. Simply expand $x^2 - (r_1+r_2)x + r_1 r_2 = 0$ and compare it to $x^2 + \frac{b}{a}x + \frac{c}{a} = 0$. The signs will align themselves immediately.

## Common mistakes

1. **Forgetting to divide by $a$:** Students often assume the sum is just $-b$ and the product is $c$. This is only true if the leading coefficient $a = 1$. Always divide by $a$.
2. **Dropping the negative sign on the sum:** When $b$ is already negative, $-b/a$ becomes positive. Students frequently write $b/a$ by mistake, getting the sign backwards.
3. **Trying to solve for the roots first:** If a problem asks for $\frac{1}{r_1} + \frac{1}{r_2}$, do not use the quadratic formula. Convert the expression to $\frac{r_1+r_2}{r_1 r_2}$ and use Vieta's directly.

## Self-check

1. Find the sum and product of the roots of $4x^2 + 7x - 9 = 0$.
2. Let the roots of $x^2 + kx + 18 = 0$ be $r_1$ and $r_2$. If $r_1 = 2r_2$, find all possible values for the constant $k$.
3. Let $r_1$ and $r_2$ be the roots of $2x^2 - 6x + 3 = 0$. Evaluate $\frac{1}{r_1^2} + \frac{1}{r_2^2}$ without solving for the roots.