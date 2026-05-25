## 1. What it is — in plain English

Imagine you have a special machine that takes any arrow (a vector) and stretches or squishes it, and maybe even rotates it. Most arrows, when they go through this machine, come out pointing in a completely new direction. But for some very special arrows, something remarkable happens: they come out pointing in *exactly the same direction* as they went in, even if they've been stretched or squished. These special arrows are called **eigenvectors**. The amount they've been stretched or squished (the scaling factor) is called the **eigenvalue**.

Now, imagine we don't know what these special arrows or their scaling factors are for a given machine (which we represent mathematically as a matrix). We want to find them. The **Power Method** is like a simple experiment: you pick a random arrow, put it through the machine, then take the output and put it through the machine again, and again, and again. What happens is that, usually, your arrow will eventually start lining up with the *most stretched* of these special directions (the eigenvector corresponding to the largest eigenvalue). The amount it gets stretched each time will tell you the largest scaling factor.

The **Inverse Iteration** is a clever twist. What if you want to find a *different* special direction, not necessarily the most stretched one? Or what if you want the special direction whose scaling factor is *closest* to a specific number you have in mind? Inverse Iteration uses a slightly modified machine (involving the inverse of the original machine) and applies the same repeated process. This allows it to zoom in on a specific eigenvector and its eigenvalue, rather than just the dominant one. Both methods are iterative, meaning they get closer and closer to the answer with each step.

## 2. Why it matters — real-world applications

Eigenvalue computation is fundamental across science and engineering. Here are a few concrete applications:

1.  **Google PageRank Algorithm:** At its heart, PageRank, the algorithm that powers Google's search engine, is an eigenvalue problem. Google constructs a massive matrix representing the web's link structure. The importance of a webpage (its PageRank score) is determined by the components of the dominant eigenvector of this matrix. The Power Method is a practical way to compute this dominant eigenvector for such a huge matrix, even if it's too large to store explicitly.

2.  **Structural Engineering and Vibration Analysis:** When designing bridges, buildings, or airplane wings, engineers need to understand how these structures will vibrate. Each structure has natural frequencies at which it prefers to oscillate. These natural frequencies correspond to the eigenvalues of a matrix representing the structure's stiffness and mass properties. The associated eigenvectors describe the "modes" or shapes of vibration. Knowing these is critical to prevent resonance, which can lead to catastrophic failure (like the Tacoma Narrows Bridge collapse). The Power Method and Inverse Iteration can help find these critical frequencies and modes.

3.  **Quantum Mechanics:** In quantum mechanics, the energy levels of a system (like an electron in an atom) are the eigenvalues of the Hamiltonian operator (which can often be represented as a matrix). The corresponding eigenvectors are the wavefunctions describing the state of the system at that energy. Computing these eigenvalues and eigenvectors is essential for understanding atomic and molecular behavior, predicting spectra, and designing new materials.

4.  **Principal Component Analysis (PCA) in Machine Learning:** PCA is a widely used dimensionality reduction technique. Given a dataset with many features, PCA finds the directions (principal components) along which the data varies the most. These directions are the eigenvectors of the data's covariance matrix, and the amount of variance explained by each direction is given by the corresponding eigenvalues. By selecting the eigenvectors associated with the largest eigenvalues, we can reduce the data's dimensionality while retaining most of its information.

## 3. Prerequisites — what you must know first

Before diving deep into eigenvalue computation, ensure you have a solid grasp of these foundational concepts:

*   **Vectors:** An ordered list of numbers representing a point in space or a direction. You should understand vector addition, scalar multiplication, and the concept of a zero vector.
*   **Matrices:** A rectangular array of numbers. You should be familiar with matrix addition, scalar multiplication, and crucially, **matrix-vector multiplication** and **matrix-matrix multiplication**.
*   **Eigenvalues and Eigenvectors:** The core definitions: for a square matrix $A$, if $Av = \lambda v$ for a non-zero vector $v$ and a scalar $\lambda$, then $v$ is an eigenvector of $A$ and $\lambda$ is its corresponding eigenvalue. You should know how to find them for small matrices using the characteristic equation $\det(A - \lambda I) = 0$.
*   **Matrix Inverse:** For a square matrix $A$, its inverse $A^{-1}$ satisfies $AA^{-1} = A^{-1}A = I$ (the identity matrix). You should know when an inverse exists (non-singular matrix, non-zero determinant) and how to compute it for small matrices.
*   **Norms of Vectors:** A function that assigns a "length" or "magnitude" to a vector. The most common is the Euclidean (or $L_2$) norm: $||x||_2 = \sqrt{\sum x_i^2}$. You should understand what it means to normalize a vector (make its length 1).
*   **Linear Systems of Equations:** How to solve $Ax = b$ for $x$, using methods like Gaussian elimination or LU decomposition. This is critical for Inverse Iteration.
*   **Convergence of Sequences:** What it means for a sequence of numbers or vectors to approach a specific value as the number of iterations increases.

## 4. The core idea — step by step

Let's break down the Power Method and Inverse Iteration, building intuition step by step.

### Step 1: The Eigenvalue Problem

*   **Plain English:** We're looking for special directions (eigenvectors) that, when acted upon by a "transformation" (a matrix), only get scaled, not rotated. The scaling factor is the eigenvalue.
*   **Small Concrete Example:** Consider the matrix $A = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}$. If we take the vector $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, then $Av_1 = \begin{pmatrix} 3 \\ 0 \end{pmatrix} = 3 \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. So $v_1$ is an eigenvector with eigenvalue $\lambda_1 = 3$. Similarly, for $v_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$, $Av_2 = \begin{pmatrix} 0 \\ 2 \end{pmatrix} = 2 \begin{pmatrix} 0 \\ 1 \end{pmatrix}$, so $v_2$ is an eigenvector with eigenvalue $\lambda_2 = 2$.
*   **Formal/Mathematical Version:** Given a square matrix $A$, we seek non-zero vectors $v$ and scalars $\lambda$ such that:
    $$Av = \lambda v$$
*   **What Could Go Wrong:** Not all matrices have real eigenvalues. Some matrices have repeated eigenvalues, which can affect the number of linearly independent eigenvectors. For numerical methods, we primarily focus on matrices with a "dominant" eigenvalue (see Step 2).

### Step 2: The Dominant Eigenvalue and Eigenvector

*   **Plain English:** Out of all the special scaling factors (eigenvalues), the "dominant" one is the one with the largest absolute value. The Power Method specifically finds this one and its corresponding special direction.
*   **Small Concrete Example:** If a matrix has eigenvalues $\lambda_1 = 5$, $\lambda_2 = -3$, and $\lambda_3 = 1$, then the dominant eigenvalue is $\lambda_1 = 5$ because $|5| > |-3|$ and $|5| > |1|$. If the eigenvalues were $5$, $-5$, and $1$, then both $5$ and $-5$ have the same largest absolute value, and the Power Method might struggle or oscillate.
*   **Formal/Mathematical Version:** An eigenvalue $\lambda_1$ of matrix $A$ is called the **dominant eigenvalue** if its absolute value is strictly greater than the absolute values of all other eigenvalues:
    $$|\lambda_1| > |\lambda_i| \quad \text{for all } i \neq 1$$
    The corresponding eigenvector $v_1$ is the dominant eigenvector.
*   **What Could Go Wrong:** If there are multiple eigenvalues with the same maximum absolute value (e.g., $5$ and $-5$, or complex conjugate pairs like $3+4i$ and $3-4i$ where $|3+4i|=|3-4i|=5$), the Power Method may not converge to a single eigenvector or eigenvalue.

### Step 3: The Power Method Intuition — Repeated Application

*   **Plain English:** Imagine you have a bunch of rubber bands (eigenvectors) of different "stiffnesses" (eigenvalues). If you take a random object (your initial vector) and repeatedly stretch it according to the matrix's rules, the "stiffest" rubber band will eventually dominate and dictate the direction of your object.
*   **Small Concrete Example:** Let $A = \begin{pmatrix} 1.5 & 0.5 \\ 0.5 & 1.5 \end{pmatrix}$. Its eigenvalues are $\lambda_1 = 2$ (with eigenvector $v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$) and $\lambda_2 = 1$ (with eigenvector $v_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$). The dominant eigenvalue is $2$.
    Let's start with an arbitrary vector $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    $x_1 = Ax_0 = \begin{pmatrix} 1.5 & 0.5 \\ 0.5 & 1.5 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1.5 \\ 0.5 \end{pmatrix}$.
    $x_2 = Ax_1 = \begin{pmatrix} 1.5 & 0.5 \\ 0.5 & 1.5 \end{pmatrix} \begin{pmatrix} 1.5 \\ 0.5 \end{pmatrix} = \begin{pmatrix} 2.25 + 0.25 \\ 0.75 + 0.75 \end{pmatrix} = \begin{pmatrix} 2.5 \\ 1.5 \end{pmatrix}$.
    $x_3 = Ax_2 = \begin{pmatrix} 1.5 & 0.5 \\ 0.5 & 1.5 \end{pmatrix} \begin{pmatrix} 2.5 \\ 1.5 \end{pmatrix} = \begin{pmatrix} 3.75 + 0.75 \\ 1.25 + 2.25 \end{pmatrix} = \begin{pmatrix} 4.5 \\ 3.5 \end{pmatrix}$.
    Notice that the ratio of components is approaching $1:1$, which is the direction of $v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
*   **Formal/Mathematical Version:** Start with an arbitrary non-zero vector $x_0$. Generate a sequence of vectors $x_k$ by repeatedly applying the matrix $A$:
    $$x_{k+1} = A x_k = A^{k+1} x_0$$
    If $x_0$ can be expressed as a linear combination of eigenvectors $x_0 = \sum_{i=1}^n c_i v_i$, then $A^k x_0 = \sum_{i=1}^n c_i \lambda_i^k v_i$. If there's a unique dominant eigenvalue $\lambda_1$, then $A^k x_0 \approx c_1 \lambda_1^k v_1$ for large $k$.
*   **What Could Go Wrong:** The components of $x_k$ can grow very large or shrink very small, leading to numerical overflow or underflow in computer calculations. This is why normalization is essential. Also, if the initial guess $x_0$ has no component in the dominant eigenvector direction (i.e., $c_1=0$), the method might converge to the next dominant one, or fail.

### Step 4: Normalization in Power Method

*   **Plain English:** To keep the numbers manageable and prevent them from exploding or vanishing, after each application of the matrix, we "resize" the vector to a standard length (e.g., length 1). This ensures we're only tracking its *direction*, not its magnitude.
*   **Small Concrete Example:** Continuing from Step 3:
    $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    $x_1 = \begin{pmatrix} 1.5 \\ 0.5 \end{pmatrix}$. $||x_1|| = \sqrt{1.5^2 + 0.5^2} = \sqrt{2.25 + 0.25} = \sqrt{2.5} \approx 1.581$.
    Normalize $x_1$: $x_1' = \frac{1}{\sqrt{2.5}}\begin{pmatrix} 1.5 \\ 0.5 \end{pmatrix} \approx \begin{pmatrix} 0.9487 \\ 0.3162 \end{pmatrix}$.
    Now, $x_2 = Ax_1' = \begin{pmatrix} 1.5 & 0.5 \\ 0.5 & 1.5 \end{pmatrix} \begin{pmatrix} 0.9487 \\ 0.3162 \end{pmatrix} \approx \begin{pmatrix} 1.423 + 0.158 \\ 0.474 + 0.474 \end{pmatrix} = \begin{pmatrix} 1.581 \\ 0.948 \end{pmatrix}$.
    And so on. The vectors stay bounded.
*   **Formal/Mathematical Version:** The iterative process with normalization is:
    1.  Choose an initial non-zero vector $x_0$.
    2.  For $k = 0, 1, 2, \dots$:
        a.  Compute $y_{k+1} = A x_k$.
        b.  Compute $x_{k+1} = \frac{y_{k+1}}{||y_{k+1}||}$. (Using the $L_2$ norm, for example).
*   **What Could Go Wrong:** If $A x_k$ happens to be the zero vector (which would only occur if $x_k$ is in the null space of $A$ and $A$ is singular, or if $x_k$ is the zero vector itself, which we avoid by choosing $x_0 \neq 0$), then division by zero occurs.

### Step 5: Estimating the Eigenvalue in Power Method

*   **Plain English:** Once our normalized vector $x_k$ is very close to the dominant eigenvector, applying $A$ to it should just scale it by the dominant eigenvalue. So, the ratio of the length of $Ax_k$ to the length of $x_k$ (which is 1) will give us the eigenvalue. A more robust way is the "Rayleigh quotient."
*   **Small Concrete Example:** If $x_k$ is a good approximation to $v_1$, then $Ax_k \approx \lambda_1 x_k$.
    Using the Rayleigh quotient: $\lambda_k = \frac{x_k^T A x_k}{x_k^T x_k}$. If $x_k$ is normalized ($||x_k||=1$, so $x_k^T x_k = 1$), then $\lambda_k = x_k^T A x_k$.
    In our example from Step 4, $x_1' \approx \begin{pmatrix} 0.9487 \\ 0.3162 \end{pmatrix}$.
    $Ax_1' \approx \begin{pmatrix} 1.581 \\ 0.948 \end{pmatrix}$.
    The ratio of components of $Ax_1'$ to $x_1'$ is approximately $1.581/0.9487 \approx 1.666$ and $0.948/0.3162 \approx 2.99$. These are not very close yet.
    Let's use the Rayleigh quotient for $x_1'$:
    $\lambda_1' = (0.9487, 0.3162) \begin{pmatrix} 1.5 & 0.5 \\ 0.5 & 1.5 \end{pmatrix} \begin{pmatrix} 0.9487 \\ 0.3162 \end{pmatrix}$
    $= (0.9487, 0.3162) \begin{pmatrix} 1.581 \\ 0.948 \end{pmatrix} = 0.9487 \times 1.581 + 0.3162 \times 0.948 \approx 1.500 + 0.300 = 1.800$.
    This value will approach $\lambda_1 = 2$ as $k$ increases.
*   **Formal/Mathematical Version:** The eigenvalue estimate at iteration $k$ is given by the Rayleigh quotient:
    $$\lambda_k = \frac{x_k^T A x_k}{x_k^T x_k}$$
    If $x_k$ is normalized ($||x_k||_2 = 1$), this simplifies to $\lambda_k = x_k^T A x_k$.
*   **What Could Go Wrong:** The convergence of the eigenvalue estimate is typically slower than the convergence of the eigenvector, especially if the ratio $|\lambda_2|/|\lambda_1|$ is close to 1.

### Step 6: The Inverse Iteration Intuition — Finding the Smallest Eigenvalue

*   **Plain English:** What if we want the *smallest* scaling factor instead of the largest? We can use the inverse of our machine, $A^{-1}$. If our original machine $A$ stretches things by $\lambda$, its inverse $A^{-1}$ will "unstretch" things by $1/\lambda$. So, the smallest scaling factor $\lambda_{min}$ in $A$ corresponds to the *largest* scaling factor $1/\lambda_{min}$ in $A^{-1}$. We can just apply the Power Method to $A^{-1}$!
*   **Small Concrete Example:** If $A$ has eigenvalues $3, 2, 1$, then $A^{-1}$ has eigenvalues $1/3, 1/2, 1$. The dominant eigenvalue of $A^{-1}$ is $1$, which corresponds to the smallest eigenvalue of $A$.
*   **Formal/Mathematical Version:** If $Av = \lambda v$, then multiplying by $A^{-1}$ (assuming $A$ is invertible) gives $A^{-1}Av = A^{-1}\lambda v$, which simplifies to $v = \lambda A^{-1}v$. Rearranging, we get:
    $$A^{-1}v = \frac{1}{\lambda} v$$
    This means that $A^{-1}$ has the same eigenvectors as $A$, but its eigenvalues are the reciprocals of $A$'s eigenvalues. Applying the Power Method to $A^{-1}$ will converge to the eigenvector corresponding to the eigenvalue of $A^{-1}$ with the largest absolute value, which is $1/\lambda_{min}$ (where $\lambda_{min}$ is the eigenvalue of $A$ with the smallest absolute value).
    The iteration becomes:
    1.  Choose an initial non-zero vector $x_0$.
    2.  For $k = 0, 1, 2, \dots$:
        a.  Solve $A y_{k+1} = x_k$ for $y_{k+1}$. (This is equivalent to $y_{k+1} = A^{-1} x_k$ but avoids explicit inverse computation).
        b.  Compute $x_{k+1} = \frac{y_{k+1}}{||y_{k+1}||}$.
        c.  Estimate the eigenvalue $\lambda_k = \frac{x_k^T A x_k}{x_k^T x_k}$.
*   **What Could Go Wrong:** Explicitly computing $A^{-1}$ is computationally expensive and numerically unstable for large matrices. Instead, we solve a linear system $A y_{k+1} = x_k$ at each step. This still requires solving a system, which can be costly. Also, if $A$ is singular (i.e., $0$ is an eigenvalue), $A^{-1}$ doesn't exist.

### Step 7: Inverse Iteration with a Shift — Finding an Eigenvalue Near a Target

*   **Plain English:** What if we want an eigenvalue that's not the largest or smallest, but one *closest* to a specific number $\mu$ (our "target")? We can play a trick. Consider a new matrix $(A - \mu I)$, where $I$ is the identity matrix. If $A$ has an eigenvalue $\lambda$, then $(A - \mu I)$ has an eigenvalue $(\lambda - \mu)$. Now, if we apply the Power Method to $(A - \mu I)^{-1}$, it will find the dominant eigenvalue of *that* matrix. The dominant eigenvalue of $(A - \mu I)^{-1}$ is $1/(\lambda_{closest} - \mu)$, where $\lambda_{closest}$ is the eigenvalue of $A$ that is closest to $\mu$. This means we can "steer" the method to find any eigenvalue we want by choosing $\mu$ appropriately!
*   **Small Concrete Example:** Let $A$ have eigenvalues $1, 5, 10$. If we want the eigenvalue closest to $5$, we choose $\mu = 5$.
    Then $(A - 5I)$ has eigenvalues $(1-5), (5-5), (10-5)$, which are $-4, 0, 5$.
    The inverse $(A - 5I)^{-1}$ has eigenvalues $1/(-4), 1/0, 1/5$. The $1/0$ indicates singularity. If $\mu$ is an exact eigenvalue, this method breaks down.
    Let's choose $\mu = 4.9$ (close to 5, but not exactly 5).
    Then $(A - 4.9I)$ has eigenvalues $(1-4.9), (5-4.9), (10-4.9)$, which are $-3.9, 0.1, 5.1$.
    The inverse $(A - 4.9I)^{-1}$ has eigenvalues $1/(-3.9) \approx -0.256$, $1/(0.1) = 10$, $1/(5.1) \approx 0.196$.
    The dominant eigenvalue of $(A - 4.9I)^{-1}$ is $10$. This corresponds to $1/(\lambda - 4.9) = 10$, so $\lambda - 4.9 = 0.1$, which means $\lambda = 5.0$. This is the eigenvalue of $A$ closest to our target $\mu=4.9$.
*   **Formal/Mathematical Version:** The iteration for Inverse Iteration with a shift $\mu$ is:
    1.  Choose an initial non-zero vector $x_0$.
    2.  For $k = 0, 1, 2, \dots$:
        a.  Solve the linear system $(A - \mu I) y_{k+1} = x_k$ for $y_{k+1}$.
        b.  Compute $x_{k+1} = \frac{y_{k+1}}{||y_{k+1}||}$.
        c.  Estimate the eigenvalue $\lambda_k = \frac{x_k^T A x_k}{x_k^T x_k}$.
    The sequence $x_k$ converges to the eigenvector of $A$ corresponding to the eigenvalue $\lambda$ closest to $\mu$. The rate of convergence depends on how close $\mu$ is to an actual eigenvalue and the separation between eigenvalues.
*   **What Could Go Wrong:** If $\mu$ is exactly an eigenvalue of $A$, then $(A - \mu I)$ is singular, and the system $(A - \mu I) y_{k+1} = x_k$ cannot be solved uniquely (or at all, if $x_k$ is not in the column space). If $\mu$ is very close to an eigenvalue, $(A - \mu I)$ becomes very ill-conditioned, making the solution of the linear system numerically unstable and prone to large errors.

## 5. Worked examples — multiple, with every step shown

We will use the $L_2$ norm for normalization: $||x|| = \sqrt{\sum x_i^2}$. The stopping criterion for these examples will be a certain number of iterations or when the eigenvalue estimate stabilizes to a few decimal places.

---

### Example 1: Easy Power Method (2x2 Matrix)

**Problem:** Use the Power Method to find the dominant eigenvalue and its corresponding eigenvector for the matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$. Start with $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. Perform 3 iterations.

**Given:**
*   Matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$
*   Initial vector $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$
*   Number of iterations: 3

**Wanted:** Dominant eigenvalue $\lambda$ and its eigenvector $v$.

**Solution:**

**Iteration 1:**

1.  **Compute $y_1 = A x_0$**:
    $$y_1 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} (2)(1) + (1)(0) \\ (1)(1) + (2)(0) \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$$
    *Explanation:* We perform matrix-vector multiplication.

2.  **Compute $||y_1||_2$**:
    $$||y_1||_2 = \sqrt{2^2 + 1^2} = \sqrt{4 + 1} = \sqrt{5} \approx 2.2361$$
    *Explanation:* Calculate the Euclidean norm (length) of the vector $y_1$.

3.  **Normalize $x_1 = y_1 / ||y_1||_2$**:
    $$x_1 = \frac{1}{\sqrt{5}} \begin{pmatrix} 2 \\ 1 \end{pmatrix} \approx \begin{pmatrix} 0.8944 \\ 0.4472 \end{pmatrix}$$
    *Explanation:* Divide each component of $y_1$ by its norm to get a unit vector. This prevents the vector components from growing too large.

4.  **Estimate eigenvalue $\lambda_1 = x_1^T A x_1$**: (Using the normalized $x_1$ from the current iteration)
    First, calculate $Ax_1$:
    $$A x_1 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.8944 \\ 0.4472 \end{pmatrix} = \begin{pmatrix} (2)(0.8944) + (1)(0.4472) \\ (1)(0.8944) + (2)(0.4472) \end{pmatrix} = \begin{pmatrix} 1.7888 + 0.4472 \\ 0.8944 + 0.8944 \end{pmatrix} = \begin{pmatrix} 2.2360 \\ 1.7888 \end{pmatrix}$$
    Then, calculate $\lambda_1 = x_1^T (A x_1)$:
    $$\lambda_1 = \begin{pmatrix} 0.8944 & 0.4472 \end{pmatrix} \begin{pmatrix} 2.2360 \\ 1.7888 \end{pmatrix} = (0.8944)(2.2360) + (0.4472)(1.7888) = 1.9997 + 0.7998 = 2.7995$$
    *Explanation:* We use the Rayleigh quotient, which is $x_k^T A x_k / (x_k^T x_k)$. Since $x_k$ is normalized, $x_k^T x_k = 1$, so it simplifies to $x_k^T A x_k$. This provides an estimate for the eigenvalue.

**Iteration 2:**

1.  **Compute $y_2 = A x_1$**: (Using $x_1$ from previous step)
    $$y_2 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.8944 \\ 0.4472 \end{pmatrix} = \begin{pmatrix} 2.2360 \\ 1.7888 \end{pmatrix}$$
    *Explanation:* Matrix-vector multiplication using the new normalized vector $x_1$.

2.  **Compute $||y_2||_2$**:
    $$||y_2||_2 = \sqrt{2.2360^2 + 1.7888^2} = \sqrt{4.9998 + 3.2000} = \sqrt{8.1998} \approx 2.8635$$
    *Explanation:* Calculate the Euclidean norm of $y_2$.

3.  **Normalize $x_2 = y_2 / ||y_2||_2$**:
    $$x_2 = \frac{1}{2.8635} \begin{pmatrix} 2.2360 \\ 1.7888 \end{pmatrix} \approx \begin{pmatrix} 0.7809 \\ 0.6247 \end{pmatrix}$$
    *Explanation:* Normalize $y_2$ to get $x_2$.

4.  **Estimate eigenvalue $\lambda_2 = x_2^T A x_2$**:
    First, calculate $Ax_2$:
    $$A x_2 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.7809 \\ 0.6247 \end{pmatrix} = \begin{pmatrix} (2)(0.7809) + (1)(0.6247) \\ (1)(0.7809) + (2)(0.6247) \end{pmatrix} = \begin{pmatrix} 1.5618 + 0.6247 \\ 0.7809 + 1.2494 \end{pmatrix} = \begin{pmatrix} 2.1865 \\ 2.0303 \end{pmatrix}$$
    Then, calculate $\lambda_2 = x_2^T (A x_2)$:
    $$\lambda_2 = \begin{pmatrix} 0.7809 & 0.6247 \end{pmatrix} \begin{pmatrix} 2.1865 \\ 2.0303 \end{pmatrix} = (0.7809)(2.1865) + (0.6247)(2.0303) = 1.7073 + 1.2683 = 2.9756$$
    *Explanation:* Compute the Rayleigh quotient for the new normalized vector $x_2$.

**Iteration 3:**

1.  **Compute $y_3 = A x_2$**:
    $$y_3 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.7809 \\ 0.6247 \end{pmatrix} = \begin{pmatrix} 2.1865 \\ 2.0303 \end{pmatrix}$$
    *Explanation:* Matrix-vector multiplication.

2.  **Compute $||y_3||_2$**:
    $$||y_3||_2 = \sqrt{2.1865^2 + 2.0303^2} = \sqrt{4.7810 + 4.1220} = \sqrt{8.9030} \approx 2.9838$$
    *Explanation:* Calculate the Euclidean norm of $y_3$.

3.  **Normalize $x_3 = y_3 / ||y_3||_2$**:
    $$x_3 = \frac{1}{2.9838} \begin{pmatrix} 2.1865 \\ 2.0303 \end{pmatrix} \approx \begin{pmatrix} 0.7328 \\ 0.6804 \end{pmatrix}$$
    *Explanation:* Normalize $y_3$ to get $x_3$.

4.  **Estimate eigenvalue $\lambda_3 = x_3^T A x_3$**:
    First, calculate $Ax_3$:
    $$A x_3 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.7328 \\ 0.6804 \end{pmatrix} = \begin{pmatrix} (2)(0.7328) + (1)(0.6804) \\ (1)(0.7328) + (2)(0.6804) \end{pmatrix} = \begin{pmatrix} 1.4656 + 0.6804 \\ 0.7328 + 1.3608 \end{pmatrix} = \begin{pmatrix} 2.1460 \\ 2.0936 \end{pmatrix}$$
    Then, calculate $\lambda_3 = x_3^T (A x_3)$:
    $$\lambda_3 = \begin{pmatrix} 0.7328 & 0.6804 \end{pmatrix} \begin{pmatrix} 2.1460 \\ 2.0936 \end{pmatrix} = (0.7328)(2.1460) + (0.6804)(2.0936) = 1.5724 + 1.4257 = 2.9981$$
    *Explanation:* Compute the Rayleigh quotient for $x_3$.

**Summary of Results:**
*   After 3 iterations, the eigenvalue estimate is $\lambda_3 \approx 2.9981$.
*   The eigenvector estimate is $x_3 \approx \begin{pmatrix} 0.7328 \\ 0.6804 \end{pmatrix}$.

**Actual Eigenvalues/Eigenvectors (for comparison):**
For $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$, the characteristic equation is $(2-\lambda)^2 - 1 = 0 \Rightarrow (2-\lambda)^2 = 1 \Rightarrow 2-\lambda = \pm 1$.
So $\lambda_1 = 3$ and $\lambda_2 = 1$.
For $\lambda_1 = 3$: $A - 3I = \begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix}$, eigenvector is $v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. Normalized: $\begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} \approx \begin{pmatrix} 0.7071 \\ 0.7071 \end{pmatrix}$.
For $\lambda_2 = 1$: $A - 1I = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$, eigenvector is $v_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$. Normalized: $\begin{pmatrix} -1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} \approx \begin{pmatrix} -0.7071 \\ 0.7071 \end{pmatrix}$.

The Power Method successfully converged to the dominant eigenvalue $\lambda_1=3$ and its eigenvector $v_1=\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

**Final Answer:**
The dominant eigenvalue is approximately $\boxed{2.9981}$ and the corresponding eigenvector is approximately $\boxed{\begin{pmatrix} 0.7328 \\ 0.6804 \end{pmatrix}}$.

**Reflection:** This example was straightforward because the dominant eigenvalue was clearly separated from the other eigenvalue ($|\lambda_1| = 3$, $|\lambda_2| = 1$, so $|\lambda_1|/|\lambda_2| = 3$). The convergence was relatively quick. The initial vector had a component in the direction of the dominant eigenvector.

---

### Example 2: Power Method with Negative Dominant Eigenvalue

**Problem:** Use the Power Method to find the dominant eigenvalue and its corresponding eigenvector for the matrix $A = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix}$. Start with $x_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. Perform 4 iterations.

**Given:**
*   Matrix $A = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix}$
*   Initial vector $x_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$
*   Number of iterations: 4

**Wanted:** Dominant eigenvalue $\lambda$ and its eigenvector $v$.

**Solution:**

**Iteration 1:**

1.  **Compute $y_1 = A x_0$**:
    $$y_1 = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -4 - 5 \\ 2 + 3 \end{pmatrix} = \begin{pmatrix} -9 \\ 5 \end{pmatrix}$$

2.  **Compute $||y_1||_2$**:
    $$||y_1||_2 = \sqrt{(-9)^2 + 5^2} = \sqrt{81 + 25} = \sqrt{106} \approx 10.2956$$

3.  **Normalize $x_1 = y_1 / ||y_1||_2$**:
    $$x_1 = \frac{1}{\sqrt{106}} \begin{pmatrix} -9 \\ 5 \end{pmatrix} \approx \begin{pmatrix} -0.8741 \\ 0.4856 \end{pmatrix}$$

4.  **Estimate eigenvalue $\lambda_1 = x_1^T A x_1$**:
    $A x_1 = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix} \begin{pmatrix} -0.8741 \\ 0.4856 \end{pmatrix} = \begin{pmatrix} 3.4964 - 2.4280 \\ -1.7482 + 1.4568 \end{pmatrix} = \begin{pmatrix} 1.0684 \\ -0.2914 \end{pmatrix}$
    $$\lambda_1 = \begin{pmatrix} -0.8741 & 0.4856 \end{pmatrix} \begin{pmatrix} 1.0684 \\ -0.2914 \end{pmatrix} = (-0.8741)(1.0684) + (0.4856)(-0.2914) = -0.9330 - 0.1416 = -1.0746$$

**Iteration 2:**

1.  **Compute $y_2 = A x_1$**:
    $$y_2 = \begin{pmatrix} 1.0684 \\ -0.2914 \end{pmatrix}$$

2.  **Compute $||y_2||_2$**:
    $$||y_2||_2 = \sqrt{1.0684^2 + (-0.2914)^2} = \sqrt{1.1414 + 0.0849} = \sqrt{1.2263} \approx 1.1074$$

3.  **Normalize $x_2 = y_2 / ||y_2||_2$**:
    $$x_2 = \frac{1}{1.1074} \begin{pmatrix} 1.0684 \\ -0.2914 \end{pmatrix} \approx \begin{pmatrix} 0.9648 \\ -0.2631 \end{pmatrix}$$

4.  **Estimate eigenvalue $\lambda_2 = x_2^T A x_2$**:
    $A x_2 = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix} \begin{pmatrix} 0.9648 \\ -0.2631 \end{pmatrix} = \begin{pmatrix} -3.8592 + 1.3155 \\ 1.9296 - 0.7893 \end{pmatrix} = \begin{pmatrix} -2.5437 \\ 1.1403 \end{pmatrix}$
    $$\lambda_2 = \begin{pmatrix} 0.9648 & -0.2631 \end{pmatrix} \begin{pmatrix} -2.5437 \\ 1.1403 \end{pmatrix} = (0.9648)(-2.5437) + (-0.2631)(1.1403) = -2.4542 - 0.3001 = -2.7543$$

**Iteration 3:**

1.  **Compute $y_3 = A x_2$**:
    $$y_3 = \begin{pmatrix} -2.5437 \\ 1.1403 \end{pmatrix}$$

2.  **Compute $||y_3||_2$**:
    $$||y_3||_2 = \sqrt{(-2.5437)^2 + 1.1403^2} = \sqrt{6.4704 + 1.3003} = \sqrt{7.7707} \approx 2.7876$$

3.  **Normalize $x_3 = y_3 / ||y_3||_2$**:
    $$x_3 = \frac{1}{2.7876} \begin{pmatrix} -2.5437 \\ 1.1403 \end{pmatrix} \approx \begin{pmatrix} -0.9125 \\ 0.4091 \end{pmatrix}$$

4.  **Estimate eigenvalue $\lambda_3 = x_3^T A x_3$**:
    $A x_3 = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix} \begin{pmatrix} -0.9125 \\ 0.4091 \end{pmatrix} = \begin{pmatrix} 3.6500 - 2.0455 \\ -1.8250 + 1.2273 \end{pmatrix} = \begin{pmatrix} 1.6045 \\ -0.5977 \end{pmatrix}$
    $$\lambda_3 = \begin{pmatrix} -0.9125 & 0.4091 \end{pmatrix} \begin{pmatrix} 1.6045 \\ -0.5977 \end{pmatrix} = (-0.9125)(1.6045) + (0.4091)(-0.5977) = -1.4641 - 0.2445 = -1.7086$$

**Iteration 4:**

1.  **Compute $y_4 = A x_3$**:
    $$y_4 = \begin{pmatrix} 1.6045 \\ -0.5977 \end{pmatrix}$$

2.  **Compute $||y_4||_2$**:
    $$||y_4||_2 = \sqrt{1.6045^2 + (-0.5977)^2} = \sqrt{2.5744 + 0.3572} = \sqrt{2.9316} \approx 1.7122$$

3.  **Normalize $x_4 = y_4 / ||y_4||_2$**:
    $$x_4 = \frac{1}{1.7122} \begin{pmatrix} 1.6045 \\ -0.5977 \end{pmatrix} \approx \begin{pmatrix} 0.9371 \\ -0.3491 \end{pmatrix}$$

4.  **Estimate eigenvalue $\lambda_4 = x_4^T A x_4$**:
    $A x_4 = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix} \begin{pmatrix} 0.9371 \\ -0.3491 \end{pmatrix} = \begin{pmatrix} -3.7484 + 1.7455 \\ 1.8742 - 1.0473 \end{pmatrix} = \begin{pmatrix} -2.0029 \\ 0.8269 \end{pmatrix}$
    $$\lambda_4 = \begin{pmatrix} 0.9371 & -0.3491 \end{pmatrix} \begin{pmatrix} -2.0029 \\ 0.8269 \end{pmatrix} = (0.9371)(-2.0029) + (-0.3491)(0.8269) = -1.8767 - 0.2888 = -2.1655$$

**Summary of Results:**
*   Eigenvalue estimates: $\lambda_1 \approx -1.0746$, $\lambda_2 \approx -2.7543$, $\lambda_3 \approx -1.7086$, $\lambda_4 \approx -2.1655$.
*   Eigenvector estimates: $x_1 \approx \begin{pmatrix} -0.8741 \\ 0.4856 \end{pmatrix}$, $x_2 \approx \begin{pmatrix} 0.9648 \\ -0.2631 \end{pmatrix}$, $x_3 \approx \begin{pmatrix} -0.9125 \\ 0.4091 \end{pmatrix}$, $x_4 \approx \begin{pmatrix} 0.9371 \\ -0.3491 \end{pmatrix}$.

**Actual Eigenvalues/Eigenvectors:**
For $A = \begin{pmatrix} -4 & -5 \\ 2 & 3 \end{pmatrix}$, the characteristic equation is $(-4-\lambda)(3-\lambda) - (-5)(2) = 0 \Rightarrow -12 + 4\lambda - 3\lambda + \lambda^2 + 10 = 0 \Rightarrow \lambda^2 + \lambda - 2 = 0 \Rightarrow (\lambda+2)(\lambda-1) = 0$.
So $\lambda_1 = -2$ and $\lambda_2 = 1$.
The dominant eigenvalue is $\lambda_1 = -2$ because $|-2| > |1|$.
For $\lambda_1 = -2$: $A - (-2)I = \begin{pmatrix} -2 & -5 \\ 2 & 5 \end{pmatrix}$, eigenvector is $v_1 = \begin{pmatrix} 5 \\ -2 \end{pmatrix}$. Normalized: $\begin{pmatrix} 5/\sqrt{29} \\ -2/\sqrt{29} \end{pmatrix} \approx \begin{pmatrix} 0.9285 \\ -0.3714 \end{pmatrix}$.

The Power Method is converging to $\lambda = -2$. Notice the eigenvector estimates $x_k$ are alternating in sign. This is typical when the dominant eigenvalue is negative. For example, $x_1$ has a positive second component, $x_2$ has a negative second component, etc. The eigenvalue estimates also oscillate around $-2$.

**Final Answer:**
After 4 iterations, the dominant eigenvalue is approximately $\boxed{-2.1655}$ and the corresponding eigenvector is approximately $\boxed{\begin{pmatrix} 0.9371 \\ -0.3491 \end{pmatrix}}$.

**Reflection:** When the dominant eigenvalue is negative, the eigenvector estimates $x_k$ will tend to flip signs in successive iterations, as $A x_k \approx \lambda x_k$ and $\lambda$ is negative. This means $x_k$ and $x_{k+1}$ will point in roughly opposite directions. The eigenvalue estimates will also oscillate around the true value. More iterations would bring them closer to $-2$ and $\begin{pmatrix} 0.9285 \\ -0.3714 \end{pmatrix}$.

---

### Example 3: Inverse Iteration for Smallest Eigenvalue (2x2)

**Problem:** Use Inverse Iteration to find the eigenvalue with the smallest absolute value for the matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$. Start with $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. Perform 3 iterations. (This is the same matrix as Example 1, where $\lambda_1=3, \lambda_2=1$. We expect to find $\lambda_2=1$.)

**Given:**
*   Matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$
*   Initial vector $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$
*   Number of iterations: 3

**Wanted:** Eigenvalue $\lambda$ with smallest absolute value and its eigenvector $v$.

**Solution:**
Inverse Iteration involves solving $(A - \mu I) y_{k+1} = x_k$. For finding the smallest eigenvalue, we set the shift $\mu = 0$. So we need to solve $A y_{k+1} = x_k$.

**Iteration 1:**

1.  **Solve $A y_1 = x_0$ for $y_1$**:
    $$\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} y_{1,1} \\ y_{1,2} \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$$
    From the first equation: $2y_{1,1} + y_{1,2} = 1 \Rightarrow y_{1,2} = 1 - 2y_{1,1}$.
    Substitute into the second equation: $y_{1,1} + 2(1 - 2y_{1,1}) = 0 \Rightarrow y_{1,1} + 2 - 4y_{1,1} = 0 \Rightarrow -3y_{1,1} = -2 \Rightarrow y_{1,1} = 2/3$.
    Then $y_{1,2} = 1 - 2(2/3) = 1 - 4/3 = -1/3$.
    So, $y_1 = \begin{pmatrix} 2/3 \\ -1/3 \end{pmatrix} \approx \begin{pmatrix} 0.6667 \\ -0.3333 \end{pmatrix}$.
    *Explanation:* We solve a linear system $Ay = x_k$ to find $y_{k+1}$, which is equivalent to $y_{k+1} = A^{-1}x_k$.

2.  **Compute $||y_1||_2$**:
    $$||y_1||_2 = \sqrt{(2/3)^2 + (-1/3)^2} = \sqrt{4/9 + 1/9} = \sqrt{5/9} = \frac{\sqrt{5}}{3} \approx 0.7454$$
    *Explanation:* Calculate the Euclidean norm of $y_1$.

3.  **Normalize $x_1 = y_1 / ||y_1||_2$**:
    $$x_1 = \frac{1}{\sqrt{5}/3} \begin{pmatrix} 2/3 \\ -1/3 \end{pmatrix} = \begin{pmatrix} 2/\sqrt{5} \\ -1/\sqrt{5} \end{pmatrix} \approx \begin{pmatrix} 0.8944 \\ -0.4472 \end{pmatrix}$$
    *Explanation:* Normalize $y_1$ to get $x_1$.

4.  **Estimate eigenvalue $\lambda_1 = x_1^T A x_1$**:
    $A x_1 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.8944 \\ -0.4472 \end{pmatrix} = \begin{pmatrix} 1.7888 - 0.4472 \\ 0.8944 - 0.8944 \end{pmatrix} = \begin{pmatrix} 1.3416 \\ 0 \end{pmatrix}$
    $$\lambda_1 = \begin{pmatrix} 0.8944 & -0.4472 \end{pmatrix} \begin{pmatrix} 1.3416 \\ 0 \end{pmatrix} = (0.8944)(1.3416) + (-0.4472)(0) = 1.2001$$
    *Explanation:* Compute the Rayleigh quotient for $x_1$.

**Iteration 2:**

1.  **Solve $A y_2 = x_1$ for $y_2$**:
    $$\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} y_{2,1} \\ y_{2,2} \end{pmatrix} = \begin{pmatrix} 0.8944 \\ -0.4472 \end{pmatrix}$$
    Using Cramer's rule or substitution:
    $y_{2,1} = \frac{1}{3} (2(0.8944) - (-0.4472)) = \frac{1}{3} (1.7888 + 0.4472) = \frac{2.2360}{3} \approx 0.7453$
    $y_{2,2} = \frac{1}{3} (2(-0.4472) - 0.8944) = \frac{1}{3} (-0.8944 - 0.8944) = \frac{-1.7888}{3} \approx -0.5963$
    So, $y_2 \approx \begin{pmatrix} 0.7453 \\ -0.5963 \end{pmatrix}$.

2.  **Compute $||y_2||_2$**:
    $$||y_2||_2 = \sqrt{0.7453^2 + (-0.5963)^2} = \sqrt{0.5555 + 0.3556} = \sqrt{0.9111} \approx 0.9545$$

3.  **Normalize $x_2 = y_2 / ||y_2||_2$**:
    $$x_2 = \frac{1}{0.9545} \begin{pmatrix} 0.7453 \\ -0.5963 \end{pmatrix} \approx \begin{pmatrix} 0.7808 \\ -0.6247 \end{pmatrix}$$

4.  **Estimate eigenvalue $\lambda_2 = x_2^T A x_2$**:
    $A x_2 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 0.7808 \\ -0.6247 \end{pmatrix} = \begin{pmatrix} 1.5616 - 0.6247 \\ 0.7808 - 1.2494 \end{pmatrix} = \begin{pmatrix} 0.9369 \\ -0.4686 \end{pmatrix}$
    $$\lambda_2 = \begin{pmatrix} 0.7808 & -0.6247 \end{pmatrix} \begin{pmatrix} 0.9369 \\ -0.4686 \end{pmatrix} = (0.7808)(0.9369) + (-0.6247)(-0.4686) = 0.7310 + 0.2927 = 1.0237$$

**Iteration 3:**

1.  **Solve $A y_3 = x_2$ for $y_3$**:
    $$\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} y_{3,1} \\ y_{3,2} \end{pmatrix} = \begin{pmatrix} 0.7808 \\ -0.6247 \end{pmatrix}$$
    $y_{3,1} = \frac{1}{3} (2(0.7808) - (-0.6247)) = \frac{1}{3} (1.5616 + 0.6247) = \frac{2.1863}{3} \approx 0.7288$
    $y_{3,2} = \frac{1}{3} (2(-0.6247) - 0.7808) = \frac{1}{3} (-1.2494 - 0.7808) = \frac{-2.0302}{3} \approx -0.6767$
    So, $y_3 \approx \begin{pmatrix} 0.7288 \\ -0.6767 \end{pmatrix}$.

2.  **Compute $||y_3||_2$**:
    $$||y_3||_2 = \sqrt{0.7288^2 + (-0.6767)^2} = \sqrt{0.5312 + 0.4579} = \sqrt{0.9891} \approx 0.9945$$

3.  **Normalize $x_3 = y_3 / ||y_3||_2$**:
    $$x_3 = \frac{1}{0.9945} \begin{pmatrix} 0.7288 \\ -0.6767 \end{pmatrix} \approx \begin{pmatrix} 0.7328 \\ -0.68