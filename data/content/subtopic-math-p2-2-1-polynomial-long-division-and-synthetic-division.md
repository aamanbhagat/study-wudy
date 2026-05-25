## What it is
Polynomial long division is an algorithm for dividing one polynomial by another of equal or lower degree, functioning exactly like grade-school integer long division. Synthetic division is a highly optimized, shorthand version of this process that strips away the variables, but it only works when dividing by a linear binomial of the form $(x - c)$.

## Why it matters
You cannot solve higher-order differential equations without this. In aerospace engineering and control theory, the stability of a rocket's guidance system is determined by finding the roots of a "characteristic polynomial." To find these roots, you must guess a root and divide the polynomial down into a lower-degree quadratic you can easily solve. Furthermore, polynomial division is the mandatory first step in Partial Fraction Decomposition, a technique you will use constantly in Calculus to integrate rational functions and in Physics to compute inverse Laplace transforms for electrical circuits.

## When to study it
You must be fluent in:
1. Basic polynomial arithmetic (combining like terms, distributive property).
2. The laws of exponents (specifically $\frac{x^a}{x^b} = x^{a-b}$).
3. Integer long division. 

If you cannot reliably divide $3456$ by $12$ on paper using long division, stop right now and review that. Polynomial division is the exact same algorithm applied to a different base.

## How to study it (step by step)
1. **Map the integer parallel:** Write out the long division for $277 \div 12$. Next to it, write out the long division for $(2x^2 + 7x + 7) \div (x + 2)$. Notice that $x$ is just acting like the number $10$.
2. **Master the placeholder rule:** Attempt a long division where the dividend is missing a term, such as dividing $x^3 - 8$ by $x - 2$. Force yourself to write it as $x^3 + 0x^2 + 0x - 8$.
3. **Formalize the Division Algorithm:** Write down the equation $P(x) = D(x)Q(x) + R(x)$. Verify this equation holds true for the results of the problems you solved in steps 1 and 2.
4. **Transition to Synthetic Division:** Take a problem you just solved via long division and solve it using synthetic division side-by-side. Observe how the synthetic tableau perfectly tracks the coefficients of your long division, just without the redundant $x$'s.
5. **Prove the Remainder Theorem:** Evaluate the polynomial $P(x)$ at $x = c$. Then look at your Division Algorithm equation $P(x) = (x-c)Q(x) + R$. Realize that $P(c)$ instantly annihilates the quotient term, leaving only $R$. 

## Key ideas, with intuition

**1. The Division Algorithm**
When you divide a polynomial $P(x)$ (the dividend) by $D(x)$ (the divisor), you get a quotient $Q(x)$ and a remainder $R(x)$. 
$$P(x) = D(x)Q(x) + R(x)$$
Crucially, the degree of the remainder $R(x)$ must be *strictly less* than the degree of $D(x)$. If it isn't, you haven't finished dividing.

**2. Long division is just matching leading terms**
When dividing, you ignore the entire polynomial except for the leading terms. If you are dividing $3x^3 + \dots$ by $x + \dots$, you ask one question: "What do I multiply $x$ by to get exactly $3x^3$?" The answer ($3x^2$) goes on top. You then multiply the whole divisor by $3x^2$, subtract, and repeat.

**3. Synthetic division is an optimization**
Because polynomials are strictly ordered by powers of $x$, writing $x^3, x^2, x$ is redundant if we maintain strict columns. Synthetic division drops the variables. Furthermore, in long division, we *subtract* the rows. Subtraction causes sign errors. Synthetic division flips the sign of the root at the very beginning (using $c$ instead of $-c$), which allows us to *add* straight down the columns instead.

## Worked example
**Problem:** Divide $P(x) = 2x^3 - 3x^2 + 4x + 5$ by $(x - 2)$ using synthetic division.

**Step 1: Setup.** The divisor is $x - 2$, so our root is $c = 2$. We list the coefficients of $P(x)$.
$$2 \quad | \quad 2 \quad -3 \quad 4 \quad 5$$

**Step 2: Drop the first coefficient.**
The leading $2$ drops straight down. 

**Step 3: Multiply and Add.**
Multiply the dropped $2$ by the root $2$ to get $4$. Place $4$ under the $-3$. Add them: $-3 + 4 = 1$.
Multiply the $1$ by the root $2$ to get $2$. Place $2$ under the $4$. Add them: $4 + 2 = 6$.
Multiply the $6$ by the root $2$ to get $12$. Place $12$ under the $5$. Add them: $5 + 12 = 17$.

**Result:**
The bottom row is $2 \quad 1 \quad 6 \quad | \quad 17$.
These are the coefficients of the quotient, which is one degree lower than $P(x)$.
$$Q(x) = 2x^2 + x + 6$$
The remainder is $R = 17$.

**Reflection:** Why did this work? By flipping the sign of the divisor from $-2$ to $+2$ at the start, we converted the tedious subtraction steps of long division into simple addition. We can verify this via the Remainder Theorem: $P(2) = 2(2)^3 - 3(2)^2 + 4(2) + 5 = 16 - 12 + 8 + 5 = 17$. The remainder matches.

## Diagrams

```text
Synthetic Division Tableau for (2x³ - 3x² + 4x + 5) / (x - 2)

      Root (c)       Coefficients of P(x)
         |             |    |    |    |
         v             v    v    v    v
         2         |   2   -3    4    5
   Multiply by 2   |        4    2   12  <-- (Add to row above)
                   --------------------
                       2    1    6 | 17  <-- Remainder (R)
                       ^    ^    ^
                       |    |    |
     Coefficients of Q(x) = 2x² + 1x + 6
```

## Memory technique — remember this forever
**1. The Hook:** "Drop, Multiply, Add." (DMA). 
For synthetic division, you always **D**rop the first number, **M**ultiply by the box, and **A**dd the column. DMA.

**2. Must-know formulas:**
*   The Division Algorithm: $$P(x) = D(x)Q(x) + R(x)$$
*   The Remainder Theorem: If $D(x) = x - c$, then $$P(c) = R$$

**3. Spaced-repetition schedule:**
Review this process at 1 day, 3 days, 7 days, 16 days, and 35 days. On each review, do exactly one long division and one synthetic division.

**4. First Principles Pathway:**
If you ever forget the synthetic division algorithm (DMA), abandon it immediately. Synthetic division is merely a trick. You can *always* derive the correct answer using standard polynomial long division, which relies entirely on the basic logic of matching leading terms.

## Common mistakes
1. **Forgetting placeholder zeros:** If you divide $x^3 + 1$ by $x + 1$ and write your coefficients as `1  1`, your answer will be entirely wrong. It must be `1  0  0  1`.
2. **Botching the subtraction in long division:** When you subtract a binomial like $(3x^2 - 4x)$ from the row above it, students often subtract the $3x^2$ but forget to distribute the negative to the $-4x$, accidentally subtracting it instead of adding it. Always wrap the term in parentheses: $-(3x^2 - 4x)$.
3. **Using the wrong sign in synthetic division:** If the divisor is $(x + 3)$, the root is $c = -3$. Students frequently put $+3$ in the box. Set the divisor to zero and solve for $x$ to find what goes in the box.

## Self-check
1. Divide $(x^2 + 5x + 6)$ by $(x + 2)$ using polynomial long division.
2. Divide $(3x^4 - 2x^2 + 7)$ by $(x - 1)$ using synthetic division. (Hint: check your degrees).
3. If $P(x)$ is divided by $x^2 + 1$, what is the maximum possible degree of the remainder? Why is synthetic division impossible to use for this specific problem?