## 1. What it is — in plain English

Imagine you have a perfectly balanced scale, like a seesaw. On one side, you put some known weights, and on the other side, you put some known weights *and* a mystery box. You want to figure out how much the mystery box weighs to keep the scale perfectly level.

In mathematics, a "linear equation in one variable" is exactly this scenario. It's a statement that two mathematical expressions are equal, and within those expressions, there's only one type of "mystery box" whose value we need to find. We call this mystery box a "variable," usually represented by letters like $x$, $y$, or $z$.

"Linear" simply means that our mystery box (variable) isn't multiplied by itself (no $x^2$ or $x^3$), nor is it inside a square root or a fraction's denominator. It just appears as itself, perhaps multiplied by a number. "In one variable" means there's only one kind of mystery box; you won't see both $x$ and $y$ in the same equation we're tackling here.

"Solving" the equation means finding the specific number that, when substituted for the variable, makes the equality true and keeps our mathematical scale perfectly balanced. The "transposition method" is a clever, quick way to move terms around in the equation to isolate our mystery variable, making it easier to find its weight. It's like moving weights on the seesaw to get the mystery box by itself on one side.

## 2. Why it matters — real-world applications

Linear equations in one variable are fundamental building blocks in almost every quantitative field. They might seem simple, but their ability to model direct relationships and solve for unknowns makes them indispensable.

1.  **Physics and Engineering (e.g., Aerospace):** When engineers at SpaceX design a rocket, they use linear equations to calculate basic parameters. For example, if a rocket needs to accelerate at a certain rate ($a$) and has a known mass ($m$), they might use a simplified form of Newton's second law ($F = ma$) to find the required thrust force ($F$). If they know the force and acceleration, they can solve for the mass. Or, if calculating fuel consumption, a linear equation might determine how much fuel is needed for a specific distance given a known burn rate.
2.  **Finance and Business (e.g., Budgeting & Break-Even Analysis):** Businesses use linear equations to determine their break-even point – the number of units they need to sell to cover all their costs. If fixed costs are $F$, variable cost per unit is $V$, and selling price per unit is $P$, the break-even point $x$ can be found by setting total cost equal to total revenue: $F + Vx = Px$. Solving for $x$ tells them how many items to sell. Personal finance apps also use linear equations to project savings or loan payments over time.
3.  **Computer Science and Machine Learning (e.g., Simple Models):** While advanced ML uses complex algorithms, the simplest form of predictive modeling, called linear regression, is built upon the idea of finding a "line of best fit" for data. At its core, this involves solving systems of linear equations (which are extensions of the one-variable kind). Even in game development, if a character moves at a constant speed, a linear equation can determine how long it takes to reach a destination or where it will be at a certain time.

## 3. Prerequisites — what you must know first

Before diving into solving linear equations, ensure you have a solid grasp of these foundational concepts. If any of these feel unfamiliar, pause and review them.

*   **Numbers:**
    *   **Integers:** Whole numbers and their opposites ($\dots, -2, -1, 0, 1, 2, \dots$).
    *   **Rational Numbers:** Numbers that can be expressed as a fraction $p/q$ where $p, q$ are integers and $q \neq 0$ (e.g., $1/2, -3/4, 5$).
    *   **Real Numbers:** All rational and irrational numbers (all numbers on the number line).
*   **Arithmetic Operations:**
    *   **Addition, Subtraction, Multiplication, Division:** Proficiency with these operations, including working with positive and negative numbers (e.g., $-5 + 3 = -2$, $4 \times (-2) = -8$, $-10 \div -2 = 5$).
*   **Order of Operations (PEMDAS/BODMAS):** Knowing the correct sequence to perform operations in an expression (Parentheses/Brackets, Exponents/Orders, Multiplication and Division (left-to-right), Addition and Subtraction (left-to-right)).
*   **Variables:** Understanding that a letter (like $x, y, a$) represents an unknown numerical value.
*   **Algebraic Expressions:** Combinations of variables, numbers, and operation symbols (e.g., $3x + 7$, $y - 5$, $2(z+1)$).
*   **Equality:** The meaning of the `=` sign, indicating that the expression on the left side has the exact same value as the expression on the right side.
*   **Inverse Operations:** Understanding that addition and subtraction are inverse operations (they "undo" each other), and multiplication and division are inverse operations.

## 4. The core idea — step by step

Solving a linear equation in one variable is like a detective mission: you have clues (the numbers and operations in the equation), and you need to find the identity of the culprit (the variable's value). The "transposition method" is a powerful tool in your detective kit.

### Step 1: The Goal - Isolate the Variable

*   **Plain English:** Your ultimate aim is to get the variable (e.g., $x$) completely by itself on one side of the equals sign, with a number on the other side. This number will be the solution.
*   **Small Concrete Example:** If you have $x + 5 = 10$, you want to end up with something like $x = \text{a number}$.
*   **Formal/Mathematical Version:** The objective is to manipulate the equation, using valid algebraic operations, such that the variable term (e.g., $ax$) is isolated on one side of the equality, and a constant term is on the other side. Ultimately, you aim for the form $x = c$, where $c$ is a constant.
*   **What could go wrong:** Students sometimes lose sight of this goal and perform operations without a clear purpose, making the equation more complex instead of simpler.

### Step 2: The Balance Principle (Foundation of Transposition)

*   **Plain English:** An equation is like a perfectly balanced seesaw. Whatever you do to one side of the seesaw (add weight, remove weight, multiply weight), you *must* do the exact same thing to the other side to keep it balanced. This is the fundamental rule for all equation solving.
*   **Small Concrete Example:** If you know that $A = B$, then if you add $C$ to $A$, you *must* add $C$ to $B$ to maintain equality: $A+C = B+C$. Similarly, $A-C = B-C$, $A \times C = B \times C$, and if $C \neq 0$, $A \div C = B \div C$.
*   **Formal/Mathematical Version:** For any real numbers $a, b, c$:
    *   **Addition Property of Equality:** If $a = b$, then $a+c = b+c$.
    *   **Subtraction Property of Equality:** If $a = b$, then $a-c = b-c$.
    *   **Multiplication Property of Equality:** If $a = b$, then $ac = bc$.
    *   **Division Property of Equality:** If $a = b$ and $c \neq 0$, then $a/c = b/c$.
*   **What could go wrong:** Forgetting to apply an operation to *both* sides of the equation. This is the most common and critical error.

### Step 3: Understanding Transposition (The Shortcut)

*   **Plain English:** Transposition is a shortcut based on the balance principle. It means you can move a term from one side of the equals sign to the other side, *provided you change its sign*. If it was adding on one side, it becomes subtracting on the other. If it was subtracting, it becomes adding.
*   **Small Concrete Example:** Consider $x + 5 = 10$.
    *   Using the balance principle: $x + 5 - 5 = 10 - 5 \implies x = 5$.
    *   Using transposition: Move the $+5$ from the left side to the right side, changing its sign: $x = 10 - 5 \implies x = 5$. Notice it's the same result, but quicker.
*   **Formal/Mathematical Version:** When a term is moved from one side of an equation to the other, its additive inverse is effectively added to both sides. For example, given $A+B=C$, to isolate $A$, we subtract $B$ from both sides: $A+B-B = C-B$, which simplifies to $A = C-B$. The "transposition" rule is a concise way to state this outcome: "move $B$ to the other side and change its sign."
*   **What could go wrong:**
    *   Changing the sign of a term that *isn't* being moved across the equals sign.
    *   Changing the sign of a *factor* (something multiplied) instead of a *term* (something added or subtracted). For instance, in $2x = 10$, you don't transpose the $2$ to $-2$; you divide by $2$.

### Step 4: Order of Operations (Inverse Order for Solving)

*   **Plain English:** When you evaluate an expression (like $2 \times 3 + 4$), you follow PEMDAS (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction). When you *solve* an equation, you essentially "undo" these operations in the *reverse* order. You generally deal with addition/subtraction terms first, then multiplication/division factors.
*   **Small Concrete Example:** To solve $2x + 3 = 11$:
    1.  Undo the addition: Transpose the $+3$ first.
    2.  Undo the multiplication: Then deal with the $2$ multiplying $x$.
*   **Formal/Mathematical Version:** To isolate the variable, operations are undone in the reverse order of the standard order of operations. This typically means addressing addition and subtraction terms first, then multiplication and division factors, then exponents, and finally operations within parentheses (if any need to be expanded).
*   **What could go wrong:** Trying to divide by a coefficient before moving constant terms. For example, in $2x+3=11$, if you divide by 2 first, you'd get $x + \frac{3}{2} = \frac{11}{2}$, which is correct but often leads to more complex fractions earlier than necessary.

### Step 5: Combining Like Terms

*   **Plain English:** If you have multiple terms with the variable (e.g., $3x$ and $2x$) or multiple constant numbers, you should group them together. Get all the variable terms on one side of the equation and all the constant terms on the other side.
*   **Small Concrete Example:** To solve $3x + 5 = x + 11$:
    1.  Move $x$ from the right to the left (it becomes $-x$).
    2.  Move $5$ from the left to the right (it becomes $-5$).
    3.  This gives: $3x - x = 11 - 5$.
    4.  Then combine: $2x = 6$.
*   **Formal/Mathematical Version:** Utilize the transposition method to collect all terms containing the variable on one side of the equation and all constant terms on the other side. Once grouped, combine these like terms by performing the indicated addition or subtraction.
*   **What could go wrong:** Forgetting to change the sign when transposing a term, or incorrectly combining unlike terms (e.g., trying to add $3x$ and $5$).

### Step 6: Final Isolation

*   **Plain English:** Once you have a single variable term (like $2x$) equal to a single number (like $6$), the last step is to get $x$ completely alone. If $x$ is multiplied by a number, you divide by that number. If $x$ is divided by a number, you multiply by that number.
*   **Small Concrete Example:** If you have $2x = 6$, you divide both sides by $2$ to get $x = 3$. If you have $\frac{x}{3} = 4$, you multiply both sides by $3$ to get $x = 12$.
*   **Formal/Mathematical Version:** If the variable is multiplied by a non-zero coefficient $a$ (i.e., $ax = b$), divide both sides of the equation by $a$. If the variable is divided by a non-zero constant $a$ (i.e., $x/a = b$), multiply both sides of the equation by $a$.
*   **What could go wrong:** Dividing by zero (which is undefined), or performing the inverse operation incorrectly.

## 5. Worked examples — multiple, with every step shown

Here are several examples, ranging in complexity, demonstrating the transposition method.

### Example 1: Basic Addition/Subtraction

**Problem:** Solve for $x$: $x + 7 = 15$

**What's given:** An equation with $x$ and constants.
**What we want:** The value of $x$.

$$
x + 7 = 15
$$
**Step 1:** Identify the term to be moved. We want to isolate $x$, so the $+7$ needs to move.
$$
x = 15 - 7
$$
**Explanation:** We transpose the $+7$ from the left side to the right side. When a term moves across the equals sign, its sign changes. So, $+7$ becomes $-7$.
$$
x = 8
$$
**Explanation:** Perform the subtraction on the right side.
$$
\boxed{x = 8}
$$
**Reflection:** This was a straightforward application of transposing an additive term. The key is remembering to change the sign.

---

### Example 2: Basic Multiplication/Division

**Problem:** Solve for $y$: $3y - 5 = 10$

**What's given:** An equation with $y$ multiplied by a coefficient and a constant.
**What we want:** The value of $y$.

$$
3y - 5 = 10
$$
**Step 1:** Isolate the term containing the variable ($3y$). This means moving the constant term $(-5)$ to the other side.
$$
3y = 10 + 5
$$
**Explanation:** We transpose the $-5$ from the left side to the right side. It changes its sign from negative to positive.
$$
3y = 15
$$
**Explanation:** Perform the addition on the right side.
$$
\frac{3y}{3} = \frac{15}{3}
$$
**Explanation:** The variable $y$ is multiplied by $3$. To undo multiplication, we perform the inverse operation: division. We must divide *both* sides of the equation by $3$ to maintain balance.
$$
y = 5
$$
**Explanation:** Perform the division on both sides.
$$
\boxed{y = 5}
$$
**Reflection:** This example combined transposing an additive term with then dividing by a coefficient. It reinforces the reverse PEMDAS order for solving: deal with addition/subtraction first, then multiplication/division.

---

### Example 3: Variables on Both Sides

**Problem:** Solve for $z$: $5z - 8 = 2z + 7$

**What's given:** An equation with the variable $z$ on both sides, and constants on both sides.
**What we want:** The value of $z$.

$$
5z - 8 = 2z + 7
$$
**Step 1:** Collect all variable terms on one side (let's choose the left) and all constant terms on the other side (the right).
$$
5z - 2z - 8 = 7
$$
**Explanation:** We transpose the $2z$ from the right side to the left side. It changes its sign from positive to negative.
$$
5z - 2z = 7 + 8
$$
**Explanation:** We transpose the $-8$ from the left side to the right side. It changes its sign from negative to positive.
$$
3z = 15
$$
**Explanation:** Combine like terms on both sides: $5z - 2z = 3z$ and $7 + 8 = 15$.
$$
\frac{3z}{3} = \frac{15}{3}
$$
**Explanation:** The variable $z$ is multiplied by $3$. Divide both sides by $3$ to isolate $z$.
$$
z = 5
$$
**Explanation:** Perform the division.
$$
\boxed{z = 5}
$$
**Reflection:** This example introduced the need to move variable terms as well as constant terms. The principle remains the same: transpose by changing the sign. It's often helpful to choose the side that will keep the variable's coefficient positive, if possible.

---

### Example 4: Distributive Property and Fractions

**Problem:** Solve for $x$: $2(x - 3) + 4 = \frac{x}{2} + 1$

**What's given:** An equation involving the distributive property, a fraction, and constants.
**What we want:** The value of $x$.

$$
2(x - 3) + 4 = \frac{x}{2} + 1
$$
**Step 1:** Apply the distributive property to remove parentheses.
$$
2x - 6 + 4 = \frac{x}{2} + 1
$$
**Explanation:** Multiply $2$ by each term inside the parentheses: $2 \times x = 2x$ and $2 \times (-3) = -6$.
$$
2x - 2 = \frac{x}{2} + 1
$$
**Explanation:** Combine the constant terms on the left side: $-6 + 4 = -2$.
**Step 2:** Eliminate the fraction. Multiply every term in the entire equation by the least common multiple (LCM) of the denominators. Here, the only denominator is $2$, so the LCM is $2$.
$$
2 \times (2x) - 2 \times (2) = 2 \times \left(\frac{x}{2}\right) + 2 \times (1)
$$
**Explanation:** Multiply every single term on *both* sides of the equation by $2$. This is a crucial step to clear fractions and avoid errors.
$$
4x - 4 = x + 2
$$
**Explanation:** Perform the multiplications. Notice that $2 \times \frac{x}{2}$ simplifies to $x$.
**Step 3:** Collect variable terms on one side and constant terms on the other.
$$
4x - x - 4 = 2
$$
**Explanation:** Transpose $x$ from the right to the left, changing its sign from positive to negative.
$$
4x - x = 2 + 4
$$
**Explanation:** Transpose $-4$ from the left to the right, changing its sign from negative to positive.
$$
3x = 6
$$
**Explanation:** Combine like terms: $4x - x = 3x$ and $2 + 4 = 6$.
**Step 4:** Isolate $x$.
$$
\frac{3x}{3} = \frac{6}{3}
$$
**Explanation:** Divide both sides by $3$ to undo the multiplication.
$$
x = 2
$$
**Explanation:** Perform the division.
$$
\boxed{x = 2}
$$
**Reflection:** This example was more complex due to the distributive property and the fraction. The key takeaways are to handle parentheses first, then clear fractions by multiplying *all* terms by the LCM, and then proceed with transposing terms as usual. Each step simplifies the equation progressively.

## 6. Common mistakes and traps

Students often fall into predictable traps when solving linear equations. Being aware of these can help you avoid them.

1.  **Sign Errors During Transposition:** The most frequent mistake. Forgetting to change the sign of a term when moving it from one side of the equals sign to the other (e.g., $x+5=10 \implies x=10+5$ instead of $x=10-5$).
2.  **Incorrect Order of Operations (When Solving):** Trying to divide by a coefficient before moving constant terms (e.g., in $2x+6=10$, dividing by $2$ first to get $x+3=5$ is technically valid but often leads to mistakes if not applied carefully to all terms, and it's generally easier to transpose constants first).
3.  **Applying Operation to Only One Side:** Violating the balance principle by adding, subtracting, multiplying, or dividing only one side of the equation (e.g., in $x+5=10$, subtracting $5$ from the left side but not the right side).
4.  **Distributing Incorrectly:** When parentheses are involved, forgetting to multiply *every* term inside the parentheses by the factor outside (e.g., $2(x+3)$ becoming $2x+3$ instead of $2x+6$).
5.  **Confusing Terms and Factors:** Applying transposition to a factor rather than a term. Transposition (changing sign) applies to terms (things added or subtracted). For factors (things multiplied or divided), you use the inverse operation (division or multiplication) on both sides (e.g., in $3x=12$, you divide by $3$, not transpose $3$ to $-3$).
6.  **Errors with Fractions:** Forgetting to multiply *every single term* in the equation by the common denominator when clearing fractions. Often, students multiply the fractional terms but forget the integer terms.

## 7. Textbook-precise explanation

A **linear equation in one variable** is an equation that can be written in the standard form $ax + b = 0$, where $a$ and $b$ are real numbers, and $a \neq 0$. The variable is $x$. A **solution** to such an equation is a value of $x$ that makes the equation a true statement. The set of all solutions is called the **solution set**.

The process of solving a linear equation relies on the **Properties of Equality**:

1.  **Addition Property of Equality:** If $A = B$, then $A + C = B + C$ for any real number $C$.
2.  **Subtraction Property of Equality:** If $A = B$, then $A - C = B - C$ for any real number $C$.
3.  **Multiplication Property of Equality:** If $A = B$, then $AC = BC$ for any real number $C$.
4.  **Division Property of Equality:** If $A = B$ and $C \neq 0$, then $A/C = B/C$ for any real number $C$.

The **transposition method** is a practical application of the Addition and Subtraction Properties of Equality. When a term, say $+c$, is moved from one side of an equation to the other, it appears as $-c$. This is because, formally, we are applying the Subtraction Property of Equality by subtracting $c$ from both sides:
Given $x + c = d$,
Subtract $c$ from both sides: $(x + c) - c = d - c$
This simplifies to $x = d - c$.
Similarly, if a term, say $-c$, is moved, it appears as $+c$ on the other side, due to the Addition Property of Equality.

To solve a linear equation using transposition:

1.  **Simplify each side** of the equation by distributing and combining like terms.
2.  **Clear fractions or decimals** by multiplying all terms by the least common multiple (LCM) of the denominators or by an appropriate power of 10.
3.  **Transpose variable terms** to one side of the equation (typically the left) and **constant terms** to the other side (typically the right), remembering to change the sign of each term as it crosses the equality symbol.
4.  **Combine like terms** on both sides.
5.  **Isolate the variable** by dividing both sides by its coefficient (using the Division Property of Equality).

*Reference: Lial, Hornsby, Schneider, Daniels, *Beginning & Intermediate Algebra*, 7th Edition, Pearson, §2.1. Also, Sullivan, *Precalculus*, 11th Edition, Pearson, §1.1.*

## 8. ASCII diagrams

The concept of an equation as a balanced scale is crucial for understanding why we perform operations on both sides, and why transposition works.

```text
       The Balance Principle
       ===================

Imagine an old-fashioned scale:

     _______
    /       \
   /         \
  |           |
  |           |
 /|\         /|\
/ | \       / | \
----|-------|----
    |       |
   [LHS]   [RHS]   <-- This represents an equation: LHS = RHS

If we have:  2x + 3 = 11

     _______
    /       \
   /         \
  |           |
  |           |
 /|\         /|\
/ | \       / | \
----|-------|----
    |       |
   [2x+3]  [11  ]   <-- The scale is balanced.

Now, we want to move the '+3' to the other side.
In essence, we are removing 3 from the left side.
To keep the scale balanced, we MUST remove 3 from the right side too.

     _______
    /       \
   /         \
  |           |
  |           |
 /|\         /|\
/ | \       / | \
----|-------|----
    |       |
   [2x]    [11-3]   <-- We subtracted 3 from BOTH sides.
                      This is the conceptual basis of transposition.

The result is: 2x = 8

     _______
    /       \
   /         \
  |           |
  |           |
 /|\         /|\
/ | \       / | \
----|-------|----
    |       |
   [2x]    [ 8  ]   <-- Still balanced.

Finally, to get 'x' alone, we divide by 2.
Again, we must do this to BOTH sides.

     _______
    /       \
   /         \
  |           |
  |           |
 /|\         /|\
/ | \       / | \
----|-------|----
    |       |
   [ x]    [ 4  ]   <-- We divided by 2 on BOTH sides.

The solution is: x = 4
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"THE EQUATION IS A BALANCED BRIDGE!"** Imagine the equals sign `=` as a bridge. Whenever a number or variable (a "traveler") crosses this bridge, it *must* pay a "toll" by changing its sign. If it was positive, it becomes negative. If it was negative, it becomes positive. This applies to terms being added or subtracted.
    *   For multiplication/division, think of it as "untying a knot." If $x$ is tied by multiplication ($2x$), you untie it with division. If $x$ is tied by division ($x/2$), you untie it with multiplication.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Balance Principle:** Whatever you do to one side of the equation, you MUST do the exact same thing to the other side. (This is the ultimate truth).
    2.  **Transposition Rule:** When moving a *term* (something added or subtracted) across the equals sign, change its sign. ($x+A=B \implies x=B-A$; $x-A=B \implies x=B+A$).
    3.  **Inverse Operations:** To undo multiplication, divide. To undo division, multiply. (This is for factors, not terms).

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson and practice problems:
        *   **1 day** after initially learning.
        *   **3 days** after the first review.
        *   **7 days** after the second review.
        *   **16 days** after the third review.
        *   **35 days** after the fourth review.
    *   Consistent, spaced practice solidifies understanding and recall.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the "transposition rule" (i.e., changing the sign), always fall back to the **balance principle**.
    *   **Problem:** Solve $x + 7 = 15$.
    *   **Forget the rule?** No problem. I know I need to get $x$ alone. That $+7$ is in the way. How do I get rid of $+7$? I subtract $7$.
    *   **First Principle:** If I subtract $7$ from the left side, I *must* subtract $7$ from the right side to keep the equation balanced.
    *   **Action:** $x + 7 - 7 = 15 - 7$
    *   **Result:** $x = 8$.
    This re-derivation shows that transposition is merely a shortcut for applying the inverse operation to both sides. Understanding this fundamental principle means you can always rebuild the method, even if the shortcut slips your mind.

## 10. Connections — what this leads to

Mastering linear equations in one variable is not just an isolated skill; it's a foundational gateway to nearly all subsequent topics in algebra and beyond.

*   **Linear Inequalities:** These are very similar to linear equations, but instead of an equals sign, they use inequality signs ($<, >, \le, \ge$). The solving techniques are almost identical, with one critical difference: multiplying or dividing by a negative number reverses the inequality sign.
*   **Systems of Linear Equations:** This involves two or more linear equations with two or more variables (e.g., $2x+y=5$ and $x-y=1$). The methods to solve these (substitution, elimination) rely heavily on the ability to solve single linear equations for one variable.
*   **Linear Functions:** The equation $y=mx+b$ defines a linear function. Solving for $x$ in this equation (e.g., finding the x-intercept when $y=0$) is a direct application of what you've learned. This forms the basis for understanding lines, slopes, and intercepts in coordinate geometry.
*   **Solving Quadratic Equations (and higher-order polynomials):** While quadratic equations ($ax^2+bx+c=0$) require different initial techniques (factoring, quadratic formula), many steps within those techniques often simplify to solving a linear equation. For example, after factoring, you set each factor equal to zero, resulting in linear equations.
*   **Word Problems:** The ability to translate real-world scenarios into mathematical equations is paramount. Often, these scenarios simplify to linear equations in one variable, where you must define a variable and set up the equation before solving it.
*   **Calculus:** Finding critical points, roots of derivatives, or solving for specific values in optimization problems often boils down to solving linear equations.
*   **Linear Algebra:** This entire field, studied at university level, is built upon the concept of linear equations. It deals with systems of linear equations, vectors, matrices, and transformations, all of which generalize the ideas you're learning now.
*   **Physics, Engineering, Economics, Data Science:** In these fields, models are often simplified to linear relationships. Solving for unknowns in these models directly uses the skills developed here.

## 11. Self-check questions

Solve each of the following linear equations for the given variable. Do not skip any steps.

1.  $x - 9 = 1$
2.  $4y + 2 = 18$
3.  $7 - 2z = 3z + 2$
4.  $3(m + 4) - 5 = 2m + 1$
5.  $\frac{2x}{5} - \frac{1}{2} = x + \frac{3}{10}$