## 1. What it is — in plain English

Imagine you have a machine that takes in a set of numbers (let's say, two numbers $x$ and $y$) and spits out a single number. If this machine always combines $x$ and $y$ by squaring them or multiplying them together (like $x^2$, $y^2$, or $xy$), but *never* just adds them directly (like $x$ or $y$) and *never* includes a constant number, then what you have is a "quadratic form."

Think of it like this: if you're measuring the "energy" of a system, and that energy depends on the positions of two particles, $x$ and $y$. A quadratic form might tell you that the energy is $x^2 + y^2$, or $3x^2 - 2xy + 5y^2$. Notice how all the terms involve variables multiplied by themselves twice (like $x \cdot x$) or two different variables multiplied together (like $x \cdot y$).

Now, the "positive definite," "negative definite," and "indefinite" parts describe the *character* of this energy landscape. If the energy is *always* positive (unless both $x$ and $y$ are zero), we call it "positive definite" – like a bowl sitting upright, where the bottom is the lowest point (zero energy), and any other point is higher (positive energy).

If the energy is *always* negative (unless $x$ and $y$ are zero), we call it "negative definite" – like an upside-down bowl, where the peak is the highest point (zero energy), and any other point is lower (negative energy). And if the energy can be sometimes positive and sometimes negative, depending on $x$ and $y$, it's "indefinite" – like a saddle shape, where you can go up in one direction and down in another.

## 2. Why it matters — real-world applications

Quadratic forms and their definiteness are fundamental to understanding the behavior of systems in various fields. They often describe energy, cost, or risk functions, and knowing their "shape" (bowl-up, bowl-down, saddle) is crucial for optimization and stability analysis.

1.  **Machine Learning and Optimization:** In training complex models like neural networks, we often define a "loss function" that measures how well the model is performing. The goal is to minimize this loss function. The second-derivative test for multivariable functions uses the Hessian matrix, which is intimately related to quadratic forms. If the Hessian at a critical point is **positive definite**, it indicates a local minimum (a valley in the loss landscape), which is often what we're looking for. If it's **negative definite**, it's a local maximum. If it's **indefinite**, it's a saddle point, which can be tricky for optimization algorithms. Companies like Google (for search algorithms), Facebook (for recommendation systems), and NVIDIA (for optimizing GPU computations) heavily rely on these concepts for efficient model training.

2.  **Physics and Engineering — Stability Analysis:** In mechanical systems, control systems, or structural engineering, we often define a "potential energy" function. If the potential energy function around an equilibrium point is **positive definite**, it means that any small deviation from equilibrium increases the energy, tending to push the system back to equilibrium. This signifies a *stable* equilibrium (like a ball at the bottom of a bowl). Conversely, if it's **negative definite**, it's an *unstable* equilibrium (like a ball on top of an inverted bowl). If it's **indefinite**, it's a saddle point, which is also unstable. Aerospace companies like Boeing or SpaceX use this to design stable aircraft or rockets.

3.  **Economics and Finance — Risk Assessment and Portfolio Optimization:** In finance, quadratic forms are used to model the risk of a portfolio of assets. The variance of a portfolio's return can be expressed as a quadratic form involving the covariance matrix of the assets. A **positive definite** covariance matrix ensures that the portfolio's variance (a measure of risk) is always non-negative, which is a fundamental property. Understanding the "definiteness" of related matrices helps financial analysts at firms like Goldman Sachs or BlackRock to construct optimal portfolios that minimize risk for a given return, or vice-versa.

4.  **Signal Processing and Data Analysis:** In fields like image processing or speech recognition, techniques like Principal Component Analysis (PCA) rely on the properties of covariance matrices, which are always **positive semidefinite**. This property ensures that the "variance" explained by principal components is always non-negative, which makes physical sense for data variability. Companies like Intel or Qualcomm, developing processors for multimedia, utilize these mathematical underpinnings.

## 3. Prerequisites — what you must know first

Before diving deep into quadratic forms, ensure you have a solid grasp of these foundational linear algebra concepts:

*   **Vectors and Matrices:** Understanding what vectors and matrices are, how to perform basic operations like addition, scalar multiplication, and matrix multiplication.
*   **Matrix Transpose:** Knowing how to find the transpose of a matrix ($A^T$) and its properties, especially $(AB)^T = B^T A^T$.
*   **Symmetric Matrices:** A matrix $A$ is symmetric if $A = A^T$. This is a crucial property for the matrix associated with a quadratic form.
*   **Eigenvalues and Eigenvectors:** Understanding that for a square matrix $A$, an eigenvector $\mathbf{v}$ satisfies $A\mathbf{v} = \lambda\mathbf{v}$, where $\lambda$ is the eigenvalue. Knowing how to calculate eigenvalues by solving the characteristic equation $\det(A - \lambda I) = 0$.
*   **Determinants:** How to calculate the determinant of a square matrix, especially for $2 \times 2$ and $3 \times 3$ matrices. You should also know properties like $\det(AB) = \det(A)\det(B)$.
*   **Dot Product:** The definition of the dot product $\mathbf{x} \cdot \mathbf{y}$ and its relation to matrix multiplication $\mathbf{x}^T \mathbf{y}$.
*   **Multivariable Calculus (basic):** Familiarity with partial derivatives and the concept of a Hessian matrix (the matrix of second partial derivatives) will be helpful for understanding applications, but not strictly necessary for the core definitions here.

## 4. The core idea — step by step

Let's build up the concept of quadratic forms and their classification piece by piece.

### Step 1: What is a Quadratic Form?

**Plain English:** A quadratic form is a special type of function that takes a vector (a list of numbers) and outputs a single number. The key characteristic is that every term in the function involves multiplying two variables together, or squaring a single variable. There are no terms with just a single variable (like $x_1$) and no constant terms.

**Small Concrete Example:**
Consider a function of two variables, $x_1$ and $x_2$:
$Q(x_1, x_2) = 3x_1^2 + 2x_1x_2 - 5x_2^2$.
This is a quadratic form because each term ($3x_1^2$, $2x_1x_2$, $-5x_2^2$) has a total degree of 2 (i.e., the sum of the exponents of the variables in each term is 2).

**The Formal/Mathematical Version:**
A real-valued function $Q: \mathbb{R}^n \to \mathbb{R}$ is a quadratic form if it can be written as:
$$ Q(\mathbf{x}) = \sum_{i=1}^n \sum_{j=1}^n a_{ij} x_i x_j $$
where $\mathbf{x} = (x_1, x_2, \ldots, x_n)^T$ is a vector in $\mathbb{R}^n$, and $a_{ij}$ are real coefficients.
This can also be written in matrix notation as:
$$ Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x} $$
where $A$ is an $n \times n$ matrix.

For our example $Q(x_1, x_2) = 3x_1^2 + 2x_1x_2 - 5x_2^2$:
Let $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$.
Then $\mathbf{x}^T A \mathbf{x} = \begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$
$= \begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} a_{11}x_1 + a_{12}x_2 \\ a_{21}x_1 + a_{22}x_2 \end{pmatrix}$
$= a_{11}x_1^2 + a_{12}x_1x_2 + a_{21}x_2x_1 + a_{22}x_2^2$
$= a_{11}x_1^2 + (a_{12} + a_{21})x_1x_2 + a_{22}x_2^2$.
Comparing this to $3x_1^2 + 2x_1x_2 - 5x_2^2$, we can set:
$a_{11} = 3$
$a_{22} = -5$
$a_{12} + a_{21} = 2$.
There are many choices for $a_{12}$ and $a_{21}$ (e.g., $a_{12}=2, a_{21}=0$ or $a_{12}=0, a_{21}=2$).

**What could go wrong:** Students often confuse quadratic forms with general polynomials or linear forms. A function like $f(x,y) = x^2 + 2y - 1$ is *not* a quadratic form because it has a linear term ($2y$) and a constant term ($-1$). A quadratic form must be homogeneous of degree 2.

### Step 2: The Symmetric Matrix Connection

**Plain English:** While many matrices $A$ can represent a given quadratic form $Q(\mathbf{x})$, there's a unique *symmetric* matrix that does the job. This symmetric matrix is incredibly useful because symmetric matrices have nice properties (like real eigenvalues and orthogonal eigenvectors), which simplify analysis.

**Small Concrete Example:**
For $Q(x_1, x_2) = 3x_1^2 + 2x_1x_2 - 5x_2^2$, we found $a_{11}=3$, $a_{22}=-5$, and $a_{12}+a_{21}=2$.
To make the matrix $A$ symmetric, we require $a_{12} = a_{21}$.
So, $a_{12} + a_{12} = 2 \implies 2a_{12} = 2 \implies a_{12} = 1$.
Therefore, $a_{21} = 1$.
The unique symmetric matrix $A$ is:
$$ A = \begin{pmatrix} 3 & 1 \\ 1 & -5 \end{pmatrix} $$
You can verify this: $\begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} 3 & 1 \\ 1 & -5 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = 3x_1^2 + x_1x_2 + x_2x_1 - 5x_2^2 = 3x_1^2 + 2x_1x_2 - 5x_2^2$.

**The Formal/Mathematical Version:**
For any quadratic form $Q(\mathbf{x}) = \mathbf{x}^T B \mathbf{x}$ (where $B$ is any square matrix), we can always find a unique symmetric matrix $A$ such that $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$. This matrix $A$ is given by $A = \frac{1}{2}(B + B^T)$.
Specifically, if $Q(\mathbf{x}) = \sum_{i,j} b_{ij} x_i x_j$, then the symmetric matrix $A$ has entries:
$a_{ii} = b_{ii}$ (for diagonal terms)
$a_{ij} = a_{ji} = \frac{1}{2}(b_{ij} + b_{ji})$ (for off-diagonal terms).
In practice, for a given $Q(\mathbf{x})$, you simply put the coefficient of $x_i^2$ on the diagonal at $a_{ii}$, and split the coefficient of $x_i x_j$ (for $i \neq j$) equally between $a_{ij}$ and $a_{ji}$.

**What could go wrong:** A common mistake is not making the matrix $A$ symmetric. For example, for $2x_1x_2$, some might write $a_{12}=2, a_{21}=0$. While this matrix $B = \begin{pmatrix} 0 & 2 \\ 0 & 0 \end{pmatrix}$ also yields $Q(\mathbf{x})$, it's not symmetric. The symmetric matrix is always preferred and used for classification.

### Step 3: Positive Definite Quadratic Forms

**Plain English:** A quadratic form is "positive definite" if, no matter what non-zero vector you plug into it, the output is always a strictly positive number. Think of it as a bowl opening upwards. The only way to get zero is if you plug in the zero vector itself.

**Small Concrete Example:**
Consider $Q(x_1, x_2) = x_1^2 + x_2^2$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $Q(1,0) = 1^2 + 0^2 = 1 > 0$.
If $\mathbf{x} = \begin{pmatrix} -2 \\ 3 \end{pmatrix}$, $Q(-2,3) = (-2)^2 + 3^2 = 4 + 9 = 13 > 0$.
If $\mathbf{x} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$, $Q(0,0) = 0^2 + 0^2 = 0$.
For any $\mathbf{x} \neq \mathbf{0}$, $x_1^2 + x_2^2$ will always be strictly positive. So, this is a positive definite quadratic form.
The symmetric matrix for this form is $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.

**The Formal/Mathematical Version:**
A quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ (with $A$ symmetric) is **positive definite (PD)** if
$$ Q(\mathbf{x}) > 0 \quad \text{for all } \mathbf{x} \in \mathbb{R}^n, \mathbf{x} \neq \mathbf{0} $$
Equivalently, the symmetric matrix $A$ is called a positive definite matrix.

**What could go wrong:** Forgetting the "$\mathbf{x} \neq \mathbf{0}$" condition. All quadratic forms are zero at $\mathbf{x} = \mathbf{0}$. The definition relies on the behavior for *non-zero* vectors.

### Step 4: Negative Definite Quadratic Forms

**Plain English:** A quadratic form is "negative definite" if, for any non-zero vector you plug in, the output is always a strictly negative number. This is like an upside-down bowl. Again, it's only zero if you plug in the zero vector.

**Small Concrete Example:**
Consider $Q(x_1, x_2) = -x_1^2 - x_2^2$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $Q(1,0) = -1^2 - 0^2 = -1 < 0$.
If $\mathbf{x} = \begin{pmatrix} -2 \\ 3 \end{pmatrix}$, $Q(-2,3) = -(-2)^2 - 3^2 = -4 - 9 = -13 < 0$.
For any $\mathbf{x} \neq \mathbf{0}$, $-x_1^2 - x_2^2$ will always be strictly negative. So, this is a negative definite quadratic form.
The symmetric matrix for this form is $A = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}$.

**The Formal/Mathematical Version:**
A quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ (with $A$ symmetric) is **negative definite (ND)** if
$$ Q(\mathbf{x}) < 0 \quad \text{for all } \mathbf{x} \in \mathbb{R}^n, \mathbf{x} \neq \mathbf{0} $$
Equivalently, the symmetric matrix $A$ is called a negative definite matrix.

**What could go wrong:** Confusing negative definite with negative *semidefinite* (covered next). The strict inequality ($<0$) is crucial.

### Step 5: Indefinite Quadratic Forms

**Plain English:** An "indefinite" quadratic form is one that doesn't consistently stay positive or negative. Depending on the non-zero vector you plug in, it can give you a positive number, and for a different non-zero vector, it can give you a negative number. This is the saddle shape.

**Small Concrete Example:**
Consider $Q(x_1, x_2) = x_1^2 - x_2^2$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $Q(1,0) = 1^2 - 0^2 = 1 > 0$. (Positive output)
If $\mathbf{x} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$, $Q(0,1) = 0^2 - 1^2 = -1 < 0$. (Negative output)
Since it can produce both positive and negative values, this is an indefinite quadratic form.
The symmetric matrix for this form is $A = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$.

**The Formal/Mathematical Version:**
A quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ (with $A$ symmetric) is **indefinite** if it takes both positive and negative values. That is, there exist $\mathbf{x}_1 \neq \mathbf{0}$ and $\mathbf{x}_2 \neq \mathbf{0}$ such that $Q(\mathbf{x}_1) > 0$ and $Q(\mathbf{x}_2) < 0$.
Equivalently, the symmetric matrix $A$ is called an indefinite matrix.

**What could go wrong:** Incorrectly classifying a positive (or negative) semidefinite form as indefinite. The key is that it *must* take *both* positive and negative values.

### Step 6: Positive Semidefinite and Negative Semidefinite

**Plain English:** These are "weaker" versions of definite forms. "Positive semidefinite" means the output is always non-negative (zero or positive). It's like a bowl opening upwards, but it might have a flat bottom or a trough where the value is zero for *multiple* non-zero input vectors. "Negative semidefinite" is the opposite: always non-positive (zero or negative).

**Small Concrete Example:**
**Positive Semidefinite:** Consider $Q(x_1, x_2) = (x_1 - x_2)^2 = x_1^2 - 2x_1x_2 + x_2^2$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $Q(1,0) = (1-0)^2 = 1 > 0$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$, $Q(1,1) = (1-1)^2 = 0$. Here, we have a non-zero vector giving a zero output.
Since $Q(\mathbf{x}) \ge 0$ for all $\mathbf{x}$, and it can be zero for $\mathbf{x} \neq \mathbf{0}$, it's positive semidefinite.
The symmetric matrix is $A = \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$.

**Negative Semidefinite:** Consider $Q(x_1, x_2) = -(x_1 + x_2)^2 = -x_1^2 - 2x_1x_2 - x_2^2$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $Q(1,0) = -(1+0)^2 = -1 < 0$.
If $\mathbf{x} = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$, $Q(1,-1) = -(1-1)^2 = 0$. Here, a non-zero vector gives zero output.
Since $Q(\mathbf{x}) \le 0$ for all $\mathbf{x}$, and it can be zero for $\mathbf{x} \neq \mathbf{0}$, it's negative semidefinite.
The symmetric matrix is $A = \begin{pmatrix} -1 & -1 \\ -1 & -1 \end{pmatrix}$.

**The Formal/Mathematical Version:**
A quadratic form $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ (with $A$ symmetric) is **positive semidefinite (PSD)** if
$$ Q(\mathbf{x}) \ge 0 \quad \text{for all } \mathbf{x} \in \mathbb{R}^n $$
It is **negative semidefinite (NSD)** if
$$ Q(\mathbf{x}) \le 0 \quad \text{for all } \mathbf{x} \in \mathbb{R}^n $$
Note that PD implies PSD, and ND implies NSD. The distinction is whether $Q(\mathbf{x})=0$ *only* for $\mathbf{x}=\mathbf{0}$.

**What could go wrong:** The most common error is confusing definite with semidefinite. Remember: "definite" means *strictly* positive or negative for non-zero vectors. "Semidefinite" means *non-strictly* positive or negative (allowing zero for non-zero vectors).

### Step 7: How to Determine the Type (Criteria)

**Plain English:** We need practical ways to tell if a quadratic form is PD, ND, or indefinite without testing every possible vector (which is impossible!). There are two main methods: looking at the eigenvalues of the associated symmetric matrix, or looking at the determinants of its "leading principal minors."

**Small Concrete Example (using eigenvalues):**
Consider $Q(x_1, x_2) = 2x_1^2 + 2x_1x_2 + 2x_2^2$.
The symmetric matrix is $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$.
To find eigenvalues, solve $\det(A - \lambda I) = 0$:
$\det \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} = (2-\lambda)(2-\lambda) - 1 \cdot 1 = (2-\lambda)^2 - 1 = 0$
$(2-\lambda)^2 = 1$
$2-\lambda = \pm 1$
Case 1: $2-\lambda = 1 \implies \lambda = 1$.
Case 2: $2-\lambda = -1 \implies \lambda = 3$.
Both eigenvalues are $\lambda_1 = 1 > 0$ and $\lambda_2 = 3 > 0$. Since all eigenvalues are strictly positive, the quadratic form is positive definite.

**The Formal/Mathematical Version:**
Let $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ where $A$ is a symmetric matrix.

1.  **Eigenvalue Criterion:**
    *   $Q(\mathbf{x})$ is **Positive Definite** if and only if all eigenvalues of $A$ are strictly positive ($\lambda_i > 0$ for all $i$).
    *   $Q(\mathbf{x})$ is **Negative Definite** if and only if all eigenvalues of $A$ are strictly negative ($\lambda_i < 0$ for all $i$).
    *   $Q(\mathbf{x})$ is **Indefinite** if and only if $A$ has both positive and negative eigenvalues.
    *   $Q(\mathbf{x})$ is **Positive Semidefinite** if and only if all eigenvalues of $A$ are non-negative ($\lambda_i \ge 0$ for all $i$).
    *   $Q(\mathbf{x})$ is **Negative Semidefinite** if and only if all eigenvalues of $A$ are non-positive ($\lambda_i \le 0$ for all $i$).

2.  **Sylvester's Criterion (Leading Principal Minors):**
    Let $A_k$ denote the $k$-th leading principal minor of $A$, which is the determinant of the $k \times k$ submatrix formed by the first $k$ rows and $k$ columns of $A$.
    *   $Q(\mathbf{x})$ is **Positive Definite** if and only if all leading principal minors are strictly positive: $\det(A_1) > 0, \det(A_2) > 0, \ldots, \det(A_n) > 0$.
    *   $Q(\mathbf{x})$ is **Negative Definite** if and only if the leading principal minors alternate in sign, starting with negative: $\det(A_1) < 0, \det(A_2) > 0, \det(A_3) < 0, \ldots, (-1)^k \det(A_k) > 0$.
    *   If Sylvester's criterion does not hold (e.g., some minor is zero, or the signs don't match), the form might be semidefinite or indefinite. For indefinite, you typically need to check eigenvalues.

**What could go wrong:** Miscalculating eigenvalues or determinants. For Sylvester's criterion, remembering the correct sign pattern for negative definite is a common trap. Also, Sylvester's criterion *only* gives sufficient conditions for PD/ND; it's not always conclusive for semidefinite or indefinite forms (though it can sometimes rule out PD/ND). The eigenvalue criterion is the most comprehensive.

## 5. Worked examples — multiple, with every step shown

### Example 1: Positive Definite (Eigenvalue Method)

**State the problem clearly:** Determine if the quadratic form $Q(x_1, x_2) = 2x_1^2 + 2x_1x_2 + 2x_2^2$ is positive definite, negative definite, or indefinite.

**Identify what's given and what we want:**
Given: The quadratic form $Q(x_1, x_2) = 2x_1^2 + 2x_1x_2 + 2x_2^2$.
Want: To classify its definiteness. We will use the eigenvalue method.

**Show every algebraic / logical step:**

1.  **Form the symmetric matrix $A$ for $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$.**
    *   The coefficient of $x_1^2$ is $2$, so $a_{11} = 2$.
    *   The coefficient of $x_2^2$ is $2$, so $a_{22} = 2$.
    *   The coefficient of $x_1x_2$ is $2$. Since $A$ must be symmetric, we split this equally between $a_{12}$ and $a_{21}$. So, $a_{12} = 1$ and $a_{21} = 1$.
    $$ A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} $$
    *   *Explanation:* This step converts the quadratic form into its equivalent matrix representation, which is essential for applying the classification criteria. We ensure $A$ is symmetric for easier analysis.

2.  **Find the eigenvalues of $A$.**
    *   We need to solve the characteristic equation $\det(A - \lambda I) = 0$.
    $$ A - \lambda I = \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} $$
    *   Calculate the determinant:
        $$ \det(A - \lambda I) = (2-\lambda)(2-\lambda) - (1)(1) $$
        $$ = (2-\lambda)^2 - 1 $$
        $$ = 4 - 4\lambda + \lambda^2 - 1 $$
        $$ = \lambda^2 - 4\lambda + 3 $$
    *   Set the determinant to zero and solve for $\lambda$:
        $$ \lambda^2 - 4\lambda + 3 = 0 $$
        *Explanation:* Eigenvalues are special scalars that reveal how a linear transformation scales vectors. Their signs are critical for classifying quadratic forms.
    *   Factor the quadratic equation:
        $$ (\lambda - 1)(\lambda - 3) = 0 $$
    *   The eigenvalues are:
        $$ \lambda_1 = 1, \quad \lambda_2 = 3 $$
    *   *Explanation:* We found the two eigenvalues of the matrix $A$.

3.  **Classify the quadratic form based on the eigenvalues.**
    *   Both eigenvalues are $\lambda_1 = 1 > 0$ and $\lambda_2 = 3 > 0$.
    *   Since all eigenvalues are strictly positive, the quadratic form is positive definite.
    *   *Explanation:* The eigenvalue criterion states that if all eigenvalues are positive, the form is positive definite. This means $Q(\mathbf{x})$ will always be positive for any non-zero $\mathbf{x}$.

**Final Answer:**
The quadratic form $Q(x_1, x_2) = 2x_1^2 + 2x_1x_2 + 2x_2^2$ is **Positive Definite**.

**Reflection:** This example was straightforward because both eigenvalues were clearly positive. The calculation of the characteristic polynomial and its roots was simple.

### Example 2: Indefinite (Eigenvalue Method)

**State the problem clearly:** Determine if the quadratic form $Q(x_1, x_2) = x_1^2 + 4x_1x_2 + x_2^2$ is positive definite, negative definite, or indefinite.

**Identify what's given and what we want:**
Given: The quadratic form $Q(x_1, x_2) = x_1^2 + 4x_1x_2 + x_2^2$.
Want: To classify its definiteness. We will use the eigenvalue method.

**Show every algebraic / logical step:**

1.  **Form the symmetric matrix $A$ for $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$.**
    *   $a_{11} = 1$ (coefficient of $x_1^2$)
    *   $a_{22} = 1$ (coefficient of $x_2^2$)
    *   $a_{12} = a_{21} = \frac{1}{2}(4) = 2$ (half of the $x_1x_2$ coefficient)
    $$ A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix} $$
    *   *Explanation:* As before, we convert the quadratic form to its unique symmetric matrix representation.

2.  **Find the eigenvalues of $A$.**
    *   Solve $\det(A - \lambda I) = 0$.
    $$ A - \lambda I = \begin{pmatrix} 1-\lambda & 2 \\ 2 & 1-\lambda \end{pmatrix} $$
    *   Calculate the determinant:
        $$ \det(A - \lambda I) = (1-\lambda)(1-\lambda) - (2)(2) $$
        $$ = (1-\lambda)^2 - 4 $$
        $$ = 1 - 2\lambda + \lambda^2 - 4 $$
        $$ = \lambda^2 - 2\lambda - 3 $$
    *   Set the determinant to zero and solve for $\lambda$:
        $$ \lambda^2 - 2\lambda - 3 = 0 $$
        *Explanation:* We are finding the eigenvalues, which will tell us about the definiteness.
    *   Factor the quadratic equation:
        $$ (\lambda - 3)(\lambda + 1) = 0 $$
    *   The eigenvalues are:
        $$ \lambda_1 = 3, \quad \lambda_2 = -1 $$
    *   *Explanation:* We found the two eigenvalues. Notice they have different signs.

3.  **Classify the quadratic form based on the eigenvalues.**
    *   We have one positive eigenvalue ($\lambda_1 = 3 > 0$) and one negative eigenvalue ($\lambda_2 = -1 < 0$).
    *   Since $A$ has both positive and negative eigenvalues, the quadratic form is indefinite.
    *   *Explanation:* The eigenvalue criterion states that if there are both positive and negative eigenvalues, the form is indefinite. This means $Q(\mathbf{x})$ can be positive for some $\mathbf{x}$ and negative for others.

**Final Answer:**
The quadratic form $Q(x_1, x_2) = x_1^2 + 4x_1x_2 + x_2^2$ is **Indefinite**.

**Reflection:** This example highlights the case where eigenvalues have mixed signs, leading to an indefinite form. It demonstrates that the quadratic form can take on both positive and negative values, corresponding to a saddle point.

### Example 3: Negative Definite (Sylvester's Criterion / Leading Principal Minors)

**State the problem clearly:** Determine if the quadratic form $Q(x_1, x_2, x_3) = -x_1^2 - 2x_2^2 - 3x_3^2 + 2x_1x_2$ is positive definite, negative definite, or indefinite.

**Identify what's given and what we want:**
Given: The quadratic form $Q(x_1, x_2, x_3) = -x_1^2 - 2x_2^2 - 3x_3^2 + 2x_1x_2$.
Want: To classify its definiteness. We will use Sylvester's Criterion.

**Show every algebraic / logical step:**

1.  **Form the symmetric matrix $A$ for $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$.**
    *   $a_{11} = -1$
    *   $a_{22} = -2$
    *   $a_{33} = -3$
    *   $a_{12} = a_{21} = \frac{1}{2}(2) = 1$
    *   All other off-diagonal terms are zero (no $x_1x_3$ or $x_2x_3$ terms).
    $$ A = \begin{pmatrix} -1 & 1 & 0 \\ 1 & -2 & 0 \\ 0 & 0 & -3 \end{pmatrix} $$
    *   *Explanation:* We construct the symmetric matrix $A$ from the coefficients of the quadratic form.

2.  **Calculate the leading principal minors.**
    *   **First leading principal minor, $A_1$:**
        $A_1 = \det(-1) = -1$.
        *Explanation:* This is the determinant of the $1 \times 1$ submatrix in the top-left corner.
    *   **Second leading principal minor, $A_2$:**
        $$ A_2 = \det \begin{pmatrix} -1 & 1 \\ 1 & -2 \end{pmatrix} $$
        $$ = (-1)(-2) - (1)(1) = 2 - 1 = 1 $$
        *Explanation:* This is the determinant of the $2 \times 2$ submatrix in the top-left corner.
    *   **Third leading principal minor, $A_3$ (which is $\det(A)$):**
        $$ A_3 = \det \begin{pmatrix} -1 & 1 & 0 \\ 1 & -2 & 0 \\ 0 & 0 & -3 \end{pmatrix} $$
        *We can use cofactor expansion along the third row or third column, as it has many zeros.*
        $$ A_3 = (-3) \cdot \det \begin{pmatrix} -1 & 1 \\ 1 & -2 \end{pmatrix} $$
        $$ = (-3) \cdot ((-1)(-2) - (1)(1)) $$
        $$ = (-3) \cdot (2 - 1) $$
        $$ = (-3) \cdot (1) = -3 $$
        *Explanation:* This is the determinant of the full $3 \times 3$ matrix.

3.  **Classify the quadratic form based on the signs of the leading principal minors.**
    *   The signs of the leading principal minors are:
        $\det(A_1) = -1 < 0$
        $\det(A_2) = 1 > 0$
        $\det(A_3) = -3 < 0$
    *   The signs are alternating: negative, positive, negative. This matches the pattern for a negative definite quadratic form according to Sylvester's Criterion.
    *   *Explanation:* Sylvester's criterion states that for a negative definite form, the leading principal minors must alternate in sign, starting with a negative value.

**Final Answer:**
The quadratic form $Q(x_1, x_2, x_3) = -x_1^2 - 2x_2^2 - 3x_3^2 + 2x_1x_2$ is **Negative Definite**.

**Reflection:** This example demonstrates the use of Sylvester's Criterion for a $3 \times 3$ matrix. It's crucial to remember the alternating sign pattern for negative definite forms. This method can sometimes be faster than finding all eigenvalues for larger matrices.

### Example 4: Positive Semidefinite (Eigenvalue Method and Observation)

**State the problem clearly:** Determine if the quadratic form $Q(x_1, x_2, x_3) = (x_1 - x_2)^2 + (x_2 - x_3)^2$ is positive definite, negative definite, or indefinite.

**Identify what's given and what we want:**
Given: The quadratic form $Q(x_1, x_2, x_3) = (x_1 - x_2)^2 + (x_2 - x_3)^2$.
Want: To classify its definiteness. We will use the eigenvalue method, but also note an intuitive observation.

**Show every algebraic / logical step:**

1.  **Initial observation (intuitive approach):**
    *   The quadratic form is a sum of squares: $Q(\mathbf{x}) = (x_1 - x_2)^2 + (x_2 - x_3)^2$.
    *   Since squares are always non-negative, $Q(\mathbf{x}) \ge 0$ for all $\mathbf{x}$.
    *   Now, we need to check if $Q(\mathbf{x}) = 0$ *only* when $\mathbf{x} = \mathbf{0}$.
    *   If $Q(\mathbf{x}) = 0$, then $(x_1 - x_2)^2 = 0$ and $(x_2 - x_3)^2 = 0$.
    *   This implies $x_1 - x_2 = 0 \implies x_1 = x_2$.
    *   And $x_2 - x_3 = 0 \implies x_2 = x_3$.
    *   So, $x_1 = x_2 = x_3$.
    *   For example, if $\mathbf{x} = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$, then $Q(1,1,1) = (1-1)^2 + (1-1)^2 = 0$.
    *   Since we found a non-zero vector $\mathbf{x} \neq \mathbf{0}$ for which $Q(\mathbf{x}) = 0$, the quadratic form is *not* positive definite.
    *   Because $Q(\mathbf{x}) \ge 0$ for all $\mathbf{x}$, and it can be $0$ for $\mathbf{x} \neq \mathbf{0}$, it must be positive semidefinite.
    *   *Explanation:* By directly inspecting the structure of the quadratic form, we can deduce its non-negativity and identify non-zero vectors that yield zero, leading to the semidefinite classification. This is often the fastest way for forms given as sums of squares.

2.  **Form the symmetric matrix $A$ (for verification using eigenvalues):**
    *   Expand the quadratic form:
        $Q(x_1, x_2, x_3) = (x_1^2 - 2x_1x_2 + x_2^2) + (x_2^2 - 2x_2x_3 + x_3^2)$
        $Q(x_1, x_2, x_3) = x_1^2 + 2x_2^2 + x_3^2 - 2x_1x_2 - 2x_2x_3$
    *   Now, form the symmetric matrix:
        $a_{11} = 1$
        $a_{22} = 2$
        $a_{33} = 1$
        $a_{12} = a_{21} = \frac{1}{2}(-2) = -1$
        $a_{23} = a_{32} = \frac{1}{2}(-2) = -1$
        $a_{13} = a_{31} = 0$
    $$ A = \begin{pmatrix} 1 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 1 \end{pmatrix} $$
    *   *Explanation:* We convert the expanded quadratic form into its symmetric matrix representation to apply the eigenvalue criterion.

3.  **Find the eigenvalues of $A$.**
    *   Solve $\det(A - \lambda I) = 0$.
    $$ \det \begin{pmatrix} 1-\lambda & -1 & 0 \\ -1 & 2-\lambda & -1 \\ 0 & -1 & 1-\lambda \end{pmatrix} = 0 $$
    *   Expand the determinant (using cofactor expansion along the first row):
        $$ (1-\lambda) \det \begin{pmatrix} 2-\lambda & -1 \\ -1 & 1-\lambda \end{pmatrix} - (-1) \det \begin{pmatrix} -1 & -1 \\ 0 & 1-\lambda \end{pmatrix} + 0 $$
        $$ = (1-\lambda) [ (2-\lambda)(1-\lambda) - (-1)(-1) ] + 1 [ (-1)(1-\lambda) - (-1)(0) ] $$
        $$ = (1-\lambda) [ (2 - 3\lambda + \lambda^2) - 1 ] + [ -1 + \lambda ] $$
        $$ = (1-\lambda) [ \lambda^2 - 3\lambda + 1 ] + (\lambda - 1) $$
        $$ = -(\lambda - 1) [ \lambda^2 - 3\lambda + 1 ] + (\lambda - 1) $$
        $$ = (\lambda - 1) [ -(\lambda^2 - 3\lambda + 1) + 1 ] $$
        $$ = (\lambda - 1) [ -\lambda^2 + 3\lambda - 1 + 1 ] $$
        $$ = (\lambda - 1) [ -\lambda^2 + 3\lambda ] $$
        $$ = (\lambda - 1) \lambda (3 - \lambda) $$
    *   Set the determinant to zero:
        $$ \lambda (\lambda - 1) (3 - \lambda) = 0 $$
    *   The eigenvalues are:
        $$ \lambda_1 = 0, \quad \lambda_2 = 1, \quad \lambda_3 = 3 $$
    *   *Explanation:* We calculated all eigenvalues. Notice one of them is zero.

4.  **Classify the quadratic form based on the eigenvalues.**
    *   The eigenvalues are $0, 1, 3$.
    *   All eigenvalues are non-negative ($\ge 0$).
    *   Since at least one eigenvalue is $0$, and none are negative, the quadratic form is positive semidefinite.
    *   *Explanation:* The presence of a zero eigenvalue indicates that there exist non-zero vectors for which $Q(\mathbf{x})=0$. Since all other eigenvalues are positive, $Q(\mathbf{x})$ is never negative. This perfectly matches the definition of positive semidefinite.

**Final Answer:**
The quadratic form $Q(x_1, x_2, x_3) = (x_1 - x_2)^2 + (x_2 - x_3)^2$ is **Positive Semidefinite**.

**Reflection:** This example demonstrates a case of positive semidefinite. The initial observation about the sum of squares provides strong intuition and can often shortcut the process. However, for full rigor and to confirm, the eigenvalue method is definitive. It also shows that Sylvester's Criterion might not be conclusive for semidefinite forms (here, $\det(A_1)=1>0$, $\det(A_2)=1>0$, but $\det(A_3)=0$, which doesn't fit the strict PD criteria).

## 6. Common mistakes and traps

1.  **Not forming the symmetric matrix correctly:** When converting $Q(\mathbf{x})$ to $\mathbf{x}^T A \mathbf{x}$, students sometimes put the entire coefficient of $x_i x_j$ into $a_{ij}$ and $0$ into $a_{ji}$, or vice-versa. Remember to split the cross-term coefficient equally: $a_{ij} = a_{ji} = \frac{1}{2} (\text{coefficient of } x_i x_j)$. The matrix $A$ *must* be symmetric for the eigenvalue and minor criteria to apply as stated.
2.  **Forgetting the "$\mathbf{x} \neq \mathbf{0}$" condition:** The definitions of positive/negative definite forms specify that $Q(\mathbf{x}) > 0$ (or $< 0$) for *all non-zero* vectors $\mathbf{x}$. All quadratic forms are zero at $\mathbf{x} = \mathbf{0}$, so this point is excluded from the strict inequality.
3.  **Confusing definite with semidefinite:** This is perhaps the most common trap.
    *   Positive Definite: $Q(\mathbf{x}) > 0$ for $\mathbf{x} \neq \mathbf{0}$ (all eigenvalues $> 0$).
    *   Positive Semidefinite: $Q(\mathbf{x}) \ge 0$ for all $\mathbf{x}$ (all eigenvalues $\ge 0$, with at least one $= 0$).
    The difference is whether $Q(\mathbf{x})$ *can* be zero for a non-zero vector. If it can, it's semidefinite; if not, it's definite.
4.  **Incorrectly applying Sylvester's Criterion for Negative Definite:** For negative definite, the leading principal minors must *alternate* in sign, starting with a negative value: $\det(A_1) < 0$, $\det(A_2) > 0$, $\det(A_3) < 0$, etc. Students often forget the alternating pattern or the starting sign.
5.  **Assuming diagonal entries determine definiteness:** If a matrix $A$ has all positive diagonal entries, it is *not necessarily* positive definite (e.g., $\begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$ has positive diagonal entries but is indefinite). Similarly for negative definite. The diagonal entries are only one part of the picture; the off-diagonal terms (and thus eigenvalues/determinants) are critical.
6.  **Calculation errors:** Finding eigenvalues involves solving a characteristic polynomial, and calculating determinants can be tedious for larger matrices. Algebraic mistakes in these steps are frequent and lead to incorrect classifications. Double-checking calculations is essential.

## 7. Textbook-precise explanation

Let $\mathbf{x}$ be a vector in $\mathbb{R}^n$, denoted as $\mathbf{x} = (x_1, x_2, \ldots, x_n)^T$.

A **quadratic form** is a function $Q: \mathbb{R}^n \to \mathbb{R}$ that can be expressed as:
$$ Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x} $$
where $A$ is an $n \times n$ symmetric matrix. For any general square matrix $B$, the quadratic form $\mathbf{x}^T B \mathbf{x}$ can always be written as $\mathbf{x}^T A \mathbf{x}$ with $A = \frac{1}{2}(B + B^T)$, which is symmetric. Thus, we can always assume $A$ is symmetric.

The classification of quadratic forms (and their associated symmetric matrices) is as follows:

1.  **Positive Definite (PD):** A quadratic form $Q(\mathbf{x})$ is positive definite if $Q(\mathbf{x}) > 0$ for all $\mathbf{x} \in \mathbb{R}^n, \mathbf{x} \neq \mathbf{0}$.
    *   **Eigenvalue Criterion:** $Q(\mathbf{x})$ is PD if and only if all eigenvalues of $A$ are strictly positive ($\lambda_i > 0$ for all $i$).
    *   **Sylvester's Criterion (Leading Principal Minors):** $Q(\mathbf{x})$ is PD if and only if all leading principal minors of $A$ are strictly positive: $\det(A_1) > 0, \det(A_2) > 0, \ldots, \det(A_n) > 0$.

2.  **Negative Definite (ND):** A quadratic form $Q(\mathbf{x})$ is negative definite if $Q(\mathbf{x}) < 0$ for all $\mathbf{x} \in \mathbb{R}^n, \mathbf{x} \neq \mathbf{0}$.
    *   **Eigenvalue Criterion:** $Q(\mathbf{x})$ is ND if and only if all eigenvalues of $A$ are strictly negative ($\lambda_i < 0$ for all $i$).
    *   **Sylvester's Criterion:** $Q(\mathbf{x})$ is ND if and only if the leading principal minors of $A$ alternate in sign, starting with negative: $\det(A_1) < 0, \det(A_2) > 0, \det(A_3) < 0, \ldots, (-1)^k \det(A_k) > 0$.

3.  **Indefinite:** A quadratic form $Q(\mathbf{x})$ is indefinite if it takes on both positive and negative values. That is, there exist $\mathbf{x}_1 \neq \mathbf{0}$ and $\mathbf{x}_2 \neq \mathbf{0}$ such that $Q(\mathbf{x}_1) > 0$ and $Q(\mathbf{x}_2) < 0$.
    *   **Eigenvalue Criterion:** $Q(\mathbf{x})$ is indefinite if and only if $A$ has at least one positive eigenvalue and at least one negative eigenvalue.

4.  **Positive Semidefinite (PSD):** A quadratic form $Q(\mathbf{x})$ is positive semidefinite if $Q(\mathbf{x}) \ge 0$ for all $\mathbf{x} \in \mathbb{R}^n$.
    *   **Eigenvalue Criterion:** $Q(\mathbf{x})$ is PSD if and only if all eigenvalues of $A$ are non-negative ($\lambda_i \ge 0$ for all $i$). If $A$ is PSD and not PD, then at least one eigenvalue must be zero.

5.  **Negative Semidefinite (NSD):** A quadratic form $Q(\mathbf{x})$ is negative semidefinite if $Q(\mathbf{x}) \le 0$ for all $\mathbf{x} \in \mathbb{R}^n$.
    *   **Eigenvalue Criterion:** $Q(\mathbf{x})$ is NSD if and only if all eigenvalues of $A$ are non-positive ($\lambda_i \le 0$ for all $i$). If $A$ is NSD and not ND, then at least one eigenvalue must be zero.

These definitions and criteria are standard in linear algebra textbooks. For instance, see Chapter 7 "Quadratic Forms" in *Linear Algebra and Its Applications* by David C. Lay, Steven R. Lay, and Judi J. McDonald, or Chapter 6 "Symmetric Matrices and Quadratic Forms" in *Introduction to Linear Algebra* by Gilbert Strang.

## 8. ASCII diagrams

Visualizing quadratic forms in 2D ($Q(x_1, x_2)$) helps build intuition for their 3D graphs (surfaces $z = Q(x_1, x_2)$).

1.  **Positive Definite (e.g., $Q(x,y) = x^2 + y^2$):** This is a paraboloid opening upwards. The origin $(0,0)$ is the unique global minimum.
    ```text
          Z
          ^
         / \
        /   \
       /     \
      /       \
     /         \
    /___________\  <-- A "bowl" opening upwards.
    (x,y) plane at Z=0.
    The minimum value is 0 at (0,0). All other values are > 0.
    ```
    *Description:* Imagine a perfectly smooth bowl or a satellite dish pointed towards the sky. The lowest point is at the center (the origin), where the value of the quadratic form is 0. As you move away from the center in any direction, the value always increases.

2.  **Negative Definite (e.g., $Q(x,y) = -x^2 - y^2$):** This is a paraboloid opening downwards. The origin $(0,0)$ is the unique global maximum.
    ```text
    (x,y) plane at Z=0.
    \___________/
     \         /
      \       /
       \     /
        \   /
         \ /
          v
          Z   <-- An "inverted bowl" or "hill."
    The maximum value is 0 at (0,0). All other values are < 0.
    ```
    *Description:* Imagine an upside-down bowl or a hill. The highest point is at the center (the origin), where the value is 0. As you move away from the center in any direction, the value always decreases (becomes more negative).

3.  **Indefinite (e.g., $Q(x,y) = x^2 - y^2$):** This is a hyperbolic paraboloid, often called a "saddle point."
    ```text
          Z
          ^
         /|\
        / | \
       /  |  \
      /   |   \
     ----------- (x-axis in this view, positive Q values)
    <----------- (y-axis in this view, negative Q values)
     \   |   /
      \  |  /
       \ | /
        \|/
         v
    ```
    *Description:* Imagine a horse saddle. If you walk along the "ridge" of the saddle (e.g., along the x-axis for $x^2-y^2$), you go upwards. If you walk across the saddle (e.g., along the y-axis), you go downwards. The origin $(0,0)$ is a critical point where the value is 0, but it's neither a minimum nor a maximum because you can find paths that go up and paths that go down from it.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    Think of the **eigenvalues as the "personality traits"** of the quadratic form.
    *   **All positive eigenvalues:** "Happy and Upbeat!" $\implies$ **Positive Definite** (like a smiley face, bowl opens UP).
    *   **All negative eigenvalues:** "Grumpy and Down!" $\implies$ **Negative Definite** (like a frown, bowl opens DOWN).
    *   **Mixed positive and negative eigenvalues:** "Conflicted and Indecisive!" $\implies$ **Indefinite** (like a saddle, some paths go up, some go down).
    *   **Some zero eigenvalues (and others positive):** "Neutral but leaning positive!" $\implies$ **Positive Semidefinite** (flat bottom bowl, can be zero for non-zero inputs).
    *   **Some zero eigenvalues (and others negative):** "Neutral but leaning negative!" $\implies$ **Negative Semidefinite** (flat top hill, can be zero for non-zero inputs).

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Quadratic Form Definition:** $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$, where $A$ is a symmetric matrix. (Crucial for setting up any problem).
    *   **Eigenvalue Criterion for PD/ND/Indefinite:**
        *   PD: All $\lambda_i > 0$.
        *   ND: All $\lambda_i < 0$.
        *   Indefinite: Both $\lambda_i > 0$ and $\lambda_j < 0$ exist.
    *   **Sylvester's Criterion for PD/ND:**
        *   PD: All leading principal minors $\det(A_k) > 0$.
        *   ND: Leading principal minors alternate in sign, starting negative: $\det(A_1) < 0, \det(A_2) > 0, \ldots$.

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson