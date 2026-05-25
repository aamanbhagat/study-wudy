## What it is
An algebraic expression is a mathematical phrase that combines numbers, letters, and operation symbols without an equals sign. The letters are **variables** (representing unknown or changing quantities), the fixed numbers attached to variables are **coefficients** (scaling factors), and the standalone numbers are **constants** (fixed baseline values).

## Why it matters
This is the grammar of all quantitative science. In rocket science, when calculating the total mass of a vehicle, you use expressions like $m_{dry} + n \cdot m_{tank}$; here, the dry mass is a constant, $n$ (number of tanks) is a variable, and $m_{tank}$ acts as a coefficient scaling that variable. In Machine Learning, a neural network's fundamental operation is evaluating expressions like $w_1x_1 + w_2x_2 + b$, where inputs ($x$) are variables, weights ($w$) are coefficients, and biases ($b$) are constants. 

## When to study it
You must have a rock-solid grasp of:
1. Basic arithmetic operations (addition, subtraction, multiplication, division).
2. The order of operations (PEMDAS).
3. Operations with negative numbers and fractions.
If you still struggle with $-5 - (-3)$, stop here and review negative numbers. You cannot build algebra on a shaky arithmetic foundation.

## How to study it (step by step)
1. **Dissect expressions:** Take 5 random algebraic expressions. For each, list the variables, the coefficients of each variable, and the constants. (10 mins)
2. **Translate English to Math:** Write expressions from word phrases. "Five less than three times a number" becomes $3x - 5$. Do 10 of these. (15 mins)
3. **Expand multiplication:** Remind yourself that $4x$ is just shorthand for $x + x + x + x$. Write out a few expressions in their fully expanded addition form to build intuition. (10 mins)
4. **Evaluate by substitution:** Choose random values for your variables (e.g., $x=2, y=-3$). Plug them into expressions and use the order of operations to find the final numerical value. (20 mins)
5. **Group like terms:** Practice simplifying expressions by combining terms with the exact same variables. $3x + 5y - x$ becomes $2x + 5y$. (20 mins)

## Key ideas, with intuition
* **Variables are containers:** Think of $x$ or $y$ as an empty box. The box itself doesn't change, but the number you put inside it can. 
* **Coefficients are scaling factors:** In the term $5x$, the $5$ is the coefficient. It tells you *how many* of the variable you have. By convention, we drop the multiplication sign: $5x$ means $5 \cdot x$. If you see a variable alone like $z$, its coefficient is an invisible $1$. If you see $-z$, the coefficient is $-1$.
* **Constants are baselines:** In the expression $2x + 7$, the $7$ is a constant. No matter what you put into the $x$ container, that $7$ remains exactly $7$. It shifts the whole value up or down.
* **Terms are separated by addition/subtraction:** An expression is built of "terms". In $4x^2 - 3y + 2$, the terms are $4x^2$, $-3y$, and $2$. Notice that the negative sign belongs to the term.
* **Expressions vs. Equations:** An expression (e.g., $3x + 2$) represents a *value*. An equation (e.g., $3x + 2 = 11$) represents a *claim* that two values are equal. You can *evaluate* or *simplify* an expression, but you cannot *solve* it.

## Worked example
**Problem:** Simplify the expression $4x - 2y - x + 5 - y$, then evaluate it for $x = 3$ and $y = -2$.

**Step 1: Identify and group like terms.**
The terms are: $4x$, $-2y$, $-x$, $5$, $-y$.
Group the $x$ terms: $4x - x = 3x$.
Group the $y$ terms: $-2y - y = -3y$.
Group the constants: $5$.

**Step 2: Write the simplified expression.**
$$3x - 3y + 5$$
*Reflection:* Simplifying first reduces the number of substitutions we have to make, minimizing the chance of arithmetic errors.

**Step 3: Substitute the given values into the simplified expression.**
Replace $x$ with $(3)$ and $y$ with $(-2)$. Always use parentheses when substituting, especially with negative numbers.
$$3(3) - 3(-2) + 5$$

**Step 4: Evaluate using order of operations.**
Multiply first:
$$9 - (-6) + 5$$
Resolve the double negative (subtracting a negative is adding a positive):
$$9 + 6 + 5$$
Add from left to right:
$$20$$

## Diagrams
```text
The Anatomy of an Algebraic Expression

      Coefficient        Variable
           |                |
           v                v
         +---+            +---+
         | 4 |            | x |  -  3 y  +  7
         +---+            +---+     |       |
                                    |       |
                         Coefficient (-3)   |
                                            |
                                         Constant
                                           (+7)

Terms: [4x], [-3y], [+7]
```

## Memory technique — remember this forever
1. **The Mnemonic:** "The **Co**-pilot (**Co**efficient) flies attached to the Variable. The Constant stays grounded alone."
2. **Must overlearn facts:**
   * $x = 1x$ (Invisible $1$)
   * $-x = -1x$ (Invisible $-1$)
   * The sign to the *left* of a number belongs to that number.
3. **Spaced-repetition schedule:** Review this breakdown at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how coefficients work, remember that multiplication is just repeated addition. $3x - 2x$ is $(x + x + x) - (x + x)$. Cancel them out, and you are left with exactly one $x$.

## Common mistakes
* **Ignoring the negative sign on coefficients:** In the expression $10 - 4x$, students often say the coefficient of $x$ is $4$. It is $-4$. The sign travels with the term.
* **Confusing multiplication with addition:** Students sometimes evaluate $3x$ for $x=5$ as $35$ (just pushing the numbers together) or $8$ (adding $3+5$). It means $3 \cdot 5 = 15$.
* **Trying to "solve" an expression:** A student sees $2x + 4$ and tries to set it to $0$ to find $x = -2$. You cannot solve an expression; it is not an equation. It is just a statement of a quantity.

## Self-check
1. In the expression $-8a + b - 14$, what are the variables, the coefficients, and the constant?
2. Simplify the expression $5p - 3q + 2 - p + 4q - 10$. Then evaluate it for $p = 2$ and $q = -1$.
3. Write an algebraic expression for the following scenario: "The total mass of a rocket with a $500\text{ kg}$ dry mass, plus $x$ fuel tanks that each hold $y\text{ kg}$ of fuel." Identify the constant, variables, and how they interact.