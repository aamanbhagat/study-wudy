## What it is
Algebraic identities are equations that hold true for all possible values of their variables. They are pre-calculated expansions and factorizations of common polynomial structures, acting as structural shortcuts so you do not have to manually distribute terms every time you encounter them.

## Why it matters
In calculus and physics, you constantly need to simplify equations to find limits, derivatives, or roots. For example, deriving the kinematic equations, calculating orbital energy, or finding the center of mass often requires factoring polynomials to cancel terms. If you cannot instantly recognize a difference of squares or a perfect square trinomial, you will drown in algebra before you even reach the physics. 

## When to study it
You must already possess absolute fluency in basic arithmetic operations, the distributive property (FOIL), and the laws of exponents. If you cannot confidently expand $x(y+z) = xy+xz$ or immediately know that $(x^2)^3 = x^6$, you must review those first. 

## How to study it (step by step)
1. Derive the quadratic identities manually. Write out $(a+b)(a+b)$ and $(a-b)(a-b)$ and distribute every term to prove to yourself where the $2ab$ comes from.
2. Draw a geometric area model for $(a+b)^2$ to build visual intuition (see Diagrams below).
3. Derive the difference of squares $(a+b)(a-b)$ by expanding it and watching the middle terms annihilate each other.
4. Derive the cubic identity $(a+b)^3$ by multiplying your result for $(a+b)^2$ by $(a+b)$. Repeat this process for $(a-b)^3$.
5. Verify the sum and difference of cubes $(a^3 \pm b^3)$ by multiplying $(a \pm b)(a^2 \mp ab + b^2)$ and watching the four inner terms cancel.
6. Practice in reverse. Take expanded forms like $x^2 - 9$ or $x^3 + 8$ and factor them back into their binomial components. 

## Key ideas, with intuition

**1. The Square of a Sum/Difference**
$$(a \pm b)^2 = a^2 \pm 2ab + b^2$$
It is never just $a^2 + b^2$. The $\pm 2ab$ represents the "cross-terms" generated when each part of the first binomial multiplies the opposite part of the second. 

**2. Difference of Squares**
$$(a+b)(a-b) = a^2 - b^2$$
Because the binomials have opposite signs, the cross terms $+ab$ and $-ab$ perfectly cancel. This is the single most useful identity in mathematics for rationalizing denominators and simplifying radical expressions.

**3. The Cube of a Sum/Difference**
$$(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3$$
Notice the symmetry. The exponents of $a$ count down ($3, 2, 1, 0$) while the exponents of $b$ count up ($0, 1, 2, 3$). The coefficients $1, 3, 3, 1$ come from Pascal's Triangle. For $(a-b)^3$, the signs strictly alternate: $+ - + -$.

**4. Sum/Difference of Cubes**
$$a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$$
Do not confuse this with the cube of a sum. This identity factors a binomial into a binomial times a trinomial. Notice that the trinomial $a^2 \mp ab + b^2$ looks like a perfect square, but it is missing the $2$ in the middle term. It cannot be factored further over real numbers.

## Worked example
**Problem:** Simplify the rational expression $\frac{x^3 - 8}{x^2 - 4}$.

**Step 1:** Recognize the structural identities. The numerator is a difference of cubes ($8 = 2^3$), and the denominator is a difference of squares ($4 = 2^2$).
$$\frac{x^3 - 2^3}{x^2 - 2^2}$$

**Step 2:** Apply the difference of cubes identity to the numerator: $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$, where $a=x$ and $b=2$.
$$x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)$$

**Step 3:** Apply the difference of squares identity to the denominator: $a^2 - b^2 = (a-b)(a+b)$.
$$x^2 - 2^2 = (x - 2)(x + 2)$$

**Step 4:** Substitute the factored forms back into the fraction.
$$\frac{(x - 2)(x^2 + 2x + 4)}{(x - 2)(x + 2)}$$

**Step 5:** Cancel the common factor $(x-2)$, assuming $x \neq 2$.
$$\frac{x^2 + 2x + 4}{x + 2}$$

*Reflection:* By recognizing the structural patterns of cubes and squares, we factored and reduced a complex rational expression instantly. Attempting polynomial long division without factoring first would have been a waste of time.

## Diagrams

Geometric intuition for $(a+b)^2 = a^2 + 2ab + b^2$:
Imagine a square with side length $(a+b)$. Its total area is $(a+b)^2$. 

```text
      a         b
  +---------+-------+
  |         |       |
a |   a^2   |  ab   |
  |         |       |
  +---------+-------+
  |         |       |
b |   ab    |  b^2  |
  |         |       |
  +---------+-------+
```
The total area is the sum of its parts: one square of area $a^2$, one square of area $b^2$, and *two* rectangles of area $ab$. Hence, $a^2 + 2ab + b^2$.

## Memory technique — remember this forever

1. **The Visual Hook:** Use the **SOAP** acronym to remember the signs for the Sum and Difference of Cubes ($a^3 \pm b^3$).
   * **S**ame sign as the original expression.
   * **O**pposite sign from the original expression.
   * **A**lways **P**ositive.
   * Example for $a^3 - b^3$: $(a \text{ [Same: -] } b)(a^2 \text{ [Opposite: +] } ab \text{ [Always Positive: +] } b^2)$.

2. **Must Overlearn:**
   * $(a+b)(a-b) = a^2 - b^2$
   * $a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$

3. **Spaced Repetition Schedule:**
   Write these formulas from memory at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **The First Principles Pathway:**
   If you ever blank on a test, do not guess. Rebuild it. If you forget $(a-b)^3$, write $(a-b)(a-b)(a-b)$. Expand the first two to get $(a^2 - 2ab + b^2)$, then multiply that trinomial by $(a-b)$. It takes 45 seconds and guarantees the correct signs and coefficients.

## Common mistakes
* **The Freshman's Dream:** Falsely assuming $(a+b)^2 = a^2 + b^2$. You are forgetting the $2ab$ cross-terms. Exponents do not distribute over addition.
* **Confusing the trinomial in the sum of cubes with a perfect square:** Writing $a^2 - 2ab + b^2$ instead of $a^2 - ab + b^2$ when factoring $a^3+b^3$. There is no $2$ in the SOAP trinomial.
* **Sign errors in $(a-b)^3$:** Forgetting that the signs alternate. Students often write $a^3 - 3a^2b - 3ab^2 - b^3$. The correct expansion is $a^3 - 3a^2b + 3ab^2 - b^3$. (Because $-b$ squared is positive $b^2$).

## Self-check
1. Expand $(3x - 4y)^2$ completely.
2. Factor $27x^3 + 64y^3$ into a binomial and a trinomial.
3. Evaluate $101^2 - 99^2$ entirely in your head in under 5 seconds using an identity.