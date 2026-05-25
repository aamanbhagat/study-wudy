## 1. What it is — in plain English

Imagine you have a really complicated machine, like a fancy coffee maker, and you want to understand how it works or fix it. Instead of trying to grasp everything at once, you might break it down into simpler, smaller parts – maybe the water heater, the grinder, and the brewing unit.

LU decomposition is a bit like that for a special kind of mathematical problem solver: a matrix. A matrix is just a grid of numbers, and it's often used to represent a system of equations, like finding out how much of three different ingredients you need for a recipe given their total weight and cost.

LU decomposition takes a complex matrix and breaks it down into two simpler matrices: one called 'L' (for Lower) and one called 'U' (for Upper). The 'L' matrix is easy to work with because all the interesting numbers are on or below a diagonal line, and everything above it is zero. The 'U' matrix is also easy because all its interesting numbers are on or above a diagonal line, and everything below it is zero.

So, instead of dealing with one big, messy matrix, we get two smaller, tidier ones. This makes solving problems that involve the original matrix much, much faster and easier, especially if you have to solve the same problem many times with slightly different inputs. It's like having a universal wrench that you can break into two specialized wrenches for different parts of your machine.

## 2. Why it matters — real-world applications

LU decomposition is a fundamental tool in numerical linear algebra, and its efficiency for solving systems of linear equations makes it indispensable across many scientific and engineering disciplines.

1.  **Solving Large Systems of Linear Equations (General Purpose):** This is its primary use. Many real-world problems can be formulated as $Ax=b$, where $A$ is a matrix, $x$ is the unknown vector, and $b$ is a known vector. For example, in **structural engineering**, when designing a bridge or a skyscraper, engineers use finite element analysis (FEM) to model how forces are distributed. This involves solving massive systems of linear equations, often with millions of variables. LU decomposition allows these systems to be solved efficiently, especially when the structure is re-analyzed under different load conditions (different $b$ vectors) without re-computing the entire decomposition of $A$.

2.  **Computational Fluid Dynamics (CFD) and Weather Forecasting:** Simulating fluid flow (like air over an airplane wing or ocean currents) or predicting weather patterns involves discretizing partial differential equations, which leads to very large systems of linear equations. Companies like **Boeing** or **NASA** use CFD extensively in aerospace design to optimize aerodynamics. Weather agencies worldwide rely on numerical models that solve systems of equations to forecast atmospheric conditions. LU decomposition, often in its preconditioned form or as part of iterative solvers, is crucial for the performance of these simulations.

3.  **Machine Learning and Optimization:** Many algorithms in machine learning, particularly those involving **linear regression**, **neural network training**, or **support vector machines**, require solving systems of linear equations or related optimization problems. For instance, in training a linear model, finding the optimal weights often involves solving the normal equations, which is a system of linear equations. While direct LU decomposition might be too slow for extremely large datasets, its principles underpin many iterative solvers and preconditioning techniques used in these fields. For example, **Google's** TensorFlow or **Meta's** PyTorch libraries use highly optimized linear algebra routines (often built on BLAS/LAPACK, which heavily use LU and related decompositions) for their operations.

4.  **Financial Modeling and Risk Management:** In quantitative finance, models for option pricing, portfolio optimization, and risk assessment (e.g., Value at Risk, VaR) often involve inverting large covariance matrices or solving systems of equations derived from statistical models. These matrices can be quite large, especially when dealing with portfolios of thousands of assets. LU decomposition provides a robust and efficient way to perform these calculations, enabling financial institutions to quickly re-evaluate risks and optimize investment strategies.

## 3. Prerequisites — what you must know first

Before diving into LU decomposition, ensure you have a solid grasp of these fundamental linear algebra concepts:

*   **Matrices and Vectors:** Understanding what matrices and vectors are, their dimensions, and how to represent them.
*   **Matrix Addition and Scalar Multiplication:** How to add matrices and multiply a matrix by a single number.
*   **Matrix Multiplication:** The rules for multiplying two matrices together, including the requirement for compatible dimensions.
*   **Identity Matrix:** A square matrix with ones on the main diagonal and zeros elsewhere, acting like the number 1 in matrix multiplication.
*   **Inverse Matrix:** For a square matrix $A$, its inverse $A^{-1}$ is a matrix such that $AA^{-1} = A^{-1}A = I$.
*   **Determinant of a Matrix:** A scalar value that can be computed from the elements of a square matrix, indicating properties like invertibility.
*   **System of Linear Equations:** How to represent a set of linear equations in matrix form ($Ax=b$).
*   **Gaussian Elimination:** The systematic process of using elementary row operations to transform a matrix into row echelon form or reduced row echelon form.
*   **Elementary Row Operations:** The three types of operations (swapping rows, multiplying a row by a non-zero scalar, adding a multiple of one row to another) used in Gaussian elimination.
*   **Upper Triangular Matrix:** A square matrix where all entries below the main diagonal are zero.
*   **Lower Triangular Matrix:** A square matrix where all entries above the main diagonal are zero.

## 4. The core idea — step by step

LU decomposition is essentially a matrix factorization technique that breaks down a matrix $A$ into the product of a lower triangular matrix $L$ and an upper triangular matrix $U$. This factorization is incredibly useful for solving systems of linear equations, calculating determinants, and finding matrix inverses.

### Step 1: The Goal - Factorization $A = LU$

*   **Plain English Statement:** Our main goal is to take a given "normal" matrix, let's call it $A$, and rewrite it as the product of two special matrices: one that's "lower triangular" (all zeros above its main diagonal) and one that's "upper triangular" (all zeros below its main diagonal). Think of it like factoring the number 12 into $2 \times 6$.
*   **Small Concrete Example:**
    Let $A = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix}$. We want to find $L$ and $U$ such that $A = LU$.
    $L$ will be a unit lower triangular matrix (meaning it has 1s on its main diagonal): $L = \begin{pmatrix} 1 & 0 \\ l_{21} & 1 \end{pmatrix}$.
    $U$ will be an upper triangular matrix: $U = \begin{pmatrix} u_{11} & u_{12} \\ 0 & u_{22} \end{pmatrix}$.
    So, we are looking for:
    $$ \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ l_{21} & 1 \end{pmatrix} \begin{pmatrix} u_{11} & u_{12} \\ 0 & u_{22} \end{pmatrix} $$
*   **Formal/Mathematical Version:**
    Given a square matrix $A$, we seek to find a lower triangular matrix $L$ and an upper triangular matrix $U$ such that
    $$ A = LU $$
    For an $n \times n$ matrix $A$, $L$ and $U$ will also be $n \times n$. In the most common form (Doolittle's algorithm), $L$ is a *unit* lower triangular matrix, meaning its diagonal entries are all 1s.
    $$ L = \begin{pmatrix}
    1 & 0 & \cdots & 0 \\
    l_{21} & 1 & \cdots & 0 \\
    \vdots & \vdots & \ddots & \vdots \\
    l_{n1} & l_{n2} & \cdots & 1
    \end{pmatrix}, \quad U = \begin{pmatrix}
    u_{11} & u_{12} & \cdots & u_{1n} \\
    0 & u_{22} & \cdots & u_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    0 & 0 & \cdots & u_{nn}
    \end{pmatrix} $$
*   **What Could Go Wrong:** Not all matrices can be decomposed into $LU$ without rearranging their rows (a process called "pivoting"). If a zero appears on the diagonal of $U$ during the process, it might indicate a need for pivoting or that the matrix is singular.

### Step 2: The Connection to Gaussian Elimination

*   **Plain English Statement:** Think back to Gaussian elimination, where you use row operations to turn a matrix into an upper triangular form (row echelon form). LU decomposition essentially records those row operations in the $L$ matrix as you perform them to get the $U$ matrix. The $U$ matrix *is* the upper triangular matrix you get from Gaussian elimination. The $L$ matrix stores the "multipliers" you used to zero out entries below the diagonal.
*   **Small Concrete Example:**
    Let's take $A = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix}$.
    To make the entry $a_{21}$ zero, we perform the row operation $R_2 \leftarrow R_2 - 2R_1$.
    The multiplier used was $2$.
    $$ \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix} \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix} $$
    The resulting upper triangular matrix is $U = \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}$.
    The multiplier $2$ that we used to zero out $a_{21}$ will go into the $l_{21}$ position in $L$.
    So, $L = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$.
    Let's check: $LU = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix} \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 \cdot 2 + 0 \cdot 0 & 1 \cdot 1 + 0 \cdot 1 \\ 2 \cdot 2 + 1 \cdot 0 & 2 \cdot 1 + 1 \cdot 1 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix} = A$. It works!
*   **Formal/Mathematical Version:**
    Gaussian elimination can be expressed as a sequence of elementary matrix multiplications. Each elementary row operation (adding a multiple of one row to another) corresponds to multiplying $A$ by an elementary matrix $E_k$.
    If we perform $k$ such operations to transform $A$ into an upper triangular matrix $U$, we have:
    $$ E_k E_{k-1} \cdots E_1 A = U $$
    The product of these elementary matrices is itself a lower triangular matrix, let $M = E_k E_{k-1} \cdots E_1$. Then $MA = U$.
    If we want $A = LU$, then $L$ must be the inverse of $M$: $L = M^{-1} = (E_k E_{k-1} \cdots E_1)^{-1} = E_1^{-1} E_2^{-1} \cdots E_k^{-1}$.
    Crucially, the inverse of an elementary matrix that adds $c$ times row $j$ to row $i$ is an elementary matrix that adds $-c$ times row $j$ to row $i$. When these inverse elementary matrices are multiplied in the correct order, they form the unit lower triangular matrix $L$, where the entries $l_{ij}$ are precisely the multipliers $c$ used in Gaussian elimination to zero out the $(i,j)$-th entry.
*   **What Could Go Wrong:** It's common to get the signs of the multipliers wrong in $L$. If you perform $R_i \leftarrow R_i - c R_j$, the multiplier for $L$ is $c$, not $-c$. $L$ stores the operations that *reverse* the Gaussian elimination.

### Step 3: Computing L and U (Doolittle's Method)

*   **Plain English Statement:** This is the practical "how-to." We perform Gaussian elimination on matrix $A$ just as usual to get $U$. As we do this, we simultaneously build $L$. For every step where we zero out an entry $a_{ij}$ by subtracting $c$ times row $j$ from row $i$, we simply place that multiplier $c$ directly into the $l_{ij}$ position of $L$.
*   **Small Concrete Example:**
    Let $A = \begin{pmatrix} 2 & 1 & 3 \\ 4 & 3 & 7 \\ 2 & 5 & 8 \end{pmatrix}$.
    We start with $L = I = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$ and $U = A = \begin{pmatrix} 2 & 1 & 3 \\ 4 & 3 & 7 \\ 2 & 5 & 8 \end{pmatrix}$. (We'll modify $U$ to become the final $U$, and $L$ to become the final $L$).

    1.  **Zero out $a_{21}$:** $R_2 \leftarrow R_2 - (4/2)R_1 = R_2 - 2R_1$.
        The multiplier is $m_{21} = 4/2 = 2$.
        Update $U$: $\begin{pmatrix} 2 & 1 & 3 \\ 0 & 1 & 1 \\ 2 & 5 & 8 \end{pmatrix}$.
        Update $L$: $l_{21} = 2 \implies \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$.

    2.  **Zero out $a_{31}$:** $R_3 \leftarrow R_3 - (2/2)R_1 = R_3 - 1R_1$.
        The multiplier is $m_{31} = 2/2 = 1$.
        Update $U$: $\begin{pmatrix} 2 & 1 & 3 \\ 0 & 1 & 1 \\ 0 & 4 & 5 \end{pmatrix}$.
        Update $L$: $l_{31} = 1 \implies \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}$.

    3.  **Zero out $a_{32}$:** $R_3 \leftarrow R_3 - (4/1)R_2 = R_3 - 4R_2$.
        The multiplier is $m_{32} = 4/1 = 4$.
        Update $U$: $\begin{pmatrix} 2 & 1 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix}$.
        Update $L$: $l_{32} = 4 \implies \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 4 & 1 \end{pmatrix}$.

    So, $L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 4 & 1 \end{pmatrix}$ and $U = \begin{pmatrix} 2 & 1 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix}$.
*   **Formal/Mathematical Version:**
    The Doolittle algorithm for $A=LU$ (where $L$ has 1s on the diagonal) proceeds as follows:
    Initialize $L$ as the identity matrix and $U$ as $A$.
    For $k = 1, \dots, n-1$: (This loop iterates through columns, from left to right)
        For $i = k+1, \dots, n$: (This loop iterates through rows below the diagonal)
            Calculate the multiplier $l_{ik} = u_{ik} / u_{kk}$. (This is the ratio of the element to be zeroed out to the pivot element).
            Store this multiplier in $L$: $l_{ik} \leftarrow l_{ik}$.
            Perform the row operation $R_i \leftarrow R_i - l_{ik} R_k$ on the current $U$ matrix. This means:
                For $j = k, \dots, n$:
                    $u_{ij} \leftarrow u_{ij} - l_{ik} u_{kj}$.
    After these loops, the modified $U$ matrix is the upper triangular factor, and the modified $L$ matrix is the unit lower triangular factor.
*   **What Could Go Wrong:** Division by zero if $u_{kk}$ (the pivot element) is zero. This is where pivoting becomes necessary. Also, calculation errors are common, especially with larger matrices.

### Step 4: Solving $Ax=b$ using LU Decomposition

*   **Plain English Statement:** Once you have $A = LU$, solving $Ax=b$ becomes a two-step process, each step much simpler than the original problem.
    1.  First, we solve $Ly=b$ for a new temporary vector $y$. This is easy because $L$ is lower triangular (you can find $y_1$, then $y_2$, and so on). This is called "forward substitution."
    2.  Second, once we have $y$, we solve $Ux=y$ for our original unknown vector $x$. This is also easy because $U$ is upper triangular (you can find $x_n$, then $x_{n-1}$, and so on). This is called "backward substitution."
*   **Small Concrete Example:**
    Using the $L$ and $U$ from the previous example:
    $A = \begin{pmatrix} 2 & 1 & 3 \\ 4 & 3 & 7 \\ 2 & 5 & 8 \end{pmatrix}$, $L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 4 & 1 \end{pmatrix}$, $U = \begin{pmatrix} 2 & 1 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix}$.
    Let's solve $Ax=b$ for $b = \begin{pmatrix} 10 \\ 23 \\ 27 \end{pmatrix}$.

    **Step 1: Solve $Ly=b$ (Forward Substitution)**
    $$ \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 4 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = \begin{pmatrix} 10 \\ 23 \\ 27 \end{pmatrix} $$
    From the first row: $1y_1 = 10 \implies y_1 = 10$.
    From the second row: $2y_1 + 1y_2 = 23 \implies 2(10) + y_2 = 23 \implies 20 + y_2 = 23 \implies y_2 = 3$.
    From the third row: $1y_1 + 4y_2 + 1y_3 = 27 \implies 1(10) + 4(3) + y_3 = 27 \implies 10 + 12 + y_3 = 27 \implies 22 + y_3 = 27 \implies y_3 = 5$.
    So, $y = \begin{pmatrix} 10 \\ 3 \\ 5 \end{pmatrix}$.

    **Step 2: Solve $Ux=y$ (Backward Substitution)**
    $$ \begin{pmatrix} 2 & 1 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 10 \\ 3 \\ 5 \end{pmatrix} $$
    From the third row: $1x_3 = 5 \implies x_3 = 5$.
    From the second row: $1x_2 + 1x_3 = 3 \implies x_2 + 5 = 3 \implies x_2 = -2$.
    From the first row: $2x_1 + 1x_2 + 3x_3 = 10 \implies 2x_1 + (-2) + 3(5) = 10 \implies 2x_1 - 2 + 15 = 10 \implies 2x_1 + 13 = 10 \implies 2x_1 = -3 \implies x_1 = -3/2$.
    So, $x = \begin{pmatrix} -3/2 \\ -2 \\ 5 \end{pmatrix}$.
*   **Formal/Mathematical Version:**
    Given $Ax=b$ and $A=LU$.
    Substitute $A=LU$ into the equation: $(LU)x=b$.
    Group terms: $L(Ux)=b$.
    Define an intermediate vector $y = Ux$.
    The problem is now broken into two steps:
    1.  Solve $Ly=b$ for $y$ using **forward substitution**:
        For $i=1, \dots, n$:
            $y_i = \frac{1}{l_{ii}} \left( b_i - \sum_{j=1}^{i-1} l_{ij} y_j \right)$
        (Note: For Doolittle's method, $l_{ii}=1$, so the division is trivial.)
    2.  Solve $Ux=y$ for $x$ using **backward substitution**:
        For $i=n, \dots, 1$:
            $x_i = \frac{1}{u_{ii}} \left( y_i - \sum_{j=i+1}^{n} u_{ij} x_j \right)$
*   **What Could Go Wrong:** Errors in forward or backward substitution will propagate. Division by zero can occur if any diagonal element of $U$ (or $L$, but $L$ usually has 1s on the diagonal) is zero.

### Step 5: Pivoting (PA=LU)

*   **Plain English Statement:** Sometimes, during Gaussian elimination, you might encounter a zero in the "pivot" position (the diagonal element you're about to use for elimination). If this happens, you can't divide by zero! To fix this, you swap the current row with a row below it that has a non-zero entry in that pivot column. This swapping process needs to be recorded using an extra "permutation" matrix, $P$. So, instead of $A=LU$, we get $PA=LU$.
*   **Small Concrete Example:**
    Let $A = \begin{pmatrix} 0 & 1 & 2 \\ 2 & 4 & 6 \\ 1 & 3 & 5 \end{pmatrix}$.
    If we try to zero out $a_{21}$ and $a_{31}$ using $a_{11}$ as the pivot, we run into trouble because $a_{11}=0$.
    We need to swap rows. Let's swap $R_1$ with $R_2$ (or $R_3$).
    Original $A$: $\begin{pmatrix} 0 & 1 & 2 \\ 2 & 4 & 6 \\ 1 & 3 & 5 \end{pmatrix}$.
    Permutation matrix $P$ for $R_1 \leftrightarrow R_2$: $P = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$.
    Then $PA = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0 & 1 & 2 \\ 2 & 4 & 6 \\ 1 & 3 & 5 \end{pmatrix} = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 1 & 3 & 5 \end{pmatrix}$.
    Now we can proceed with LU decomposition on $PA$.
*   **Formal/Mathematical Version:**
    The general form of LU decomposition, which is always possible for any square matrix, involves a permutation matrix $P$:
    $$ PA = LU $$
    where $P$ is a permutation matrix (obtained by permuting the rows of an identity matrix), $L$ is a unit lower triangular matrix, and $U$ is an upper triangular matrix.
    When solving $Ax=b$, we first multiply both sides by $P$:
    $PAx = Pb$.
    Then substitute $PA=LU$: $LUx = Pb$.
    Now, let $y = Ux$. We solve in two steps:
    1.  Solve $Ly=Pb$ for $y$ (forward substitution).
    2.  Solve $Ux=y$ for $x$ (backward substitution).
    The permutation matrix $P$ effectively reorders the rows of $A$ (and $b$) to ensure that non-zero pivots are always available. Full pivoting also swaps columns, but partial pivoting (swapping rows only) is most common and sufficient for existence.
*   **What Could Go Wrong:** Forgetting to apply the permutation matrix $P$ to the right-hand side vector $b$ when solving $Ax=b$. If you compute $PA=LU$ but then solve $Ly=b$ and $Ux=y$, your solution will be incorrect. It must be $Ly=Pb$.

## 5. Worked examples — multiple, with every step shown

### Example 1: $2 \times 2$ matrix, no pivoting

**Problem:** Find the LU decomposition of the matrix $A = \begin{pmatrix} 3 & 1 \\ 6 & 4 \end{pmatrix}$.

**Given:** Matrix $A$.
**Want:** Matrices $L$ and $U$ such that $A=LU$, where $L$ is unit lower triangular and $U$ is upper triangular.

**Solution:**

1.  **Initialize $U$ as $A$ and $L$ as the identity matrix.**
    $$ U = \begin{pmatrix} 3 & 1 \\ 6 & 4 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} $$
    *Explanation:* We start with $U$ being the original matrix $A$ and $L$ as the identity matrix. We will transform $U$ into an upper triangular matrix using Gaussian elimination, and record the multipliers in $L$.

2.  **Perform Gaussian elimination to make $U$ upper triangular.**
    We need to make the element $u_{21}$ (which is 6) zero.
    To do this, we perform the row operation $R_2 \leftarrow R_2 - m_{21}R_1$.
    The multiplier $m_{21}$ is $u_{21}/u_{11} = 6/3 = 2$.
    *Explanation:* We identify the first element below the main diagonal in $U$ that needs to be zeroed out. This is $u_{21}$. We use $u_{11}$ as the pivot. The multiplier is the ratio of the element to be zeroed out to the pivot element.

3.  **Apply the row operation to $U$ and record the multiplier in $L$.**
    *   **Update $U$**:
        $R_2 \leftarrow R_2 - 2R_1$:
        $u_{21} \leftarrow 6 - 2(3) = 0$
        $u_{22} \leftarrow 4 - 2(1) = 2$
        So, $U$ becomes:
        $$ U = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} $$
    *   **Update $L$**:
        Place the multiplier $m_{21}=2$ into the $l_{21}$ position of $L$:
        $$ L = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix} $$
    *Explanation:* We perform the calculated row operation on $U$ to eliminate $u_{21}$. Simultaneously, we place the multiplier $m_{21}$ into the corresponding position $l_{21}$ in $L$. The 1s on the diagonal of $L$ are fixed by convention for Doolittle's method.

4.  **Check the decomposition.**
    $$ LU = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix} \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} (1)(3)+(0)(0) & (1)(1)+(0)(2) \\ (2)(3)+(1)(0) & (2)(1)+(1)(2) \end{pmatrix} = \begin{pmatrix} 3 & 1 \\ 6 & 4 \end{pmatrix} $$
    This matches the original matrix $A$.

**Final Answer:**
$$ \boxed{ L = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}, \quad U = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} } $$

*Reflection:* This example was straightforward because it's a small matrix and didn't require any pivoting. The key was correctly calculating the single multiplier and placing it in the $L$ matrix while performing the row operation on $U$.

---

### Example 2: $3 \times 3$ matrix, no pivoting, solve $Ax=b$

**Problem:** Find the LU decomposition of $A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 5 & 8 \\ 3 & 8 & 14 \end{pmatrix}$ and then use it to solve the system $Ax=b$ where $b = \begin{pmatrix} 1 \\ 3 \\ 7 \end{pmatrix}$.

**Given:** Matrix $A$ and vector $b$.
**Want:** $L$, $U$, and the solution vector $x$.

**Solution:**

**Part 1: Find LU Decomposition of A**

1.  **Initialize $U$ as $A$ and $L$ as the identity matrix.**
    $$ U = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 5 & 8 \\ 3 & 8 & 14 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *Explanation:* Setup for Doolittle's method.

2.  **Eliminate elements in the first column below the pivot $u_{11}=1$.**
    *   **Zero out $u_{21}$ (which is 2):**
        Multiplier $m_{21} = u_{21}/u_{11} = 2/1 = 2$.
        $R_2 \leftarrow R_2 - 2R_1$.
        Update $U$:
        $u_{21} \leftarrow 2 - 2(1) = 0$
        $u_{22} \leftarrow 5 - 2(2) = 1$
        $u_{23} \leftarrow 8 - 2(3) = 2$
        Update $L$: $l_{21} = 2$.
        $$ U = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 3 & 8 & 14 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   **Zero out $u_{31}$ (which is 3):**
        Multiplier $m_{31} = u_{31}/u_{11} = 3/1 = 3$.
        $R_3 \leftarrow R_3 - 3R_1$.
        Update $U$:
        $u_{31} \leftarrow 3 - 3(1) = 0$
        $u_{32} \leftarrow 8 - 3(2) = 2$
        $u_{33} \leftarrow 14 - 3(3) = 5$
        Update $L$: $l_{31} = 3$.
        $$ U = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 2 & 5 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 0 & 1 \end{pmatrix} $$
    *Explanation:* We systematically eliminate elements below the diagonal in the first column. Each multiplier $m_{ij}$ is stored in the $l_{ij}$ position of $L$.

3.  **Eliminate elements in the second column below the pivot $u_{22}=1$.**
    *   **Zero out $u_{32}$ (which is 2):**
        Multiplier $m_{32} = u_{32}/u_{22} = 2/1 = 2$.
        $R_3 \leftarrow R_3 - 2R_2$.
        Update $U$:
        $u_{32} \leftarrow 2 - 2(1) = 0$
        $u_{33} \leftarrow 5 - 2(2) = 1$
        Update $L$: $l_{32} = 2$.
        $$ U = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 1 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 2 & 1 \end{pmatrix} $$
    *Explanation:* We move to the next column and repeat the elimination process. The $U$ matrix is now upper triangular. The $L$ matrix is unit lower triangular.

**LU Decomposition Result:**
$$ \boxed{ L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 2 & 1 \end{pmatrix}, \quad U = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 1 \end{pmatrix} } $$

**Part 2: Solve $Ax=b$ using LU decomposition**

We have $Ax=b \implies LUx=b$. Let $Ux=y$. We solve $Ly=b$ first, then $Ux=y$.

1.  **Solve $Ly=b$ (Forward Substitution):**
    $$ \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 2 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 3 \\ 7 \end{pmatrix} $$
    *   From Row 1: $1y_1 = 1 \implies y_1 = 1$.
    *   From Row 2: $2y_1 + 1y_2 = 3 \implies 2(1) + y_2 = 3 \implies 2 + y_2 = 3 \implies y_2 = 1$.
    *   From Row 3: $3y_1 + 2y_2 + 1y_3 = 7 \implies 3(1) + 2(1) + y_3 = 7 \implies 3 + 2 + y_3 = 7 \implies 5 + y_3 = 7 \implies y_3 = 2$.
    So, $y = \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix}$.
    *Explanation:* Since $L$ is lower triangular, we can solve for $y_1$, then substitute $y_1$ to find $y_2$, and so on. This is called forward substitution.

2.  **Solve $Ux=y$ (Backward Substitution):**
    $$ \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix} $$
    *   From Row 3: $1x_3 = 2 \implies x_3 = 2$.
    *   From Row 2: $1x_2 + 2x_3 = 1 \implies x_2 + 2(2) = 1 \implies x_2 + 4 = 1 \implies x_2 = -3$.
    *   From Row 1: $1x_1 + 2x_2 + 3x_3 = 1 \implies x_1 + 2(-3) + 3(2) = 1 \implies x_1 - 6 + 6 = 1 \implies x_1 = 1$.
    So, $x = \begin{pmatrix} 1 \\ -3 \\ 2 \end{pmatrix}$.
    *Explanation:* Since $U$ is upper triangular, we can solve for $x_3$, then substitute $x_3$ to find $x_2$, and so on. This is called backward substitution.

**Final Answer:**
The solution to $Ax=b$ is:
$$ \boxed{ x = \begin{pmatrix} 1 \\ -3 \\ 2 \end{pmatrix} } $$

*Reflection:* This example demonstrated the full power of LU decomposition for solving linear systems. The LU factorization itself was straightforward due to convenient pivot elements. The two-step substitution process (forward then backward) is efficient and avoids computationally expensive matrix inversion.

---

### Example 3: $3 \times 3$ matrix, with pivoting required

**Problem:** Find the $PA=LU$ decomposition of $A = \begin{pmatrix} 0 & 1 & 2 \\ 2 & 4 & 6 \\ 1 & 3 & 5 \end{pmatrix}$.

**Given:** Matrix $A$.
**Want:** Matrices $P$, $L$, and $U$ such that $PA=LU$.

**Solution:**

1.  **Initialize $P$ as identity, $L$ as identity, and $U$ as $A$.**
    $$ P = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}, \quad U = \begin{pmatrix} 0 & 1 & 2 \\ 2 & 4 & 6 \\ 1 & 3 & 5 \end{pmatrix} $$
    *Explanation:* We need to track permutations, so we start with an identity permutation matrix $P$.

2.  **First column elimination: Pivoting needed.**
    The pivot element $u_{11}$ is 0. We cannot use it to eliminate elements below.
    We need to swap row 1 with a row below it that has a non-zero element in the first column. Row 2 has 2, Row 3 has 1. Let's swap $R_1 \leftrightarrow R_2$.
    *   **Update $U$**: Swap $R_1$ and $R_2$.
        $$ U = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 1 & 3 & 5 \end{pmatrix} $$
    *   **Update $P$**: Swap $R_1$ and $R_2$ of $P$.
        $$ P = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   **Update $L$**: When pivoting, if any multipliers have already been stored in $L$ for the swapped rows, they must also be swapped. In this first step, $L$ is still identity, so no multipliers are affected yet.
    *Explanation:* A zero pivot means we must swap rows. We apply the same swap to $P$ to record the permutation. If $L$ already had non-zero entries (from previous steps), those entries in the swapped rows would also need to be swapped to maintain consistency.

3.  **Eliminate elements in the first column below the new pivot $u_{11}=2$.**
    *   **Zero out $u_{31}$ (which is 1):**
        Multiplier $m_{31} = u_{31}/u_{11} = 1/2$.
        $R_3 \leftarrow R_3 - (1/2)R_1$.
        Update $U$:
        $u_{31} \leftarrow 1 - (1/2)(2) = 0$
        $u_{32} \leftarrow 3 - (1/2)(4) = 1$
        $u_{33} \leftarrow 5 - (1/2)(6) = 2$
        Update $L$: $l_{31} = 1/2$.
        $$ U = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 0 & 1 & 2 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 1/2 & 0 & 1 \end{pmatrix} $$
    *Explanation:* Now that we have a non-zero pivot, we proceed with Gaussian elimination as usual. Record the multiplier in $L$.

4.  **Second column elimination: Pivot $u_{22}=1$.**
    *   **Zero out $u_{32}$ (which is 1):**
        Multiplier $m_{32} = u_{32}/u_{22} = 1/1 = 1$.
        $R_3 \leftarrow R_3 - 1R_2$.
        Update $U$:
        $u_{32} \leftarrow 1 - 1(1) = 0$
        $u_{33} \leftarrow 2 - 1(2) = 0$
        Update $L$: $l_{32} = 1$.
        $$ U = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 1/2 & 1 & 1 \end{pmatrix} $$
    *Explanation:* Final elimination step. Notice that $u_{33}$ became zero. This indicates the original matrix $A$ is singular (non-invertible). This is fine for LU decomposition; it simply means $U$ will have a zero on its diagonal.

**Final Answer:**
$$ \boxed{ P = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}, \quad L = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 1/2 & 1 & 1 \end{pmatrix}, \quad U = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix} } $$
(You can verify $PA = LU$:
$PA = \begin{pmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0 & 1 & 2 \\ 2 & 4 & 6 \\ 1 & 3 & 5 \end{pmatrix} = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 1 & 3 & 5 \end{pmatrix}$
$LU = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 1/2 & 1 & 1 \end{pmatrix} \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix} = \begin{pmatrix} 2 & 4 & 6 \\ 0 & 1 & 2 \\ 1 & 3 & 5 \end{pmatrix}$. They match.)

*Reflection:* This example highlighted the importance of pivoting. When a zero pivot is encountered, a row swap is essential to continue the decomposition. Remember to apply the same row swap to the permutation matrix $P$. The resulting $U$ matrix having a zero on its diagonal indicates that the original matrix $A$ is singular, meaning $Ax=b$ might not have a unique solution (or any solution).

---

### Example 4: Solving $Ax=b$ for multiple $b$ vectors using pre-computed LU

**Problem:** Given the matrix $A = \begin{pmatrix} 4 & -2 & 1 \\ -2 & 4 & -2 \\ 1 & -2 & 4 \end{pmatrix}$, its LU decomposition is $L = \begin{pmatrix} 1 & 0 & 0 \\ -1/2 & 1 & 0 \\ 1/4 & -2/3 & 1 \end{pmatrix}$ and $U = \begin{pmatrix} 4 & -2 & 1 \\ 0 & 3 & -3/2 \\ 0 & 0 & 9/4 \end{pmatrix}$.
Use this decomposition to solve $Ax=b$ for two different right-hand side vectors:
a) $b_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$
b) $b_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$

**Given:** $A$, $L$, $U$, and two vectors $b_1$, $b_2$.
**Want:** Solution vectors $x_1$ and $x_2$.

**Solution:**

The advantage of LU decomposition is that once $L$ and $U$ are found, solving $Ax=b$ for *any* $b$ is very fast, as it only involves two substitution steps.

**Part a) Solve $Ax=b_1$ where $b_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$**

1.  **Solve $Ly=b_1$ (Forward Substitution):**
    $$ \begin{pmatrix} 1 & 0 & 0 \\ -1/2 & 1 & 0 \\ 1/4 & -2/3 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} $$
    *   From Row 1: $1y_1 = 1 \implies y_1 = 1$.
    *   From Row 2: $-1/2 y_1 + 1y_2 = 0 \implies -1/2(1) + y_2 = 0 \implies y_2 = 1/2$.
    *   From Row 3: $1/4 y_1 - 2/3 y_2 + 1y_3 = 0 \implies 1/4(1) - 2/3(1/2) + y_3 = 0 \implies 1/4 - 1/3 + y_3 = 0 \implies (3-4)/12 + y_3 = 0 \implies -1/12 + y_3 = 0 \implies y_3 = 1/12$.
    So, $y = \begin{pmatrix} 1 \\ 1/2 \\ 1/12 \end{pmatrix}$.
    *Explanation:* We use the computed $L$ and $b_1$ to find the intermediate vector $y$ via forward substitution.

2.  **Solve $Ux=y$ (Backward Substitution):**
    $$ \begin{pmatrix} 4 & -2 & 1 \\ 0 & 3 & -3/2 \\ 0 & 0 & 9/4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 1/2 \\ 1/12 \end{pmatrix} $$
    *   From Row 3: $9/4 x_3 = 1/12 \implies x_3 = (1/12) \cdot (4/9) = 1/27$.
    *   From Row 2: $3x_2 - 3/2 x_3 = 1/2 \implies 3x_2 - 3/2(1/27) = 1/2 \implies 3x_2 - 1/18 = 1/2 \implies 3x_2 = 1/2 + 1/18 = 9/18 + 1/18 = 10/18 = 5/9 \implies x_2 = (5/9) \cdot (1/3) = 5/27$.
    *   From Row 1: $4x_1 - 2x_2 + 1x_3 = 1 \implies 4x_1 - 2(5/27) + 1/27 = 1 \implies 4x_1 - 10/27 + 1/27 = 1 \implies 4x_1 - 9/27 = 1 \implies 4x_1 - 1/3 = 1 \implies 4x_1 = 1 + 1/3 = 4/3 \implies x_1 = (4/3) \cdot (1/4) = 1/3$.
    So, $x_1 = \begin{pmatrix} 1/3 \\ 5/27 \\ 1/27 \end{pmatrix}$.
    *Explanation:* With $y$ known, we use $U$ to find the final solution $x_1$ via backward substitution.

**Part b) Solve $Ax=b_2$ where $b_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$**

1.  **Solve $Ly=b_2$ (Forward Substitution):**
    $$ \begin{pmatrix} 1 & 0 & 0 \\ -1/2 & 1 & 0 \\ 1/4 & -2/3 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} $$
    *   From Row 1: $1y_1 = 0 \implies y_1 = 0$.
    *   From Row 2: $-1/2 y_1 + 1y_2 = 1 \implies -1/2(0) + y_2 = 1 \implies y_2 = 1$.
    *   From Row 3: $1/4 y_1 - 2/3 y_2 + 1y_3 = 0 \implies 1/4(0) - 2/3(1) + y_3 = 0 \implies -2/3 + y_3 = 0 \implies y_3 = 2/3$.
    So, $y = \begin{pmatrix} 0 \\ 1 \\ 2/3 \end{pmatrix}$.

2.  **Solve $Ux=y$ (Backward Substitution):**
    $$ \begin{pmatrix} 4 & -2 & 1 \\ 0 & 3 & -3/2 \\ 0 & 0 & 9/4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 2/3 \end{pmatrix} $$
    *   From Row 3: $9/4 x_3 = 2/3 \implies x_3 = (2/3) \cdot (4/9) = 8/27$.
    *   From Row 2: $3x_2 - 3/2 x_3 = 1 \implies 3x_2 - 3/2(8/27) = 1 \implies 3x_2 - 4/9 = 1 \implies 3x_2 = 1 + 4/9 = 13/9 \implies x_2 = (13/9) \cdot (1/3) = 13/27$.
    *   From Row 1: $4x_1 - 2x_2 + 1x_3 = 0 \implies 4x_1 - 2(13/27) + 8/27 = 0 \implies 4x_1 - 26/27 + 8/27 = 0 \implies 4x_1 - 18/27 = 0 \implies 4x_1 = 18/27 = 2/3 \implies x_1 = (2/3) \cdot (1/4) = 1/6$.
    So, $x_2 = \begin{pmatrix} 1/6 \\ 13/27 \\ 8/27 \end{pmatrix}$.

**Final Answers:**
For $b_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, the solution is $\boxed{ x_1 = \begin{pmatrix} 1/3 \\ 5/27 \\ 1/27 \end{pmatrix} }$.
For $b_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$, the solution is $\boxed{ x_2 = \begin{pmatrix} 1/6 \\ 13/27 \\ 8/27 \end{pmatrix} }$.

*Reflection:* This example clearly demonstrates the computational efficiency of LU decomposition. Once $L$ and $U$ are computed (which is the most expensive part, $\mathcal{O}(n^3)$ operations), solving for new right-hand side vectors $b$ only requires forward and backward substitution ($\mathcal{O}(n^2)$ operations each). If you needed to solve for 100 different $b$ vectors, you'd save a tremendous amount of computation compared to re-doing Gaussian elimination or matrix inversion for each one. The arithmetic here involved fractions, which is a common source of error if one isn't careful.

## 6. Common mistakes and traps

1.  **Incorrectly recording multipliers in L:** When performing $R_i \leftarrow R_i - c R_j$, the multiplier $c$ (not $-c$) goes into the $l_{ij}$ position. Students often confuse the operation with the value to store.
2.  **Forgetting the 1s on the diagonal of L:** In Doolittle's method, $L$ is a *unit* lower triangular matrix, meaning its diagonal elements are always 1. Forgetting this or trying to calculate them leads to errors.
3.  **Sign errors during elimination or substitution:** A single sign error can propagate through the entire calculation, leading to an incorrect $L$, $U$, or final solution $x$. Double-check arithmetic.
4.  **Not performing pivoting when necessary:** Attempting to divide by a zero pivot element will halt the algorithm. Even if the pivot is non-zero but very small, it can lead to numerical instability (large round-off errors). Failing to swap rows (pivoting) when a zero (or near-zero) pivot occurs is a critical mistake.
5.  **Mixing up forward and backward substitution:** Solving $Ly=b$ must be done with forward substitution (from $y_1$ to $y_n$), and solving $Ux=y$ must be done with backward substitution (from $x_n$ to $x_1$). Swapping these or applying the wrong method will yield incorrect results.
6.  **Forgetting to apply the permutation matrix to $b$:** If $PA=LU$ is used, then when solving $Ax=b$, the system becomes $LUx = Pb$. Students sometimes forget to apply the permutation $P$ to the right-hand side vector $b$, leading to an incorrect solution.

## 7. Textbook-precise explanation

LU decomposition is a matrix factorization that decomposes a square matrix $A$ into the product of a lower triangular matrix $L$ and an upper triangular matrix $U$. This factorization is a direct matrix analogue of Gaussian elimination and is widely used for solving systems of linear equations, computing matrix inverses, and evaluating determinants.

**Definition (LU Decomposition):**
Given a square matrix $A \in \mathbb{R}^{n \times n}$, an LU decomposition of $A$ is a factorization of the form
$$ A = LU $$
where $L$ is a lower triangular matrix and $U$ is an upper triangular matrix.

There are several conventions for the diagonal elements of $L$ and $U$:
*   **Doolittle's Method:** $L$ is a *unit* lower triangular matrix (i.e., $l_{ii}=1$ for all $i$), and $U$ is an upper triangular matrix. This is the most common convention.
*   **Crout's Method:** $U$ is a *unit* upper triangular matrix (i.e., $u_{ii}=1$ for all $i$), and $L$ is a lower triangular matrix.
*   **Cholesky Decomposition:** For symmetric positive-definite matrices, $A = LL^T$, where $L$ is a lower triangular matrix. This is a special case of LU decomposition.

**Existence and Uniqueness (without pivoting):**
An LU decomposition $A=LU$ (with $L$ unit lower triangular) exists if and only if all leading principal minors of $A$ are non-zero. If it exists, it is unique. The $k$-th leading principal minor of $A$ is the determinant of the $k \times k$ submatrix formed by the first $k$ rows and $k$ columns of $A$.

**Algorithm (Doolittle's Method, without pivoting):**
To compute $A=LU$ where $L$ is unit lower triangular:
Let $A = (a_{ij})$, $L=(l_{ij})$, $U=(u_{ij})$.
1.  Initialize $L$ as the identity matrix $I$.
2.  For $k = 1, \dots, n-1$:
    For $i = k+1, \dots, n$:
        Calculate the multiplier $l_{ik} = a_{ik} / a_{kk}$.
        For $j = k, \dots, n$:
            $a_{ij} \leftarrow a_{ij} - l_{ik} a_{kj}$. (This updates the $A$ matrix in place, turning it into $U$)
3.  The final $A$ matrix (after these operations) is $U$. The multipliers $l_{ik}$ (stored as $l_{ik}$ in $L$) form the non-diagonal entries of $L$.

**Pivoting ($PA=LU$ Decomposition):**
For a general non-singular matrix $A$, an LU decomposition without pivoting may not exist (e.g., if a pivot element $a_{kk}$ becomes zero during the process). To guarantee existence and enhance numerical stability, row interchanges (pivoting) are often necessary. This leads to the factorization:
$$ PA = LU $$
where $P$ is a permutation matrix, $L$ is a unit lower triangular matrix, and $U$ is an upper triangular matrix.
The permutation matrix $P$ records all the row swaps performed during the Gaussian elimination process. This decomposition always exists for any square matrix $A$.

**Solving Linear Systems ($Ax=b$):**
Given $Ax=b$ and $A=LU$:
1.  Substitute $A=LU$: $LUx=b$.
2.  Let $y=Ux$. Then solve $Ly=b$ for $y$ using **forward substitution**:
    $$ y_i = b_i - \sum_{j=1}^{i-1} l_{ij} y_j \quad \text{for } i=1, \dots, n $$
    (Assuming $l_{ii}=1$ for Doolittle's method).
3.  Solve $Ux=y$ for $x$ using **backward substitution**:
    $$ x_i = \frac{1}{u_{ii}} \left( y_i - \sum_{j=i+1}^{n} u_{ij} x_j \right) \quad \text{for } i=n, \dots, 1 $$

If $PA=LU$ is used for $Ax=b$:
1.  Multiply by $P$: $PAx=Pb$.
2.  Substitute $PA=LU$: $LUx=Pb$.
3.  Let $y=Ux$. Solve $Ly=Pb$ for $y$ using forward substitution.
4.  Solve $Ux=y$ for $x$ using backward substitution.

**Computational Cost:**
The computation of $L$ and $