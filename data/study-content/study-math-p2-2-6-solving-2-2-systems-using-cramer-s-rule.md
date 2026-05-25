## 1. What it is — in plain English

Imagine you have two mystery numbers, let's call them $x$ and $y$. You don't know what they are, but you have two clues, and each clue is an equation involving both $x$ and $y$. For example, "twice $x$ plus $y$ equals 7" and "three times $x$ minus $y$ equals 3". Your job is to figure out what $x$ and $y$ must be to make both clues true at the same time.

Cramer's rule is like a special, direct recipe for finding these mystery numbers. Instead of trying to guess and check, or doing a bunch of substitutions, this rule gives you a very structured way to calculate $x$ and $y$ using something called "determinants." Think of determinants as special numbers you can calculate from a grid of numbers (a matrix).

Specifically for two mystery numbers and two clues (what mathematicians call a "2x2 system of linear equations"), Cramer's rule tells you to set up three different grids of numbers. You calculate a special number (a determinant) from each grid. Then, to find $x$, you just divide the determinant from one grid by the determinant from the main grid. To find $y$, you do the same, but with the determinant from the *other* grid. It's a very elegant and direct way to get your answers!

It's particularly handy because it gives you a formula for $x$ and $y$ directly, without needing to mess around with adding or subtracting equations like you might have learned before. It's a powerful tool that uses the language of matrices to solve these common types of problems.

## 2. Why it matters — real-world applications

Solving systems of linear equations is fundamental in almost every quantitative field, and Cramer's rule provides a structured way to approach them, especially for smaller systems. While often computationally intensive for very large systems, the underlying principles and its application to 2x2 systems are crucial for understanding more complex methods and for scenarios where direct, formulaic solutions are preferred.

1.  **Electrical Circuit Analysis (Physics/Engineering):** When designing or analyzing simple electrical circuits, you often encounter two unknown currents or voltages that are related by two equations (e.g., from Kirchhoff's laws). Cramer's rule can be used to quickly solve for these unknown values. For instance, determining the current flowing through two different branches of a simple circuit with two voltage sources and several resistors. Companies like **Texas Instruments** or **Analog Devices** use these principles in chip design and circuit simulation, albeit with more complex systems.

2.  **Resource Allocation and Blending Problems (Operations Research/Business):** Imagine a small factory that produces two types of products, A and B, using two limited resources, say labor hours and raw material. Each product requires a certain amount of each resource. If you have a fixed total amount of labor and raw material available, you can set up a 2x2 system to determine how many units of product A and B you can produce to exactly consume all resources. This helps in optimizing production. **Supply chain management software** often simplifies these problems into linear systems for initial planning.

3.  **Basic Kinematics and Motion (Physics):** In introductory physics, you might have two objects moving, and you want to find their meeting point and time. If their motions are described by linear equations (e.g., constant velocity), you can set up a 2x2 system to solve for the time and position where they intersect. For example, two cars starting at different positions and moving towards each other at constant speeds. While simple, these are foundational for understanding more complex trajectory calculations used by companies like **SpaceX** for rocket launches or **Boeing** for aircraft flight paths.

4.  **Mixing Problems (Chemistry/Pharmacy):** Suppose a pharmacist needs to create a solution with a specific concentration by mixing two different stock solutions, each with a different known concentration. If the target total volume and target concentration are known, a 2x2 system can be used to determine the exact volumes of each stock solution needed. This ensures precise drug dosages or chemical formulations.

5.  **Computer Graphics (Game Development):** While more advanced matrix operations are common, the core idea of solving systems of equations appears in basic transformations and intersections. For instance, finding the intersection point of two lines in 2D space (e.g., for collision detection in a simple game). Game engines like **Unity** or **Unreal Engine** rely heavily on linear algebra principles for rendering and physics, starting from these fundamental ideas.

## 3. Prerequisites — what you must know first

Before diving into Cramer's rule for 2x2 systems, ensure you have a solid grasp of the following concepts:

*   **Basic Algebra:** The ability to perform arithmetic operations (addition, subtraction, multiplication, division) with positive and negative numbers, fractions, and decimals. You should be comfortable manipulating equations and isolating variables.
*   **Solving Systems of Linear Equations (by Substitution or Elimination):** You should already know how to find the values of two unknown variables ($x$ and $y$) from two linear equations using methods like substitution (solving one equation for a variable and plugging it into the other) or elimination (adding/subtracting equations to cancel out a variable). Cramer's rule is an alternative, more structured method.
*   **Matrices (Introduction):** You should understand what a matrix is – a rectangular array of numbers. Specifically, you should know what a 2x2 matrix looks like and how to identify its elements by their position (e.g., $a_{11}$, $a_{12}$).
*   **Determinants of 2x2 Matrices:** This is absolutely crucial. You must know how to calculate the determinant of a 2x2 matrix. For a matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, its determinant is defined as $ad - bc$. If you are unsure about this, pause and review it thoroughly, as Cramer's rule relies entirely on this calculation.
*   **Standard Form of Linear Equations:** You should be able to recognize and convert linear equations into the standard form $Ax + By = C$.

## 4. The core idea — step by step

Cramer's rule provides a formulaic approach to solving systems of linear equations. For a 2x2 system, it leverages the power of determinants to directly calculate the values of the unknown variables. Let's break it down.

### Step 1: Write the system in standard form

**Plain English:** First, make sure both of your "clues" (equations) are written in a neat, organized way. All the $x$ terms should be lined up, all the $y$ terms should be lined up, and the constant numbers (the ones without $x$ or $y$) should be on the other side of the equals sign.

**Small Concrete Example:**
If you have equations like:
$2x = 7 - y$
$3x - 3 = y$

You need to rearrange them to look like this:
$2x + y = 7$
$3x - y = 3$

**Formal/Mathematical Version:**
A system of two linear equations in two variables $x$ and $y$ is typically written in the standard form:
$$
\begin{align*} a_1x + b_1y &= c_1 \\ a_2x + b_2y &= c_2 \end{align*}
$$
where $a_1, b_1, c_1, a_2, b_2, c_2$ are known coefficients and constants.

**What could go wrong:** Forgetting to move a term to the correct side, or incorrectly changing its sign when moving it across the equals sign. This will lead to incorrect coefficients later.

### Step 2: Form the coefficient matrix and calculate its determinant ($D$)

**Plain English:** Once your equations are in standard form, gather all the numbers that are attached to $x$ and $y$ (the coefficients) and arrange them into a 2x2 grid. This grid is called the "coefficient matrix." Then, calculate the special number (the determinant) from this grid. This determinant is super important, so we'll call it $D$.

**Small Concrete Example:**
Using our system:
$2x + y = 7$
$3x - y = 3$

The coefficients are:
For $x$: 2 and 3
For $y$: 1 (since $y$ is $1y$) and -1 (since $-y$ is $-1y$)

The coefficient matrix is:
$\begin{pmatrix} 2 & 1 \\ 3 & -1 \end{pmatrix}$

Now, calculate its determinant $D = (2)(-1) - (1)(3) = -2 - 3 = -5$.

**Formal/Mathematical Version:**
From the standard form:
$$
\begin{align*} a_1x + b_1y &= c_1 \\ a_2x + b_2y &= c_2 \end{align*}
$$
The coefficient matrix $A$ is:
$$
A = \begin{pmatrix} a_1 & b_1 \\ a_2 & b_2 \end{pmatrix}
$$
The determinant of the coefficient matrix, denoted as $D$ or $\det(A)$, is calculated as:
$$
D = \det(A) = \begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix} = a_1b_2 - b_1a_2
$$

**What could go wrong:** Mixing up the order of multiplication in the determinant formula ($ad-bc$ vs. $bc-ad$). Also, sign errors, especially with negative coefficients.

### Step 3: Form the $x$-determinant ($D_x$) and calculate it

**Plain English:** To find the determinant specifically for $x$, we create a *new* grid. Take your original coefficient matrix, but this time, replace the column of numbers that came from the $x$ coefficients with the column of constant numbers (the ones on the right side of the equals sign). Then, calculate the determinant of this new grid. We'll call this $D_x$.

**Small Concrete Example:**
Original coefficient matrix: $\begin{pmatrix} 2 & 1 \\ 3 & -1 \end{pmatrix}$ (x-column is $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$, y-column is $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$)
Constants column: $\begin{pmatrix} 7 \\ 3 \end{pmatrix}$

To form $D_x$, replace the x-column $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$ with the constants column $\begin{pmatrix} 7 \\ 3 \end{pmatrix}$:
$D_x = \begin{vmatrix} 7 & 1 \\ 3 & -1 \end{vmatrix}$

Calculate $D_x = (7)(-1) - (1)(3) = -7 - 3 = -10$.

**Formal/Mathematical Version:**
The matrix $A_x$ is formed by replacing the first column (the coefficients of $x$) of the coefficient matrix $A$ with the constant terms $c_1$ and $c_2$:
$$
A_x = \begin{pmatrix} c_1 & b_1 \\ c_2 & b_2 \end{pmatrix}
$$
The determinant $D_x$ is:
$$
D_x = \begin{vmatrix} c_1 & b_1 \\ c_2 & b_2 \end{vmatrix} = c_1b_2 - b_1c_2
$$

**What could go wrong:** Accidentally replacing the $y$-column instead of the $x$-column, or placing the constant terms in the wrong order.

### Step 4: Form the $y$-determinant ($D_y$) and calculate it

**Plain English:** Similar to finding $D_x$, to find the determinant for $y$, we create yet *another* new grid. This time, take your original coefficient matrix, but replace the column of numbers that came from the $y$ coefficients with the column of constant numbers. Then, calculate the determinant of this grid. We'll call this $D_y$.

**Small Concrete Example:**
Original coefficient matrix: $\begin{pmatrix} 2 & 1 \\ 3 & -1 \end{pmatrix}$ (x-column is $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$, y-column is $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$)
Constants column: $\begin{pmatrix} 7 \\ 3 \end{pmatrix}$

To form $D_y$, replace the y-column $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$ with the constants column $\begin{pmatrix} 7 \\ 3 \end{pmatrix}$:
$D_y = \begin{vmatrix} 2 & 7 \\ 3 & 3 \end{vmatrix}$

Calculate $D_y = (2)(3) - (7)(3) = 6 - 21 = -15$.

**Formal/Mathematical Version:**
The matrix $A_y$ is formed by replacing the second column (the coefficients of $y$) of the coefficient matrix $A$ with the constant terms $c_1$ and $c_2$:
$$
A_y = \begin{pmatrix} a_1 & c_1 \\ a_2 & c_2 \end{pmatrix}
$$
The determinant $D_y$ is:
$$
D_y = \begin{vmatrix} a_1 & c_1 \\ a_2 & c_2 \end{vmatrix} = a_1c_2 - c_1a_2
$$

**What could go wrong:** Replacing the $x$-column instead of the $y$-column, or reusing the $D_x$ matrix instead of starting from the original coefficient matrix.

### Step 5: Apply Cramer's Rule to find $x$ and $y$

**Plain English:** Now for the grand finale! You have $D$, $D_x$, and $D_y$. To find $x$, simply divide $D_x$ by $D$. To find $y$, divide $D_y$ by $D$.

**Small Concrete Example:**
We found:
$D = -5$
$D_x = -10$
$D_y = -15$

So,
$x = \frac{D_x}{D} = \frac{-10}{-5} = 2$
$y = \frac{D_y}{D} = \frac{-15}{-5} = 3$

The solution to the system is $x=2, y=3$.

**Formal/Mathematical Version:**
Provided that $D \neq 0$, the unique solution for $x$ and $y$ is given by:
$$
x = \frac{D_x}{D} \quad \text{and} \quad y = \frac{D_y}{D}
$$

**What could go wrong:** Simple arithmetic errors in the division.

### Step 6: What if $D=0$?

**Plain English:** This is a critical check! If the main determinant $D$ turns out to be zero, then Cramer's rule tells you that you *cannot* find a unique solution. This means either there are no solutions at all (the lines are parallel and never intersect), or there are infinitely many solutions (the two equations describe the exact same line).

**Small Concrete Example:**
Consider the system:
$2x + 4y = 6$
$x + 2y = 3$

Coefficient matrix: $\begin{pmatrix} 2 & 4 \\ 1 & 2 \end{pmatrix}$
$D = (2)(2) - (4)(1) = 4 - 4 = 0$.

Since $D=0$, we know there's not a unique solution.
Now calculate $D_x$ and $D_y$:
$D_x = \begin{vmatrix} 6 & 4 \\ 3 & 2 \end{vmatrix} = (6)(2) - (4)(3) = 12 - 12 = 0$
$D_y = \begin{vmatrix} 2 & 6 \\ 1 & 3 \end{vmatrix} = (2)(3) - (6)(1) = 6 - 6 = 0$

Since $D=0$, $D_x=0$, and $D_y=0$, this system has infinitely many solutions. If $D=0$ but *either* $D_x \neq 0$ or $D_y \neq 0$, then there are no solutions.

**Formal/Mathematical Version:**
If $D = 0$:
*   If $D_x \neq 0$ or $D_y \neq 0$ (or both), then the system has **no solution**. The lines represented by the equations are parallel and distinct.
*   If $D_x = 0$ AND $D_y = 0$, then the system has **infinitely many solutions**. The lines represented by the equations are coincident (the same line).

**What could go wrong:** Forgetting to check the value of $D$ before dividing. Attempting to divide by zero will lead to an undefined result, which means you've missed this critical case.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify your understanding. Pay close attention to each step and the reasoning behind it.

### Example 1: A straightforward system with a unique solution

**Problem:** Solve the following system of linear equations using Cramer's rule:
$$
\begin{align*} 3x - 2y &= 10 \\ 4x + y &= 6 \end{align*}
$$

**Given:** Two linear equations.
**Wanted:** The values of $x$ and $y$ that satisfy both equations.

**Step 1: Write the system in standard form.**
The system is already in standard form:
$$
\begin{align*} 3x - 2y &= 10 \\ 4x + 1y &= 6 \end{align*}
$$
*Explanation:* This step ensures that the coefficients for $x$, $y$, and the constant terms are correctly identified and aligned. We explicitly write $1y$ to avoid missing the coefficient.

**Step 2: Form the coefficient matrix and calculate its determinant ($D$).**
The coefficients are $a_1=3, b_1=-2, a_2=4, b_2=1$.
The coefficient matrix $A$ is:
$$
A = \begin{pmatrix} 3 & -2 \\ 4 & 1 \end{pmatrix}
$$
Now, calculate $D$:
$$
D = \begin{vmatrix} 3 & -2 \\ 4 & 1 \end{vmatrix} = (3)(1) - (-2)(4)
$$
*Explanation:* We form the matrix from the coefficients of $x$ and $y$. The determinant is calculated as (top-left * bottom-right) - (top-right * bottom-left).
$$
D = 3 - (-8)
$$
*Explanation:* Perform the multiplications. Be careful with negative signs.
$$
D = 3 + 8
$$
*Explanation:* Subtracting a negative number is equivalent to adding its positive counterpart.
$$
D = 11
$$
*Explanation:* The main determinant is 11. Since $D \neq 0$, we know there's a unique solution.

**Step 3: Form the $x$-determinant ($D_x$) and calculate it.**
Replace the $x$-column of the coefficient matrix with the constant terms $\begin{pmatrix} 10 \\ 6 \end{pmatrix}$.
$$
D_x = \begin{vmatrix} 10 & -2 \\ 6 & 1 \end{vmatrix}
$$
*Explanation:* We replace the first column (the coefficients of $x$) with the constants from the right side of the equations.
$$
D_x = (10)(1) - (-2)(6)
$$
*Explanation:* Calculate the determinant of this new matrix.
$$
D_x = 10 - (-12)
$$
*Explanation:* Perform the multiplications.
$$
D_x = 10 + 12
$$
*Explanation:* Simplify the expression.
$$
D_x = 22
$$

**Step 4: Form the $y$-determinant ($D_y$) and calculate it.**
Replace the $y$-column of the coefficient matrix with the constant terms $\begin{pmatrix} 10 \\ 6 \end{pmatrix}$.
$$
D_y = \begin{vmatrix} 3 & 10 \\ 4 & 6 \end{vmatrix}
$$
*Explanation:* We replace the second column (the coefficients of $y$) with the constants.
$$
D_y = (3)(6) - (10)(4)
$$
*Explanation:* Calculate the determinant of this new matrix.
$$
D_y = 18 - 40
$$
*Explanation:* Perform the multiplications.
$$
D_y = -22
$$

**Step 5: Apply Cramer's Rule to find $x$ and $y$.**
Using the formulas $x = \frac{D_x}{D}$ and $y = \frac{D_y}{D}$:
$$
x = \frac{22}{11}
$$
*Explanation:* Substitute the calculated values for $D_x$ and $D$.
$$
x = 2
$$
*Explanation:* Perform the division to find the value of $x$.
$$
y = \frac{-22}{11}
$$
*Explanation:* Substitute the calculated values for $D_y$ and $D$.
$$
y = -2
$$
*Explanation:* Perform the division to find the value of $y$.

**Final Answer:**
The solution is $\boxed{x=2, y=-2}$.

**Reflection:** This example was straightforward because all determinants were non-zero, and the final values were integers. The main challenge was careful arithmetic, especially with negative numbers in the determinant calculations.

---

### Example 2: System with fractions and negative values

**Problem:** Solve the following system of linear equations using Cramer's rule:
$$
\begin{align*} 0.5x + 3y &= -1 \\ -2x - 4y &= 6 \end{align*}
$$

**Given:** Two linear equations with decimal coefficients.
**Wanted:** The values of $x$ and $y$.

**Step 1: Write the system in standard form.**
The system is already in standard form. It's often easier to work with integers, so we can multiply the first equation by 2 to clear the decimal.
Equation 1: $0.5x + 3y = -1 \quad \implies \quad x + 6y = -2$
Equation 2: $-2x - 4y = 6$
*Explanation:* Converting decimals to integers often reduces the chance of arithmetic errors, especially when calculating determinants.

**Step 2: Form the coefficient matrix and calculate its determinant ($D$).**
The coefficients are $a_1=1, b_1=6, a_2=-2, b_2=-4$.
The coefficient matrix $A$ is:
$$
A = \begin{pmatrix} 1 & 6 \\ -2 & -4 \end{pmatrix}
$$
Now, calculate $D$:
$$
D = \begin{vmatrix} 1 & 6 \\ -2 & -4 \end{vmatrix} = (1)(-4) - (6)(-2)
$$
*Explanation:* Calculate the determinant.
$$
D = -4 - (-12)
$$
*Explanation:* Perform multiplications.
$$
D = -4 + 12
$$
*Explanation:* Simplify.
$$
D = 8
$$
*Explanation:* $D \neq 0$, so a unique solution exists.

**Step 3: Form the $x$-determinant ($D_x$) and calculate it.**
Replace the $x$-column with the constant terms $\begin{pmatrix} -2 \\ 6 \end{pmatrix}$.
$$
D_x = \begin{vmatrix} -2 & 6 \\ 6 & -4 \end{vmatrix}
$$
*Explanation:* Replace the first column with the constants.
$$
D_x = (-2)(-4) - (6)(6)
$$
*Explanation:* Calculate the determinant.
$$
D_x = 8 - 36
$$
*Explanation:* Perform multiplications.
$$
D_x = -28
$$

**Step 4: Form the $y$-determinant ($D_y$) and calculate it.**
Replace the $y$-column with the constant terms $\begin{pmatrix} -2 \\ 6 \end{pmatrix}$.
$$
D_y = \begin{vmatrix} 1 & -2 \\ -2 & 6 \end{vmatrix}
$$
*Explanation:* Replace the second column with the constants.
$$
D_y = (1)(6) - (-2)(-2)
$$
*Explanation:* Calculate the determinant.
$$
D_y = 6 - 4
$$
*Explanation:* Perform multiplications. Be careful with two negatives making a positive.
$$
D_y = 2
$$

**Step 5: Apply Cramer's Rule to find $x$ and $y$.**
Using the formulas $x = \frac{D_x}{D}$ and $y = \frac{D_y}{D}$:
$$
x = \frac{-28}{8}
$$
*Explanation:* Substitute $D_x$ and $D$.
$$
x = -\frac{7}{2} \quad \text{or} \quad -3.5
$$
*Explanation:* Simplify the fraction.
$$
y = \frac{2}{8}
$$
*Explanation:* Substitute $D_y$ and $D$.
$$
y = \frac{1}{4} \quad \text{or} \quad 0.25
$$
*Explanation:* Simplify the fraction.

**Final Answer:**
The solution is $\boxed{x = -\frac{7}{2}, y = \frac{1}{4}}$.

**Reflection:** This example involved clearing decimals and resulted in fractional answers, which is common. Precision in arithmetic, especially with negative numbers and fractions, is key.

---

### Example 3: A system with no solution (parallel lines)

**Problem:** Solve the following system of linear equations using Cramer's rule:
$$
\begin{align*} 2x - y &= 5 \\ 4x - 2y &= 3 \end{align*}
$$

**Given:** Two linear equations.
**Wanted:** The values of $x$ and $y$.

**Step 1: Write the system in standard form.**
The system is already in standard form:
$$
\begin{align*} 2x - 1y &= 5 \\ 4x - 2y &= 3 \end{align*}
$$

**Step 2: Form the coefficient matrix and calculate its determinant ($D$).**
The coefficients are $a_1=2, b_1=-1, a_2=4, b_2=-2$.
The coefficient matrix $A$ is:
$$
A = \begin{pmatrix} 2 & -1 \\ 4 & -2 \end{pmatrix}
$$
Now, calculate $D$:
$$
D = \begin{vmatrix} 2 & -1 \\ 4 & -2 \end{vmatrix} = (2)(-2) - (-1)(4)
$$
*Explanation:* Calculate the determinant.
$$
D = -4 - (-4)
$$
*Explanation:* Perform multiplications.
$$
D = -4 + 4
$$
*Explanation:* Simplify.
$$
D = 0
$$
*Explanation:* The main determinant is 0. This immediately tells us there is *no unique solution*. We must investigate further to determine if there are no solutions or infinitely many solutions.

**Step 3: Form the $x$-determinant ($D_x$) and calculate it.**
Replace the $x$-column with the constant terms $\begin{pmatrix} 5 \\ 3 \end{pmatrix}$.
$$
D_x = \begin{vmatrix} 5 & -1 \\ 3 & -2 \end{vmatrix}
$$
*Explanation:* Replace the first column with the constants.
$$
D_x = (5)(-2) - (-1)(3)
$$
*Explanation:* Calculate the determinant.
$$
D_x = -10 - (-3)
$$
*Explanation:* Perform multiplications.
$$
D_x = -10 + 3
$$
*Explanation:* Simplify.
$$
D_x = -7
$$

**Step 4: Form the $y$-determinant ($D_y$) and calculate it.**
Replace the $y$-column with the constant terms $\begin{pmatrix} 5 \\ 3 \end{pmatrix}$.
$$
D_y = \begin{vmatrix} 2 & 5 \\ 4 & 3 \end{vmatrix}
$$
*Explanation:* Replace the second column with the constants.
$$
D_y = (2)(3) - (5)(4)
$$
*Explanation:* Calculate the determinant.
$$
D_y = 6 - 20
$$
*Explanation:* Perform multiplications.
$$
D_y = -14
$$

**Step 5: Interpret the results when $D=0$.**
We found $D=0$, $D_x=-7$, and $D_y=-14$.
Since $D=0$ but $D_x \neq 0$ (and $D_y \neq 0$), the system has no solution.
*Explanation:* According to Cramer's rule, if the main determinant $D$ is zero, but at least one of $D_x$ or $D_y$ is non-zero, the system is inconsistent, meaning there's no point $(x,y)$ that satisfies both equations. Geometrically, these are parallel lines that never intersect.

**Final Answer:**
The system has $\boxed{\text{no solution}}$.

**Reflection:** This example highlights the crucial check for $D=0$. If you didn't check $D$ first, you would attempt to divide by zero, leading to an undefined result. Recognizing this case is vital.

---

### Example 4: A system with infinitely many solutions (coincident lines)

**Problem:** Solve the following system of linear equations using Cramer's rule:
$$
\begin{align*} x - 3y &= 2 \\ 3x - 9y &= 6 \end{align*}
$$

**Given:** Two linear equations.
**Wanted:** The values of $x$ and $y$.

**Step 1: Write the system in standard form.**
The system is already in standard form:
$$
\begin{align*} 1x - 3y &= 2 \\ 3x - 9y &= 6 \end{align*}
$$

**Step 2: Form the coefficient matrix and calculate its determinant ($D$).**
The coefficients are $a_1=1, b_1=-3, a_2=3, b_2=-9$.
The coefficient matrix $A$ is:
$$
A = \begin{pmatrix} 1 & -3 \\ 3 & -9 \end{pmatrix}
$$
Now, calculate $D$:
$$
D = \begin{vmatrix} 1 & -3 \\ 3 & -9 \end{vmatrix} = (1)(-9) - (-3)(3)
$$
*Explanation:* Calculate the determinant.
$$
D = -9 - (-9)
$$
*Explanation:* Perform multiplications.
$$
D = -9 + 9
$$
*Explanation:* Simplify.
$$
D = 0
$$
*Explanation:* The main determinant is 0. Again, this means no unique solution. We must check $D_x$ and $D_y$.

**Step 3: Form the $x$-determinant ($D_x$) and calculate it.**
Replace the $x$-column with the constant terms $\begin{pmatrix} 2 \\ 6 \end{pmatrix}$.
$$
D_x = \begin{vmatrix} 2 & -3 \\ 6 & -9 \end{vmatrix}
$$
*Explanation:* Replace the first column with the constants.
$$
D_x = (2)(-9) - (-3)(6)
$$
*Explanation:* Calculate the determinant.
$$
D_x = -18 - (-18)
$$
*Explanation:* Perform multiplications.
$$
D_x = -18 + 18
$$
*Explanation:* Simplify.
$$
D_x = 0
$$

**Step 4: Form the $y$-determinant ($D_y$) and calculate it.**
Replace the $y$-column with the constant terms $\begin{pmatrix} 2 \\ 6 \end{pmatrix}$.
$$
D_y = \begin{vmatrix} 1 & 2 \\ 3 & 6 \end{vmatrix}
$$
*Explanation:* Replace the second column with the constants.
$$
D_y = (1)(6) - (2)(3)
$$
*Explanation:* Calculate the determinant.
$$
D_y = 6 - 6
$$
*Explanation:* Perform multiplications.
$$
D_y = 0
$$

**Step 5: Interpret the results when $D=0$.**
We found $D=0$, $D_x=0$, and $D_y=0$.
Since $D=0$ AND $D_x=0$ AND $D_y=0$, the system has infinitely many solutions.
*Explanation:* When all three determinants are zero, it means the two equations are essentially the same line. Any point $(x,y)$ that satisfies one equation will satisfy the other. To express the solution, we can write $x$ in terms of $y$ (or vice versa) from one of the original equations.
From $x - 3y = 2$, we can write $x = 3y + 2$.
So, the solution set is all points $(3y+2, y)$ for any real number $y$.

**Final Answer:**
The system has $\boxed{\text{infinitely many solutions}}$, which can be expressed as $(3y+2, y)$ for any real number $y$.

**Reflection:** This example demonstrates the other critical case when $D=0$. It's important to calculate $D_x$ and $D_y$ to distinguish between "no solution" and "infinitely many solutions."

## 6. Common mistakes and traps

1.  **Incorrectly calculating determinants:** The most frequent error is forgetting the order or the minus sign in the determinant formula: $\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$. Students sometimes calculate $bc-ad$ or $ad+bc$. Always remember it's "product of main diagonal MINUS product of anti-diagonal."
2.  **Sign errors with negative coefficients:** When coefficients are negative, it's easy to make mistakes like $(-2)(-4) = -8$ instead of $+8$, or $-4 - (-12) = -16$ instead of $+8$. Double-check all arithmetic involving negative numbers.
3.  **Incorrectly forming $D_x$ or $D_y$ matrices:**
    *   **Swapping columns:** Students might replace the $y$-column for $D_x$ or vice-versa. Remember, $D_x$ replaces the *first* column (x-coefficients) with constants, and $D_y$ replaces the *second* column (y-coefficients) with constants.
    *   **Using the wrong constants:** Ensure you're using the constants from the right-hand side of the *standard form* equations.
4.  **Forgetting to check if $D=0$:** This is a critical trap. If $D=0$, you cannot divide by it. Always calculate $D$ first. If it's zero, then proceed to calculate $D_x$ and $D_y$ to determine if there are no solutions or infinitely many solutions.
5.  **Algebraic errors in standard form conversion:** If the original equations are not in standard form ($ax+by=c$), converting them can introduce errors if terms are moved across the equals sign without changing their sign.
6.  **Not simplifying fractions:** While not strictly an error, leaving answers like $x=22/11$ instead of $x=2$ or $y=2/8$ instead of $y=1/4$ is poor mathematical practice. Always simplify fractions to their lowest terms.

## 7. Textbook-precise explanation

Cramer's Rule is a theorem that provides an explicit formula for the solution of a system of linear equations with the same number of equations as variables, provided that the determinant of the coefficient matrix is non-zero. For a 2x2 system, it is defined as follows:

Consider a system of two linear equations in two variables $x$ and $y$ in standard form:
$$
\begin{align*} a_1x + b_1y &= c_1 \\ a_2x + b_2y &= c_2 \end{align*}
$$
This system can be represented in matrix form as $A\mathbf{x} = \mathbf{b}$, where:
$$
A = \begin{pmatrix} a_1 & b_1 \\ a_2 & b_2 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} c_1 \\ c_2 \end{pmatrix}
$$
Let $D$ be the determinant of the coefficient matrix $A$:
$$
D = \det(A) = \begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix} = a_1b_2 - b_1a_2
$$
Let $D_x$ be the determinant of the matrix formed by replacing the first column (coefficients of $x$) of $A$ with the constant vector $\mathbf{b}$:
$$
D_x = \begin{vmatrix} c_1 & b_1 \\ c_2 & b_2 \end{vmatrix} = c_1b_2 - b_1c_2
$$
Let $D_y$ be the determinant of the matrix formed by replacing the second column (coefficients of $y$) of $A$ with the constant vector $\mathbf{b}$:
$$
D_y = \begin{vmatrix} a_1 & c_1 \\ a_2 & c_2 \end{vmatrix} = a_1c_2 - c_1a_2
$$

**Cramer's Rule states:**
If $D \neq 0$, then the system has a unique solution given by:
$$
x = \frac{D_x}{D} \quad \text{and} \quad y = \frac{D_y}{D}
$$
If $D = 0$:
1.  If $D_x \neq 0$ or $D_y \neq 0$, then the system is **inconsistent** and has **no solution**.
2.  If $D_x = 0$ and $D_y = 0$, then the system is **dependent** and has **infinitely many solutions**.

This rule is a direct consequence of the properties of determinants and matrix inverses. For a more detailed proof involving adjoint matrices, refer to a linear algebra textbook such as "Lay, Lay, and McDonald, Linear Algebra and Its Applications, 6e, §3.3" or "Stewart, Calculus, 9e, Appendix H.1".

## 8. ASCII diagrams

Here's how to visualize the matrices and determinants involved in Cramer's Rule for a 2x2 system.

```text
1. The original system:
   a1x + b1y = c1
   a2x + b2y = c2

2. The Coefficient Matrix (A) and its Determinant (D):
   A = | a1  b1 |
       | a2  b2 |

   D = (a1 * b2) - (b1 * a2)
     = (product of main diagonal) - (product of anti-diagonal)
       
   Example:
   | 2  1 |  D = (2 * -1) - (1 * 3) = -2 - 3 = -5
   | 3 -1 |

3. The x-replacement Matrix (Ax) and its Determinant (Dx):
   (Replace the 'x' column of A with the constants column)

   Ax = | c1  b1 |
        | c2  b2 |

   Dx = (c1 * b2) - (b1 * c2)

   Example:
   (Constants: 7, 3)
   | 7  1 |  Dx = (7 * -1) - (1 * 3) = -7 - 3 = -10
   | 3 -1 |

4. The y-replacement Matrix (Ay) and its Determinant (Dy):
   (Replace the 'y' column of A with the constants column)

   Ay = | a1  c1 |
        | a2  c2 |

   Dy = (a1 * c2) - (c1 * a2)

   Example:
   (Constants: 7, 3)
   | 2  7 |  Dy = (2 * 3) - (7 * 3) = 6 - 21 = -15
   | 3  3 |

5. Cramer's Rule:
   x = Dx / D
   y = Dy / D

   Example:
   x = -10 / -5 = 2
   y = -15 / -5 = 3
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **The "D-N-D" Rule:** Think of "D" as the "Denominator" for both $x$ and $y$. Then, for $x$, you use $D_x$ (the "Numerator" for $x$), and for $y$, you use $D_y$ (the "Numerator" for $y$).
    *   **Visual for Column Replacement:** Imagine the coefficient matrix. When you want $x$, you "kick out" the $x$-coefficients and "fill in" the constants. When you want $y$, you "kick out" the $y$-coefficients and "fill in" the constants. The constants are always the "intruders" that replace a column.

2.  **Formulas/Facts to Overlearn:**
    *   The determinant of a 2x2 matrix: $\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$. This is the absolute foundation.
    *   Cramer's Rule formulas: $x = \frac{D_x}{D}$ and $y = \frac{D_y}{D}$.
    *   The critical condition: If $D=0$, then either no solution ($D_x \neq 0$ or $D_y \neq 0$) or infinitely many solutions ($D_x=0$ AND $D_y=0$).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, do all self-check questions.
    *   **Day 3:** Rework 2-3 examples from scratch, without looking at the solutions.
    *   **Day 7:** Explain Cramer's rule aloud to an imaginary student. Focus on the "why D=0" cases.
    *   **Day 16:** Solve a new, complex 2x2 system using Cramer's rule. Try to find one that results in fractions or negatives.
    *   **Day 35:** Without any notes, write down the full Cramer's rule procedure for 2x2 systems, including the $D=0$ cases.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget Cramer's rule, you can derive it from the basic elimination method.
    Consider the system:
    $a_1x + b_1y = c_1 \quad (1)$
    $a_2x + b_2y = c_2 \quad (2)$

    To eliminate $y$:
    Multiply (1) by $b_2$: $a_1b_2x + b_1b_2y = c_1b_2 \quad (3)$
    Multiply (2) by $b_1$: $a_2b_1x + b_1b_2y = c_2b_1 \quad (4)$
    Subtract (4) from (3): $(a_1b_2 - a_2b_1)x = c_1b_2 - c_2b_1$
    Notice that $(a_1b_2 - a_2b_1)$ is $D$, and $(c_1b_2 - c_2b_1)$ is $D_x$.
    So, $Dx = D_x$, which gives $x = D_x/D$.

    To eliminate $x$:
    Multiply (1) by $a_2$: $a_1a_2x + b_1a_2y = c_1a_2 \quad (5)$
    Multiply (2) by $a_1$: $a_1a_2x + b_2a_1y = c_2a_1 \quad (6)$
    Subtract (5) from (6): $(b_2a_1 - b_1a_2)y = c_2a_1 - c_1a_2$
    Notice that $(b_2a_1 - b_1a_2)$ is $D$, and $(c_2a_1 - c_1a_2)$ is $D_y$.
    So, $Dy = D_y$, which gives $y = D_y/D$.

    This derivation path shows that Cramer's rule is not magic, but a compact algebraic result of the elimination method.

## 10. Connections — what this leads to

Understanding Cramer's rule for 2x2 systems is a foundational step that opens doors to several more advanced topics in linear algebra and its applications:

1.  **Cramer's Rule for Larger Systems (3x3, nxn):** The principle extends to systems with three equations and three variables, or even $n$ equations and $n$ variables. However, calculating determinants for larger matrices (especially beyond 3x3) becomes very computationally intensive. While theoretically possible, practically, other methods like Gaussian elimination or LU decomposition are preferred for large systems.
2.  **Matrix Inverses:** The concept of determinants is central to finding the inverse of a matrix. For a 2x2 matrix $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, its inverse $A^{-1}$ is given by $\frac{1}{\det(A)} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$. Notice the $\det(A)$ in the denominator, mirroring the $D$ in Cramer's rule. If $\det(A)=0$, the inverse doesn't exist, just as Cramer's rule fails to give a unique solution. Solving $A\mathbf{x}=\mathbf{b}$ using $A^{-1}$ gives $\mathbf{x} = A^{-1}\mathbf{b}$, which is another direct method closely related to Cramer's rule.
3.  **Eigenvalues and Eigenvectors:** Determinants are fundamental in calculating eigenvalues, which are special numbers associated with a matrix that describe how linear transformations stretch or shrink vectors. The characteristic equation, $\det(A - \lambda I) = 0$, where $\lambda$ represents eigenvalues and $I$ is the identity matrix, is solved using determinants.
4.  **Linear Transformations:** Matrices represent linear transformations (like rotations, scaling, reflections). The determinant of a transformation matrix tells you how much the area (in 2D) or volume (in 3D) of a shape changes after the transformation. A zero determinant means the transformation collapses space, losing dimensionality (e.g., squashing a 2D plane into a line).
5.  **Vector Spaces and Basis:** The determinant of a matrix formed by a set of vectors can tell you if those vectors are linearly independent. If the determinant is non-zero, the vectors are linearly independent and can form a basis for a vector space. This is crucial for understanding the structure of solutions to systems of equations.
6.  **Numerical Methods:** For very large systems of equations, direct methods like Cramer's rule become too slow. Numerical methods (e.g., Jacobi, Gauss-Seidel iteration) are used, but the theoretical understanding of unique solutions, no solutions, or infinite solutions (derived from concepts like determinants) underpins the convergence and stability analysis of these numerical approaches.
7.  **Computer Graphics and Machine Learning:** While not directly using 2x2 Cramer's rule, the underlying principles of solving systems of equations and matrix operations are pervasive. In computer graphics, transformations, projections, and lighting calculations involve massive matrix computations. In machine learning, particularly in linear regression and neural networks, solving systems of equations (often involving many variables) is a core component of optimization algorithms.

## 11. Self-check questions

1.  Solve the following system using Cramer's rule:
    $$
    \begin{align*} 5x + 2y &= 1 \\ 3x - y &= 7 \end{align*}
    $$
2.  Solve the following system using Cramer's rule. Pay attention to the coefficients:
    $$
    \begin{align*} 2x - 3y &= 4 \\ -4x + 6y &= -8 \end{align*}
    $$
3.  Solve the following system using Cramer's rule:
    $$
    \begin{align*} 0.5x + y &= 3.5 \\ x - 3y &= -1 \end{align*}
    $$
4.  Determine if the following system has a unique solution, no solution, or infinitely many solutions, using Cramer's rule. If it has a unique solution, find it. If it has infinitely many, express the solution set.
    $$
    \begin{align*} 6x - 9y &= 12 \\ 2x - 3y &= 5 \end{align*}
    $$
5.  Consider a system where the determinant $D = 0$. If $D_x = 7$ and $D_y = -3$, what can you conclude about the solution to the system? Explain your reasoning.