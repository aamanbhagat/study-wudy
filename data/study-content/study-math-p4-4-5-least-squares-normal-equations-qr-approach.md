## 1. What it is — in plain English

Imagine you have a bunch of scattered dots on a graph, like data points from an experiment. You want to draw a straight line that best represents the general trend of these dots. You know you can't draw a single line that goes through *all* the dots perfectly, because they're a bit messy.

"Least squares" is a fancy name for a method that finds the "best fit" line (or curve, or plane) for these messy dots. It does this by making the total "error" as small as possible. What's "error"? For each dot, it's the vertical distance from the dot to your line.

The "least squares" part means we don't just add up these distances. Instead, we square each distance, and then add up all the squared distances. The "best fit" line is the one that makes this sum of squared distances the absolute smallest it can be. Squaring the distances makes sure positive and negative errors don't cancel out, and it also penalizes larger errors more heavily.

So, in simple terms, least squares is a mathematical tool to find the closest possible solution to a system of equations that doesn't have an exact solution, by minimizing the sum of the squared differences between the actual data and the model's predictions.

## 2. Why it matters — real-world applications

Least squares is one of the most fundamental and widely used techniques in applied mathematics, statistics, and engineering. Its ability to find optimal approximations makes it indispensable.

1.  **Machine Learning & Data Science (Linear Regression):** This is perhaps the most direct application. When building predictive models, especially in linear regression, least squares is used to find the coefficients of a linear equation that best describe the relationship between input features and an output variable. For instance, a company like **Netflix** might use it to predict a user's movie rating based on their past viewing habits and movie attributes (genre, actors). Similarly, **Google** uses it in various ranking algorithms and for predicting ad click-through rates.
2.  **Aerospace Engineering (Trajectory Estimation & GPS):** When tracking a rocket, satellite, or even an airplane, multiple sensors (radar, accelerometers, GPS receivers) provide noisy, slightly inaccurate measurements of its position and velocity. Least squares is used to combine these imperfect measurements to estimate the true trajectory and future position as accurately as possible. **NASA** or **SpaceX** heavily rely on this for mission control and guidance systems. Your smartphone's **GPS** also uses a form of least squares to combine signals from multiple satellites to pinpoint your location, even when individual signal measurements have errors.
3.  **Physics & Geophysics (Parameter Estimation):** Scientists often have experimental data and a theoretical model with unknown parameters. For example, a physicist might want to determine the spring constant of a spring by measuring its extension under various loads. The measurements will have noise. Least squares helps find the "best" spring constant that fits the observed data to Hooke's Law ($F=kx$). In geophysics, it's used to estimate earthquake epicenters or properties of the Earth's interior from seismic wave data. Companies like **Schlumberger** or **Halliburton** use it in oil and gas exploration to interpret seismic data.
4.  **Computer Graphics & Vision (3D Reconstruction, Image Processing):** In computer vision, if you have multiple images of an object from different angles, least squares can be used to reconstruct the 3D shape of the object. This is critical for applications like **autonomous vehicles** (e.g., **Tesla's** self-driving system combining data from multiple cameras and radar to build a 3D model of the environment) or for creating 3D models in video games and virtual reality. It's also used in image denoising and restoration.

## 3. Prerequisites — what you must know first

Before diving deep into least squares, ensure you have a solid grasp of these fundamental linear algebra concepts:

*   **Vectors and Vector Spaces:** Understanding what a vector is, how to add them, multiply by scalars, and the definitions of vector spaces, subspaces, basis, and dimension.
*   **Linear Transformations and Matrices:** How matrices represent linear transformations, matrix multiplication, transpose ($A^T$), inverse ($A^{-1}$), and the identity matrix ($I$).
*   **Systems of Linear Equations:** Solving $Ax=b$ using methods like Gaussian elimination, understanding consistent vs. inconsistent systems, and the implications of having more equations than unknowns (overdetermined systems).
*   **Dot Product and Orthogonality:** The definition of the dot product ($u \cdot v = u^Tv$), its geometric interpretation (related to angles), and what it means for two vectors to be orthogonal (their dot product is zero).
*   **Norms and Distances:** The definition of the Euclidean norm (length) of a vector $||v|| = \sqrt{v_1^2 + \dots + v_n^2}$, and how it defines the distance between two vectors $||u-v||$.
*   **Column Space and Null Space:** The column space $\text{Col}(A)$ as the span of the columns of $A$, and the null space $\text{Null}(A)$ as the set of all vectors $x$ such that $Ax=0$. Understanding that $b \in \text{Col}(A)$ means $Ax=b$ has a solution.
*   **Orthogonal Complements:** The concept that for any subspace $W$ of $\mathbb{R}^m$, its orthogonal complement $W^\perp$ consists of all vectors orthogonal to every vector in $W$. Crucially, $\text{Col}(A)^\perp = \text{Null}(A^T)$.
*   **Projections:** Understanding how to project a vector onto another vector, and more generally, how to project a vector onto a subspace. This is a core geometric idea behind least squares.
*   **QR Decomposition:** Knowing that any matrix $A$ with linearly independent columns can be factored into $A=QR$, where $Q$ has orthonormal columns and $R$ is an upper triangular matrix. Understanding the properties of $Q$ (e.g., $Q^TQ=I$).

## 4. The core idea — step by step

Let's break down the concept of least squares, starting from the problem and building up to the solutions.

### Step 1: The Problem Statement — No Exact Solution

*   **Plain English:** We often encounter situations where we have a system of linear equations, $Ax=b$, but there's no vector $x$ that perfectly satisfies all equations simultaneously. This usually happens when we have more equations than unknowns (an "overdetermined" system), and the data $b$ is "noisy" or inconsistent.
*   **Small Concrete Example:** Imagine trying to fit a straight line $y=mx+c$ through three points $(1,2)$, $(2,3)$, and $(3,2)$.
    *   For $(1,2)$: $m(1) + c = 2 \implies m + c = 2$
    *   For $(2,3)$: $m(2) + c = 3 \implies 2m + c = 3$
    *   For $(3,2)$: $m(3) + c = 2 \implies 3m + c = 2$
    We can write this as a matrix equation $A x = b$:
    $$
    \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix} \begin{pmatrix} m \\ c \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \\ 2 \end{pmatrix}
    $$
    Here, $A = \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix}$, $x = \begin{pmatrix} m \\ c \end{pmatrix}$, and $b = \begin{pmatrix} 2 \\ 3 \\ 2 \end{pmatrix}$.
    If you try to solve this, you'll find no single $m, c$ pair satisfies all three equations. For example, from the first two, $m=1, c=1$. But $3(1)+1 = 4 \neq 2$, so it doesn't satisfy the third.
*   **Formal/Mathematical Version:** We have a system $Ax=b$ where $A$ is an $m \times n$ matrix, $x$ is an $n \times 1$ vector, and $b$ is an $m \times 1$ vector. If $b$ is not in the column space of $A$ (i.e., $b \notin \text{Col}(A)$), then there is no exact solution $x$. This typically occurs when $m > n$ (more equations than unknowns).
*   **What Could Go Wrong:** Assuming that an exact solution *must* exist. In real-world data, perfect solutions are rare due to measurement errors or inherent variability.

### Step 2: The Goal — Minimizing Error

*   **Plain English:** Since we can't make $Ax$ *exactly* equal to $b$, we want to find an $x$ (let's call it $\hat{x}$ for "x-hat" or "estimated x") that makes $Ax$ as close as possible to $b$. The "closeness" is measured by the length of the difference vector, $b - Ax$. We want to minimize $||b - Ax||$. To make the math easier (and because it has desirable statistical properties), we actually minimize the square of this length: $||b - Ax||^2$. This is why it's called "least squares."
*   **Small Concrete Example:** For our line-fitting problem, we want to find $m$ and $c$ such that the sum of the squared vertical distances from the points to the line $y=mx+c$ is minimized.
    The error for point $(x_i, y_i)$ is $y_i - (mx_i + c)$. We want to minimize:
    $(2 - (m(1)+c))^2 + (3 - (m(2)+c))^2 + (2 - (m(3)+c))^2$.
*   **Formal/Mathematical Version:** Find $\hat{x} \in \mathbb{R}^n$ such that
    $$
    ||b - A\hat{x}||_2^2 = \min_{x \in \mathbb{R}^n} ||b - Ax||_2^2
    $$
    Here, $||v||_2^2 = v_1^2 + v_2^2 + \dots + v_m^2 = v^Tv$. So, we are minimizing $(b - Ax)^T(b - Ax)$.
*   **What Could Go Wrong:** Forgetting to square the errors. Minimizing the sum of absolute errors ($||b-Ax||_1$) is a different problem (L1 regression) and minimizing the maximum error ($||b-Ax||_\infty$) is yet another (Chebyshev approximation). Least squares specifically refers to the L2 norm.

### Step 3: Geometric Intuition — Projection

*   **Plain English:** Think about the vectors involved. $b$ is a vector in $\mathbb{R}^m$. The vectors $Ax$ are all possible linear combinations of the columns of $A$. This set of all possible $Ax$ vectors forms a subspace called the column space of $A$, $\text{Col}(A)$. Since $b$ is not in $\text{Col}(A)$, we can't hit $b$ exactly. The closest vector to $b$ *within* $\text{Col}(A)$ is the orthogonal projection of $b$ onto $\text{Col}(A)$. Let's call this projection $p = A\hat{x}$. The error vector, $b - A\hat{x}$, must be orthogonal to the entire column space of $A$.
*   **Small Concrete Example:** Imagine $A$ has two columns, $a_1$ and $a_2$, which form a plane (the column space) in $\mathbb{R}^3$. $b$ is a vector not in this plane. The closest vector in the plane to $b$ is found by "dropping a perpendicular" from $b$ to the plane. The vector from $b$ to this projected point is perpendicular to the plane.
    ```text
          b
         /|
        / |
       /  | (b - A x_hat)
      /   |
     /____|________ Col(A)
    0     A x_hat
    ```
*   **Formal/Mathematical Version:** Let $\hat{x}$ be a least squares solution. Then $A\hat{x}$ is the orthogonal projection of $b$ onto $\text{Col}(A)$. This means the error vector $b - A\hat{x}$ must be orthogonal to every vector in $\text{Col}(A)$.
    If $v \in \text{Col}(A)$, then $v^T(b - A\hat{x}) = 0$.
    Since every column of $A$ is in $\text{Col}(A)$, $b - A\hat{x}$ must be orthogonal to each column of $A$. If $a_j$ is the $j$-th column of $A$, then $a_j^T(b - A\hat{x}) = 0$ for all $j=1, \dots, n$.
    This condition is equivalent to saying that $A^T(b - A\hat{x}) = 0$.
    Recall the fundamental theorem of linear algebra: $\text{Col}(A)^\perp = \text{Null}(A^T)$. So, $b - A\hat{x}$ being orthogonal to $\text{Col}(A)$ is equivalent to $b - A\hat{x} \in \text{Null}(A^T)$.
*   **What Could Go Wrong:** Confusing the error vector being orthogonal to *each column* of $A$ with it being orthogonal to *any vector* in the column space. The former implies the latter, and it's the key to the next step.

### Step 4: Deriving the Normal Equations

*   **Plain English:** We just established that the error vector $b - A\hat{x}$ must be orthogonal to the column space of $A$. This means it must be orthogonal to *each* column of $A$. We can express this mathematically by multiplying $A^T$ (which has the columns of $A$ as its rows) by the error vector.
*   **Small Concrete Example:**
    From Step 3, we have $A^T(b - A\hat{x}) = 0$.
    Let's expand this:
    $A^Tb - A^TA\hat{x} = 0$
    Rearranging, we get:
    $A^TA\hat{x} = A^Tb$
    This is the system of "normal equations." It's a system of $n$ equations in $n$ unknowns (the components of $\hat{x}$).
*   **Formal/Mathematical Version:**
    The condition that $b - A\hat{x}$ is orthogonal to $\text{Col}(A)$ can be written as:
    $$
    A^T(b - A\hat{x}) = \mathbf{0}
    $$
    where $\mathbf{0}$ is the zero vector in $\mathbb{R}^n$.
    Distributing $A^T$:
    $$
    A^Tb - A^TA\hat{x} = \mathbf{0}
    $$
    Rearranging the terms to isolate $A^TA\hat{x}$:
    $$
    A^TA\hat{x} = A^Tb
    $$
    This is the system of **normal equations**.
*   **What Could Go Wrong:** Algebraic mistakes in transposing or multiplying matrices. Forgetting that $A^T A$ is an $n \times n$ matrix and $A^T b$ is an $n \times 1$ vector.

### Step 5: Solving the Normal Equations

*   **Plain English:** The normal equations $A^TA\hat{x} = A^Tb$ form a standard system of linear equations, but now it's a square system ($n \times n$). If the matrix $A^TA$ is invertible, we can solve for $\hat{x}$ directly.
*   **Small Concrete Example:** For our line-fitting example:
    $A = \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix}$, $b = \begin{pmatrix} 2 \\ 3 \\ 2 \end{pmatrix}$
    First, calculate $A^TA$:
    $A^T = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 1 & 1 \end{pmatrix}$
    $A^TA = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix} = \begin{pmatrix} 1(1)+2(2)+3(3) & 1(1)+2(1)+3(1) \\ 1(1)+1(2)+1(3) & 1(1)+1(1)+1(1) \end{pmatrix} = \begin{pmatrix} 1+4+9 & 1+2+3 \\ 1+2+3 & 1+1+1 \end{pmatrix} = \begin{pmatrix} 14 & 6 \\ 6 & 3 \end{pmatrix}$
    Next, calculate $A^Tb$:
    $A^Tb = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 2 \\ 3 \\ 2 \end{pmatrix} = \begin{pmatrix} 1(2)+2(3)+3(2) \\ 1(2)+1(3)+1(2) \end{pmatrix} = \begin{pmatrix} 2+6+6 \\ 2+3+2 \end{pmatrix} = \begin{pmatrix} 14 \\ 7 \end{pmatrix}$
    So the normal equations are:
    $\begin{pmatrix} 14 & 6 \\ 6 & 3 \end{pmatrix} \begin{pmatrix} m \\ c \end{pmatrix} = \begin{pmatrix} 14 \\ 7 \end{pmatrix}$
    To solve this, we can find $(A^TA)^{-1}$:
    $\det(A^TA) = 14(3) - 6(6) = 42 - 36 = 6$.
    $(A^TA)^{-1} = \frac{1}{6} \begin{pmatrix} 3 & -6 \\ -6 & 14 \end{pmatrix}$
    $\hat{x} = \begin{pmatrix} m \\ c \end{pmatrix} = \frac{1}{6} \begin{pmatrix} 3 & -6 \\ -6 & 14 \end{pmatrix} \begin{pmatrix} 14 \\ 7 \end{pmatrix} = \frac{1}{6} \begin{pmatrix} 3(14)-6(7) \\ -6(14)+14(7) \end{pmatrix} = \frac{1}{6} \begin{pmatrix} 42-42 \\ -84+98 \end{pmatrix} = \frac{1}{6} \begin{pmatrix} 0 \\ 14 \end{pmatrix} = \begin{pmatrix} 0 \\ 7/3 \end{pmatrix}$
    So, the best-fit line is $y = (0)x + 7/3$, or $y=7/3$. This looks odd, but it means a horizontal line is the best fit for these points in a least-squares sense.
*   **Formal/Mathematical Version:** If $A^TA$ is invertible, then the unique least squares solution is given by:
    $$
    \hat{x} = (A^TA)^{-1}A^Tb
    $$
    The matrix $A^TA$ is invertible if and only if $A$ has linearly independent columns (i.e., $A$ has full column rank). If $A$ does not have full column rank, then $A^TA$ is singular, and there are infinitely many least squares solutions. In such cases, one usually looks for the solution with the smallest norm (the minimum-norm least squares solution).
*   **What Could Go Wrong:** $A^TA$ might be singular (not invertible). This happens if $A$ has linearly dependent columns. For example, if you try to fit $y=mx+c$ to data where all $x$-values are the same. Also, even if $A^TA$ is invertible, it can be "ill-conditioned," meaning that small errors in $A$ or $b$ can lead to large errors in $\hat{x}$. This is a major concern in numerical computation.

### Step 6: The QR Approach — Why it's better

*   **Plain English:** While the normal equations are mathematically elegant, they have a practical drawback: they can be numerically unstable. Squaring a matrix ($A^TA$) can worsen its "condition number" (a measure of how sensitive the solution is to input changes), making it harder for computers to solve accurately, especially with real-world, noisy data. The QR decomposition offers an alternative, more numerically stable way to solve the least squares problem.
*   **Small Concrete Example:** Imagine you have a matrix $A$ where its columns are almost linearly dependent. When you compute $A^TA$, these "almost dependencies" can become stronger, making $A^TA$ very close to being singular. This makes $(A^TA)^{-1}$ very large and sensitive to rounding errors during calculation. The QR method avoids this squaring step.
*   **Formal/Mathematical Version:** The condition number of $A^TA$ is the square of the condition number of $A$, i.e., $\text{cond}(A^TA) = (\text{cond}(A))^2$. This means that if $A$ is somewhat ill-conditioned, $A^TA$ will be *very* ill-conditioned. Solving systems with ill-conditioned matrices is prone to large numerical errors. The QR decomposition, $A=QR$, transforms the problem into one involving $Q$ (an orthogonal matrix, which is perfectly conditioned, $\text{cond}(Q)=1$) and $R$ (an upper triangular matrix, whose condition number is the same as $A$'s).
*   **What Could Go Wrong:** Not appreciating the importance of numerical stability. In many real-world applications (e.g., aerospace, financial modeling), stability is paramount.

### Step 7: Solving with QR

*   **Plain English:** If we have the QR decomposition of $A$, meaning $A=QR$ where $Q$ has orthonormal columns ($Q^TQ=I$) and $R$ is upper triangular, we can substitute this into our least squares problem. The magic of $Q^TQ=I$ simplifies the equations greatly, leading to a much easier system to solve.
*   **Small Concrete Example:**
    Start with the normal equations: $A^TA\hat{x} = A^Tb$.
    Substitute $A=QR$:
    $(QR)^T(QR)\hat{x} = (QR)^Tb$
    $R^TQ^TQR\hat{x} = R^TQ^Tb$
    Since $Q$ has orthonormal columns, $Q^TQ=I$ (the identity matrix).
    $R^TIR\hat{x} = R^TQ^Tb$
    $R^TR\hat{x} = R^TQ^Tb$
    If $A$ has full column rank, then $R$ is invertible (and so is $R^T$). We can multiply by $(R^T)^{-1}$ on both sides from the left:
    $(R^T)^{-1}R^TR\hat{x} = (R^T)^{-1}R^TQ^Tb$
    $IR\hat{x} = IQ^Tb$
    $$
    R\hat{x} = Q^Tb
    $$
    This is a system with an upper triangular matrix $R$. Such systems are very easy to solve using **back-substitution**. We find the last component of $\hat{x}$ first, then the second to last, and so on.
*   **Formal/Mathematical Version:**
    Given $A=QR$ where $Q \in \mathbb{R}^{m \times n}$ has orthonormal columns ($Q^TQ=I_n$) and $R \in \mathbb{R}^{n \times n}$ is upper triangular with positive diagonal entries.
    The least squares problem is to minimize $||b - Ax||_2^2$.
    Substitute $A=QR$:
    $$
    ||b - QR\hat{x}||_2^2 = \min_{x \in \mathbb{R}^n} ||b - QRx||_2^2
    $$
    Since $Q$ has orthonormal columns, multiplication by $Q^T$ preserves the Euclidean norm: $||u||_2 = ||Q^Tu||_2$ if $Q$ is square and orthogonal. More generally, $||Qv|| = ||v||$ for any $v$ if $Q$ has orthonormal columns.
    We can rewrite the expression by using the property $||v||^2 = ||Q^Tv||^2$ for any $Q$ with orthonormal columns and $v \in \text{Col}(Q)$. However, a more direct way is to expand the norm and use $Q^TQ=I$:
    $||b - QR\hat{x}||_2^2 = (b - QR\hat{x})^T(b - QR\hat{x})$
    $= (b^T - (QR\hat{x})^T)(b - QR\hat{x})$
    $= (b^T - \hat{x}^TR^TQ^T)(b - QR\hat{x})$
    $= b^Tb - b^TQR\hat{x} - \hat{x}^TR^TQ^Tb + \hat{x}^TR^TQ^TQR\hat{x}$
    $= b^Tb - b^TQR\hat{x} - (b^TQR\hat{x})^T + \hat{x}^TR^TR\hat{x}$ (since $Q^TQ=I$)
    The term $b^TQR\hat{x}$ is a scalar, so it equals its transpose.
    $= b^Tb - 2(b^TQR\hat{x}) + ||R\hat{x}||^2$
    This is not the simplest way. A more elegant derivation uses the fact that $Q$ is an isometry.
    Consider $||b - Ax||^2 = ||b - QR\hat{x}||^2$.
    We can write $b$ as a sum of its projection onto $\text{Col}(Q)$ and its orthogonal component: $b = QQ^Tb + (I - QQ^T)b$.
    Then $b - QR\hat{x} = (QQ^Tb + (I - QQ^T)b) - QR\hat{x}$.
    Since $Q$ has orthonormal columns, $\text{Col}(Q) = \text{Col}(A)$. So $QR\hat{x}$ is in $\text{Col}(Q)$.
    The error vector $b - A\hat{x}$ is minimized when $A\hat{x}$ is the projection of $b$ onto $\text{Col}(A)$.
    This means $A\hat{x} = QQ^Tb$.
    Substituting $A=QR$:
    $QR\hat{x} = QQ^Tb$
    Since $Q$ has orthonormal columns, $Q^T Q = I$. We can multiply by $Q^T$ from the left:
    $Q^TQR\hat{x} = Q^TQQ^Tb$
    $IR\hat{x} = IQ^Tb$
    $$
    R\hat{x} = Q^Tb
    $$
    This is an $n \times n$ system. Since $A$ has full column rank, $R$ is invertible. We can solve for $\hat{x}$ using back-substitution, which is numerically stable.
*   **What Could Go Wrong:** Forgetting the properties of $Q$ ($Q^TQ=I$). Not knowing how to perform back-substitution. Assuming $Q$ is square (it's $m \times n$, so $Q^TQ=I_n$ but $QQ^T$ is generally not $I_m$).

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Fit a line $y = mx+c$ to 3 points using Normal Equations

**Problem:** Find the least squares line $y = mx+c$ that best fits the points $(1,1)$, $(2,3)$, and $(3,2)$.

**Given:** Three data points $(x_i, y_i)$: $(1,1)$, $(2,3)$, $(3,2)$.
**Want:** The slope $m$ and y-intercept $c$ that minimize the sum of squared vertical errors.

**Step 1: Set up the system $Ax=b$.**
For each point $(x_i, y_i)$, the equation $y_i = mx_i + c$ gives a linear equation in $m$ and $c$.
For $(1,1)$: $m(1) + c = 1 \implies 1m + 1c = 1$
For $(2,3)$: $m(2) + c = 3 \implies 2m + 1c = 3$
For $(3,2)$: $m(3) + c = 2 \implies 3m + 1c = 2$
This forms the system $Ax=b$:
$$
A = \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix}, \quad x = \begin{pmatrix} m \\ c \end{pmatrix}, \quad b = \begin{pmatrix} 1 \\ 3 \\ 2 \end{pmatrix}
$$
*Explanation:* We transform the problem of fitting a line to data into an overdetermined system of linear equations. The unknowns are the parameters of the line, $m$ and $c$.

**Step 2: Calculate $A^T$.**
$$
A^T = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 1 & 1 \end{pmatrix}
$$
*Explanation:* The transpose of a matrix swaps its rows and columns. This is needed for the normal equations.

**Step 3: Calculate $A^TA$.**
$$
A^TA = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix}
$$
$$
A^TA = \begin{pmatrix} (1)(1)+(2)(2)+(3)(3) & (1)(1)+(2)(1)+(3)(1) \\ (1)(1)+(1)(2)+(1)(3) & (1)(1)+(1)(1)+(1)(1) \end{pmatrix}
$$
$$
A^TA = \begin{pmatrix} 1+4+9 & 1+2+3 \\ 1+2+3 & 1+1+1 \end{pmatrix}
$$
$$
A^TA = \begin{pmatrix} 14 & 6 \\ 6 & 3 \end{pmatrix}
$$
*Explanation:* We perform matrix multiplication. $A^TA$ will always be a square, symmetric matrix.

**Step 4: Calculate $A^Tb$.**
$$
A^Tb = \begin{pmatrix} 1 & 2 & 3 \\ 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 3 \\ 2 \end{pmatrix}
$$
$$
A^Tb = \begin{pmatrix} (1)(1)+(2)(3)+(3)(2) \\ (1)(1)+(1)(3)+(1)(2) \end{pmatrix}
$$
$$
A^Tb = \begin{pmatrix} 1+6+6 \\ 1+3+2 \end{pmatrix}
$$
$$
A^Tb = \begin{pmatrix} 13 \\ 6 \end{pmatrix}
$$
*Explanation:* Another matrix-vector multiplication. This forms the right-hand side of the normal equations.

**Step 5: Formulate the normal equations $A^TA\hat{x} = A^Tb$.**
$$
\begin{pmatrix} 14 & 6 \\ 6 & 3 \end{pmatrix} \begin{pmatrix} m \\ c \end{pmatrix} = \begin{pmatrix} 13 \\ 6 \end{pmatrix}
$$
*Explanation:* We've assembled the components into the standard form of the normal equations.

**Step 6: Solve the normal equations for $\hat{x} = \begin{pmatrix} m \\ c \end{pmatrix}$.**
We can use Cramer's rule, substitution, or matrix inversion. Let's use matrix inversion.
First, find the determinant of $A^TA$:
$\det(A^TA) = (14)(3) - (6)(6) = 42 - 36 = 6$.
Since the determinant is non-zero, $A^TA$ is invertible.
The inverse of $A^TA$ is:
$$
(A^TA)^{-1} = \frac{1}{6} \begin{pmatrix} 3 & -6 \\ -6 & 14 \end{pmatrix}
$$
Now, multiply $(A^TA)^{-1}$ by $A^Tb$:
$$
\hat{x} = \begin{pmatrix} m \\ c \end{pmatrix} = \frac{1}{6} \begin{pmatrix} 3 & -6 \\ -6 & 14 \end{pmatrix} \begin{pmatrix} 13 \\ 6 \end{pmatrix}
$$
$$
\hat{x} = \frac{1}{6} \begin{pmatrix} (3)(13) + (-6)(6) \\ (-6)(13) + (14)(6) \end{pmatrix}
$$
$$
\hat{x} = \frac{1}{6} \begin{pmatrix} 39 - 36 \\ -78 + 84 \end{pmatrix}
$$
$$
\hat{x} = \frac{1}{6} \begin{pmatrix} 3 \\ 6 \end{pmatrix}
$$
$$
\hat{x} = \begin{pmatrix} 1/2 \\ 1 \end{pmatrix}
$$
*Explanation:* We calculated the inverse of $A^TA$ and then multiplied it by $A^Tb$ to find the solution vector $\hat{x}$. This gives us the values for $m$ and $c$.

**Final Answer:** The least squares line is $\boxed{y = \frac{1}{2}x + 1}$.

*Reflection:* This example was straightforward because $A^TA$ was a small, easily invertible matrix. The key is correctly setting up $A$ and $b$ from the problem description.

---

### Example 2 (Medium): Fit a parabola $y = ax^2+bx+c$ to 4 points using Normal Equations

**Problem:** Find the least squares parabola $y = ax^2+bx+c$ that best fits the points $(-1,0)$, $(0,1)$, $(1,1)$, and $(2,0)$.

**Given:** Four data points $(x_i, y_i)$.
**Want:** The coefficients $a, b, c$ for the best-fit parabola.

**Step 1: Set up the system $Ax=b$.**
For each point $(x_i, y_i)$, the equation $y_i = ax_i^2 + bx_i + c$ gives a linear equation in $a, b, c$.
For $(-1,0)$: $a(-1)^2 + b(-1) + c = 0 \implies 1a - 1b + 1c = 0$
For $(0,1)$: $a(0)^2 + b(0) + c = 1 \implies 0a + 0b + 1c = 1$
For $(1,1)$: $a(1)^2 + b(1) + c = 1 \implies 1a + 1b + 1c = 1$
For $(2,0)$: $a(2)^2 + b(2) + c = 0 \implies 4a + 2b + 1c = 0$
This forms the system $Ax=b$:
$$
A = \begin{pmatrix} 1 & -1 & 1 \\ 0 & 0 & 1 \\ 1 & 1 & 1 \\ 4 & 2 & 1 \end{pmatrix}, \quad x = \begin{pmatrix} a \\ b \\ c \end{pmatrix}, \quad b = \begin{pmatrix} 0 \\ 1 \\ 1 \\ 0 \end{pmatrix}
$$
*Explanation:* The setup is similar to the linear case, but now we have three unknown coefficients ($a,b,c$) and four equations.

**Step 2: Calculate $A^T$.**
$$
A^T = \begin{pmatrix} 1 & 0 & 1 & 4 \\ -1 & 0 & 1 & 2 \\ 1 & 1 & 1 & 1 \end{pmatrix}
$$
*Explanation:* Transpose of $A$.

**Step 3: Calculate $A^TA$.**
$$
A^TA = \begin{pmatrix} 1 & 0 & 1 & 4 \\ -1 & 0 & 1 & 2 \\ 1 & 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & -1 & 1 \\ 0 & 0 & 1 \\ 1 & 1 & 1 \\ 4 & 2 & 1 \end{pmatrix}
$$
$$
A^TA = \begin{pmatrix}
1(1)+0(0)+1(1)+4(4) & 1(-1)+0(0)+1(1)+4(2) & 1(1)+0(1)+1(1)+4(1) \\
-1(1)+0(0)+1(1)+2(4) & -1(-1)+0(0)+1(1)+2(2) & -1(1)+0(1)+1(1)+2(1) \\
1(1)+1(0)+1(1)+1(4) & 1(-1)+1(0)+1(1)+1(2) & 1(1)+1(1)+1(1)+1(1)
\end{pmatrix}
$$
$$
A^TA = \begin{pmatrix}
1+0+1+16 & -1+0+1+8 & 1+0+1+4 \\
-1+0+1+8 & 1+0+1+4 & -1+0+1+2 \\
1+0+1+4 & -1+0+1+2 & 1+1+1+1
\end{pmatrix}
$$
$$
A^TA = \begin{pmatrix} 18 & 8 & 6 \\ 8 & 6 & 2 \\ 6 & 2 & 4 \end{pmatrix}
$$
*Explanation:* Careful matrix multiplication. $A^TA$ is a $3 \times 3$ symmetric matrix.

**Step 4: Calculate $A^Tb$.**
$$
A^Tb = \begin{pmatrix} 1 & 0 & 1 & 4 \\ -1 & 0 & 1 & 2 \\ 1 & 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ 1 \\ 0 \end{pmatrix}
$$
$$
A^Tb = \begin{pmatrix} (1)(0)+(0)(1)+(1)(1)+(4)(0) \\ (-1)(0)+(0)(1)+(1)(1)+(2)(0) \\ (1)(0)+(1)(1)+(1)(1)+(1)(0) \end{pmatrix}
$$
$$
A^Tb = \begin{pmatrix} 0+0+1+0 \\ 0+0+1+0 \\ 0+1+1+0 \end{pmatrix}
$$
$$
A^Tb = \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix}
$$
*Explanation:* Matrix-vector multiplication for the right-hand side.

**Step 5: Formulate the normal equations $A^TA\hat{x} = A^Tb$.**
$$
\begin{pmatrix} 18 & 8 & 6 \\ 8 & 6 & 2 \\ 6 & 2 & 4 \end{pmatrix} \begin{pmatrix} a \\ b \\ c \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix}
$$
*Explanation:* The $3 \times 3$ system of normal equations.

**Step 6: Solve the normal equations for $\hat{x} = \begin{pmatrix} a \\ b \\ c \end{pmatrix}$.**
We can use Gaussian elimination.
Augmented matrix:
$$
\left[ \begin{array}{ccc|c} 18 & 8 & 6 & 1 \\ 8 & 6 & 2 & 1 \\ 6 & 2 & 4 & 2 \end{array} \right]
$$
Divide R1 by 2, R2 by 2, R3 by 2 to simplify (optional, but good practice):
$$
\left[ \begin{array}{ccc|c} 9 & 4 & 3 & 1/2 \\ 4 & 3 & 1 & 1/2 \\ 3 & 1 & 2 & 1 \end{array} \right]
$$
Swap R1 and R3 for easier pivot:
$$
\left[ \begin{array}{ccc|c} 3 & 1 & 2 & 1 \\ 4 & 3 & 1 & 1/2 \\ 9 & 4 & 3 & 1/2 \end{array} \right]
$$
$R_2 \leftarrow R_2 - \frac{4}{3}R_1$, $R_3 \leftarrow R_3 - 3R_1$:
$$
\left[ \begin{array}{ccc|c} 3 & 1 & 2 & 1 \\ 0 & 3 - 4/3 & 1 - 8/3 & 1/2 - 4/3 \\ 0 & 4 - 3 & 3 - 6 & 1/2 - 3 \end{array} \right]
$$
$$
\left[ \begin{array}{ccc|c} 3 & 1 & 2 & 1 \\ 0 & 5/3 & -5/3 & -5/6 \\ 0 & 1 & -3 & -5/2 \end{array} \right]
$$
Multiply R2 by $3/5$:
$$
\left[ \begin{array}{ccc|c} 3 & 1 & 2 & 1 \\ 0 & 1 & -1 & -1/2 \\ 0 & 1 & -3 & -5/2 \end{array} \right]
$$
$R_3 \leftarrow R_3 - R_2$:
$$
\left[ \begin{array}{ccc|c} 3 & 1 & 2 & 1 \\ 0 & 1 & -1 & -1/2 \\ 0 & 0 & -2 & -2 \end{array} \right]
$$
From $R_3$: $-2c = -2 \implies c = 1$.
From $R_2$: $b - c = -1/2 \implies b - 1 = -1/2 \implies b = 1/2$.
From $R_1$: $3a + b + 2c = 1 \implies 3a + 1/2 + 2(1) = 1 \implies 3a + 5/2 = 1 \implies 3a = 1 - 5/2 \implies 3a = -3/2 \implies a = -1/2$.
So, $\hat{x} = \begin{pmatrix} -1/2 \\ 1/2 \\ 1 \end{pmatrix}$.

*Explanation:* We used Gaussian elimination to solve the system of linear equations. This is a standard method for solving $Ax=b$ type problems.

**Final Answer:** The least squares parabola is $\boxed{y = -\frac{1}{2}x^2 + \frac{1}{2}x + 1}$.

*Reflection:* This example involved larger matrices and more complex arithmetic, highlighting the need for careful calculation. Gaussian elimination is a robust method for solving the normal equations.

---

### Example 3 (Medium-Hard): Solve Example 1 using QR Decomposition

**Problem:** Find the least squares line $y = mx+c$ that best fits the points $(1,1)$, $(2,3)$, and $(3,2)$ using the QR approach.

**Given:** $A = \begin{pmatrix} 1 & 1 \\ 2 & 1 \\ 3 & 1 \end{pmatrix}$, $b = \begin{pmatrix} 1 \\ 3 \\ 2 \end{pmatrix}$.
**Want:** The slope $m$ and y-intercept $c$ using $R\hat{x} = Q^Tb$.

**Step 1: Perform QR decomposition of $A$.**
We'll use the Gram-Schmidt process to find $Q$ and $R$.
Let $A = [a_1 \quad a_2]$, where $a_1 = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ and $a_2 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$.

First, find $q_1$:
$||a_1|| = \sqrt{1^2 + 2^2 + 3^2} = \sqrt{1+4+9} = \sqrt{14}$.
$q_1 = \frac{1}{\sqrt{14}} \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$.

Next, find $v_2$, the component of $a_2$ orthogonal to $a_1$:
$v_2 = a_2 - \text{proj}_{a_1} a_2 = a_2 - \frac{a_1^Ta_2}{a_1^Ta_1}a_1$.
$a_1^Ta_2 = (1)(1)+(2)(1)+(3)(1) = 1+2+3 = 6$.
$a_1^Ta_1 = 14$.
$v_2 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} - \frac{6}{14} \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} - \frac{3}{7} \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$
$v_2 = \begin{pmatrix} 1 - 3/7 \\ 1 - 6/7 \\ 1 - 9/7 \end{pmatrix} = \begin{pmatrix} 4/7 \\ 1/7 \\ -2/7 \end{pmatrix}$.

Now normalize $v_2$ to get $q_2$:
$||v_2|| = \sqrt{(4/7)^2 + (1/7)^2 + (-2/7)^2} = \sqrt{\frac{16+1+4}{49}} = \sqrt{\frac{21}{49}} = \frac{\sqrt{21}}{7}$.
$q_2 = \frac{1}{\sqrt{21}/7} \begin{pmatrix} 4/7 \\ 1/7 \\ -2/7 \end{pmatrix} = \frac{7}{\sqrt{21}} \begin{pmatrix} 4/7 \\ 1/7 \\ -2/7 \end{pmatrix} = \frac{1}{\sqrt{21}} \begin{pmatrix} 4 \\ 1 \\ -2 \end{pmatrix}$.

So, $Q = \begin{pmatrix} 1/\sqrt{14} & 4/\sqrt{21} \\ 2/\sqrt{14} & 1/\sqrt{21} \\ 3/\sqrt{14} & -2/\sqrt{21} \end{pmatrix}$.

Now, find $R$. $R$ is an upper triangular matrix where $R_{ij} = q_i^T a_j$.
$R_{11} = q_1^Ta_1 = ||a_1|| = \sqrt{14}$.
$R_{12} = q_1^Ta_2 = \frac{1}{\sqrt{14}} \begin{pmatrix} 1 & 2 & 3 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{14}}(1+2+3) = \frac{6}{\sqrt{14}}$.
$R_{21} = 0$ (by Gram-Schmidt construction).
$R_{22} = q_2^Ta_2 = ||v_2|| = \frac{\sqrt{21}}{7}$.
So, $R = \begin{pmatrix} \sqrt{14} & 6/\sqrt{14} \\ 0 & \sqrt{21}/7 \end{pmatrix}$.

*Explanation:* We used the Gram-Schmidt process to convert the columns of $A$ into an orthonormal basis, forming $Q$. The coefficients of this process form the upper triangular matrix $R$.

**Step 2: Calculate $Q^Tb$.**
$$
Q^Tb = \begin{pmatrix} 1/\sqrt{14} & 2/\sqrt{14} & 3/\sqrt{14} \\ 4/\sqrt{21} & 1/\sqrt{21} & -2/\sqrt{21} \end{pmatrix} \begin{pmatrix} 1 \\ 3 \\ 2 \end{pmatrix}
$$
$$
Q^Tb = \begin{pmatrix} (1/\sqrt{14})(1) + (2/\sqrt{14})(3) + (3/\sqrt{14})(2) \\ (4/\sqrt{21})(1) + (1/\sqrt{21})(3) + (-2/\sqrt{21})(2) \end{pmatrix}
$$
$$
Q^Tb = \begin{pmatrix} (1+6+6)/\sqrt{14} \\ (4+3-4)/\sqrt{21} \end{pmatrix}
$$
$$
Q^Tb = \begin{pmatrix} 13/\sqrt{14} \\ 3/\sqrt{21} \end{pmatrix}
$$
*Explanation:* We multiply the transpose of $Q$ by the vector $b$.

**Step 3: Solve $R\hat{x} = Q^Tb$ using back-substitution.**
$$
\begin{pmatrix} \sqrt{14} & 6/\sqrt{14} \\ 0 & \sqrt{21}/7 \end{pmatrix} \begin{pmatrix} m \\ c \end{pmatrix} = \begin{pmatrix} 13/\sqrt{14} \\ 3/\sqrt{21} \end{pmatrix}
$$
From the second row:
$(\sqrt{21}/7)c = 3/\sqrt{21}$
$c = \frac{3}{\sqrt{21}} \cdot \frac{7}{\sqrt{21}} = \frac{21}{21} = 1$.

From the first row:
$\sqrt{14}m + (6/\sqrt{14})c = 13/\sqrt{14}$
Substitute $c=1$:
$\sqrt{14}m + 6/\sqrt{14} = 13/\sqrt{14}$
Multiply by $\sqrt{14}$:
$14m + 6 = 13$
$14m = 7$
$m = 7/14 = 1/2$.
So, $\hat{x} = \begin{pmatrix} 1/2 \\ 1 \end{pmatrix}$.

*Explanation:* We solve the upper triangular system $R\hat{x} = Q^Tb$ by starting from the last equation and working our way up. This is called back-substitution.

**Final Answer:** The least squares line is $\boxed{y = \frac{1}{2}x + 1}$.

*Reflection:* The result is identical to Example 1, as expected. The QR approach involves more square roots and fractions during the decomposition, but the final system $R\hat{x} = Q^Tb$ is generally easier and more numerically stable to solve than inverting $A^TA$. This example demonstrates the full process of QR decomposition for least squares.

---

### Example 4 (Hard): Least Squares with a non-trivial model and QR approach

**Problem:** We want to model the growth of a bacterial population over time $t$ using the function $P(t) = C e^{kt}$. We have the following noisy measurements:
$(t, P)$: $(0, 1.1)$, $(1, 3.0)$, $(2, 8.5)$.
Since this is not a linear model, we linearize it first. Take the natural logarithm of both sides:
$\ln(P(t)) = \ln(C e^{kt}) = \ln(C) + \ln(e^{kt}) = \ln(C) + kt$.
Let $y = \ln(P)$, $x = t$, $A_0 = \ln(C)$, and $B_0 = k$. The linear model is $y = B_0x + A_0$.
Find $A_0$ and $B_0$ using the QR approach, and then find $C$ and $k$.

**Given:** Data points $(t_i, P_i)$: $(0, 1.1)$, $(1, 3.0)$, $(2, 8.5)$.
**Want:** $A_0, B_0$ (which are $\ln C, k$) using QR, then $C, k$.

**Step 1: Transform the data to fit the linear model $y = B_0x + A_0$.**
For each point $(t_i, P_i)$, calculate $x_i = t_i$ and $y_i = \ln(P_i)$.
$(0, 1.1) \implies (x_1, y_1) = (0, \ln(1.1)) \approx (0, 0.0953)$
$(1, 3.0) \implies (x_2, y_2) = (1, \ln(3.0)) \approx (1, 1.0986)$
$(2, 8.5) \implies (x_3, y_3) = (2, \ln(8.5)) \approx (2, 2.1401)$

**Step 2: Set up the system $A\hat{x}=b$ for the linear model.**
The model is $y_i = B_0x_i + A_0$. We'll write this as $A_0 + B_0x_i = y_i$.
For $(0, 0.0953)$: $A_0 + B_0(0) = 0.0953 \implies 1A_0 + 0B_0 = 0.0953$
For $(1, 1.0986)$: $A_0 + B_0(1) = 1.0986 \implies 1A_0 + 1B_0 = 1.0986$
For $(2, 2.1401)$: $A_0 + B_0(2) = 2.1401 \implies 1A_0 + 2B_0 = 2.1401$
$$
A = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}, \quad \hat{x} = \begin{pmatrix} A_0 \\ B_0 \end{pmatrix}, \quad b = \begin{pmatrix} 0.0953 \\ 1.0986 \\ 2.1401 \end{pmatrix}
$$
*Explanation:* The problem is transformed into a standard linear least squares problem by taking logarithms. The matrix $A$ contains the coefficients for $A_0$ and $B_0$.

**Step 3: Perform QR decomposition of $A$.**
Let $A = [a_1 \quad a_2]$, where $a_1 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$ and $a_2 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix}$.

First, find $q_1$:
$||a_1|| = \sqrt{1^2 + 1^2 + 1^2} = \sqrt{3}$.
$q_1 = \frac{1}{\sqrt{3}} \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$.

Next, find $v_2$, the component of $a_2$ orthogonal to $a_1$:
$a_1^Ta_2 = (1)(0)+(1)(1)+(1)(2) = 0+1+2 = 3$.
$a_1^Ta_1 = 3$.
$v_2 = a_2 - \frac{a_1^Ta_2}{a_1^Ta_1}a_1 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} - \frac{3}{3} \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} - \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$.

Now normalize $v_2$ to get $q_2$:
$||v_2|| = \sqrt{(-1)^2 + 0^2 + 1^2} = \sqrt{1+0+1} = \sqrt{2}$.
$q_2 = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$.

So, $Q = \begin{pmatrix} 1/\sqrt{3} & -1/\sqrt{2} \\ 1/\sqrt{3} & 0 \\ 1/\sqrt{3} & 1/\sqrt{2} \end{pmatrix}$.

Now, find $R$:
$R_{11} = q_1^Ta_1 = ||a_1|| = \sqrt{3}$.
$R_{12} = q_1^Ta_2 = \frac{1}{\sqrt{3}} \begin{pmatrix} 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} = \frac{1}{\sqrt{3}}(0+1+2) = \frac{3}{\sqrt{3}} = \sqrt{3}$.
$R_{21} = 0$.
$R_{22} = q_2^Ta_2 = ||v_2|| = \sqrt{2}$.
So, $R = \begin{pmatrix} \sqrt{3} & \sqrt{3} \\ 0 & \sqrt{2} \end{pmatrix}$.
*Explanation:* Standard Gram-Schmidt process.

**Step 4: Calculate $Q^Tb$.**
$$
Q^Tb = \begin{pmatrix} 1/\sqrt{3} & 1/\sqrt{3} & 1/\sqrt{3} \\ -1/\sqrt{2} & 0 & 1/\sqrt{2} \end{pmatrix} \begin{pmatrix} 0.0953 \\ 1.0986 \\ 2.1401 \end{pmatrix}
$$
$$
Q^Tb = \begin{pmatrix} (0.0953+1.0986+2.1401)/\sqrt{3} \\ (-0.0953+0+2.1401)/\sqrt{2} \end{pmatrix}
$$
$$
Q^Tb = \begin{pmatrix} 3.3340/\sqrt{3} \\ 2.0448/\sqrt{2} \end{pmatrix} \approx \begin{pmatrix} 1.9254 \\ 1.4459 \end{pmatrix}
$$
*Explanation:* Matrix-vector multiplication, using the transformed $b$ vector.

**Step