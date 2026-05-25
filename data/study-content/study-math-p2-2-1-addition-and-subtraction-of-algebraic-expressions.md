## 1. What it is — in plain English

Imagine you're trying to count your fruit. You have some apples and some oranges. If someone gives you more apples, you'd add them to your existing pile of apples, right? You wouldn't add them to your oranges. You keep the apples with apples and oranges with oranges.

Algebraic expressions work similarly. They are like mathematical phrases that can contain numbers, symbols (called variables, which are just placeholders for unknown numbers), and operations like addition or subtraction. When we "add" or "subtract" these expressions, we're essentially just combining "like" things.

Think of variables as different types of fruit. An 'x' is an apple, a 'y' is an orange, and an 'x-squared' ($x^2$) might be a special type of apple, like a Granny Smith. You can only combine apples with apples, oranges with oranges, and Granny Smith apples with Granny Smith apples. You can't combine an apple with an orange.

So, "addition and subtraction of algebraic expressions" simply means finding all the "like terms" – the pieces of the expression that have the exact same variables raised to the exact same powers – and then combining their numerical parts (their coefficients) through addition or subtraction, just like grouping your apples and oranges. The variables themselves don't change, only how many of them you have.

## 2. Why it matters — real-world applications

Understanding how to add and subtract algebraic expressions is fundamental because it underpins almost all quantitative reasoning and problem-solving in various fields.

1.  **Inventory and Resource Management (Business/Logistics):** Imagine a large online retailer. They might have different types of products (e.g., $x$ units of Product A, $y$ units of Product B, $z$ units of Product C). If they receive a new shipment, represented by another algebraic expression, they need to quickly combine the new stock with the old. For example, if they initially have $5x + 10y + 2z$ items and receive a new shipment of $3x + 2y - z$ (where $-z$ might mean a recall of Product C), they need to add these expressions to find the new total inventory: $(5x + 10y + 2z) + (3x + 2y - z) = 8x + 12y + z$. This is crucial for tracking stock, forecasting demand, and optimizing warehouse space.

2.  **Physics and Engineering (e.g., Aerospace, Mechanical):** Engineers frequently deal with systems where multiple forces, energies, or material properties are at play. For instance, calculating the total energy of a system might involve combining kinetic energy ($ \frac{1}{2}mv^2 $), potential energy ($ mgh $), and thermal energy ($ Q $). If different components contribute different forms of energy, say Component 1 contributes $2K + 3P$ and Component 2 contributes $K - P + 5Q$, summing these expressions $(2K + 3P) + (K - P + 5Q) = 3K + 2P + 5Q$ gives the total energy expression for the system. In aerospace, this could be used to sum forces acting on an aircraft wing (lift, drag, thrust components) or calculate total fuel consumption from different stages of a flight.

3.  **Machine Learning and Data Science (Feature Engineering):** In machine learning, data scientists often create "features" (input variables) by combining existing ones. For example, if you have features $x_1$ (age) and $x_2$ (income), you might create new features like "age-income ratio" or "squared age." When building complex models, the model's output might be a linear combination of many features. If you have two different models, say Model A predicts $3x_1 + 2x_2 - 5$ and Model B predicts $x_1 - 4x_2 + 10$, and you want to combine their predictions (e.g., average them), you would add their expressions: $(3x_1 + 2x_2 - 5) + (x_1 - 4x_2 + 10) = 4x_1 - 2x_2 + 5$. This simplification is essential for understanding model behavior and optimizing performance.

## 3. Prerequisites — what you must know first

Before diving into adding and subtracting algebraic expressions, ensure you have a solid grasp of these foundational concepts:

*   **Integers and their Operations:** Comfortably adding, subtracting, multiplying, and dividing positive and negative whole numbers (e.g., $5 + (-3) = 2$, $-7 - (-2) = -5$).
*   **Variables:** Understanding that letters (like $x, y, a, b$) are symbols representing unknown or changing numerical values.
*   **Constants:** Numbers that have a fixed value (e.g., $5, -10, \pi$).
*   **Terms:** The individual components of an algebraic expression, separated by addition or subtraction signs (e.g., in $3x + 5y - 2$, the terms are $3x$, $5y$, and $-2$).
*   **Coefficients:** The numerical factor multiplied by a variable in a term (e.g., in $3x$, $3$ is the coefficient; in $-y$, $-1$ is the coefficient).
*   **Like Terms:** Terms that have the exact same variables raised to the exact same powers (e.g., $2x$ and $-7x$ are like terms; $3y^2$ and $y^2$ are like terms; but $5x$ and $5x^2$ are *not* like terms).
*   **Distributive Property:** The rule that states $a(b+c) = ab + ac$, which is crucial for removing parentheses.
*   **Order of Operations (PEMDAS/BODMAS):** The sequence in which mathematical operations should be performed (Parentheses/Brackets, Exponents/Orders, Multiplication and Division (from left to right), Addition and Subtraction (from left to right)).

## 4. The core idea — step by step

The fundamental principle behind adding and subtracting algebraic expressions is simple: you can only combine "like terms." Everything else stays separate.

### Step 1: Understand Algebraic Expressions

*   **Plain English:** An algebraic expression is like a mathematical sentence or recipe that uses numbers, variables (letters representing unknown values), and mathematical operations ($+, -, \times, \div$). It doesn't have an equals sign, so it's not a complete statement like an equation; it's just a phrase.
*   **Small concrete example:** $5x + 3y - 7$ is an algebraic expression. It has three parts (terms) connected by addition and subtraction.
*   **Formal/Mathematical Version:** An algebraic expression is a finite combination of constants, variables, and algebraic operations (addition, subtraction, multiplication, division, exponentiation by a rational exponent).
*   **What could go wrong:** Confusing an expression with an equation. An expression can be simplified, but an equation can be solved for the variable.

### Step 2: Identify Terms within an Expression

*   **Plain English:** Terms are the individual "chunks" of an expression, separated by plus or minus signs. Each term includes its sign.
*   **Small concrete example:** In the expression $4x^2 - 2x + 7y - 1$, the terms are:
    *   $4x^2$
    *   $-2x$ (the minus sign belongs to the $2x$)
    *   $+7y$ (or just $7y$)
    *   $-1$
*   **Formal/Mathematical Version:** A term is a single number (constant), a single variable, or the product of a number and one or more variables raised to non-negative integer powers.
*   **What could go wrong:** Forgetting that the sign immediately preceding a term is part of that term. Forgetting that a constant like '$-1$' is also a term.

### Step 3: Identify Like Terms

*   **Plain English:** Like terms are terms that are "the same kind." This means they must have the exact same variables, and each variable must be raised to the exact same power. The numerical part (the coefficient) can be different.
*   **Small concrete example:**
    *   $3x$ and $-7x$ are like terms (both have $x$ to the power of 1).
    *   $5y^2$ and $\frac{1}{2}y^2$ are like terms (both have $y^2$).
    *   $4ab$ and $-2ab$ are like terms (both have $ab$).
    *   $6$ and $-10$ are like terms (both are constants).
    *   *But*: $3x$ and $3x^2$ are *not* like terms ($x$ vs. $x^2$).
    *   *And*: $4x$ and $4y$ are *not* like terms ($x$ vs. $y$).
*   **Formal/Mathematical Version:** Two terms are called like terms if they have identical variable parts, including the exponents for each variable.
*   **What could go wrong:** Mistaking terms with different variable powers (e.g., $x$ and $x^2$) or different variables (e.g., $x$ and $y$) as like terms.

### Step 4: Combine Like Terms by Adding/Subtracting their Coefficients

*   **Plain English:** Once you've found terms that are "the same kind," you can combine them. You do this by simply adding or subtracting the numbers in front of them (the coefficients). The variable part stays exactly the same.
*   **Small concrete example:**
    *   To combine $3x + 7x$: You have "3 apples" and "7 apples", so you have $(3+7)$ apples, which is $10x$.
    *   To combine $5y^2 - 2y^2$: You have "5 special oranges" and take away "2 special oranges", leaving $(5-2)$ special oranges, which is $3y^2$.
*   **Formal/Mathematical Version:** For any like terms $ax^n$ and $bx^n$, their sum is $(a+b)x^n$ and their difference is $(a-b)x^n$. This is a direct application of the distributive property in reverse: $ax^n + bx^n = (a+b)x^n$.
*   **What could go wrong:** Accidentally changing the variable part (e.g., $3x + 7x = 10x^2$) or trying to combine unlike terms (e.g., $3x + 5y = 8xy$).

### Step 5: Handle Parentheses Using the Distributive Property

*   **Plain English:** If your expression has parts enclosed in parentheses, you need to "distribute" any number or sign outside the parentheses to *every* term inside them before you can combine anything.
    *   If a number is outside, multiply it by each term inside.
    *   If a minus sign is outside, it changes the sign of *every* term inside.
*   **Small concrete example:**
    *   $2(x + 3y) = 2 \times x + 2 \times 3y = 2x + 6y$
    *   $-(4a - 5b) = -1 \times 4a - 1 \times (-5b) = -4a + 5b$ (notice how $-(-5b)$ becomes $+5b$)
*   **Formal/Mathematical Version:** For any real numbers $a, b, c$, the distributive property states $a(b+c) = ab + ac$ and $a(b-c) = ab - ac$. When a negative sign precedes parentheses, it acts as multiplication by $-1$: $-(b+c) = -1(b+c) = -1 \cdot b + (-1) \cdot c = -b - c$.
*   **What could go wrong:** Forgetting to distribute the number/sign to *all* terms inside the parentheses, especially the negative sign. Forgetting to change the sign of the second term when distributing a negative.

### Step 6: Simplify the Entire Expression

*   **Plain English:** After distributing and combining all like terms, arrange the remaining terms. Usually, we write terms with higher powers first, then lower powers, and finally constant terms. If there are multiple variables, a common convention is alphabetical order. The goal is to have an expression where no more like terms can be combined.
*   **Small concrete example:** If you start with $3x + 5y - 2x + y - 7$, you'd combine $3x$ and $-2x$ to get $x$, and $5y$ and $y$ to get $6y$. The $-7$ is a constant. So the simplified expression is $x + 6y - 7$.
*   **Formal/Mathematical Version:** The process of simplifying an algebraic expression involves applying the distributive property to remove parentheses and then combining all like terms until the expression contains no further like terms.
*   **What could go wrong:** Making arithmetic errors during combination, or missing some like terms that could still be combined.

## 5. Worked examples — multiple, with every step shown

Here are several examples, ranging from simpler to more complex, demonstrating the step-by-step process.

### Example 1: Basic Combination of Like Terms

**Problem:** Simplify the expression $5x + 3y - 2x + 7y$.

**Given:** An algebraic expression with four terms.
**Want:** To simplify the expression by combining like terms.

**Solution:**

1.  $$5x + 3y - 2x + 7y$$
    *   *Explanation:* This is our original expression. We need to identify and group like terms.

2.  $$(5x - 2x) + (3y + 7y)$$
    *   *Explanation:* We've rearranged the terms to group the 'x' terms together and the 'y' terms together. Remember to keep the sign with each term!

3.  $$(5 - 2)x + (3 + 7)y$$
    *   *Explanation:* Now we apply the distributive property in reverse. We factor out the common variable from each group of like terms. This highlights that we only add/subtract the coefficients.

4.  $$3x + 10y$$
    *   *Explanation:* Perform the arithmetic on the coefficients: $5 - 2 = 3$ and $3 + 7 = 10$. The variables ($x$ and $y$) remain unchanged. Since $3x$ and $10y$ are unlike terms, we cannot combine them further.

**Final Answer:** $\boxed{3x + 10y}$

*Reflection:* This example was straightforward, focusing purely on identifying and combining like terms without parentheses. The key is to correctly identify the like terms and perform the coefficient arithmetic.

### Example 2: Expressions with Parentheses and Subtraction

**Problem:** Simplify the expression $(4a - 2b) - (a + 5b)$.

**Given:** Two algebraic expressions enclosed in parentheses, with subtraction between them.
**Want:** To simplify by removing parentheses and combining like terms.

**Solution:**

1.  $$(4a - 2b) - (a + 5b)$$
    *   *Explanation:* This is the original expression. The first step is to remove the parentheses.

2.  $$4a - 2b - 1(a + 5b)$$
    *   *Explanation:* The first set of parentheses has an implied positive 1 in front, so removing them doesn't change the terms inside. The second set of parentheses has a negative sign in front, which is equivalent to multiplying by $-1$.

3.  $$4a - 2b - a - 5b$$
    *   *Explanation:* Apply the distributive property for the second set of parentheses: $-1 \times a = -a$ and $-1 \times 5b = -5b$. Notice how the signs of the terms inside the second parentheses *flipped*. This is a common point of error.

4.  $$(4a - a) + (-2b - 5b)$$
    *   *Explanation:* Group the like terms: 'a' terms together and 'b' terms together. Remember that '$-a$' is the same as '$-1a$'.

5.  $$(4 - 1)a + (-2 - 5)b$$
    *   *Explanation:* Factor out the common variables. Now we can clearly see the coefficients to be combined.

6.  $$3a + (-7)b$$
    *   *Explanation:* Perform the arithmetic on the coefficients: $4 - 1 = 3$ and $-2 - 5 = -7$.

7.  $$3a - 7b$$
    *   *Explanation:* Simplify the addition of a negative term. Since $3a$ and $-7b$ are unlike terms, no further simplification is possible.

**Final Answer:** $\boxed{3a - 7b}$

*Reflection:* This example highlights the critical importance of correctly distributing a negative sign across all terms within parentheses. A common mistake is only changing the sign of the first term inside the parentheses.

### Example 3: Multiple Distributive Properties and Exponents

**Problem:** Simplify the expression $3(2x^2 + 5x) - 2(x^2 - 3x) + 7$.

**Given:** An expression with multiple terms, some involving multiplication by constants and parentheses, and terms with different powers of $x$.
**Want:** To simplify to its most compact form.

**Solution:**

1.  $$3(2x^2 + 5x) - 2(x^2 - 3x) + 7$$
    *   *Explanation:* This is our starting expression. We must first deal with the parentheses using the distributive property.

2.  $$(3 \times 2x^2) + (3 \times 5x) - (2 \times x^2) - (2 \times -3x) + 7$$
    *   *Explanation:* Apply the distributive property. For the first set of parentheses, multiply $3$ by $2x^2$ and $5x$. For the second set, multiply $-2$ by $x^2$ and by $-3x$. Pay close attention to the signs.

3.  $$6x^2 + 15x - 2x^2 + 6x + 7$$
    *   *Explanation:* Perform the multiplications. Notice that $-2 \times -3x$ becomes $+6x$. This is another common area for sign errors.

4.  $$(6x^2 - 2x^2) + (15x + 6x) + 7$$
    *   *Explanation:* Group the like terms together. We have $x^2$ terms, $x$ terms, and a constant term.

5.  $$(6 - 2)x^2 + (15 + 6)x + 7$$
    *   *Explanation:* Factor out the common variables from their respective groups of like terms.

6.  $$4x^2 + 21x + 7$$
    *   *Explanation:* Perform the arithmetic on the coefficients: $6 - 2 = 4$ and $15 + 6 = 21$. The constant term $7$ remains as it has no like terms to combine with. These three terms ($4x^2$, $21x$, $7$) are all unlike terms (different powers of $x$, or no $x$ at all), so no further simplification is possible.

**Final Answer:** $\boxed{4x^2 + 21x + 7}$

*Reflection:* This example combines distribution with careful tracking of signs and identification of different powers as distinct like terms. It's crucial to be meticulous with each multiplication step.

### Example 4: Multiple Variables and Fractions

**Problem:** Simplify the expression $\frac{1}{2}xy + 3x - \frac{3}{4}xy - 2y + 5x$.

**Given:** An expression with multiple variables, fractional coefficients, and different types of terms.
**Want:** To simplify by combining like terms.

**Solution:**

1.  $$\frac{1}{2}xy + 3x - \frac{3}{4}xy - 2y + 5x$$
    *   *Explanation:* This is the original expression. We need to identify the like terms.

2.  $$\left(\frac{1}{2}xy - \frac{3}{4}xy\right) + (3x + 5x) - 2y$$
    *   *Explanation:* Group the like terms. We have 'xy' terms, 'x' terms, and a 'y' term. The 'y' term is by itself, so it doesn't need a group.

3.  $$\left(\frac{1}{2} - \frac{3}{4}\right)xy + (3 + 5)x - 2y$$
    *   *Explanation:* Factor out the common variables. Now we need to perform the fraction arithmetic for the 'xy' terms and integer arithmetic for the 'x' terms.

4.  $$\left(\frac{2}{4} - \frac{3}{4}\right)xy + 8x - 2y$$
    *   *Explanation:* To subtract fractions, they must have a common denominator. $\frac{1}{2}$ is equivalent to $\frac{2}{4}$. For the 'x' terms, $3+5=8$.

5.  $$-\frac{1}{4}xy + 8x - 2y$$
    *   *Explanation:* Perform the fraction subtraction: $\frac{2}{4} - \frac{3}{4} = -\frac{1}{4}$. The 'x' and 'y' terms remain unchanged. Since all remaining terms ($-\frac{1}{4}xy$, $8x$, $-2y$) are unlike terms, the expression is fully simplified.

**Final Answer:** $\boxed{-\frac{1}{4}xy + 8x - 2y}$

*Reflection:* This example introduces fractional coefficients and multiple variables, requiring careful attention to fraction arithmetic while still adhering to the core principle of combining only like terms.

## 6. Common mistakes and traps

Students often stumble on a few key areas when adding and subtracting algebraic expressions. Being aware of these can help you avoid them.

1.  **Forgetting to distribute a negative sign:** This is arguably the most common mistake. When you have a minus sign outside parentheses, like $-(A - B)$, it changes the sign of *every* term inside: $-(A - B) = -A + B$. Students often only change the sign of the first term, getting $-A - B$.
2.  **Incorrectly combining unlike terms:** Trying to add or subtract terms that don't have the exact same variables and exponents. For example, $3x + 2x^2$ cannot be combined into $5x^3$ or $5x^2$ or $5x$. They must remain separate.
3.  **Arithmetic errors with coefficients:** Simple mistakes in adding or subtracting positive and negative numbers. For instance, $-5 - 3 = -8$, not $-2$ or $8$.
4.  **Ignoring implied coefficients of 1:** A term like $x$ or $-y$ actually has a coefficient of $1$ or $-1$. So, $x + 3x = 1x + 3x = 4x$, and $5y - y = 5y - 1y = 4y$.
5.  **Changing exponents when combining:** When adding or subtracting like terms, only the coefficients change. The variable part, including its exponent, remains the same. For example, $2x^2 + 3x^2 = 5x^2$, not $5x^4$. Exponents only change during multiplication or division of variables.
6.  **Incorrect order of operations:** While simplifying, always address parentheses first (using distribution), then combine like terms. Don't try to combine terms inside parentheses with terms outside until distribution is complete.

## 7. Textbook-precise explanation

An **algebraic expression** is a mathematical phrase that consists of constants, variables, and algebraic operations (addition, subtraction, multiplication, division, exponentiation by rational exponents). It does not contain an equality sign.

A **term** in an algebraic expression is a single number (a **constant**), a single variable, or a product of numbers and variables. Terms are separated by addition or subtraction operations. For example, in the expression $5x^2 - 3xy + 7$, the terms are $5x^2$, $-3xy$, and $7$.

The **coefficient** of a term is the numerical factor multiplied by the variable(s) in that term. In $5x^2$, the coefficient is $5$. In $-3xy$, the coefficient is $-3$. A term like $x$ has an implied coefficient of $1$.

**Like terms** (or similar terms) are terms that have the exact same variable parts, including the exponents for each variable. Their coefficients may differ. For instance, $4x^3$ and $-7x^3$ are like terms. $2ab^2$ and $9ab^2$ are like terms. However, $5x$ and $5x^2$ are not like terms, nor are $3x$ and $3y$.

The **addition and subtraction of algebraic expressions** is the process of combining like terms within one or more expressions to simplify them into a single, more compact expression. This process relies fundamentally on the **Distributive Property**: for any real numbers $a, b, c$, $a(b+c) = ab + ac$.

**Procedure for Adding/Subtracting Algebraic Expressions:**

1.  **Remove Parentheses:**
    *   If a positive sign or no sign precedes the parentheses, remove them without changing the signs of the terms inside: $+(A+B) = A+B$.
    *   If a negative sign precedes the parentheses, distribute the negative sign (equivalent to multiplying by $-1$) to *every* term inside, thereby changing the sign of each term: $-(A+B) = -A-B$ and $-(A-B) = -A+B$.
2.  **Identify Like Terms:** Group terms that have identical variable parts (same variables raised to the same powers).
3.  **Combine Like Terms:** Add or subtract the coefficients of the like terms. The variable part of the term remains unchanged. This step is a direct application of the distributive property in reverse: $ax^n + bx^n = (a+b)x^n$.
4.  **Simplify:** Write the resulting expression with no more like terms. Customarily, terms are ordered by decreasing power of a primary variable, then alphabetically for secondary variables, followed by constants.

This process ensures that the simplified expression is equivalent to the original, representing the same value for any given values of the variables.

(Refer to "Blitzer, Algebra for College Students, 8e, Chapter R.5" or "Stewart, Precalculus, 7e, Chapter P.3" for further formal treatment.)

## 8. ASCII diagrams

Let's visualize "like terms" and combining them. Imagine different shapes representing different variables or powers of variables.

```text
Visualizing Like Terms:

We have an expression:   3x + 2y + 5x - y

Step 1: Identify the "types" of terms.
'x' terms (circles)      :  O  O  O
'y' terms (squares)      :  [] []

Step 2: Group the like terms.
Original:    O  O  O  +  [] []  +  O  O  O  O  O  -  []

Grouped:     ( O  O  O  +  O  O  O  O  O )  +  ( [] []  -  [] )
             ^ 'x' terms ^                  ^ 'y' terms ^

Step 3: Combine the groups by adding/subtracting their counts (coefficients).
'x' terms:   3 O + 5 O  =  8 O
             O O O O O O O O

'y' terms:   2 [] - 1 [] =  1 []
             []

Step 4: Write the simplified expression.
Result:      8x + 1y  (or simply 8x + y)
             O O O O O O O O  +  []
```

This diagram illustrates that when you combine like terms, you're essentially counting how many of each "type" of variable you have. The variable itself (the shape) doesn't change, only its quantity (the count).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Apples and Oranges" Rule:** You can only add or subtract apples with other apples, and oranges with other oranges. You can't combine apples and oranges into some new "apple-orange" fruit.
    *   **"Like Terms, Like Kind" Mantra:** Repeat this to yourself whenever you see an expression. "Only *like* terms can be combined, because they are of the *like* kind."
    *   **The "Negative Sign is a Sign-Flipper" Visual:** When you see a minus sign in front of parentheses, visualize it as a magic wand that flips the sign of *everything* inside the parentheses. If it was positive, it becomes negative; if it was negative, it becomes positive.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **The Core Rule:** $ax^n + bx^n = (a+b)x^n$ (Only coefficients change, variable part stays the same).
    *   **Distributive Property (Key for Parentheses):** $a(b+c) = ab + ac$.
    *   **Negative Distribution:** $-(A+B) = -A - B$ and $-(A-B) = -A + B$. This is critical.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, do all self-check questions.
    *   **Day 3:** Rework 2-3 examples from memory, focusing on distribution and sign changes.
    *   **Day 7:** Find 2 new problems from a textbook or online, solve them.
    *   **Day 16:** Create your own complex expression with parentheses, multiple variables, and fractions, then simplify it.
    *   **Day 35:** Explain the concept of combining like terms and the distributive property to someone else (or an imaginary student) without looking at notes.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget how to add or subtract algebraic expressions, always go back to the **Distributive Property**.
    *   **What is $3x + 5x$?** It means three $x$'s added to five $x$'s. By the distributive property, we can "factor out" the common $x$: $3x + 5x = (3+5)x = 8x$. This shows why only coefficients combine and the variable part remains.
    *   **What is $-(A+B)$?** This is equivalent to $-1 \times (A+B)$. By the distributive property, $-1 \times (A+B) = (-1 \times A) + (-1 \times B) = -A - B$. This shows why the negative sign flips all signs inside.
    *   The entire process of combining like terms is a repeated application of the distributive property.

## 10. Connections — what this leads to

Mastering the addition and subtraction of algebraic expressions is not an end in itself; it's a foundational skill that unlocks a vast array of more advanced mathematical concepts.

1.  **Solving Linear Equations:** The very first step in solving many linear equations (e.g., $3x + 5 = x - 7$) often involves combining like terms on each side of the equation to simplify it before isolating the variable.
2.  **Polynomial Operations:** Adding and subtracting algebraic expressions is the direct precursor to adding and subtracting polynomials, which are just algebraic expressions where variables have non-negative integer exponents. This forms the basis for more complex polynomial operations like multiplication and division.
3.  **Simplifying Rational Expressions:** When you add or subtract fractions that contain algebraic expressions (rational expressions), you often need to combine like terms in the numerator or denominator after finding a common denominator.
4.  **Functions and Function Operations:** If you have two functions, say $f(x) = 2x + 3$ and $g(x) = 5x - 1$, finding $(f+g)(x)$ or $(f-g)(x)$ directly involves adding or subtracting their algebraic expressions: $(f+g)(x) = (2x+3) + (5x-1) = 7x+2$.
5.  **Introduction to Calculus:** When you learn derivatives in calculus, you'll often end up with complex algebraic expressions that need to be simplified by combining like terms to present the derivative in its most compact and useful form.
6.  **Linear Algebra:** Concepts like vector addition and matrix addition involve combining corresponding components, which is analogous to combining like terms. For example, adding two vectors $(2x, 3y)$ and $(4x, -y)$ results in $(2x+4x, 3y-y) = (6x, 2y)$.
7.  **Real-World Modeling:** Any time you build a mathematical model to represent a real-world scenario, you will inevitably combine different quantities (represented by variables) using addition and subtraction to arrive at a total or a net effect.

## 11. Self-check questions

1.  Simplify: $7a - 3b + 2a + 5b$
2.  Simplify: $(5x^2 - 4x + 1) + (3x^2 + 7x - 6)$
3.  Simplify: $(2y - 8) - (5y + 3)$
4.  Simplify: $4(3m + 2n) - 3(m - 5n) + 10$
5.  Simplify: $\frac{2}{3}ab - 5a + \frac{1}{6}ab + 2a - \frac{1}{2}b$