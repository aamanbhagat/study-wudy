## 1. What it is — in plain English

Imagine you have a set of instructions, like a recipe, that tells you how different ingredients combine to make a dish. But instead of knowing the amounts of each ingredient, you only know the final amount of the dish and how the ingredients relate to each other. You want to figure out the exact quantity of each ingredient you need.

Cramer's rule is a clever mathematical trick that helps you solve this kind of puzzle when you have a specific type of recipe: one where the relationships between ingredients are "linear." This means there are no squared amounts, no amounts multiplied by each other, just simple additions and subtractions of ingredients multiplied by fixed numbers.

What makes it special is that it gives you a direct formula for each ingredient's amount. You don't have to go through a long process of substitution or elimination. It's like having a magic calculator that, given the recipe, instantly spits out the exact quantity for each item, one by one.

The "magic" behind it involves something called "determinants," which are special numbers you can calculate from the coefficients (the fixed numbers) in your recipe. By calculating a few of these determinants, you can find the value of each unknown quantity. It's particularly neat because it highlights how interconnected all the parts of the system are.

## 2. Why it matters — real-world applications

Cramer's rule, while not always the most computationally efficient method for very large systems, holds significant theoretical value and finds practical application in specific scenarios where its direct formulaic approach is beneficial or where systems are small enough.

1.  **Aerospace Engineering (Control Systems):** In designing flight control systems for aircraft or spacecraft, engineers often model the system's dynamics using differential equations. When these are discretized or analyzed at steady-state, they often reduce to systems of linear equations. Cramer's rule can be used to analytically determine the sensitivity of control parameters to various inputs or disturbances, especially in smaller, critical subsystems where explicit formulas are preferred for understanding system behavior, rather than just getting a numerical answer. For instance, calculating the specific thrust needed from a series of thrusters to achieve a desired orientation, where each thruster's contribution is linearly modeled.

2.  **Electrical Engineering (Circuit Analysis):** When analyzing resistive circuits using Kirchhoff's laws (voltage and current laws), you often end up with systems of linear equations. Each equation might represent the sum of voltages around a loop or currents entering a node. Cramer's rule can be used to directly solve for unknown currents or voltages in specific branches. For example, in a complex RLC circuit (at steady state or after Laplace transform), finding the current through a particular resistor without having to solve for all other currents simultaneously, which can be useful for targeted analysis or fault detection.

3.  **Computer Graphics (Geometric Transformations):** While not used for real-time rendering of massive scenes, Cramer's rule can be applied in certain geometric problems. For instance, finding the intersection point of lines or planes, or determining barycentric coordinates for interpolation within a triangle. If you're trying to find the exact coordinates $(x,y)$ where two lines $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$ intersect, Cramer's rule provides a direct formula. This can be relevant in CAD software for precise object placement or in certain physics simulations for collision detection in simplified scenarios.

4.  **Economics (Input-Output Models):** Leontief input-output models analyze the interdependence of different sectors in an economy. These models often lead to systems of linear equations where you're trying to determine the output levels required from each industry to meet a specific final demand, given the inter-industry consumption. Cramer's rule can provide insights into how changes in final demand affect the output of specific sectors, offering explicit formulas for economic multipliers in smaller, simplified models.

## 3. Prerequisites — what you must know first

Before diving into Cramer's rule, you need a solid understanding of several foundational concepts in linear algebra. If any of these feel unfamiliar, it's crucial to review them first, as Cramer's rule builds directly upon them.

*   **Systems of Linear Equations:** What they are, how to write them, and what it means to "solve" them (finding values for variables that satisfy all equations simultaneously).
*   **Matrices:** How to represent a system of linear equations using a coefficient matrix, a variable vector, and a constant vector (i.e., $A\mathbf{x} = \mathbf{b}$). You should also know about square matrices.
*   **Determinants:** This is the absolute core prerequisite. You must know how to calculate the determinant of a square matrix, at least for 2x2 and 3x3 matrices. Understanding cofactor expansion is essential for larger matrices.
*   **Matrix Inverse (Conceptual):** Understanding that a matrix inverse $A^{-1}$ exists if and only if its determinant is non-zero, and that $A\mathbf{x} = \mathbf{b}$ can be solved as $\mathbf{x} = A^{-1}\mathbf{b}$ when $A^{-1}$ exists. Cramer's rule is closely related to the formula for the inverse using the adjoint matrix.
*   **Vectors:** Specifically, column vectors, which are used to represent the unknown variables and the constants in a system of equations.

## 4. The core idea — step by step

Cramer's rule provides a direct formula for each variable in a system of linear equations, provided the system has a unique solution. Let's break down the process.

### Step 1: Set up the system of equations in matrix form.

*   **Plain English:** First, make sure all your equations are neatly organized. Each equation should have the variables lined up on one side (usually the left), and the constant terms on the other side (usually the right). Once they're tidy, we can write them using matrices.
*   **Small concrete example:**
    Consider the system:
    $$2x + 3y = 8$$
    $$x - 2y = -3$$
    In matrix form, this is $A\mathbf{x} = \mathbf{b}$, where:
    $$A = \begin{pmatrix} 2 & 3 \\ 1 & -2 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 8 \\ -3 \end{pmatrix}$$
*   **Formal/Mathematical version:**
    Given a system of $n$ linear equations in $n$ variables $x_1, x_2, \dots, x_n$:
    $$a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1$$
    $$a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n = b_2$$
    $$\vdots$$
    $$a_{n1}x_1 + a_{n2}x_2 + \dots + a_{nn}x_n = b_n$$
    This can be written in matrix form as $A\mathbf{x} = \mathbf{b}$, where $A$ is the $n \times n$ coefficient matrix, $\mathbf{x}$ is the $n \times 1$ column vector of variables, and $\mathbf{b}$ is the $n \times 1$ column vector of constants:
    $$A = \begin{pmatrix}
    a_{11} & a_{12} & \dots & a_{1n} \\
    a_{21} & a_{22} & \dots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{n1} & a_{n2} & \dots & a_{nn}
    \end{pmatrix}, \quad
    \mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}, \quad
    \mathbf{b} = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix}$$
*   **What could go wrong:** Not aligning variables correctly (e.g., $2x + 3y = 8$ and $x = 1 - 2y$ would need to be rewritten as $x + 2y = 1$ before forming the matrix $A$). Missing variables should be represented with a coefficient of 0.

### Step 2: Calculate the determinant of the coefficient matrix, $\det(A)$.

*   **Plain English:** This is the "main number" of the system. It tells us if a unique solution even exists. If this number is zero, Cramer's rule cannot be used, and the system either has no solutions or infinitely many solutions.
*   **Small concrete example:**
    Using the matrix $A = \begin{pmatrix} 2 & 3 \\ 1 & -2 \end{pmatrix}$ from Step 1:
    $$\det(A) = (2)(-2) - (3)(1) = -4 - 3 = -7$$
*   **Formal/Mathematical version:**
    Calculate $\det(A)$. For a $2 \times 2$ matrix $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, $\det(A) = ad - bc$.
    For an $n \times n$ matrix, this is typically done using cofactor expansion along any row or column:
    $$\det(A) = \sum_{j=1}^n (-1)^{i+j} a_{ij} M_{ij} \quad \text{(along row } i \text{)}$$
    or
    $$\det(A) = \sum_{i=1}^n (-1)^{i+j} a_{ij} M_{ij} \quad \text{(along column } j \text{)}$$
    where $M_{ij}$ is the determinant of the submatrix formed by deleting row $i$ and column $j$.
*   **What could go wrong:** Calculation errors are common, especially with signs in cofactor expansion. Most critically, if $\det(A) = 0$, Cramer's rule cannot proceed, as it involves division by $\det(A)$. This means the system either has no solution or infinitely many solutions.

### Step 3: Create modified matrices for each variable.

*   **Plain English:** For each variable you want to solve for (say, $x_j$), you create a new version of the coefficient matrix. You do this by taking the original matrix $A$ and replacing the column that corresponds to $x_j$ with the constant vector $\mathbf{b}$.
*   **Small concrete example:**
    For our system, we want to solve for $x$ and $y$.
    To find $x$, we replace the first column of $A$ (which corresponds to $x$) with $\mathbf{b}$:
    $$A_x = \begin{pmatrix} 8 & 3 \\ -3 & -2 \end{pmatrix}$$
    To find $y$, we replace the second column of $A$ (which corresponds to $y$) with $\mathbf{b}$:
    $$A_y = \begin{pmatrix} 2 & 8 \\ 1 & -3 \end{pmatrix}$$
*   **Formal/Mathematical version:**
    For each variable $x_j$ (where $j = 1, 2, \dots, n$), construct a new matrix $A_j$. The matrix $A_j$ is formed by replacing the $j$-th column of the original coefficient matrix $A$ with the constant vector $\mathbf{b}$.
    $$A_j = \begin{pmatrix}
    a_{11} & \dots & a_{1,j-1} & b_1 & a_{1,j+1} & \dots & a_{1n} \\
    a_{21} & \dots & a_{2,j-1} & b_2 & a_{2,j+1} & \dots & a_{2n} \\
    \vdots & & \vdots & \vdots & \vdots & & \vdots \\
    a_{n1} & \dots & a_{n,j-1} & b_n & a_{n,j+1} & \dots & a_{nn}
    \end{pmatrix}$$
*   **What could go wrong:** Replacing the wrong column, or using the wrong vector $\mathbf{b}$ (e.g., if you accidentally use a row vector instead of a column vector).

### Step 4: Calculate the determinants of the modified matrices.

*   **Plain English:** Now, find the "main number" for each of the special matrices you just created.
*   **Small concrete example:**
    For $A_x = \begin{pmatrix} 8 & 3 \\ -3 & -2 \end{pmatrix}$:
    $$\det(A_x) = (8)(-2) - (3)(-3) = -16 - (-9) = -16 + 9 = -7$$
    For $A_y = \begin{pmatrix} 2 & 8 \\ 1 & -3 \end{pmatrix}$:
    $$\det(A_y) = (2)(-3) - (8)(1) = -6 - 8 = -14$$
*   **Formal/Mathematical version:**
    Calculate $\det(A_j)$ for each $j = 1, 2, \dots, n$. These determinants are calculated using the same methods as $\det(A)$ (e.g., cofactor expansion).
*   **What could go wrong:** Again, calculation errors are the main pitfall here, especially with signs and arithmetic.

### Step 5: Apply Cramer's Rule formula to find each variable.

*   **Plain English:** The value of each variable is simply the determinant of its special modified matrix, divided by the main determinant of the original coefficient matrix.
*   **Small concrete example:**
    We found $\det(A) = -7$, $\det(A_x) = -7$, and $\det(A_y) = -14$.
    For $x$:
    $$x = \frac{\det(A_x)}{\det(A)} = \frac{-7}{-7} = 1$$
    For $y$:
    $$y = \frac{\det(A_y)}{\det(A)} = \frac{-14}{-7} = 2$$
    So, the solution is $x=1, y=2$.
*   **Formal/Mathematical version:**
    If $\det(A) \neq 0$, then the unique solution to the system $A\mathbf{x} = \mathbf{b}$ is given by:
    $$x_j = \frac{\det(A_j)}{\det(A)}$$
    for $j = 1, 2, \dots, n$.
*   **What could go wrong:** Forgetting the formula (which determinant goes in the numerator and which in the denominator). Most importantly, if $\det(A)$ was zero, you would be attempting to divide by zero, which is undefined. This reinforces that Cramer's rule only works when $\det(A) \neq 0$.

## 5. Worked examples — multiple, with every step shown

Here are several examples demonstrating Cramer's rule, from simple to more complex scenarios.

### Example 1: A 2x2 system with a unique solution

**Problem:** Solve the following system of linear equations using Cramer's rule:
$$3x - 4y = 10$$
$$2x + 5y = -1$$

**Identify what's given and what we want:**
We are given two linear equations with two variables, $x$ and $y$. We want to find the unique values of $x$ and $y$ that satisfy both equations.

**Step 1: Write the system in matrix form $A\mathbf{x} = \mathbf{b}$.**
The coefficient matrix $A$, variable vector $\mathbf{x}$, and constant vector $\mathbf{b}$ are:
$$A = \begin{pmatrix} 3 & -4 \\ 2 & 5 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 10 \\ -1 \end{pmatrix}$$
*This step organizes the equations into a standard format suitable for matrix operations.*

**Step 2: Calculate the determinant of the coefficient matrix, $\det(A)$.**
$$\det(A) = (3)(5) - (-4)(2)$$
$$= 15 - (-8)$$
$$= 15 + 8$$
$$\det(A) = 23$$
*We calculate the determinant to check if a unique solution exists. Since $23 \neq 0$, a unique solution exists, and we can proceed with Cramer's rule.*

**Step 3: Create modified matrices $A_x$ and $A_y$.**
To find $A_x$, replace the first column of $A$ with $\mathbf{b}$:
$$A_x = \begin{pmatrix} 10 & -4 \\ -1 & 5 \end{pmatrix}$$
*This matrix is specifically constructed to help us find the value of $x$. Its determinant will be used in the numerator for $x$.*

To find $A_y$, replace the second column of $A$ with $\mathbf{b}$:
$$A_y = \begin{pmatrix} 3 & 10 \\ 2 & -1 \end{pmatrix}$$
*Similarly, this matrix is constructed to find $y$. Its determinant will be used in the numerator for $y$.*

**Step 4: Calculate the determinants of the modified matrices, $\det(A_x)$ and $\det(A_y)$.**
For $\det(A_x)$:
$$\det(A_x) = (10)(5) - (-4)(-1)$$
$$= 50 - 4$$
$$\det(A_x) = 46$$
*This is the determinant specific to the variable $x$.*

For $\det(A_y)$:
$$\det(A_y) = (3)(-1) - (10)(2)$$
$$= -3 - 20$$
$$\det(A_y) = -23$$
*This is the determinant specific to the variable $y$.*

**Step 5: Apply Cramer's rule formula.**
For $x$:
$$x = \frac{\det(A_x)}{\det(A)} = \frac{46}{23}$$
$$x = 2$$
*The value of $x$ is found by dividing its specific determinant by the main system determinant.*

For $y$:
$$y = \frac{\det(A_y)}{\det(A)} = \frac{-23}{23}$$
$$y = -1$$
*The value of $y$ is found by dividing its specific determinant by the main system determinant.*

**Final Answer:**
The solution to the system is $x=2, y=-1$.
$$\boxed{x=2, y=-1}$$

**Reflection:** This was a straightforward 2x2 system. The main challenge often lies in careful arithmetic for determinant calculations, especially with negative numbers.

---

### Example 2: A 3x3 system with a unique solution

**Problem:** Solve the following system using Cramer's rule:
$$x + 2y - z = 1$$
$$3x + y + z = 2$$
$$2x - y - 2z = -1$$

**Identify what's given and what we want:**
We have a system of three linear equations in three variables ($x, y, z$). We need to find their unique values.

**Step 1: Write the system in matrix form $A\mathbf{x} = \mathbf{b}$.**
$$A = \begin{pmatrix} 1 & 2 & -1 \\ 3 & 1 & 1 \\ 2 & -1 & -2 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix}$$
*Standard representation for a 3x3 system.*

**Step 2: Calculate the determinant of the coefficient matrix, $\det(A)$.**
We'll use cofactor expansion along the first row:
$$\det(A) = 1 \cdot \det \begin{pmatrix} 1 & 1 \\ -1 & -2 \end{pmatrix} - 2 \cdot \det \begin{pmatrix} 3 & 1 \\ 2 & -2 \end{pmatrix} + (-1) \cdot \det \begin{pmatrix} 3 & 1 \\ 2 & -1 \end{pmatrix}$$
$$= 1 \cdot ((1)(-2) - (1)(-1)) - 2 \cdot ((3)(-2) - (1)(2)) - 1 \cdot ((3)(-1) - (1)(2))$$
$$= 1 \cdot (-2 + 1) - 2 \cdot (-6 - 2) - 1 \cdot (-3 - 2)$$
$$= 1 \cdot (-1) - 2 \cdot (-8) - 1 \cdot (-5)$$
$$= -1 + 16 + 5$$
$$\det(A) = 20$$
*Since $20 \neq 0$, a unique solution exists.*

**Step 3: Create modified matrices $A_x, A_y, A_z$.**
$$A_x = \begin{pmatrix} 1 & 2 & -1 \\ 2 & 1 & 1 \\ -1 & -1 & -2 \end{pmatrix} \quad (\text{replace 1st col of } A \text{ with } \mathbf{b})$$
$$A_y = \begin{pmatrix} 1 & 1 & -1 \\ 3 & 2 & 1 \\ 2 & -1 & -2 \end{pmatrix} \quad (\text{replace 2nd col of } A \text{ with } \mathbf{b})$$
$$A_z = \begin{pmatrix} 1 & 2 & 1 \\ 3 & 1 & 2 \\ 2 & -1 & -1 \end{pmatrix} \quad (\text{replace 3rd col of } A \text{ with } \mathbf{b})$$
*These are the specific matrices for each variable.*

**Step 4: Calculate the determinants of the modified matrices.**
For $\det(A_x)$ (expand along first row):
$$\det(A_x) = 1 \cdot \det \begin{pmatrix} 1 & 1 \\ -1 & -2 \end{pmatrix} - 2 \cdot \det \begin{pmatrix} 2 & 1 \\ -1 & -2 \end{pmatrix} + (-1) \cdot \det \begin{pmatrix} 2 & 1 \\ -1 & -1 \end{pmatrix}$$
$$= 1 \cdot (-2 + 1) - 2 \cdot (-4 + 1) - 1 \cdot (-2 + 1)$$
$$= 1 \cdot (-1) - 2 \cdot (-3) - 1 \cdot (-1)$$
$$= -1 + 6 + 1$$
$$\det(A_x) = 6$$
*This is the determinant for $x$.*

For $\det(A_y)$ (expand along first row):
$$\det(A_y) = 1 \cdot \det \begin{pmatrix} 2 & 1 \\ -1 & -2 \end{pmatrix} - 1 \cdot \det \begin{pmatrix} 3 & 1 \\ 2 & -2 \end{pmatrix} + (-1) \cdot \det \begin{pmatrix} 3 & 2 \\ 2 & -1 \end{pmatrix}$$
$$= 1 \cdot (-4 + 1) - 1 \cdot (-6 - 2) - 1 \cdot (-3 - 4)$$
$$= 1 \cdot (-3) - 1 \cdot (-8) - 1 \cdot (-7)$$
$$= -3 + 8 + 7$$
$$\det(A_y) = 12$$
*This is the determinant for $y$.*

For $\det(A_z)$ (expand along first row):
$$\det(A_z) = 1 \cdot \det \begin{pmatrix} 1 & 2 \\ -1 & -1 \end{pmatrix} - 2 \cdot \det \begin{pmatrix} 3 & 2 \\ 2 & -1 \end{pmatrix} + 1 \cdot \det \begin{pmatrix} 3 & 1 \\ 2 & -1 \end{pmatrix}$$
$$= 1 \cdot (-1 + 2) - 2 \cdot (-3 - 4) + 1 \cdot (-3 - 2)$$
$$= 1 \cdot (1) - 2 \cdot (-7) + 1 \cdot (-5)$$
$$= 1 + 14 - 5$$
$$\det(A_z) = 10$$
*This is the determinant for $z$.*

**Step 5: Apply Cramer's rule formula.**
For $x$:
$$x = \frac{\det(A_x)}{\det(A)} = \frac{6}{20} = \frac{3}{10}$$
*Value of $x$.*

For $y$:
$$y = \frac{\det(A_y)}{\det(A)} = \frac{12}{20} = \frac{3}{5}$$
*Value of $y$.*

For $z$:
$$z = \frac{\det(A_z)}{\det(A)} = \frac{10}{20} = \frac{1}{2}$$
*Value of $z$.*

**Final Answer:**
The solution to the system is $x=\frac{3}{10}, y=\frac{3}{5}, z=\frac{1}{2}$.
$$\boxed{x=\frac{3}{10}, y=\frac{3}{5}, z=\frac{1}{2}}$$

**Reflection:** Solving 3x3 systems with Cramer's rule involves significantly more determinant calculations, making careful arithmetic and sign management crucial. Each 3x3 determinant requires three 2x2 determinants, so there are many opportunities for error.

---

### Example 3: A system where $\det(A) = 0$

**Problem:** Attempt to solve the following system using Cramer's rule:
$$x - y = 2$$
$$2x - 2y = 4$$

**Identify what's given and what we want:**
A 2x2 system. We want to find $x, y$.

**Step 1: Write the system in matrix form $A\mathbf{x} = \mathbf{b}$.**
$$A = \begin{pmatrix} 1 & -1 \\ 2 & -2 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$$
*Standard setup.*

**Step 2: Calculate the determinant of the coefficient matrix, $\det(A)$.**
$$\det(A) = (1)(-2) - (-1)(2)$$
$$= -2 - (-2)$$
$$= -2 + 2$$
$$\det(A) = 0$$
*The determinant is zero. This immediately tells us that the system does not have a unique solution. Cramer's rule, in its standard form, cannot be applied.*

**Step 3: (Attempt to) Create modified matrices $A_x$ and $A_y$.**
$$A_x = \begin{pmatrix} 2 & -1 \\ 4 & -2 \end{pmatrix}$$
$$A_y = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$$
*We can still form these matrices, but their purpose for Cramer's rule is now void.*

**Step 4: (Attempt to) Calculate the determinants of the modified matrices.**
For $\det(A_x)$:
$$\det(A_x) = (2)(-2) - (-1)(4)$$
$$= -4 - (-4)$$
$$= -4 + 4$$
$$\det(A_x) = 0$$
*This determinant is also zero.*

For $\det(A_y)$:
$$\det(A_y) = (1)(4) - (2)(2)$$
$$= 4 - 4$$
$$\det(A_y) = 0$$
*This determinant is also zero.*

**Step 5: (Attempt to) Apply Cramer's rule formula.**
If we were to formally apply the formula:
$$x = \frac{\det(A_x)}{\det(A)} = \frac{0}{0}$$
$$y = \frac{\det(A_y)}{\det(A)} = \frac{0}{0}$$
*Both expressions result in the indeterminate form $\frac{0}{0}$.*

**Final Answer:**
Cramer's rule cannot be used to find a unique solution because $\det(A) = 0$. The result $\frac{0}{0}$ indicates that the system either has infinitely many solutions or no solution. In this specific case, notice that the second equation ($2x - 2y = 4$) is simply two times the first equation ($x - y = 2$). This means they are dependent, representing the same line, and thus have **infinitely many solutions**. For example, $(2,0)$, $(3,1)$, $(4,2)$ are all solutions.
$$\boxed{\text{Cramer's rule is not applicable; } \det(A)=0. \text{ The system has infinitely many solutions.}}$$

**Reflection:** This example highlights the critical importance of $\det(A) \neq 0$. When $\det(A) = 0$, Cramer's rule fails. If $\det(A_j)$ is also $0$ for all $j$, it suggests infinitely many solutions (as seen here). If some $\det(A_j)$ were non-zero while $\det(A)=0$, it would indicate no solution. Cramer's rule itself doesn't distinguish between "no solution" and "infinitely many solutions" when $\det(A)=0$, it just tells you there's no unique solution.

---

### Example 4: A 2x2 system with fractional coefficients

**Problem:** Solve the following system using Cramer's rule:
$$\frac{1}{2}x + \frac{1}{3}y = 1$$
$$x - \frac{1}{6}y = 3$$

**Identify what's given and what we want:**
A 2x2 system with fractional coefficients. We want to find $x, y$.

**Step 1: Write the system in matrix form $A\mathbf{x} = \mathbf{b}$.**
$$A = \begin{pmatrix} 1/2 & 1/3 \\ 1 & -1/6 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 1 \\ 3 \end{pmatrix}$$
*The matrix $A$ contains fractions, which is perfectly fine.*

**Step 2: Calculate the determinant of the coefficient matrix, $\det(A)$.**
$$\det(A) = \left(\frac{1}{2}\right)\left(-\frac{1}{6}\right) - \left(\frac{1}{3}\right)(1)$$
$$= -\frac{1}{12} - \frac{1}{3}$$
$$= -\frac{1}{12} - \frac{4}{12}$$
$$\det(A) = -\frac{5}{12}$$
*Since $-\frac{5}{12} \neq 0$, a unique solution exists.*

**Step 3: Create modified matrices $A_x$ and $A_y$.**
$$A_x = \begin{pmatrix} 1 & 1/3 \\ 3 & -1/6 \end{pmatrix} \quad (\text{replace 1st col of } A \text{ with } \mathbf{b})$$
$$A_y = \begin{pmatrix} 1/2 & 1 \\ 1 & 3 \end{pmatrix} \quad (\text{replace 2nd col of } A \text{ with } \mathbf{b})$$
*Matrices formed by swapping columns with the constant vector.*

**Step 4: Calculate the determinants of the modified matrices.**
For $\det(A_x)$:
$$\det(A_x) = (1)\left(-\frac{1}{6}\right) - \left(\frac{1}{3}\right)(3)$$
$$= -\frac{1}{6} - 1$$
$$= -\frac{1}{6} - \frac{6}{6}$$
$$\det(A_x) = -\frac{7}{6}$$
*Determinant for $x$.*

For $\det(A_y)$:
$$\det(A_y) = \left(\frac{1}{2}\right)(3) - (1)(1)$$
$$= \frac{3}{2} - 1$$
$$= \frac{3}{2} - \frac{2}{2}$$
$$\det(A_y) = \frac{1}{2}$$
*Determinant for $y$.*

**Step 5: Apply Cramer's rule formula.**
For $x$:
$$x = \frac{\det(A_x)}{\det(A)} = \frac{-7/6}{-5/12}$$
$$x = \left(-\frac{7}{6}\right) \cdot \left(-\frac{12}{5}\right)$$
$$x = \frac{7 \cdot 12}{6 \cdot 5}$$
$$x = \frac{7 \cdot 2}{5}$$
$$x = \frac{14}{5}$$
*Value of $x$.*

For $y$:
$$y = \frac{\det(A_y)}{\det(A)} = \frac{1/2}{-5/12}$$
$$y = \left(\frac{1}{2}\right) \cdot \left(-\frac{12}{5}\right)$$
$$y = -\frac{1 \cdot 12}{2 \cdot 5}$$
$$y = -\frac{6}{5}$$
*Value of $y$.*

**Final Answer:**
The solution to the system is $x=\frac{14}{5}, y=-\frac{6}{5}$.
$$\boxed{x=\frac{14}{5}, y=-\frac{6}{5}}$$

**Reflection:** This example demonstrates that Cramer's rule handles fractional coefficients just as well as integer coefficients, although the arithmetic can become more involved. It's a good test of fraction manipulation skills.

## 6. Common mistakes and traps

Students often stumble in specific areas when applying Cramer's rule. Being aware of these common pitfalls can help you avoid them.

1.  **Incorrect Determinant Calculation:** This is by far the most frequent error, especially for 3x3 or larger matrices. Sign errors in cofactor expansion, incorrect arithmetic, or forgetting the diagonal rule for 2x2 matrices are common culprits. A single mistake here propagates through all subsequent calculations.
2.  **Forgetting to Check $\det(A) \neq 0$:** Rushing straight into the formula without first calculating $\det(A)$ and confirming it's non-zero is a significant trap. If $\det(A)=0$, the rule is inapplicable, and attempting to divide by zero is mathematically unsound.
3.  **Swapping the Wrong Column in $A_j$:** When constructing $A_j$, students sometimes replace the wrong column of $A$ with $\mathbf{b}$. For example, replacing the second column when solving for $x_1$ (the first variable). Always remember that the $j$-th column is replaced when solving for the $j$-th variable.
4.  **Not Standardizing the System:** If the given equations are not in the standard form ($a_{11}x_1 + \dots = b_1$), students might form $A$ or $\mathbf{b}$ incorrectly. For instance, if an equation is $3x = 5y - 2$, it must be rewritten as $3x - 5y = -2$ before extracting coefficients.
5.  **Applying to Non-Square Systems:** Cramer's rule is strictly for systems where the number of equations equals the number of variables (i.e., the coefficient matrix $A$ must be square). Trying to apply it to a $2 \times 3$ or $3 \times 2$ system is fundamentally incorrect.
6.  **Misinterpreting $\frac{0}{0}$:** When $\det(A)=0$ and all $\det(A_j)=0$, the result is $\frac{0}{0}$. While this indicates "infinitely many solutions" for consistent systems, it's not a definitive statement Cramer's rule itself provides. It simply means the rule cannot give a unique solution. Students might mistakenly interpret $\frac{0}{0}$ as "no solution" or try to assign a value.

## 7. Textbook-precise explanation

Cramer's rule is a theorem that provides an explicit formula for the solution of a system of linear equations with a unique solution, expressed in terms of determinants.

**Theorem (Cramer's Rule):**
Let $A\mathbf{x} = \mathbf{b}$ be a system of $n$ linear equations in $n$ variables, where $A$ is an $n \times n$ coefficient matrix, $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$ is the column vector of variables, and $\mathbf{b} = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix}$ is the column vector of constants.

If $\det(A) \neq 0$, then the system has a unique solution given by:
$$x_j = \frac{\det(A_j)}{\det(A)} \quad \text{for } j = 1, 2, \dots, n$$
where $A_j$ is the matrix obtained from $A$ by replacing its $j$-th column with the vector $\mathbf{b}$.

**Proof Sketch:**
The proof of Cramer's rule relies on the formula for the inverse of a matrix using its adjoint.
Recall that if $A$ is an invertible $n \times n$ matrix, its inverse $A^{-1}$ can be expressed as:
$$A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$$
where $\text{adj}(A)$ is the adjoint matrix of $A$, whose $(i,j)$-th entry is the cofactor $C_{ji}$ of $A$ (note the transpose: $C_{ji}$ not $C_{ij}$). That is, $\text{adj}(A)_{ij} = C_{ji}$.

Given the system $A\mathbf{x} = \mathbf{b}$, if $\det(A) \neq 0$, then $A$ is invertible, and the unique solution is $\mathbf{x} = A^{-1}\mathbf{b}$.
Substituting the formula for $A^{-1}$:
$$\mathbf{x} = \frac{1}{\det(A)} \text{adj}(A) \mathbf{b}$$
Let's look at the $j$-th component of $\mathbf{x}$, which is $x_j$:
$$x_j = \frac{1}{\det(A)} (\text{adj}(A) \mathbf{b})_j$$
The $j$-th component of the product $(\text{adj}(A) \mathbf{b})$ is the dot product of the $j$-th row of $\text{adj}(A)$ with $\mathbf{b}$. The $j$-th row of $\text{adj}(A)$ consists of the cofactors $C_{1j}, C_{2j}, \dots, C_{nj}$.
So,
$$x_j = \frac{1}{\det(A)} (C_{1j}b_1 + C_{2j}b_2 + \dots + C_{nj}b_n)$$
Now, consider the matrix $A_j$. This matrix is $A$ with its $j$-th column replaced by $\mathbf{b}$.
If we compute the determinant of $A_j$ by cofactor expansion along its $j$-th column, we get:
$$\det(A_j) = b_1 C_{1j} + b_2 C_{2j} + \dots + b_n C_{nj}$$
(Here, $C_{ij}$ are the cofactors of the original matrix $A$, because the submatrices used to calculate cofactors for the $j$-th column of $A_j$ are identical to those for the $j$-th column of $A$).
Comparing this to the expression for $x_j$, we see that the sum $(C_{1j}b_1 + C_{2j}b_2 + \dots + C_{nj}b_n)$ is precisely $\det(A_j)$.
Therefore,
$$x_j = \frac{\det(A_j)}{\det(A)}$$
This completes the proof.

**References:**
*   Lay, David C. *Linear Algebra and Its Applications*. 5th ed., Pearson, 2016. (Chapter 3, Section 3.3)
*   Strang, Gilbert. *Introduction to Linear Algebra*. 5th ed., Wellesley-Cambridge Press, 2016. (Chapter 5, Section 5.3)

## 8. ASCII diagrams

Let's visualize the matrices involved in Cramer's rule for a $3 \times 3$ system.

```text
Original System: A * x = b

Coefficient Matrix A:
+---+---+---+
|a11|a12|a13|
+---+---+---+
|a21|a22|a23|
+---+---+---+
|a31|a32|a33|
+---+---+---+

Variable Vector x:
+---+
|x1 |
+---+
|x2 |
+---+
|x3 |
+---+

Constant Vector b:
+---+
|b1 |
+---+
|b2 |
+---+
|b3 |
+---+

--------------------------------------------------------------------------------

To find x1, we form A1 by replacing the 1st column of A with b:

Matrix A1 (for x1):
+---+---+---+
|b1 |a12|a13|  <-- b1 replaces a11
+---+---+---+
|b2 |a22|a23|  <-- b2 replaces a21
+---+---+---+
|b3 |a32|a33|  <-- b3 replaces a31
+---+---+---+

Then, x1 = det(A1) / det(A)

--------------------------------------------------------------------------------

To find x2, we form A2 by replacing the 2nd column of A with b:

Matrix A2 (for x2):
+---+---+---+
|a11|b1 |a13|  <-- b1 replaces a12
+---+---+---+
|a21|b2 |a23|  <-- b2 replaces a22
+---+---+---+
|a31|b3 |a33|  <-- b3 replaces a32
+---+---+---+

Then, x2 = det(A2) / det(A)

--------------------------------------------------------------------------------

To find x3, we form A3 by replacing the 3rd column of A with b:

Matrix A3 (for x3):
+---+---+---+
|a11|a12|b1 |  <-- b1 replaces a13
+---+---+---+
|a21|a22|b2 |  <-- b2 replaces a23
+---+---+---+
|a31|a32|b3 |  <-- b3 replaces a33
+---+---+---+

Then, x3 = det(A3) / det(A)
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "Cramer's **Column Swap** and **Determinant Divide** Rule."
    *   **Column Swap:** For each variable $x_j$, you literally swap out the $j$-th column of the original coefficient matrix $A$ and put the constant vector $\mathbf{b}$ in its place to get $A_j$.
    *   **Determinant Divide:** Once you have $\det(A_j)$ and $\det(A)$, you just divide: $\frac{\text{special determinant}}{\text{main determinant}}$.
    Visualize a game of musical chairs with matrix columns: the column for $x_j$ gets up, and the $\mathbf{b}$ vector sits down in its spot.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **The Core Formula:** $x_j = \frac{\det(A_j)}{\det(A)}$
    *   **The Condition:** $\det(A) \neq 0$ (no unique solution if it's zero!)
    *   **How to Form $A_j$:** Replace the $j$-th column of $A$ with $\mathbf{b}$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after learning, do 2-3 problems.
    *   **Day 3:** Review the concept and do 1-2 problems.
    *   **Day 7:** Review the formulas and conditions, do 1 problem.
    *   **Day 16:** Briefly recall the rule and its steps.
    *   **Day 35:** Attempt a challenging problem from memory.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the exact formula, you can rebuild it from the concept of matrix inverses and cofactors.
    *   **Start with the system:** $A\mathbf{x} = \mathbf{b}$.
    *   **Recall the inverse:** If $\det(A) \neq 0$, then $\mathbf{x} = A^{-1}\mathbf{b}$.
    *   **Recall the adjoint formula for $A^{-1}$:** $A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$, where $\text{adj}(A)_{ij} = C_{ji}$ (cofactor of $a_{ji}$).
    *   **Substitute:** $\mathbf{x} = \frac{1}{\det(A)} \text{adj}(A) \mathbf{b}$.
    *   **Focus on $x_j$:** The $j$-th component of $\mathbf{x}$ is $x_j = \frac{1}{\det(A)} (\text{adj}(A) \mathbf{b})_j$.
    *   **Expand the product:** The $j$-th component of $(\text{adj}(A) \mathbf{b})$ is the dot product of the $j$-th row of $\text{adj}(A)$ with $\mathbf{b}$. The $j$-th row of $\text{adj}(A)$ consists of $(C_{1j}, C_{2j}, \dots, C_{nj})$. So, $x_j = \frac{1}{\det(A)} (C_{1j}b_1 + C_{2j}b_2 + \dots + C_{nj}b_n)$.
    *   **Connect to $\det(A_j)$:** Recognize that the sum $(C_{1j}b_1 + C_{2j}b_2 + \dots + C_{nj}b_n)$ is precisely the cofactor expansion of $\det(A_j)$ along its $j$-th column (where the $j$-th column has been replaced by $\mathbf{b}$).
    *   **Conclusion:** Therefore, $x_j = \frac{\det(A_j)}{\det(A)}$. This pathway demonstrates the deep connection between determinants, cofactors, matrix inverses, and the solution to linear systems.

## 10. Connections — what this leads to

Cramer's rule, while not always the most practical for large-scale computation, is a beautiful theoretical result that connects several key concepts in linear algebra and lays groundwork for further study.

1.  **Matrix Inverses (Adjoint Formula):** The derivation of Cramer's rule directly uses the formula for the inverse of a matrix, $A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$. Understanding Cramer's rule reinforces the concept of the adjoint matrix and its relationship to the inverse.
2.  **Conditions for Unique Solutions:** Cramer's rule explicitly states that a unique solution exists if and only if $\det(A) \neq 0$. This fundamental condition is central to understanding the solvability of linear systems, linking it to matrix invertibility and the properties of linear transformations.
3.  **Theoretical Tool:** In abstract algebra and theoretical mathematics, Cramer's rule can be used to prove various properties of linear systems or to derive other formulas. For example, it can be used to show that the solution to $A\mathbf{x}=\mathbf{b}$ is a continuous function of the entries of $A$ and $\mathbf{b}$ (provided $\det(A) \neq 0$).
4.  **Eigenvalue Problems:** Determinants are crucial for finding eigenvalues of a matrix, which involves solving the characteristic equation $\det(A - \lambda I) = 0$. While not directly using Cramer's rule, the underlying concept of determinants as a key to system properties is reinforced.
5.  **Linear Transformations:** The determinant of a transformation matrix represents the scaling factor of volume (or area in 2D) under that transformation. Cramer's rule implicitly uses this idea by relating the "volume" of the transformed coordinate system (represented by $\det(A)$) to the "volume" of the system with one axis replaced by the solution vector (represented by $\det(A_j)$).
6.  **Numerical Methods (indirectly):** While Gaussian elimination or LU decomposition are far more efficient for solving large systems numerically, Cramer's rule provides an analytical approach. Understanding its limitations (computational cost) helps appreciate why other numerical methods are preferred for practical applications, pushing students to explore topics like computational complexity and algorithm design.

## 11. Self-check questions

1.  Solve the following system using Cramer's rule:
    $$5x + 2y = 1$$
    $$3x + y = 0$$

2.  Solve the following system using Cramer's rule:
    $$x + 3y - z = 4$$
    $$2x + y + 2z = 3$$
    $$3x - 2y + z = 1$$

3.  Consider the system:
    $$2x - 4y = 6$$
    $$-x + 2y = -3$$
    Attempt to solve it using Cramer's rule. What do you observe, and what does it imply about the system?

4.  For what value(s) of $k$ would Cramer's rule *not* be applicable to solve the following system?
    $$kx + 2y = 5$$
    $$3x + (k-1)y = 7$$

5.  A company produces two products, A and B. Product A requires 2 hours of labor and 1 unit of raw material. Product B requires 3 hours of labor and 2 units of raw material. If the company has 100 hours of labor and 60 units of raw material available, set up the system of equations and explain how Cramer's rule could be used to find the number of units of A and B that can be produced. You don't need to solve it, just describe the setup and the role of Cramer's rule.