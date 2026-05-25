## 1. What it is — in plain English

Imagine you have a puzzle, but instead of just one clue, you have several clues, and they all have to be true at the same time. That's exactly what "simultaneous equations" are in mathematics.

You're given two or more equations, and each equation has two or more unknown numbers (usually called variables like $x$, $y$, or $z$). Your job is to find the specific values for these unknown numbers that make *all* the equations true simultaneously.

Think of it like this: if you have two friends, Alice and Bob, and you know "Alice and Bob together have 10 apples" (an equation: $A+B=10$) and "Alice has 2 more apples than Bob" (another equation: $A=B+2$). You need to find out exactly how many apples Alice has and how many Bob has, such that both statements are correct. The values you find for Alice's apples and Bob's apples must satisfy *both* conditions.

When we talk about "solving simultaneous equations," we're finding that unique set of values (if one exists) that satisfies every single equation in the group. It's like finding the single point on a map where all the different paths cross.

## 2. Why it matters — real-world applications

Simultaneous equations are not just abstract math problems; they are fundamental tools used across countless fields to model and solve real-world problems involving multiple interacting factors.

1.  **Engineering & Physics (Circuit Analysis, Structural Mechanics):** In electrical engineering, Kirchhoff's laws describe how current and voltage behave in circuits. Analyzing a complex circuit with multiple loops and components often leads to a system of simultaneous linear equations. Solving these equations allows engineers to determine the current flowing through each wire or the voltage across each component, which is critical for designing functional electronics. Similarly, in structural engineering, calculating forces and stresses in a bridge or building involves solving systems of equations to ensure stability and safety.

2.  **Economics (Supply and Demand):** Economists use simultaneous equations to model market equilibrium. For example, the quantity of a product supplied by producers often depends on its price, and the quantity demanded by consumers also depends on its price. These two relationships (supply curve and demand curve) can be represented as two separate equations. Solving them simultaneously reveals the equilibrium price and quantity where supply equals demand, helping businesses understand market dynamics and pricing strategies.

3.  **Aerospace (Trajectory Optimization):** When launching a rocket or planning a satellite's orbit, engineers need to calculate trajectories that satisfy multiple constraints simultaneously: fuel efficiency, target destination, gravitational forces from various celestial bodies, and launch window. These constraints translate into a complex system of differential equations, which are often approximated and solved as systems of linear equations using numerical methods. This ensures the spacecraft reaches its destination safely and efficiently.

4.  **Machine Learning & Data Science (Linear Regression):** One of the most basic and widely used algorithms in machine learning is linear regression, which aims to find the "best-fit" line (or hyperplane in higher dimensions) through a set of data points. This "best-fit" is often determined by minimizing the sum of squared errors, which involves solving a system of simultaneous linear equations (known as the normal equations). This technique is used for prediction, trend analysis, and understanding relationships between variables in fields from finance to biology.

## 3. Prerequisites — what you must know first

Before diving into simultaneous equations, ensure you have a solid grasp of these foundational algebraic concepts:

*   **Variables and Constants:** Understanding what symbols like $x$, $y$, $a$, $b$ represent (unknown values) and what numbers represent (fixed values).
*   **Algebraic Expressions:** The ability to simplify expressions involving variables and constants (e.g., $3x + 2x = 5x$).
*   **Linear Equations in One Variable:** The skill to solve equations like $2x + 5 = 11$ for $x$. This involves isolating the variable using inverse operations.
*   **Basic Arithmetic Operations:** Proficiency in addition, subtraction, multiplication, and division, including working with negative numbers and fractions.
*   **Properties of Equality:** Knowing that whatever operation you perform on one side of an equation, you must perform the same operation on the other side to maintain balance (e.g., adding 5 to both sides, multiplying both sides by 2).
*   **Distribution Property:** The ability to multiply a term by an expression in parentheses (e.g., $2(x+3) = 2x+6$).

If any of these concepts feel shaky, it's highly recommended to review them before proceeding. A strong foundation here will make understanding simultaneous equations much smoother.

## 4. The core idea — step by step

The core idea behind solving simultaneous equations is to reduce a problem with multiple unknowns into a simpler problem with fewer unknowns, until you can solve for one variable. Once you have one variable's value, you can then find the others. There are three primary methods for doing this: Substitution, Elimination, and (for 2x2 systems) Cross-Multiplication.

Let's consider a general system of two linear equations with two variables:
$$
a_1x + b_1y = c_1 \quad \text{(Equation 1)} \\
a_2x + b_2y = c_2 \quad \text{(Equation 2)}
$$
where $a_1, b_1, c_1, a_2, b_2, c_2$ are known constants, and $x, y$ are the unknown variables we want to find.

### Method 1: Substitution

This method involves solving one equation for one variable and then "substituting" that expression into the other equation.

### Step 1: Isolate a variable in one equation.
*   **Plain English:** Pick one of your equations and rearrange it so that one of the variables (either $x$ or $y$) is by itself on one side of the equals sign. Choose the equation and variable that looks easiest to isolate (e.g., if a variable has a coefficient of 1 or -1).
*   **Concrete Example:**
    Given:
    $x + 2y = 7 \quad \text{(Eq A)}$
    $3x - y = 0 \quad \text{(Eq B)}$
    From Eq B, it's easy to isolate $y$:
    $3x - y = 0$
    $3x = y$
*   **Formal/Mathematical Version:** From $a_2x + b_2y = c_2$, if $b_2 \neq 0$, we can write $y = \frac{c_2 - a_2x}{b_2}$.
*   **What could go wrong:** Making algebraic errors when isolating the variable, especially with negative signs or fractions. Forgetting to divide all terms on the other side if the coefficient isn't 1.

### Step 2: Substitute the expression into the other equation.
*   **Plain English:** Take the expression you just found for your isolated variable and plug it into the *other* equation. This will give you a new equation with only one variable.
*   **Concrete Example:**
    We found $y = 3x$ from Eq B. Now substitute $3x$ for $y$ in Eq A:
    $x + 2y = 7$
    $x + 2(3x) = 7$
*   **Formal/Mathematical Version:** Substitute $y = \frac{c_2 - a_2x}{b_2}$ into $a_1x + b_1y = c_1$ to get $a_1x + b_1\left(\frac{c_2 - a_2x}{b_2}\right) = c_1$.
*   **What could go wrong:** Substituting into the *same* equation you used to isolate the variable (this will just lead to an identity like $x=x$ and not help solve anything). Errors in distributing the coefficient to the substituted expression.

### Step 3: Solve the new equation for the single variable.
*   **Plain English:** Now you have a standard linear equation with just one unknown. Solve it using your basic algebra skills.
*   **Concrete Example:**
    $x + 2(3x) = 7$
    $x + 6x = 7$
    $7x = 7$
    $x = 1$
*   **Formal/Mathematical Version:** Simplify and solve for $x$.
*   **What could go wrong:** Basic algebraic errors (addition, subtraction, division).

### Step 4: Substitute the found value back into one of the original equations (or the isolated expression).
*   **Plain English:** You've found the value for one variable. Now, plug this number back into either of the original equations (or the expression you derived in Step 1) to find the value of the second variable. Using the isolated expression from Step 1 is often the quickest way.
*   **Concrete Example:**
    We found $x=1$. Using our isolated expression $y = 3x$:
    $y = 3(1)$
    $y = 3$
*   **Formal/Mathematical Version:** Substitute the calculated $x$ value into $y = \frac{c_2 - a_2x}{b_2}$ (or any other equation).
*   **What could go wrong:** Making a mistake in this final calculation. Forgetting to find the second variable.

### Step 5: Check your solution.
*   **Plain English:** Plug both values you found back into *both* original equations. If both equations are true, your solution is correct.
*   **Concrete Example:**
    Check $x=1, y=3$ in Eq A: $1 + 2(3) = 1 + 6 = 7$. (True)
    Check $x=1, y=3$ in Eq B: $3(1) - 3 = 3 - 3 = 0$. (True)
    Both true, so the solution $(1, 3)$ is correct.
*   **Formal/Mathematical Version:** Verify $(x, y)$ satisfies both $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$.
*   **What could go wrong:** Skipping this crucial step and not catching errors.

### Method 2: Elimination

This method aims to "eliminate" one variable by adding or subtracting the equations after manipulating them so that the coefficients of one variable are opposites or identical.

### Step 1: Align the equations.
*   **Plain English:** Make sure your equations are written in the same standard form, typically $Ax + By = C$, with $x$ terms aligned, $y$ terms aligned, and constants aligned.
*   **Concrete Example:**
    Given:
    $2x + 3y = 11 \quad \text{(Eq A)}$
    $4x - 2y = 2 \quad \text{(Eq B)}$
    They are already aligned.
*   **Formal/Mathematical Version:** Ensure equations are in the form $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$.
*   **What could go wrong:** Misaligning terms, leading to incorrect addition/subtraction.

### Step 2: Multiply one or both equations to create opposite or identical coefficients for one variable.
*   **Plain English:** Look at the coefficients of $x$ and $y$. Decide which variable you want to eliminate. Then, multiply one or both entire equations by a number so that the coefficient of your chosen variable becomes either the same (if you plan to subtract) or opposite (if you plan to add) in both equations.
*   **Concrete Example:**
    $2x + 3y = 11 \quad \text{(Eq A)}$
    $4x - 2y = 2 \quad \text{(Eq B)}$
    To eliminate $x$, we can multiply Eq A by 2:
    $2 \times (2x + 3y) = 2 \times 11 \implies 4x + 6y = 22 \quad \text{(Eq A')}$
    Now we have $4x$ in both Eq A' and Eq B.
*   **Formal/Mathematical Version:** Choose $k_1, k_2$ such that $k_1a_1 = -k_2a_2$ (for addition) or $k_1a_1 = k_2a_2$ (for subtraction). Multiply $k_1(a_1x + b_1y = c_1)$ and $k_2(a_2x + b_2y = c_2)$.
*   **What could go wrong:** Forgetting to multiply *every* term in the equation, including the constant on the right side. Sign errors when choosing multipliers.

### Step 3: Add or subtract the modified equations.
*   **Plain English:** If you made the coefficients opposite, add the two equations together. If you made them identical, subtract one equation from the other. This will eliminate one variable, leaving you with a single equation with one unknown.
*   **Concrete Example:**
    We have:
    $4x + 6y = 22 \quad \text{(Eq A')}$
    $4x - 2y = 2 \quad \text{(Eq B)}$
    Subtract Eq B from Eq A' (since the $x$ coefficients are identical):
    $(4x + 6y) - (4x - 2y) = 22 - 2$
    $4x + 6y - 4x + 2y = 20$
    $8y = 20$
*   **Formal/Mathematical Version:** $(k_1a_1x + k_1b_1y) \pm (k_2a_2x + k_2b_2y) = k_1c_1 \pm k_2c_2$.
*   **What could go wrong:** Sign errors, especially when subtracting a negative term (e.g., $- (-2y)$ becomes $+2y$).

### Step 4: Solve the resulting equation for the single variable.
*   **Plain English:** Solve the equation you just created for the remaining variable.
*   **Concrete Example:**
    $8y = 20$
    $y = \frac{20}{8}$
    $y = \frac{5}{2}$ or $2.5$
*   **Formal/Mathematical Version:** Solve the linear equation for the remaining variable.
*   **What could go wrong:** Basic arithmetic errors.

### Step 5: Substitute the found value back into one of the original equations.
*   **Plain English:** Plug the value you found back into either of the *original* equations to find the value of the other variable.
*   **Concrete Example:**
    We found $y = 2.5$. Substitute into Eq A:
    $2x + 3(2.5) = 11$
    $2x + 7.5 = 11$
    $2x = 11 - 7.5$
    $2x = 3.5$
    $x = \frac{3.5}{2}$
    $x = 1.75$ or $\frac{7}{4}$
*   **Formal/Mathematical Version:** Substitute the found variable into $a_1x + b_1y = c_1$ or $a_2x + b_2y = c_2$.
*   **What could go wrong:** Errors in substitution or the subsequent calculation.

### Step 6: Check your solution.
*   **Plain English:** Plug both values back into *both* original equations to verify they are true.
*   **Concrete Example:**
    Check $x=1.75, y=2.5$ in Eq A: $2(1.75) + 3(2.5) = 3.5 + 7.5 = 11$. (True)
    Check $x=1.75, y=2.5$ in Eq B: $4(1.75) - 2(2.5) = 7 - 5 = 2$. (True)
    Both true, so the solution $(1.75, 2.5)$ is correct.
*   **Formal/Mathematical Version:** Verify $(x, y)$ satisfies both original equations.
*   **What could go wrong:** Skipping this step.

### Method 3: Cross-Multiplication (for 2x2 systems)

This method provides a direct formula for solving a system of two linear equations in two variables. It's essentially a shortcut derived from the elimination method, using determinants. It's often taught as a specific technique for speed, but understanding its derivation from elimination is key.

Given the system:
$$
a_1x + b_1y = c_1 \quad \text{(Eq 1)} \\
a_2x + b_2y = c_2 \quad \text{(Eq 2)}
$$

### Step 1: Arrange equations in standard form.
*   **Plain English:** Ensure both equations are written as $Ax + By = C$.
*   **Concrete Example:**
    $5x - 3y = 19$
    $2x + 4y = 2$
    They are already in standard form.
*   **Formal/Mathematical Version:** As above.
*   **What could go wrong:** Not having the equations in standard form will lead to incorrect coefficients being used in the formula.

### Step 2: Identify the coefficients.
*   **Plain English:** Clearly identify $a_1, b_1, c_1, a_2, b_2, c_2$ from your equations, paying close attention to signs.
*   **Concrete Example:**
    For $5x - 3y = 19$: $a_1=5, b_1=-3, c_1=19$
    For $2x + 4y = 2$: $a_2=2, b_2=4, c_2=2$
*   **Formal/Mathematical Version:** Map coefficients to $a_i, b_i, c_i$.
*   **What could go wrong:** Missing a negative sign, or incorrectly assigning coefficients.

### Step 3: Apply the cross-multiplication formula.
*   **Plain English:** Use the specific formulas for $x$ and $y$. These formulas involve a pattern of multiplying coefficients diagonally.
*   **Formal/Mathematical Version:**
    The solution $(x, y)$ is given by:
    $$
    x = \frac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}
    $$
    $$
    y = \frac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}
    $$
    (Note: Some versions use $y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}$ for $y$ if the constant terms are moved to the left side, i.e., $a_1x+b_1y+c_1=0$. It's crucial to be consistent with the form $Ax+By=C$ or $Ax+By+C=0$.)
    Let's stick to $Ax+By=C$ form, so the formulas above are correct.
*   **What could go wrong:** Incorrectly memorizing the formula, especially the order of multiplication and subtraction, or the signs. The denominator $a_1b_2 - a_2b_1$ must not be zero; if it is, there is no unique solution (either no solution or infinitely many).

### Step 4: Calculate $x$ and $y$.
*   **Plain English:** Substitute the coefficient values into the formulas and perform the arithmetic.
*   **Concrete Example:**
    $a_1=5, b_1=-3, c_1=19$
    $a_2=2, b_2=4, c_2=2$
    Denominator: $a_1b_2 - a_2b_1 = (5)(4) - (2)(-3) = 20 - (-6) = 20 + 6 = 26$
    Numerator for $x$: $b_1c_2 - b_2c_1 = (-3)(2) - (4)(19) = -6 - 76 = -82$
    $x = \frac{-82}{26} = -\frac{41}{13}$
    Numerator for $y$: $c_1a_2 - c_2a_1 = (19)(2) - (2)(5) = 38 - 10 = 28$
    $y = \frac{28}{26} = \frac{14}{13}$
*   **Formal/Mathematical Version:** Perform the arithmetic.
*   **What could go wrong:** Arithmetic errors, especially with fractions or negative numbers.

### Step 5: Check your solution.
*   **Plain English:** Plug the calculated $x$ and $y$ values back into *both* original equations to confirm they hold true.
*   **Concrete Example:**
    Check $x = -\frac{41}{13}, y = \frac{14}{13}$ in $5x - 3y = 19$:
    $5(-\frac{41}{13}) - 3(\frac{14}{13}) = -\frac{205}{13} - \frac{42}{13} = -\frac{247}{13} = -19$.
    This is not 19, so I made an error in the cross-multiplication formula or my calculation. Let's re-evaluate the formula for $y$.
    Ah, the standard cross-multiplication rule for $Ax+By=C$ is often presented as a ratio:
    $\frac{x}{b_1c_2 - b_2c_1} = \frac{y}{c_1a_2 - c_2a_1} = \frac{1}{a_1b_2 - a_2b_1}$.
    This is equivalent to the formulas I used. Let's re-check the $y$ numerator.
    $y = \frac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}$.
    $c_1=19, a_2=2, c_2=2, a_1=5$.
    Numerator for $y$: $(19)(2) - (2)(5) = 38 - 10 = 28$. This calculation is correct.
    Let's check the $x$ numerator again.
    $x = \frac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}$.
    $b_1=-3, c_2=2, b_2=4, c_1=19$.
    Numerator for $x$: $(-3)(2) - (4)(19) = -6 - 76 = -82$. This calculation is correct.
    So $x = -82/26 = -41/13$ and $y = 28/26 = 14/13$.

    Let's re-check the original equations with these values:
    Eq 1: $5x - 3y = 19$
    $5(-\frac{41}{13}) - 3(\frac{14}{13}) = -\frac{205}{13} - \frac{42}{13} = -\frac{247}{13}$.
    $247 \div 13 = 19$. So $-\frac{247}{13} = -19$.
    This means $-19 = 19$, which is false.

    **This indicates my cross-multiplication formula for $y$ (or $x$) relative to $c_1, c_2$ is incorrect for the form $Ax+By=C$.**
    Let's derive it quickly to ensure correctness.
    To eliminate $y$: Multiply Eq 1 by $b_2$, Eq 2 by $b_1$.
    $b_2(a_1x + b_1y) = b_2c_1 \implies a_1b_2x + b_1b_2y = b_2c_1$
    $b_1(a_2x + b_2y) = b_1c_2 \implies a_2b_1x + b_1b_2y = b_1c_2$
    Subtracting the second modified equation from the first:
    $(a_1b_2 - a_2b_1)x = b_2c_1 - b_1c_2$
    $x = \frac{b_2c_1 - b_1c_2}{a_1b_2 - a_2b_1}$.
    This is slightly different from what I had: $b_1c_2 - b_2c_1$. My numerator was negated. Let's use this derived one.

    To eliminate $x$: Multiply Eq 1 by $a_2$, Eq 2 by $a_1$.
    $a_2(a_1x + b_1y) = a_2c_1 \implies a_1a_2x + a_2b_1y = a_2c_1$
    $a_1(a_2x + b_2y) = a_1c_2 \implies a_1a_2x + a_1b_2y = a_1c_2$
    Subtracting the first modified equation from the second:
    $(a_1b_2 - a_2b_1)y = a_1c_2 - a_2c_1$
    $y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}$.
    This is also slightly different from what I had for $y$ numerator ($c_1a_2 - c_2a_1$). My numerator was negated.

    Let's use the **correct formulas derived from elimination for $Ax+By=C$**:
    $$
    x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1} \quad \text{and} \quad y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}
    $$
    Now, let's re-calculate for the example:
    $a_1=5, b_1=-3, c_1=19$
    $a_2=2, b_2=4, c_2=2$
    Denominator (remains same): $a_1b_2 - a_2b_1 = (5)(4) - (2)(-3) = 20 - (-6) = 26$
    Numerator for $x$: $c_1b_2 - c_2b_1 = (19)(4) - (2)(-3) = 76 - (-6) = 76 + 6 = 82$
    $x = \frac{82}{26} = \frac{41}{13}$
    Numerator for $y$: $a_1c_2 - a_2c_1 = (5)(2) - (2)(19) = 10 - 38 = -28$
    $y = \frac{-28}{26} = -\frac{14}{13}$

    Now let's check these values: $x = \frac{41}{13}, y = -\frac{14}{13}$
    Eq 1: $5x - 3y = 19$
    $5(\frac{41}{13}) - 3(-\frac{14}{13}) = \frac{205}{13} + \frac{42}{13} = \frac{247}{13} = 19$. (True)
    Eq 2: $2x + 4y = 2$
    $2(\frac{41}{13}) + 4(-\frac{14}{13}) = \frac{82}{13} - \frac{56}{13} = \frac{26}{13} = 2$. (True)
    This is correct. My previous formulas were off by a negative sign in the numerator, which is a common trap! This highlights the importance of checking.

    So, the final step is:
*   **Concrete Example (re-checked):**
    Check $x = \frac{41}{13}, y = -\frac{14}{13}$ in Eq 1:
    $5(\frac{41}{13}) - 3(-\frac{14}{13}) = \frac{205}{13} + \frac{42}{13} = \frac{247}{13} = 19$. (True)
    Check $x = \frac{41}{13}, y = -\frac{14}{13}$ in Eq 2:
    $2(\frac{41}{13}) + 4(-\frac{14}{13}) = \frac{82}{13} - \frac{56}{13} = \frac{26}{13} = 2$. (True)
    Both true, so the solution $(\frac{41}{13}, -\frac{14}{13})$ is correct.
*   **What could go wrong:** As demonstrated, errors in the formula itself, or arithmetic errors. Always double-check!

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple 2x2 System (Substitution Method)

**Problem:** Solve the following system of equations:
$$
x + 2y = 7 \quad \text{(1)} \\
3x - y = 0 \quad \text{(2)}
$$

**Given:** Two linear equations with two variables, $x$ and $y$.
**Want:** The values of $x$ and $y$ that satisfy both equations.

**Solution:**

1.  **Isolate a variable in one equation.**
    *   Looking at Equation (2), it's easy to isolate $y$:
        $$
        3x - y = 0
        $$
        $$
        3x = y \quad \text{(3)}
        $$
        *Explanation: We want to get $y$ by itself. Adding $y$ to both sides moves it to the right, isolating it.*

2.  **Substitute the expression into the other equation.**
    *   Substitute the expression for $y$ from Equation (3) into Equation (1):
        $$
        x + 2y = 7
        $$
        $$
        x + 2(3x) = 7
        $$
        *Explanation: We replace $y$ in Equation (1) with the expression $3x$ that we found from Equation (2). This creates an equation with only one variable, $x$.*

3.  **Solve the new equation for the single variable.**
    *   Simplify and solve for $x$:
        $$
        x + 6x = 7
        $$
        $$
        7x = 7
        $$
        $$
        x = \frac{7}{7}
        $$
        $$
        x = 1
        $$
        *Explanation: Combine like terms ($x+6x=7x$). Then divide both sides by 7 to isolate $x$.*

4.  **Substitute the found value back into one of the original equations (or the isolated expression).**
    *   Substitute $x=1$ into Equation (3) (our isolated expression for $y$):
        $$
        y = 3x
        $$
        $$
        y = 3(1)
        $$
        $$
        y = 3
        $$
        *Explanation: Now that we have $x$, we can easily find $y$ using the relationship we established in step 1 ($y=3x$).*

5.  **Check your solution.**
    *   Check $x=1$ and $y=3$ in Equation (1):
        $$
        1 + 2(3) = 1 + 6 = 7 \quad \text{(True)}
        $$
    *   Check $x=1$ and $y=3$ in Equation (2):
        $$
        3(1) - 3 = 3 - 3 = 0 \quad \text{(True)}
        $$
        *Explanation: We plug the values we found for $x$ and $y$ back into both original equations. Since both equations hold true, our solution is correct.*

**Final Answer:** The solution is $\boxed{x=1, y=3}$.

**Reflection:** This example was relatively easy because one variable ($y$ in Eq 2) had a coefficient of -1, making it very straightforward to isolate without introducing fractions immediately. This is a good strategy to look for when choosing which variable to isolate.

---

### Example 2: System with Different Coefficients (Elimination Method)

**Problem:** Solve the following system of equations:
$$
2x + 3y = 11 \quad \text{(1)} \\
4x - 2y = 2 \quad \text{(2)}
$$

**Given:** Two linear equations with two variables, $x$ and $y$.
**Want:** The values of $x$ and $y$ that satisfy both equations.

**Solution:**

1.  **Align the equations.**
    *   The equations are already aligned in the form $Ax + By = C$.
        $$
        2x + 3y = 11 \\
        4x - 2y = 2
        $$
        *Explanation: This step ensures that corresponding terms (x-terms, y-terms, constants) are vertically aligned, which is important for adding or subtracting equations correctly.*

2.  **Multiply one or both equations to create opposite or identical coefficients for one variable.**
    *   Let's aim to eliminate $x$. The coefficients of $x$ are 2 and 4. We can multiply Equation (1) by 2 to make its $x$ coefficient 4, matching Equation (2).
        $$
        2 \times (2x + 3y) = 2 \times 11
        $$
        $$
        4x + 6y = 22 \quad \text{(3)}
        $$
        *Explanation: We multiply every term in Equation (1) by 2. This creates an equivalent equation (Equation 3) where the coefficient of $x$ is now 4, matching the $x$ coefficient in Equation (2). This sets us up for elimination by subtraction.*

3.  **Subtract the modified equations.**
    *   Now subtract Equation (2) from Equation (3):
        $$
        (4x + 6y) - (4x - 2y) = 22 - 2
        $$
        $$
        4x + 6y - 4x + 2y = 20
        $$
        $$
        8y = 20
        $$
        *Explanation: We subtract the entire left side of Equation (2) from the left side of Equation (3), and the right side of Equation (2) from the right side of Equation (3). Notice how $-(-2y)$ becomes $+2y$. The $4x$ terms cancel out, eliminating $x$ and leaving an equation with only $y$.*

4.  **Solve the resulting equation for the single variable.**
    *   Solve for $y$:
        $$
        8y = 20
        $$
        $$
        y = \frac{20}{8}
        $$
        $$
        y = \frac{5}{2} \text{ or } 2.5
        $$
        *Explanation: Divide both sides by 8 to isolate $y$, then simplify the fraction.*

5.  **Substitute the found value back into one of the original equations.**
    *   Substitute $y = \frac{5}{2}$ into Equation (1):
        $$
        2x + 3\left(\frac{5}{2}\right) = 11
        $$
        $$
        2x + \frac{15}{2} = 11
        $$
        $$
        2x = 11 - \frac{15}{2}
        $$
        $$
        2x = \frac{22}{2} - \frac{15}{2}
        $$
        $$
        2x = \frac{7}{2}
        $$
        $$
        x = \frac{7}{2} \div 2
        $$
        $$
        x = \frac{7}{4} \text{ or } 1.75
        $$
        *Explanation: We use one of the original equations to find the value of the other variable. We substitute the $y$ value, then perform algebraic operations to isolate $x$. This involves finding a common denominator for subtraction and then dividing by 2.*

6.  **Check your solution.**
    *   Check $x=\frac{7}{4}$ and $y=\frac{5}{2}$ in Equation (1):
        $$
        2\left(\frac{7}{4}\right) + 3\left(\frac{5}{2}\right) = \frac{14}{4} + \frac{15}{2} = \frac{7}{2} + \frac{15}{2} = \frac{22}{2} = 11 \quad \text{(True)}
        $$
    *   Check $x=\frac{7}{4}$ and $y=\frac{5}{2}$ in Equation (2):
        $$
        4\left(\frac{7}{4}\right) - 2\left(\frac{5}{2}\right) = 7 - 5 = 2 \quad \text{(True)}
        $$
        *Explanation: Verify the solution by plugging both values into both original equations. Both equations must be satisfied for the solution to be correct.*

**Final Answer:** The solution is $\boxed{x=\frac{7}{4}, y=\frac{5}{2}}$.

**Reflection:** This example required careful handling of fractions and negative signs during the elimination step. Choosing to eliminate $x$ was strategic because multiplying the first equation by 2 was simpler than multiplying both equations to get a common multiple for $y$ (which would be 6, requiring multiplying the first by 2 and the second by 3).

---

### Example 3: System with No Unique Solution

**Problem:** Solve the following system of equations:
$$
x - 2y = 3 \quad \text{(1)} \\
-2x + 4y = 6 \quad \text{(2)}
$$

**Given:** Two linear equations with two variables.
**Want:** The values of $x$ and $y$ that satisfy both equations.

**Solution (using Elimination):**

1.  **Align the equations.**
    *   Equations are already aligned.

2.  **Multiply one or both equations to create opposite or identical coefficients for one variable.**
    *   Let's aim to eliminate $x$. Multiply Equation (1) by 2:
        $$
        2 \times (x - 2y) = 2 \times 3
        $$
        $$
        2x - 4y = 6 \quad \text{(3)}
        $$
        *Explanation: We multiply Equation (1) by 2 to make the $x$ coefficient 2, which is the opposite of the $x$ coefficient in Equation (2) (-2). This will allow us to eliminate $x$ by adding the equations.*

3.  **Add the modified equations.**
    *   Add Equation (2) and Equation (3):
        $$
        (-2x + 4y) + (2x - 4y) = 6 + 6
        $$
        $$
        (-2x + 2x) + (4y - 4y) = 12
        $$
        $$
        0x + 0y = 12
        $$
        $$
        0 = 12
        $$
        *Explanation: When we add the equations, both the $x$ terms and the $y$ terms cancel out. We are left with the statement $0 = 12$.*

4.  **Interpret the result.**
    *   The statement $0 = 12$ is false. This means there are no values of $x$ and $y$ that can satisfy both equations simultaneously.
        *Explanation: A false statement like $0=12$ indicates that the system of equations is inconsistent. Geometrically, these two equations represent parallel lines that never intersect.*

**Final Answer:** There is **no solution** to this system of equations.

**Reflection:** This example highlights a crucial outcome: not all systems have a unique solution. When both variables cancel out and you're left with a false statement (like $0=12$), it means the lines are parallel and distinct, hence no intersection point. If you were left with a true statement (like $0=0$), it would mean the lines are identical, and there are infinitely many solutions.

---

### Example 4: A Word Problem (Substitution/Elimination)

**Problem:** A farmer counts his chickens and pigs. He counts 30 heads and 84 legs in total. How many chickens and how many pigs does the farmer have? (Assume each chicken has 1 head and 2 legs, and each pig has 1 head and 4 legs).

**Given:**
*   Total heads = 30
*   Total legs = 84
*   Chickens: 1 head, 2 legs
*   Pigs: 1 head, 4 legs

**Want:** Number of chickens ($C$) and number of pigs ($P$).

**Solution:**

1.  **Define variables and set up equations.**
    *   Let $C$ be the number of chickens.
    *   Let $P$ be the number of pigs.

    *   **Equation for heads:** Each animal has 1 head.
        $$
        C + P = 30 \quad \text{(1)}
        $$
        *Explanation: The total number of heads is the sum of the number of chickens and the number of pigs.*

    *   **Equation for legs:** Chickens have 2 legs, pigs have 4 legs.
        $$
        2C + 4P = 84 \quad \text{(2)}
        $$
        *Explanation: The total number of legs is twice the number of chickens plus four times the number of pigs.*

2.  **Solve the system using the Elimination Method.**
    *   Let's eliminate $C$. Multiply Equation (1) by 2:
        $$
        2 \times (C + P) = 2 \times 30
        $$
        $$
        2C + 2P = 60 \quad \text{(3)}
        $$
        *Explanation: We multiply Equation (1) by 2 to make the coefficient of $C$ equal to the coefficient of $C$ in Equation (2). This prepares the system for elimination by subtraction.*

    *   Subtract Equation (3) from Equation (2):
        $$
        (2C + 4P) - (2C + 2P) = 84 - 60
        $$
        $$
        2C + 4P - 2C - 2P = 24
        $$
        $$
        2P = 24
        $$
        *Explanation: Subtracting the equations eliminates the $C$ terms. Be careful with distributing the negative sign to all terms in the subtracted equation.*

    *   Solve for $P$:
        $$
        P = \frac{24}{2}
        $$
        $$
        P = 12
        $$
        *Explanation: Divide both sides by 2 to find the number of pigs.*

3.  **Substitute to find the other variable.**
    *   Substitute $P=12$ into Equation (1):
        $$
        C + P = 30
        $$
        $$
        C + 12 = 30
        $$
        $$
        C = 30 - 12
        $$
        $$
        C = 18
        $$
        *Explanation: We use the simpler Equation (1) to find the number of chickens now that we know the number of pigs.*

4.  **Check your solution.**
    *   Check $C=18$ and $P=12$ in Equation (1):
        $$
        18 + 12 = 30 \quad \text{(True)}
        $$
    *   Check $C=18$ and $P=12$ in Equation (2):
        $$
        2(18) + 4(12) = 36 + 48 = 84 \quad \text{(True)}
        $$
        *Explanation: Both original conditions (total heads and total legs) are satisfied, so our solution is correct.*

**Final Answer:** The farmer has $\boxed{18 \text{ chickens and } 12 \text{ pigs}}$.

**Reflection:** This example demonstrates how real-world problems can be translated into systems of equations. The key is carefully defining variables and constructing equations based on the given information. The elimination method was efficient here as the coefficients were easily manipulated.

## 6. Common mistakes and traps

1.  **Sign Errors:** This is by far the most frequent mistake. When substituting a negative value, multiplying an equation by a negative number, or subtracting an equation (especially terms that are already negative), students often make errors with signs.
    *   *Example:* $(4x - 2y) - (4x - 6y)$ is often incorrectly simplified to $4y$ instead of $8y$ (because $-(-6y) = +6y$).

2.  **Forgetting to Distribute:** When multiplying an entire equation by a constant (e.g., in the elimination method), students sometimes forget to multiply *all* terms, especially the constant term on the right side of the equation.
    *   *Example:* $2(x+3y=5)$ becomes $2x+6y=5$ instead of $2x+6y=10$.

3.  **Not Solving for Both Variables:** After finding the value of one variable (e.g., $x$), students sometimes forget to substitute it back into an equation to find the value of the second variable ($y$). The solution to a system of two equations in two variables is an ordered pair $(x, y)$.

4.  **Algebraic Errors During Isolation/Substitution:** When isolating a variable for substitution, students might make errors in moving terms across the equals sign or dividing incorrectly. Similarly, when substituting an expression, errors can occur in combining like terms or distributing.
    *   *Example:* If $2x+y=5$, isolating $y$ correctly is $y=5-2x$. An error might be $y=2x-5$ or $y=5+2x$.

5.  **Misinterpreting "No Solution" or "Infinite Solutions":** If, during the solving process, both variables cancel out:
    *   If you get a false statement (e.g., $0=5$), it means there is **no solution**. (The lines are parallel and distinct).
    *   If you get a true statement (e.g., $0=0$), it means there are **infinitely many solutions**. (The lines are identical/coincident).
    Students sometimes confuse these or simply state "error" instead of the correct interpretation.

6.  **Incorrect Cross-Multiplication Formula:** The specific pattern for the cross-multiplication method (especially the numerators for $x$ and $y$) is prone to memorization errors. As demonstrated in the core idea section, a slight change in sign or order can lead to an incorrect solution. It's vital to use the correct formulas consistently, or better yet, understand their derivation from elimination.

## 7. Textbook-precise explanation

A **system of linear equations** is a collection of two or more linear equations involving the same set of variables. For a system of $m$ linear equations in $n$ variables $x_1, x_2, \dots, x_n$, it can be written in the general form:

$$
a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n = b_m
$$

Here, $a_{ij}$ (where $i$ denotes the equation number and $j$ denotes the variable number) are the coefficients, and $b_i$ are the constant terms. All $a_{ij}$ and $b_i$ are known real numbers, and $x_j$ are the unknown variables.

A **solution** to a system of linear equations is an ordered $n$-tuple $(s_1, s_2, \dots, s_n)$ such that when $x_1=s_1, x_2=s_2, \dots, x_n=s_n$ are substituted into *each* equation in the system, all equations are simultaneously satisfied. The set of all such solutions is called the **solution set** of the system.

Geometrically, for a system of two linear equations in two variables ($n=2$), each equation represents a straight line in the Cartesian coordinate plane. The solution(s) to the system correspond to the point(s) of intersection of these lines. There are three possibilities for the solution set:

1.  **Unique Solution:** The lines intersect at exactly one point. The system is **consistent** and the equations are **independent**.
2.  **No Solution:** The lines are parallel and distinct; they never intersect. The system is **inconsistent**.
3.  **Infinitely Many Solutions:** The lines are coincident (they are the same line). Every point on the line is a solution. The system is **consistent** and the equations are **dependent**.

The methods of **substitution** and **elimination** are algebraic techniques used to systematically reduce a system of $n$ equations in $n$ variables to a single equation in a single variable, which can then be solved.

*   **Substitution Method:** Involves solving one equation for one variable in terms of the others, and then substituting this expression into the remaining equations. This reduces the number of variables and equations by one at each step.
*   **Elimination Method (also known as the Addition Method):** Involves manipulating the equations (by multiplying them by non-zero constants) such that when two equations are added or subtracted, one or more variables cancel out, reducing the complexity of the system. This method is a precursor to more advanced techniques like Gaussian elimination for larger systems.

The **Cross-Multiplication Method** is a specialized formulaic approach applicable only to systems of two linear equations in two variables. For a system $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$, the solution $(x,y)$ is given by:
$$
x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1} \quad \text{and} \quad y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}
$$
provided that the denominator $a_1b_2 - a_2b_1 \neq 0$. This denominator is known as the determinant of the coefficient matrix $\begin{pmatrix} a_1 & b_1 \\ a_2 & b_2 \end{pmatrix}$. If the determinant is zero, the system either has no solution or infinitely many solutions. This method is a direct consequence of Cramer's Rule for 2x2 systems.

*(Refer to: Stewart, J. (2016). *College Algebra* (7th ed.). Cengage Learning. Chapter 8, Section 8.1)*

## 8. ASCII diagrams

Here are ASCII diagrams illustrating the three possible outcomes for a system of two linear equations in two variables, represented as lines on a coordinate plane.

```text
1. Unique Solution (Consistent, Independent)
   The lines intersect at exactly one point.

       ^ Y
       |
       |  L1
       | /
       |/
   ----X-----> X  (Intersection point X = solution)
     / |
    /  |
   L2  |
       |

2. No Solution (Inconsistent)
   The lines are parallel and never intersect.

       ^ Y
       |
       |  L1
       | /
       |/
       |
   ----------------> X
       | \
       |  \ L2
       |
       |

3. Infinitely Many Solutions (Consistent, Dependent)
   The lines are identical; they lie on top of each other.

       ^ Y
       |
       |
       |  L1 & L2 (one line representing both equations)
       | /
       |/
   ----------------> X
     / |
    /  |
       |
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    Remember the three methods as **S.E.C.**
    *   **S**ubstitution: Think of "subbing in" a player in a game. You take one player (variable) out and put another expression in its place.
    *   **E**limination: Think of "eliminating" an opponent. You combine the equations to make one variable disappear.
    *   **C**ross-Multiplication: Think of "crossing" paths. This is a special, faster way for 2x2 systems, where you mentally "cross" coefficients to build the numerator and denominator.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   **The Goal:** Find $(x, y)$ that satisfies *all* equations simultaneously.
    *   **The Three Outcomes:** Unique solution (intersecting lines), No solution (parallel lines), Infinitely many solutions (coincident lines).
    *   **Cross-Multiplication Formulas (for $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$):**
        $$
        x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1} \quad \text{and} \quad y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}
        $$
        (Pay *extreme* attention to the order and signs in the numerators!)

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the methods and try 2-3 problems. Focus on understanding *why* each step works.
    *   **3 Days:** Review the methods, specifically focusing on common mistakes (sign errors!). Try 2-3 more problems, including one with fractions.
    *   **7 Days:** Re-derive the cross-multiplication formulas from elimination. Try a word problem.
    *   **16 Days:** Review all methods. Try a problem where you anticipate whether there will be no solution or infinite solutions *before* solving.
    *   **35 Days:** Solve a mixed set of problems, choosing the most efficient method for each.

4.  **First-Principles Re-derivation Pathway (for Cross-Multiplication):**
    If you forget the cross-multiplication formulas, you can always re-derive them from the elimination method:
    Given:
    $a_1x + b_1y = c_1 \quad \text{(Eq 1)}$
    $a_2x + b_2y = c_2 \quad \text{(Eq 2)}$

    *   **To find $x$:**
        1.  Multiply Eq 1 by $b_2$: $a_1b_2x + b_1b_2y = c_1b_2$
        2.  Multiply Eq 2 by $b_1$: $a_2b_1x + b_1b_2y = c_2b_1$
        3.  Subtract the second modified equation from the first:
            $(a_1b_2x + b_1b_2y) - (a_2b_1x + b_1b_2y) = c_1b_2 - c_2b_1$
            $x(a_1b_2 - a_2b_1) = c_1b_2 - c_2b_1$
            $x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1}$

    *   **To find $y$:**
        1.  Multiply Eq 1 by $a_2$: $a_1a_2x + a_2b_1y = a_2c_1$
        2.  Multiply Eq 2 by $a_1$: $a_1a_2x + a_1b_2y = a_1c_2$
        3.  Subtract the first modified equation from the second:
            $(a_1a_2x + a_1b_2y) - (a_1a_2x + a_2b_1y) = a_1c_2 - a_2c_1$
            $y(a_1b_2 - a_2b_1) = a_1c_2 - a_2c_1$
            $y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}$

    Practicing this derivation reinforces the method and ensures you're never stuck if you forget the specific formula.

## 10. Connections — what this leads to

Understanding simultaneous equations is a foundational skill that unlocks many advanced topics in mathematics and its applications:

*   **Matrices and Determinants:** Systems of linear equations are the primary motivation for introducing matrices. Any system can be represented in matrix form $AX=B$, where $A$ is the coefficient matrix, $X$ is the column vector of variables, and $B$ is the column vector of constants. Solving systems using matrix inversion ($X=A^{-1}B$) or Cramer's Rule involves determinants, which are directly related to the denominators in the cross-multiplication method.
*   **Linear Algebra:** This entire field is built upon the study of systems of linear equations, vectors, and matrices. Concepts like vector spaces, linear transformations, eigenvalues, and eigenvectors all rely on the ability to solve systems of equations, often much larger than 2x2.
*   **Optimization:** Many optimization problems, especially in operations research and economics, involve finding the best solution (e.g., maximizing profit, minimizing cost) subject to several linear constraints. These constraints form systems of linear inequalities, whose boundary points are found by solving systems of linear equations.
*   **Calculus (Intersection of Functions):** Finding the points where two functions intersect (e.g., a line and a parabola, or two exponential curves) often boils down to solving a system of equations, though they may not always be linear.
*   **Computer Graphics:** In 3D graphics, calculations for rendering, camera projections, and transformations (like rotation, scaling, translation) are heavily based on matrix operations, which are essentially solving systems of linear equations.
*   **Numerical Methods:** For very large or complex systems of equations that cannot be solved analytically, numerical methods (like Gaussian elimination, Jacobi iteration, Gauss-Seidel method) are employed. These algorithms are the backbone of scientific computing and are used in simulations, weather forecasting, and engineering analysis.
*   **Differential Equations:** Solving systems of differential equations often involves finding particular solutions by solving systems of algebraic equations.

## 11. Self-check questions

1.  Solve the following system using the substitution method:
    $$
    y = 2x - 1 \\
    3x + y = 9
    $$

2.  Solve the following system using the elimination method:
    $$
    5x - 2y = 1 \\
    2x + 3y = 8
    $$

3.  Solve the following system using any method you prefer. What is the nature of the solution (unique, no solution, infinitely many)?
    $$
    x - 3y = 4 \\
    -2x + 6y = -8
    $$

4.  A grocer sells two types of coffee: premium and standard. On Monday, he sold 10 pounds of premium coffee and 20 pounds of standard coffee for a total of $200. On Tuesday, he sold 15 pounds of premium coffee and 5 pounds of standard coffee for a total of $150. What is the price per pound for each type of coffee?

5.  Consider the system:
    $$
    ax + by = e \\
    cx + dy = f
    $$
    Under what condition (in terms of $a, b, c, d$) will this system have no unique solution? Explain your reasoning in terms of the relationship between the lines represented by the equations.