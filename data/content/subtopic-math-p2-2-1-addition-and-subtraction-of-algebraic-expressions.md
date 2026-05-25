## What it is
Addition and subtraction of algebraic expressions is the process of simplifying mathematical statements by combining "like terms"—terms that have the exact same variables raised to the exact same powers. You do this by adding or subtracting their numerical coefficients while leaving the variable parts unchanged.

## Why it matters
Before you can solve an equation, you must simplify it. In aerospace engineering and physics, you will derive massive equations describing energy balances, orbital mechanics, or fluid dynamics. These equations often contain dozens of terms. If you cannot reliably group and condense these terms, your models will remain computationally heavy and mathematically unsolvable. Combining like terms is the fundamental data-compression algorithm of algebra.

## When to study it
Do not attempt this until you have mastered:
1. Arithmetic with negative numbers and fractions.
2. The concept of a variable (understanding that $x$ represents an unknown number).
3. The commutative property of multiplication ($ab = ba$).
4. The distributive property ($a(b+c) = ab + ac$). 

If you are shaky on distributing a negative sign across a parenthesis, go back and fix that first.

## How to study it (step by step)
1. **Define your terms:** Learn to identify the "coefficient" (the number in front) and the "variable part" (the letters and their exponents). 
2. **Master the "Like Term" rule:** Scan expressions and visually group terms with identical variable parts. $x^2y$ and $yx^2$ are like terms. $x^2y$ and $xy^2$ are not.
3. **Anchor to the distributive property:** Prove to yourself that $3x + 5x = (3+5)x = 8x$. This proves you aren't just memorizing a rule; you are factoring out the variable.
4. **Practice negative distribution:** Write out expressions like $-(2x - 4y)$ and explicitly rewrite them as $-2x + 4y$ before doing any addition.
5. **Sort and combine:** Take a long 6-term expression, rewrite it so like terms are physically next to each other, and then combine their coefficients.
6. **Build complexity:** Introduce fractional coefficients and multiple variables (e.g., $\frac{1}{2}x^2 - \frac{3}{4}x^2$).

## Key ideas, with intuition

**1. Variables act as units (Dimensional Analysis)**
Think of the variable part of a term as a unit of measurement. You can easily compute $3 \text{ kg} + 5 \text{ kg} = 8 \text{ kg}$. You cannot compute $3 \text{ kg} + 5 \text{ meters}$. 
Similarly, $x$ and $x^2$ are fundamentally different "units." Geometrically, $x$ is a 1D length, while $x^2$ is a 2D area. You cannot add a length to an area. Therefore, $3x + 5x^2$ cannot be simplified further.

**2. The Distributive Property is the engine**
Combining like terms is just the distributive property running in reverse. 
$$ax^n + bx^n = (a + b)x^n$$
When you add $4y + 7y$, you are technically factoring out the $y$:
$$4y + 7y = (4 + 7)y = 11y$$

**3. Subtraction is addition of the opposite**
When subtracting an entire expression, the negative sign applies to *every* term inside the parentheses. Think of a negative sign in front of a parenthesis as a $-1$ that must be multiplied through.
$$-(a - b + c) = -1 \cdot (a) + (-1) \cdot (-b) + (-1) \cdot (c) = -a + b - c$$

## Worked example
Simplify the following expression:
$$(5x^2y - 3xy + 7) - (2x^2y + 4xy - 2)$$

**Step 1: Distribute the negative sign to the second polynomial.**
The first polynomial remains unchanged. The negative sign flips the sign of every term in the second polynomial.
$$5x^2y - 3xy + 7 - 2x^2y - 4xy + 2$$

**Step 2: Group the like terms together.**
Rearrange the expression using the commutative property of addition so that identical variable blocks are adjacent. Include the sign in front of each term.
$$(5x^2y - 2x^2y) + (-3xy - 4xy) + (7 + 2)$$

**Step 3: Combine the coefficients.**
Factor out the variable parts and execute the arithmetic on the coefficients.
$$(5 - 2)x^2y + (-3 - 4)xy + (7 + 2)$$
$$3x^2y - 7xy + 9$$

*Reflection:* Step 1 ensures we don't drop a negative (the most common error). Step 2 organizes the data. Step 3 executes the distributive property to yield the simplified result.

## Diagrams

Visualizing why $x$ and $x^2$ cannot be combined, but identical terms can:

```text
Combining Like Terms:
[ x ] + [ x ] + [ x ] = 3[ x ]
(Length) (Length) (Length)   (3 Lengths)

[x^2] + [x^2] = 2[x^2]
+---+   +---+     +---+
|   | + |   |  = 2|   |
+---+   +---+     +---+
(Area)  (Area)    (2 Areas)

Mixing Terms (Cannot be combined):
[x^2] + [ x ] = [x^2] + [ x ]
+---+
|   | + [ x ]  = ??? (Cannot form a single shape)
+---+
(Area)  (Length)
```

## Memory technique — remember this forever

1. **The Hook:** "Apples to apples, exponents to exponents." If the letters *or* the numbers up top don't match exactly, you cannot add them.
2. **Must Overlearn:** 
   * $$ax^n + bx^n = (a+b)x^n$$
   * $$-(a + b) = -a - b$$
3. **Spaced-repetition schedule:** Review this concept by solving 3 complex simplification problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever forget whether $3x + 4x$ is $7x$ or $7x^2$, fall back on factoring. Both terms share an $x$. Factor it out: $x(3 + 4) = x(7) = 7x$. 

## Common mistakes

1. **Adding the exponents:** Students often write $2x + 3x = 5x^2$. This is confusing addition with multiplication. (Note: $2x \cdot 3x = 6x^2$, but $2x + 3x = 5x$).
2. **The Sniper Negative:** When subtracting a polynomial like $-(3x - 2)$, students will negate the first term but forget the second, writing $-3x - 2$ instead of the correct $-3x + 2$.
3. **Order blindness:** Thinking $4x^2y$ and $2yx^2$ are different terms. Because multiplication is commutative ($a \cdot b = b \cdot a$), $x^2y$ is the exact same unit as $yx^2$. They can be combined.

## Self-check

1. Simplify: $8a - 3b + 2a + 5b - a$
2. Simplify: $(4m^2 - 7m + 2) - (-m^2 + 3m - 5)$
3. Simplify: $5p^2q - 2pq^2 + 3qp^2 - q^2p$