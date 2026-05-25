## 1. What it is — in plain English

Imagine you're playing a detective game, trying to figure out a secret code or solve a puzzle. You have several clues, and each clue gives you a piece of information about the unknown values.

A **pivot position** is like a super important, non-negotiable piece of information you uncover. It's a clue that directly tells you something definitive about one of your unknowns. Once you find it, that piece of the puzzle is essentially "fixed" or "determined." You can't change it without breaking the whole solution.

A **free variable**, on the other hand, is like a part of the puzzle where you have total freedom. After you've used all your "pivot" clues, you might find that some parts of the puzzle can still be chosen however you like, without contradicting any of the established facts. You can pick any value for these "free" parts, and you'll still have a valid solution to your puzzle.

In simple terms, when solving a system of equations, pivot positions point to the variables that *must* take a specific value (or be expressed in terms of other fixed variables), while free variables point to the variables that can take *any* value you choose, leading to potentially infinite solutions.

## 2. Why it matters — real-world applications

Understanding pivot positions and free variables isn't just a theoretical exercise; it's fundamental to knowing how many solutions a system has and what those solutions look like. This has profound implications across many fields:

1.  **Machine Learning and Data Science (e.g., Google's Search Algorithm, Meta's Recommendation Systems):** When training models like linear regression or neural networks, you're often solving massive systems of equations to find the "best fit" parameters.
    *   If you have a unique solution (all variables are basic/pivot variables), your model parameters are uniquely determined.
    *   If you have free variables, it means there are infinitely many sets of parameters that equally satisfy the conditions, giving you flexibility or indicating potential "overfitting" issues where the model is too complex for the data. Understanding this helps engineers choose robust models and interpret their results.
2.  **Aerospace Engineering (e.g., NASA's Mars Rovers, Boeing's Flight Control Systems):** Designing control systems for aircraft or spacecraft involves solving complex systems of differential equations, which often reduce to linear systems.
    *   Determining the stability of an aircraft, calculating optimal trajectories, or ensuring structural integrity under various loads often comes down to finding unique or constrained solutions. If a system has free variables, it might imply multiple possible stable states or flight paths, which needs to be carefully managed for safety and performance. For example, if a control system has free variables, it means there are multiple ways to achieve a desired output, and engineers must choose the most energy-efficient or safest one.
3.  **Physics and Engineering (e.g., Circuit Analysis, Structural Mechanics):** In electrical engineering, analyzing complex circuits involves setting up systems of linear equations (Kirchhoff's laws) to find currents and voltages. In civil engineering, analyzing the forces in a bridge structure also leads to linear systems.
    *   A unique solution (no free variables) means there's only one way for the currents to flow or forces to distribute.
    *   The presence of free variables might indicate a redundant component in a circuit (multiple paths for current) or a statically indeterminate structure (more supports than strictly necessary for stability), requiring further analysis to ensure optimal design and safety. For instance, in a highly redundant truss structure, free variables could indicate internal forces that cannot be uniquely determined by external loads alone, requiring additional material properties or constraints to solve.
4.  **Computer Graphics and Robotics (e.g., Pixar Animation Studios, Boston Dynamics Robots):** When animating 3D models or programming robot movements, you're constantly dealing with transformations, rotations, and positions, all of which rely on linear algebra.
    *   For inverse kinematics (making a robot arm reach a specific point), if the system has free variables, it means there are multiple joint configurations that achieve the same end-effector position. This "redundancy" can be exploited to avoid obstacles or achieve more natural-looking movements.

## 3. Prerequisites — what you must know first

Before diving deep into pivot positions and free variables, ensure you have a solid grasp of these foundational concepts:

*   **Systems of Linear Equations:** Understanding what a system of linear equations is (e.g., $2x + 3y = 7$, $x - y = 1$) and what it means to find a solution (values for $x, y$ that satisfy all equations simultaneously).
*   **Matrices:** Familiarity with what a matrix is, its dimensions (rows $\times$ columns), and how to represent a system of linear equations as an augmented matrix.
*   **Elementary Row Operations:** The three fundamental operations you can perform on the rows of a matrix without changing the solution set of the underlying system:
    1.  Swapping two rows.
    2.  Multiplying a row by a non-zero scalar.
    3.  Adding a multiple of one row to another row.
*   **Row Echelon Form (REF):** Understanding the "staircase" pattern:
    1.  All non-zero rows are above any zero rows.
    2.  Each leading entry (the first non-zero number from the left in a row) is in a column to the right of the leading entry of the row above it.
    3.  All entries in a column below a leading entry are zeros.
*   **Reduced Row Echelon Form (RREF):** A more refined version of REF where:
    1.  The matrix is in Row Echelon Form.
    2.  Each leading entry is 1 (called a "leading 1").
    3.  Each leading 1 is the *only* non-zero entry in its column.
*   **Gaussian Elimination and Gauss-Jordan Elimination:** The algorithmic processes (using elementary row operations) to transform any matrix into its REF (Gaussian Elimination) or RREF (Gauss-Jordan Elimination).
*   **Leading Entry (or Leading One):** The first non-zero entry in a non-zero row of a matrix in REF or RREF.

If any of these concepts feel unfamiliar, pause and review them. They are the essential building blocks for understanding pivot positions and free variables.

## 4. The core idea — step by step

The core idea behind pivot positions and free variables is to systematically analyze a system of linear equations to understand the nature of its solution set: whether it has a unique solution, infinitely many solutions, or no solution at all. This analysis is primarily done by transforming the system's augmented matrix into its Reduced Row Echelon Form (RREF).

### Step 1: The Goal - Solve Systems of Equations

**Plain English:** Our main objective is to find the values of the unknown variables that make all equations in a system true simultaneously. Think of it as finding the "sweet spot" where all conditions are met.

**Small Concrete Example:**
Consider the system:
$x_1 + x_2 = 5$
$x_1 - x_2 = 1$
We want to find $x_1$ and $x_2$ that satisfy both equations.

**Formal/Mathematical Version (with LaTeX):**
A system of $m$ linear equations in $n$ variables can be written as:
$$
\begin{align*} a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= b_1 \\ a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n &= b_2 \\ &\vdots \\ a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n &= b_m \end{align*}
$$
This system can be compactly represented in matrix form as $A\mathbf{x} = \mathbf{b}$, where $A$ is the $m \times n$ coefficient matrix, $\mathbf{x}$ is the $n \times 1$ column vector of variables, and $\mathbf{b}$ is the $m \times 1$ column vector of constants. Our goal is to find $\mathbf{x}$.

**What could go wrong:** Not all systems have solutions. Some have no solution, and some have infinitely many. We need a systematic way to distinguish these cases.

### Step 2: The Tool - Reduced Row Echelon Form (RREF)

**Plain English:** To make solving easy and to clearly see the structure of solutions, we transform the system's augmented matrix into its "simplest" form, called Reduced Row Echelon Form (RREF). This form is like organizing all your detective clues so that the most important ones are at the top, clearly stated, and don't overlap with other clues.

**Small Concrete Example:**
For the system:
$x_1 + x_2 = 5$
$x_1 - x_2 = 1$
The augmented matrix is:
$$
\begin{pmatrix} 1 & 1 & | & 5 \\ 1 & -1 & | & 1 \end{pmatrix}
$$
Using row operations (Gauss-Jordan Elimination):
1.  $R_2 \leftarrow R_2 - R_1$:
    $$
    \begin{pmatrix} 1 & 1 & | & 5 \\ 0 & -2 & | & -4 \end{pmatrix}
    $$
2.  $R_2 \leftarrow -\frac{1}{2}R_2$:
    $$
    \begin{pmatrix} 1 & 1 & | & 5 \\ 0 & 1 & | & 2 \end{pmatrix}
    $$
3.  $R_1 \leftarrow R_1 - R_2$:
    $$
    \begin{pmatrix} 1 & 0 & | & 3 \\ 0 & 1 & | & 2 \end{pmatrix}
    $$
This final matrix is in RREF.

**Formal/Mathematical Version (with LaTeX):**
A matrix is in Reduced Row Echelon Form (RREF) if it satisfies the following conditions:
1.  It is in Row Echelon Form (REF).
2.  Each leading entry (pivot) is 1.
3.  Each leading 1 is the only non-zero entry in its column.
The process of transforming a matrix into RREF using elementary row operations is known as Gauss-Jordan Elimination.

**What could go wrong:** Errors in performing row operations will lead to an incorrect RREF, and thus incorrect conclusions about pivot positions and free variables. Always double-check your arithmetic.

### Step 3: Identifying Pivot Positions

**Plain English:** Once your augmented matrix is in RREF, the "pivot positions" are simply the locations of the "leading 1s." These are the ones that clearly stand out as the first non-zero number in their respective rows, and they are the only non-zero entry in their column. They represent the "fixed" or "determined" aspects of your solution.

**Small Concrete Example:**
From Step 2, the RREF is:
$$
\begin{pmatrix} \mathbf{1} & 0 & | & 3 \\ 0 & \mathbf{1} & | & 2 \end{pmatrix}
$$
The entries in bold are the leading 1s.
The **pivot positions** are $(1,1)$ and $(2,2)$ (row 1, column 1; row 2, column 2).

**Formal/Mathematical Version (with LaTeX):**
A **pivot position** in a matrix $A$ is a location $(i, j)$ in $A$ that corresponds to a leading 1 in the Reduced Row Echelon Form of $A$.

**What could go wrong:** You must be in RREF (or at least REF) to correctly identify pivot positions. If you try to identify them in an arbitrary matrix, you'll likely misidentify them.

### Step 4: Identifying Pivot Columns

**Plain English:** A "pivot column" is simply any column that *contains* a pivot position. These are the columns associated with the variables that are "fixed."

**Small Concrete Example:**
From the RREF:
$$
\begin{pmatrix} \mathbf{1} & 0 & | & 3 \\ 0 & \mathbf{1} & | & 2 \end{pmatrix}
$$
Column 1 contains a leading 1 (at position (1,1)).
Column 2 contains a leading 1 (at position (2,2)).
So, **Column 1** and **Column 2** are pivot columns.

**Formal/Mathematical Version (with LaTeX):**
A **pivot column** of a matrix $A$ is any column of $A$ that contains a pivot position.

**What could go wrong:** Remember that pivot columns refer to the columns in the *original* coefficient matrix, even though you identify them from the RREF. It's usually straightforward, but important to keep in mind for larger matrices.

### Step 5: Identifying Basic Variables

**Plain English:** The variables that correspond to the pivot columns are called "basic variables." These are the variables whose values are either uniquely determined or can be expressed directly in terms of other variables (the "free" ones). They are the "primary" variables in your solution.

**Small Concrete Example:**
Our original system had variables $x_1$ and $x_2$.
Column 1 corresponds to $x_1$. Since Column 1 is a pivot column, $x_1$ is a **basic variable**.
Column 2 corresponds to $x_2$. Since Column 2 is a pivot column, $x_2$ is a **basic variable**.
From the RREF, we can read: $x_1 = 3$ and $x_2 = 2$. Both are uniquely determined.

**Formal/Mathematical Version (with LaTeX):**
A **basic variable** in a system of linear equations is a variable that corresponds to a pivot column in the coefficient matrix (after the augmented matrix has been reduced to RREF).

**What could go wrong:** It's crucial to correctly link the column number back to the variable name (e.g., column 1 is $x_1$, column 2 is $x_2$, etc.).

### Step 6: Identifying Free Variables

**Plain English:** Any variable that is *not* a basic variable is a "free variable." These are the variables whose corresponding columns *do not* contain a pivot position. You can choose any value you want for a free variable, and you'll still be able to find a consistent solution for the basic variables. This is what leads to infinitely many solutions.

**Small Concrete Example:**
In our current example:
$$
\begin{pmatrix} 1 & 0 & | & 3 \\ 0 & 1 & | & 2 \end{pmatrix}
$$
Both $x_1$ and $x_2$ are basic variables. There are no non-pivot columns in the coefficient part of the matrix. Therefore, there are **no free variables**. This means the system has a unique solution.

Let's consider a slightly different RREF for intuition:
$$
\begin{pmatrix} 1 & 2 & 0 & | & 5 \\ 0 & 0 & 1 & | & 3 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}
$$
Here, Column 1 and Column 3 are pivot columns (containing leading 1s). So $x_1$ and $x_3$ are basic variables.
Column 2 is *not* a pivot column. Therefore, $x_2$ is a **free variable**. This means we can choose any value for $x_2$.

**Formal/Mathematical Version (with LaTeX):**
A **free variable** in a system of linear equations is a variable that corresponds to a non-pivot column in the coefficient matrix (after the augmented matrix has been reduced to RREF).

**What could go wrong:** Forgetting to check *all* columns in the coefficient part of the RREF. Each column either contains a pivot or it doesn't.

### Step 7: Writing the General Solution

**Plain English:** Once you've identified basic and free variables, you write down the general solution. This means expressing each basic variable in terms of the constants and any free variables. The free variables are simply stated as "free" or assigned a parameter (like $s, t, \dots$). If there are no free variables, the solution is unique and consists of specific values for each variable.

**Small Concrete Example (from Step 6, the slightly different RREF):**
$$
\begin{pmatrix} 1 & 2 & 0 & | & 5 \\ 0 & 0 & 1 & | & 3 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}
$$
This corresponds to the equations:
$x_1 + 2x_2 + 0x_3 = 5 \implies x_1 + 2x_2 = 5$
$0x_1 + 0x_2 + 1x_3 = 3 \implies x_3 = 3$
$0x_1 + 0x_2 + 0x_3 = 0 \implies 0 = 0$ (This row just confirms consistency.)

Basic variables: $x_1, x_3$. Free variable: $x_2$.
From the equations, we solve for the basic variables in terms of the free variables:
$x_1 = 5 - 2x_2$
$x_3 = 3$
$x_2$ is free.

To write the general solution, we often introduce a parameter for each free variable. Let $x_2 = t$, where $t \in \mathbb{R}$.
Then the solution is:
$x_1 = 5 - 2t$
$x_2 = t$
$x_3 = 3$

This can also be written in **parametric vector form**:
$$
\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 5 - 2t \\ t \\ 3 \end{pmatrix} = \begin{pmatrix} 5 \\ 0 \\ 3 \end{pmatrix} + t \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix}
$$

**What could go wrong:** Incorrectly isolating basic variables, missing parameters for free variables, or making algebraic errors when rearranging equations. Also, forgetting to check for an inconsistent row (like $0 = 1$), which would mean no solution at all.

## 5. Worked examples — multiple, with every step shown

### Example 1: Unique Solution (No Free Variables)

**Problem:** Solve the following system of linear equations:
$$
\begin{align*} x_1 + 2x_2 &= 7 \\ 3x_1 - x_2 &= 0 \end{align*}
$$

**Given:** A system of two linear equations with two variables.
**Want:** The values of $x_1$ and $x_2$ that satisfy both equations, and to identify pivot positions and variables.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix} 1 & 2 & | & 7 \\ 3 & -1 & | & 0 \end{pmatrix}
    $$
    *Explanation: We convert the system into a compact matrix representation, separating coefficients from constants with a vertical line.*

2.  **Perform Row Operations to get to RREF:**
    *   **Step 2a: Eliminate $x_1$ from the second equation.**
        $R_2 \leftarrow R_2 - 3R_1$
        $$
        \begin{pmatrix} 1 & 2 & | & 7 \\ 3 - 3(1) & -1 - 3(2) & | & 0 - 3(7) \end{pmatrix} = \begin{pmatrix} 1 & 2 & | & 7 \\ 0 & -7 & | & -21 \end{pmatrix}
        $$
        *Explanation: We want a leading 1 in the first row, first column, and zeros below it. Subtracting 3 times the first row from the second row achieves this for the first column.*

    *   **Step 2b: Make the leading entry in the second row a 1.**
        $R_2 \leftarrow -\frac{1}{7}R_2$
        $$
        \begin{pmatrix} 1 & 2 & | & 7 \\ 0 & -\frac{1}{7}(-7) & | & -\frac{1}{7}(-21) \end{pmatrix} = \begin{pmatrix} 1 & 2 & | & 7 \\ 0 & 1 & | & 3 \end{pmatrix}
        $$
        *Explanation: To get a leading 1 in the second row, we multiply the entire row by the reciprocal of its current leading entry.*

    *   **Step 2c: Eliminate $x_2$ from the first equation.**
        $R_1 \leftarrow R_1 - 2R_2$
        $$
        \begin{pmatrix} 1 - 2(0) & 2 - 2(1) & | & 7 - 2(3) \\ 0 & 1 & | & 3 \end{pmatrix} = \begin{pmatrix} 1 & 0 & | & 1 \\ 0 & 1 & | & 3 \end{pmatrix}
        $$
        *Explanation: To make the matrix RREF, we need zeros above the leading 1s. Subtracting 2 times the second row from the first row eliminates the 2 above the leading 1 in the second column.*

3.  **Identify Pivot Positions and Variables:**
    The RREF is:
    $$
    \begin{pmatrix} \mathbf{1} & 0 & | & 1 \\ 0 & \mathbf{1} & | & 3 \end{pmatrix}
    $$
    *   **Pivot positions:** $(1,1)$ and $(2,2)$ (locations of the leading 1s).
    *   **Pivot columns:** Column 1 and Column 2.
    *   **Basic variables:** $x_1$ (corresponds to Column 1) and $x_2$ (corresponds to Column 2).
    *   **Free variables:** None, because all columns in the coefficient part of the matrix are pivot columns.

4.  **Write the General Solution:**
    From the RREF, we can read the equations:
    $1x_1 + 0x_2 = 1 \implies x_1 = 1$
    $0x_1 + 1x_2 = 3 \implies x_2 = 3$
    Since there are no free variables, the solution is unique.

    The unique solution is $\boxed{\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 1 \\ 3 \end{pmatrix}}$.

**Reflection:** This example was straightforward. The key was that every variable corresponded to a pivot column, meaning each variable was uniquely determined. This leads to a single, unique solution.

---

### Example 2: Infinite Solutions (One Free Variable)

**Problem:** Solve the following system:
$$
\begin{align*} x_1 - 2x_2 + x_3 &= 0 \\ 2x_1 - 3x_2 + x_3 &= 0 \end{align*}
$$

**Given:** A system of two linear equations with three variables. This is a homogeneous system (right-hand side is all zeros).
**Want:** The general solution, identifying pivot positions and variables.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix} 1 & -2 & 1 & | & 0 \\ 2 & -3 & 1 & | & 0 \end{pmatrix}
    $$
    *Explanation: Represent the system in matrix form.*

2.  **Perform Row Operations to get to RREF:**
    *   **Step 2a: Eliminate $x_1$ from the second equation.**
        $R_2 \leftarrow R_2 - 2R_1$
        $$
        \begin{pmatrix} 1 & -2 & 1 & | & 0 \\ 2 - 2(1) & -3 - 2(-2) & | & 1 - 2(1) & | & 0 - 2(0) \end{pmatrix} = \begin{pmatrix} 1 & -2 & 1 & | & 0 \\ 0 & 1 & -1 & | & 0 \end{pmatrix}
        $$
        *Explanation: Create a zero below the leading 1 in the first column.*

    *   **Step 2b: Eliminate $x_2$ from the first equation.**
        $R_1 \leftarrow R_1 + 2R_2$
        $$
        \begin{pmatrix} 1 + 2(0) & -2 + 2(1) & | & 1 + 2(-1) & | & 0 + 2(0) \\ 0 & 1 & | & -1 & | & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 & -1 & | & 0 \\ 0 & 1 & -1 & | & 0 \end{pmatrix}
        $$
        *Explanation: Create a zero above the leading 1 in the second column to achieve RREF.*

3.  **Identify Pivot Positions and Variables:**
    The RREF is:
    $$
    \begin{pmatrix} \mathbf{1} & 0 & -1 & | & 0 \\ 0 & \mathbf{1} & -1 & | & 0 \end{pmatrix}
    $$
    *   **Pivot positions:** $(1,1)$ and $(2,2)$.
    *   **Pivot columns:** Column 1 and Column 2.
    *   **Basic variables:** $x_1$ (from Column 1) and $x_2$ (from Column 2).
    *   **Free variables:** $x_3$ (from Column 3, which is not a pivot column).

4.  **Write the General Solution:**
    From the RREF, the equations are:
    $1x_1 + 0x_2 - 1x_3 = 0 \implies x_1 - x_3 = 0$
    $0x_1 + 1x_2 - 1x_3 = 0 \implies x_2 - x_3 = 0$
    Since $x_3$ is a free variable, let $x_3 = t$, where $t \in \mathbb{R}$.
    Now, express the basic variables ($x_1, x_2$) in terms of the free variable ($x_3$):
    $x_1 = x_3 \implies x_1 = t$
    $x_2 = x_3 \implies x_2 = t$

    The general solution is:
    $$
    \begin{align*} x_1 &= t \\ x_2 &= t \\ x_3 &= t \end{align*}
    $$
    In parametric vector form:
    $$
    \mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} t \\ t \\ t \end{pmatrix} = t \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}
    $$
    The general solution is $\boxed{\mathbf{x} = t \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}, \text{ where } t \in \mathbb{R}}$.

**Reflection:** This example showed how a free variable leads to infinitely many solutions. The "dimension" of the solution space is 1, corresponding to the single free variable. The solution is a line passing through the origin.

---

### Example 3: Infinite Solutions (Multiple Free Variables)

**Problem:** Find the general solution to the system whose augmented matrix is given in RREF:
$$
\begin{pmatrix} 1 & -3 & 0 & -2 & | & 0 \\ 0 & 0 & 1 & 4 & | & 0 \\ 0 & 0 & 0 & 0 & | & 0 \end{pmatrix}
$$

**Given:** An augmented matrix already in RREF.
**Want:** The general solution, identifying pivot positions and variables.

**Solution:**

1.  **The matrix is already in RREF:**
    $$
    \begin{pmatrix} 1 & -3 & 0 & -2 & | & 0 \\ 0 & 0 & 1 & 4 & | & 0 \\ 0 & 0 & 0 & 0 & | & 0 \end{pmatrix}
    $$
    *Explanation: No row operations are needed as the matrix is already in its simplest form.*

2.  **Identify Pivot Positions and Variables:**
    *   **Pivot positions:** $(1,1)$ and $(2,3)$ (locations of the leading 1s).
    *   **Pivot columns:** Column 1 and Column 3.
    *   **Basic variables:** $x_1$ (from Column 1) and $x_3$ (from Column 3).
    *   **Free variables:** $x_2$ (from Column 2) and $x_4$ (from Column 4), because these columns do not contain pivot positions.

3.  **Write the General Solution:**
    From the RREF, the equations are:
    $1x_1 - 3x_2 + 0x_3 - 2x_4 = 0 \implies x_1 - 3x_2 - 2x_4 = 0$
    $0x_1 + 0x_2 + 1x_3 + 4x_4 = 0 \implies x_3 + 4x_4 = 0$
    $0 = 0$ (The last row indicates consistency).

    Since $x_2$ and $x_4$ are free variables, let $x_2 = s$ and $x_4 = t$, where $s, t \in \mathbb{R}$.
    Now, express the basic variables ($x_1, x_3$) in terms of the free variables ($s, t$):
    $x_1 = 3x_2 + 2x_4 \implies x_1 = 3s + 2t$
    $x_3 = -4x_4 \implies x_3 = -4t$

    The general solution is:
    $$
    \begin{align*} x_1 &= 3s + 2t \\ x_2 &= s \\ x_3 &= -4t \\ x_4 &= t \end{align*}
    $$
    In parametric vector form:
    $$
    \mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 3s + 2t \\ s \\ -4t \\ t \end{pmatrix} = \begin{pmatrix} 3s \\ s \\ 0 \\ 0 \end{pmatrix} + \begin{pmatrix} 2t \\ 0 \\ -4t \\ t \end{pmatrix} = s \begin{pmatrix} 3 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t \begin{pmatrix} 2 \\ 0 \\ -4 \\ 1 \end{pmatrix}
    $$
    The general solution is $\boxed{\mathbf{x} = s \begin{pmatrix} 3 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t \begin{pmatrix} 2 \\ 0 \\ -4 \\ 1 \end{pmatrix}, \text{ where } s, t \in \mathbb{R}}$.

**Reflection:** This example demonstrates how multiple free variables lead to a higher-dimensional solution space (a plane through the origin in 4D space, in this case). The number of free variables directly corresponds to the number of parameters needed to describe the infinite solutions.

---

### Example 4: No Solution (Inconsistent System)

**Problem:** Solve the system:
$$
\begin{align*} x_1 + x_2 &= 1 \\ x_2 &= 2 \\ x_1 + 2x_2 &= 5 \end{align*}
$$

**Given:** A system of three linear equations with two variables.
**Want:** The solution set, identifying pivot positions and variables.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix} 1 & 1 & | & 1 \\ 0 & 1 & | & 2 \\ 1 & 2 & | & 5 \end{pmatrix}
    $$
    *Explanation: Convert the equations into an augmented matrix.*

2.  **Perform Row Operations to get to RREF:**
    *   **Step 2a: Eliminate $x_1$ from the third equation.**
        $R_3 \leftarrow R_3 - R_1$
        $$
        \begin{pmatrix} 1 & 1 & | & 1 \\ 0 & 1 & | & 2 \\ 1 - 1 & 2 - 1 & | & 5 - 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 & | & 1 \\ 0 & 1 & | & 2 \\ 0 & 1 & | & 4 \end{pmatrix}
        $$
        *Explanation: Create a zero below the leading 1 in the first column.*

    *   **Step 2b: Eliminate $x_2$ from the first and third equations using $R_2$.**
        $R_1 \leftarrow R_1 - R_2$
        $R_3 \leftarrow R_3 - R_2$
        $$
        \begin{pmatrix} 1 - 0 & 1 - 1 & | & 1 - 2 \\ 0 & 1 & | & 2 \\ 0 - 0 & 1 - 1 & | & 4 - 2 \end{pmatrix} = \begin{pmatrix} 1 & 0 & | & -1 \\ 0 & 1 & | & 2 \\ 0 & 0 & | & 2 \end{pmatrix}
        $$
        *Explanation: Create zeros above and below the leading 1 in the second column. Notice the third row now indicates a problem.*

3.  **Identify Pivot Positions and Variables (and check consistency):**
    The matrix is now in RREF:
    $$
    \begin{pmatrix} \mathbf{1} & 0 & | & -1 \\ 0 & \mathbf{1} & | & 2 \\ 0 & 0 & | & 2 \end{pmatrix}
    $$
    The last row, $\begin{pmatrix} 0 & 0 & | & 2 \end{pmatrix}$, translates to the equation $0x_1 + 0x_2 = 2$, which simplifies to $0 = 2$.
    *   **Inconsistency:** The statement $0 = 2$ is false. This indicates that the system is inconsistent.

    Even though the system is inconsistent, we can still identify pivot positions in the *coefficient* part of the matrix:
    *   **Pivot positions (in coefficient matrix):** $(1,1)$ and $(2,2)$.
    *   **Pivot columns (in coefficient matrix):** Column 1 and Column 2.
    *   **Basic variables:** $x_1$ and $x_2$.
    *   **Free variables:** None.

4.  **Write the General Solution:**
    Because of the inconsistent row $0=2$, there is **no solution** to this system.

    The solution set is $\boxed{\text{Empty Set } (\emptyset)}$.

**Reflection:** This example highlights a critical aspect: an inconsistent row (like $0=k$ where $k \neq 0$) immediately tells you there's no solution. Even if the coefficient matrix has pivot columns for all variables (meaning no free variables), the system as a whole can still be unsolvable if the augmented part leads to a contradiction.

## 6. Common mistakes and traps

1.  **Not reducing to RREF (or at least REF) before identifying:** Students sometimes try to identify pivot positions and free variables from a matrix that is not in any echelon form. This will almost always lead to incorrect identification. The definition relies on the *leading 1s* of the RREF.
2.  **Confusing pivot *positions* with pivot *columns*:** A pivot position is a *location* $(i,j)$ in the matrix. A pivot column is the *entire column* of the original matrix that contains a pivot position.
3.  **Forgetting to consider the *augmented* part of the matrix for consistency:** While pivot positions and free variables are determined by the *coefficient* part of the matrix, the *augmented* column is crucial for determining if a solution *exists* at all. An RREF with a row like $\begin{pmatrix} 0 & 0 & \dots & 0 & | & k \end{pmatrix}$ where $k \neq 0$ means no solution, regardless of the pivot structure in the coefficient matrix.
4.  **Incorrectly writing the general solution:**
    *   Not expressing basic variables *solely* in terms of free variables and constants.
    *   Missing parameters for free variables (e.g., just stating "$x_3$ is free" instead of "$x_3 = t$").
    *   Algebraic errors when solving for basic variables from the RREF equations.
5.  **Assuming all variables are either basic or free:** This is true, but students might miscount or misidentify. For example, if a column in the coefficient matrix is all zeros, it's a non-pivot column, and its corresponding variable is free.
6.  **Errors in row operations:** The most fundamental trap. Any arithmetic mistake during Gaussian or Gauss-Jordan elimination will propagate and lead to an incorrect RREF, and consequently, incorrect pivot/free variable identification and solution.

## 7. Textbook-precise explanation

Let $A$ be an $m \times n$ matrix, and consider the linear system $A\mathbf{x} = \mathbf{b}$, represented by the augmented matrix $[A | \mathbf{b}]$.

**Definition (Pivot Position):**
A **pivot position** in a matrix $A$ is a location $(i, j)$ in $A$ that corresponds to a leading 1 in the Reduced Row Echelon Form (RREF) of $A$. That is, if $U$ is the RREF of $A$, then $(i, j)$ is a pivot position if $U_{ij} = 1$ and $U_{ik} = 0$ for all $k < j$, and $U_{li} = 0$ for all $l \neq i$.

**Definition (Pivot Column):**
A **pivot column** of a matrix $A$ is any column of $A$ that contains a pivot position. Equivalently, it is a column in $A$ whose corresponding column in the RREF of $A$ contains a leading 1.

**Definition (Basic Variable):**
Given a system of linear equations $A\mathbf{x} = \mathbf{b}$, a variable $x_j$ is called a **basic variable** if its corresponding column $j$ in the coefficient matrix $A$ is a pivot column. The values of basic variables are determined by the equations corresponding to the pivot rows and any free variables.

**Definition (Free Variable):**
Given a system of linear equations $A\mathbf{x} = \mathbf{b}$, a variable $x_j$ is called a **free variable** if its corresponding column $j$ in the coefficient matrix $A$ is *not* a pivot column. Free variables can take on any real value, and the basic variables are expressed in terms of these free variables.

**Theorem (Existence and Uniqueness of Solutions):**
A system of linear equations $A\mathbf{x} = \mathbf{b}$ is consistent (i.e., has at least one solution) if and only if the rightmost column of the augmented matrix $[A | \mathbf{b}]$ is not a pivot column. That is, the RREF of $[A | \mathbf{b}]$ does not contain a row of the form $[0 \ 0 \ \dots \ 0 \ | \ k]$ where $k \neq 0$.

If a linear system is consistent:
1.  It has a **unique solution** if and only if there are no free variables (i.e., every column in the coefficient matrix $A$ is a pivot column).
2.  It has **infinitely many solutions** if and only if there is at least one free variable (i.e., at least one column in the coefficient matrix $A$ is not a pivot column).

**Parametric Vector Form of the General Solution:**
If a system $A\mathbf{x} = \mathbf{b}$ has infinitely many solutions, the general solution can be written in **parametric vector form**. This involves expressing each basic variable in terms of the free variables (which are assigned parameters, e.g., $s, t, \dots$). The solution vector $\mathbf{x}$ can then be decomposed into a sum of a particular solution vector and a linear combination of vectors associated with the free variables. For example, if $x_k$ is a free variable, the solution will have a term proportional to $x_k \mathbf{v}_k$ for some vector $\mathbf{v}_k$.

*Reference: Lay, Lay, McDonald, *Linear Algebra and Its Applications*, 5th Ed., Sections 1.2 and 1.5.*
*Reference: Strang, *Introduction to Linear Algebra*, 5th Ed., Chapter 2.*

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a matrix in Reduced Row Echelon Form (RREF), highlighting pivot positions, pivot columns, and non-pivot (free variable) columns.

```text
Augmented Matrix in RREF (Example with 4 variables and 3 equations)

Original Variables: x1  x2  x3  x4  | Constants
                    --- --- --- --- | --------

Row 1:           [ 1   0   0   *   |   *   ]   <-- Leading 1 at (1,1)
                   ^                   ^
                   |                   |
                   |                   This ' * ' is a non-zero entry, but it's not a leading 1.
                   |
                   Pivot Position (1,1)

Row 2:           [ 0   1   0   *   |   *   ]   <-- Leading 1 at (2,2)
                       ^               ^
                       |               |
                       |               This ' * ' is a non-zero entry, but it's not a leading 1.
                       |
                       Pivot Position (2,2)

Row 3:           [ 0   0   1   *   |   *   ]   <-- Leading 1 at (3,3)
                           ^           ^
                           |           |
                           |           This ' * ' is a non-zero entry, but it's not a leading 1.
                           |
                           Pivot Position (3,3)

                 -----------------------------
                 ^   ^   ^   ^
                 |   |   |   |
                 |   |   |   Non-Pivot Column (Column 4)
                 |   |   |   Corresponds to a Free Variable (x4)
                 |   |   |
                 |   |   Pivot Column (Column 3)
                 |   |   Corresponds to a Basic Variable (x3)
                 |   |
                 |   Pivot Column (Column 2)
                 |   Corresponds to a Basic Variable (x2)
                 |
                 Pivot Column (Column 1)
                 Corresponds to a Basic Variable (x1)


Key:
- '1' (bold)   : Leading 1 (Pivot Entry)
- '0'          : Zero entry
- '*'          : Any real number (could be zero or non-zero)
- '|'          : Separator for the augmented column
```

**Description of the figure:**
The diagram shows a $3 \times 4$ coefficient matrix augmented with a column of constants.
*   **Pivot Positions:** The entries `(1,1)`, `(2,2)`, and `(3,3)` are marked with `1`. These are the leading 1s in each non-zero row, and they are the only non-zero entries in their respective columns.
*   **Pivot Columns:** Columns 1, 2, and 3 are identified as pivot columns because they contain these leading 1s. The variables $x_1, x_2, x_3$ corresponding to these columns are **basic variables**.
*   **Non-Pivot Column:** Column 4 does not contain a leading 1. The variable $x_4$ corresponding to this column is a **free variable**.
*   The entries marked `*` are arbitrary numbers. For example, in the first row, the entry in column 4 (`(1,4)`) is some number, but it is not a leading 1, and it's above a leading 1 (in column 3, row 3), but that doesn't make it a pivot. The critical part is that the column it's in (column 4) does *not* contain a leading 1.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a **P**olice **P**atrol car (for **P**ivot **P**osition) that "locks down" a specific intersection (the variable's value). Everything else around it must conform.
    Then, imagine a **F**ree-spirited **F**loater (for **F**ree **F**ariable) who can wander anywhere they like without disturbing the patrol car's fixed position.
    So, **P**olice **P**atrolling **P**ositions **L**ock **D**own **B**asic **V**ariables. **F**ree **F**loaters **W**ander **A**nywhere.

    Visually, in the RREF matrix, the leading 1s are like fixed "anchors" (the pivot positions). The columns containing these anchors are "strong" (pivot columns), and the variables associated with them are "basic" and determined. Any column without an anchor is "weak" (non-pivot column), and its variable is "free" to take any value.

2.  **The 1-3 Formulas/Facts they MUST overlearn:**
    *   **Fact 1: Pivot positions are the locations of the leading 1s in the RREF of the coefficient matrix.** (This is the starting point for everything else).
    *   **Fact 2: Basic variables correspond to pivot columns; free variables correspond to non-pivot columns.** (This links the matrix structure to the variables).
    *   **Fact 3: The number of free variables determines the "dimension" of the solution space.** (0 free variables = unique solution; 1 free variable = line of solutions; 2 free variables = plane of solutions, etc.). If an inconsistent row ($0=k, k \neq 0$) appears, there are no solutions.

3.  **Spaced-Repetition Schedule:**
    *   Review in **1 day**: Quickly re-read this section, try a simple example.
    *   Review in **3 days**: Work through a medium difficulty example from scratch.
    *   Review in **7 days**: Explain the concepts out loud to an imaginary student.
    *   Review in **16 days**: Solve a harder problem, focusing on the parametric vector form.
    *   Review in **35 days**: Attempt to derive the definitions from the concept of solving linear systems.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the definitions, go back to the most fundamental idea: *solving a system of linear equations*.
    1.  Start with a simple system of equations, say $A\mathbf{x} = \mathbf{b}$.
    2.  Form the augmented matrix $[A | \mathbf{b}]$.
    3.  The goal is to simplify this matrix to make the solution obvious. What's the "simplest" form? It's RREF, where each row gives you direct information about a variable.
    4.  Perform Gauss-Jordan elimination to get to RREF.
    5.  Now, look at the RREF. Any row that says "$1 \cdot x_i = \text{something}$" (and $x_i$ has zeros elsewhere in its column) means $x_i$ is determined. This "1" is a leading 1. The variable $x_i$ is "basic." Its column is a "pivot column," and its location is a "pivot position."
    6.  If a column *doesn't* have such a "1", it means that variable isn't directly determined by a leading 1. Its value can be chosen freely, and the basic variables will adjust. This variable is "free."
    7.  If you get a row like $0=1$, then it's impossible to satisfy, meaning no solution.
    This pathway helps you reconstruct the definitions by understanding their purpose in finding solutions.

## 10. Connections — what this leads to

The concepts of pivot positions and free variables are foundational in linear algebra. They unlock and are deeply connected to many subsequent topics:

1.  **Rank of a Matrix:** The **rank** of a matrix $A$ is defined as the number of pivot positions (or, equivalently, the number of pivot columns) in its RREF. This simple count tells you a lot about the "effective" number of independent rows or columns in the matrix.
2.  **Null Space (Kernel) of a Matrix:** The **null space** of a matrix $A$, denoted $\text{Nul}(A)$, is the set of all solutions to the homogeneous equation $A\mathbf{x} = \mathbf{0}$. The free variables directly parameterize the null space. The number of free variables is the **dimension** of the null space, also known as the **nullity** of the matrix.
3.  **Column Space (Image) of a Matrix:** The **column space** of a matrix $A$, denoted $\text{Col}(A)$, is the span of its column vectors. The pivot columns of the *original* matrix $A$ form a basis for its column space.
4.  **Basis and Dimension:** The concepts of pivot columns and free variables are central to finding bases for the null space and column space, and thus determining their dimensions.
    *   The basis for $\text{Col}(A)$ consists of the pivot columns of $A$.
    *   The basis for $\text{Nul}(A)$ is derived from the parametric vector form of the general solution to $A\mathbf{x}=\mathbf{0}$, where each vector corresponds to a free variable.
5.  **Invertibility of Square Matrices:** For a square $n \times n$ matrix $A$, it is invertible if and only if it has $n$ pivot positions (i.e., every column is a pivot column, and there are no free variables in $A\mathbf{x}=\mathbf{0}$). This means its RREF is the identity matrix $I_n$.
6.  **Linear Transformations:** If $A$ is the matrix for a linear transformation $T(\mathbf{x}) = A\mathbf{x}$:
    *   The transformation $T$ is **one-to-one (injective)** if and only if $A$ has no free variables (i.e., every column of $A$ is a pivot column). This means $T(\mathbf{x})=\mathbf{0}$ only has the trivial solution $\mathbf{x}=\mathbf{0}$.
    *   The transformation $T$ is **onto (surjective)** if and only if every row of $A$ contains a pivot position (i.e., $\text{Col}(A) = \mathbb{R}^m$, where $m$ is the number of rows). This means $A\mathbf{x}=\mathbf{b}$ has a solution for every $\mathbf{b}$.
7.  **Homogeneous vs. Non-homogeneous Systems:** The structure of solutions to $A\mathbf{x} = \mathbf{b}$ (non-homogeneous) is intimately related to the solutions of $A\mathbf{x} = \mathbf{0}$ (homogeneous). If $\mathbf{x}_p$ is a particular solution to $A\mathbf{x} = \mathbf{b}$, then the general solution is $\mathbf{x} = \mathbf{x}_p + \mathbf{x}_h$, where $\mathbf{x}_h$ is any solution from the null space (parameterized by free variables).
8.  **Determinants (for square matrices):** A square matrix has a non-zero determinant if and only if it is invertible, which means it has no free variables.

## 11. Self-check questions

1.  Consider a $4 \times 5$ matrix $A$. If its RREF has 3 pivot positions, how many basic variables and how many free variables does the system $A\mathbf{x} = \mathbf{0}$ have?
2.  An augmented matrix for a system of linear equations is reduced to the following RREF:
    $$
    \begin{pmatrix} 1 & 0 & -2 & 0 & | & 5 \\ 0 & 1 & 3 & 0 & | & -1 \\ 0 & 0 & 0 & 1 & | & 4 \end{pmatrix}
    $$
    Identify all pivot positions, pivot columns, basic variables, and free variables. Then, write the general solution in parametric vector form.
3.  Is it possible for a system of 3 equations in 2 variables to have infinitely many solutions? Explain why or why not, in terms of pivot positions and free variables.
4.  Suppose a $5 \times 3$ matrix $A$ represents a linear transformation $T: \mathbb{R}^3 \to \mathbb{R}^5$.
    a) Can $T$ be onto (surjective)? Explain using pivot positions.
    b) Can $T$ be one-to-one (injective)? Explain using pivot positions.
5.  A system $A\mathbf{x} = \mathbf{b}$ has an augmented matrix whose RREF is:
    $$
    \begin{pmatrix} 1 & 2 & 0 & | & 3 \\ 0 & 0 & 1 & | & -2 \\ 0 & 0 & 0 & | & 0 \\ 0 & 0 & 0 & | & 1 \end{pmatrix}
    $$
    What can you conclude about the solution set of this system? Identify any pivot positions in the coefficient matrix.