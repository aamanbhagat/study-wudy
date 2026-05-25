## What it is
Factoring is the mathematical process of decomposing an expression into a product of simpler terms, called factors. It is the exact inverse of polynomial multiplication. Common factor extraction pulls out the greatest shared term from a polynomial; grouping pairs terms to reveal hidden shared binomials; and identities leverage established algebraic patterns (like the difference of squares) to factor expressions instantly.

## Why it matters
In physics and aerospace engineering, dynamic systems are modeled by polynomials. Factoring allows you to find the roots of these equations (where the expression equals zero). These roots represent critical physical states: the exact moment a rocket's relative velocity hits zero, the equilibrium points of a pendulum, or the intersections of orbital trajectories. In computer science, factoring polynomials simplifies algorithms, directly reducing computational overhead.

## When to study it
You must already possess absolute fluency in:
1. The distributive property of multiplication over addition: $a(b+c) = ab + ac$.
2. Exponent rules, specifically $x^m x^n = x^{m+n}$.
3. Expanding polynomials (often called FOIL for binomials). 

If you cannot instantly expand $(3x - 2)(x + 4)$ into $3x^2 + 10x - 8$, stop here. Go back and master polynomial multiplication. You cannot reverse a process you do not fully understand.

## How to study it (step by step)
1. **Master the GCF (Greatest Common Factor):** Look at expressions like $12x^3 + 18x^2$. Identify the largest integer that divides both coefficients ($6$) and the highest power of the variable in all terms ($x^2$). Extract it: $6x^2(2x + 3)$.
2. **Reverse the Distributive Property:** Write out expansions on paper, e.g., $4y(y-5) = 4y^2 - 20y$. Cover the left side. Force yourself to reconstruct the factored form from the expanded form.
3. **Practice Grouping (Divide and Conquer):** Write down 4-term polynomials. Split them exactly in half. Extract the GCF from the first two terms, then the GCF from the last two terms. Look for the resulting matching binomial.
4. **Derive the Identities:** Do not just memorize $a^2 - b^2 = (a-b)(a+b)$. Prove it by expanding the right side. Do the same for $(a+b)^2 = a^2 + 2ab + b^2$. 
5. **Stack the Techniques:** Solve problems that require multiple steps. Always extract the GCF first, then apply grouping or identities to the remainder.

## Key ideas, with intuition

**Idea 1: Factoring is division in disguise.**
When you extract a common factor, you are dividing every term by that factor and placing it outside a parenthesis. 
$$ax + ay = a\left(\frac{ax}{a} + \frac{ay}{a}\right) = a(x+y)$$

**Idea 2: Grouping treats binomials as single variables.**
Consider $ax + ay + bx + by$. There is no single factor shared by all four terms. But if we group them:
$$(ax + ay) + (bx + by)$$
$$a(x + y) + b(x + y)$$
Now, treat $(x+y)$ as if it were a single variable, like $Z$. You have $aZ + bZ$. Extract $Z$:
$$Z(a+b) \implies (x+y)(a+b)$$

**Idea 3: The Difference of Squares Annihilation.**
Why does $a^2 - b^2$ factor so cleanly into $(a-b)(a+b)$? Because when you multiply a sum by a difference, the cross-terms ($ab$ and $-ab$) perfectly annihilate each other. Nature hides two factors inside a two-term expression by destroying the evidence of the middle terms.

## Worked example
**Problem:** Factor completely: $3x^3 - 6x^2 - 3x + 6$

**Step 1: Extract the GCF.** 
Every term is divisible by $3$. Pull it out first to simplify the workspace.
$$3(x^3 - 2x^2 - x + 2)$$
*Why:* Always simplify before doing heavy lifting. 

**Step 2: Grouping.**
We have four terms inside the parenthesis. Split them into two pairs: $(x^3 - 2x^2)$ and $(-x + 2)$.
Extract $x^2$ from the first pair, and $-1$ from the second pair (extracting $-1$ forces the signs to match the first pair).
$$3 [ x^2(x - 2) - 1(x - 2) ]$$
*Why:* We engineered a common binomial factor, $(x-2)$.

**Step 3: Extract the common binomial.**
Pull $(x-2)$ out of the two inner terms.
$$3 [ (x^2 - 1)(x - 2) ]$$
*Why:* We are applying the distributive property in reverse, treating $(x-2)$ as a single entity.

**Step 4: Use identities.**
Recognize that $x^2 - 1$ is a difference of squares ($x^2 - 1^2$).
$$3 (x - 1)(x + 1)(x - 2)$$
*Why:* $a^2 - b^2 = (a-b)(a+b)$. The expression is now completely factored into prime polynomials.

## Diagrams

**The Area Model of Common Factor Extraction:**
$$a(b+c) = ab + ac$$
```text
    b       c
+-------+-------+
|       |       |
|  ab   |  ac   | a
|       |       |
+-------+-------+
```

**Geometric Proof: Difference of Squares ($a^2 - b^2$)**
Start with a large square of area $a^2$. Cut out a small square of area $b^2$ from the corner. The remaining area is $a^2 - b^2$. If you slice the remaining "L-shape" and rearrange it, it forms a perfect rectangle with sides $(a-b)$ and $(a+b)$.

```text
1. Start with a^2, remove b^2      2. Rearrange the two remaining blocks

+---------------+-------+          +---------------+-------+
|               |       |          |               |       |
|      a-b      |   b   | a-b      |      a-b      |   b   | a-b
|               |       |          |               |       |
+---------------+-------+    -->   +---------------+-------+
|               |///////|                          |       |
|      a-b      |//b^2//| b                        |   b   | a-b
|               |///////|                          |       |
+---------------+-------+                          +-------+
       a-b          b                     a-b          b

Area = (a-b)*a + (a-b)*b           Area = (a-b) * (a+b)
```

## Memory technique — remember this forever
**The Hook:** "Always Check the Trunk First" (ACT First). Before you try to pack the car with complex grouping or identities, check the trunk—pull out the Greatest Common Factor (GCF) first.

**The Facts to Overlearn:**
1. $a^2 - b^2 = (a-b)(a+b)$
2. $a^2 + 2ab + b^2 = (a+b)^2$
3. $a^2 - 2ab + b^2 = (a-b)^2$

**Spaced Repetition Schedule:**
Review these identities and do 3 factoring problems at these intervals: Day 1, Day 3, Day 7, Day 16, Day 35.

**First Principles Pathway:**
If you ever forget the sign structure of the identities, simply write out $(a+b)(a-b)$ or $(a+b)(a+b)$ and manually multiply them using FOIL. The resulting polynomial is your identity. Factoring is just reading that equation right-to-left.

## Common mistakes
1. **Ignoring the GCF:** Students jump straight to grouping and end up with a mess, or factor $4x^2 - 16$ as $(2x-4)(2x+4)$ and stop, failing to realize they left factors of $2$ inside the binomials. (Correct: $4(x^2-4) = 4(x-2)(x+2)$).
2. **The Sum of Squares Trap:** Assuming $a^2 + b^2$ factors into $(a+b)^2$. It does not. Over the real numbers, $a^2 + b^2$ is prime (unfactorable). Test it: $(3)^2 + (4)^2 = 25$. But $(3+4)^2 = 49$. 
3. **Sign Errors in Grouping:** When factoring $x^3 + 2x^2 - 3x - 6$, students often write $x^2(x+2) - 3(x-2)$. Notice the second binomial is wrong. You factored out a $-3$, so you must flip the sign of the $-6$ to positive: $-3(x+2)$.

## Self-check
1. Factor completely: $5x^2 - 45$
2. Factor completely by grouping: $2x^3 - 4x^2 + 5x - 10$
3. Factor completely (requires stacking techniques): $x^4 - y^4$