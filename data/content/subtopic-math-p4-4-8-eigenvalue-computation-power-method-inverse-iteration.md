## What it is
The Power Method and Inverse Iteration are iterative numerical algorithms used to find eigenvalues and eigenvectors of a matrix. The Power Method finds the eigenvalue with the largest absolute value (the "dominant" eigenvalue), while Inverse Iteration finds the eigenvalue with the smallest absolute value.

## Why it matters
For large matrices, finding the characteristic polynomial and its roots is computationally impossible. These iterative methods are essential.
- **Physics & Rocket Science:** They are used to find the principal modes of vibration in a structure, like a rocket body or a satellite. The smallest eigenvalue often corresponds to the fundamental frequency, the most critical mode for structural integrity and resonance analysis.
- **Computer Science:** Google's original PageRank algorithm is a massive eigenvalue problem solved with a variant of the Power Method. In Machine Learning, Principal Component Analysis (PCA) finds the dominant eigenvectors of a covariance matrix to perform dimensionality reduction.

## When to study it
Before tackling this, you must have a firm grasp of core Linear Algebra concepts.
- **Eigenvalues and Eigenvectors:** The definition $Av = \lambda v$ must be second nature.
- **Linear Independence and Basis:** You must understand that for a non-defective $n \times n$ matrix, its eigenvectors form a basis for $\mathbb{R}^n$. This is the theoretical cornerstone of the method.
- **Vector Norms:** You need to be comfortable with vector norms (e.g., $L_2$ norm $\|x\|_2 = \sqrt{\sum x_i^2}$ or $L_\infty$ norm $\|x\|_\infty = \max_i |x_i|$) as they are used for normalization.

If you are shaky on why eigenvectors can form a basis, review that topic first. Hand-waving here will make the derivation opaque.

## How to study it (step by step)
1.  **Derive the Power Method.** Start with an arbitrary non-zero vector $x_0$. Since the eigenvectors $v_1, v_2, \dots, v_n$ of matrix $A$ form a basis, we can write $x_0 = c_1 v_1 + c_2 v_2 + \dots + c_n v_n$. Now, compute $A x_0$, then $A^2 x_0$, and finally $A^k x_0$. Observe how the term corresponding to the dominant eigenvalue $\lambda_1$ grows much faster than the others.
2.  **Formalize the Algorithm.** From the derivation, abstract the iterative process. You start with a guess $x_0$, compute $y_1 = A x_0$, then normalize to get the next guess $x_1 = y_1 / \|y_1\|$. Repeat this: $x_{k+1} = A x_k / \|A x_k\|$. The scaling factor $\|A x_k\|$ will converge to $|\lambda_1|$.
3.  **Understand Inverse Iteration.** Ask yourself: "How can I use a method that finds the *largest* eigenvalue to find the *smallest*?" Recall that if $A$ has eigenvalues $\lambda_i$, its inverse $A^{-1}$ has eigenvalues $1/\lambda_i$. The smallest $\lambda_i$ corresponds to the largest $1/\lambda_i$. Therefore, applying the Power Method to $A^{-1}$ finds the smallest eigenvalue of $A$.
4.  **Connect Inverse Iteration to Linear Systems.** Calculating $A^{-1}$ is computationally expensive. Notice that the core step of the Power Method on $A^{-1}$, which is $x_{k+1} = A^{-1} x_k$, can be rewritten as $A x_{k+1} = x_k$. This is a system of linear equations, which can be solved efficiently using methods like LU decomposition. This is a crucial practical optimization.
5.  **Generalize with the Shifted Inverse Method.** Consider the matrix $(A - \sigma I)$. Its eigenvalues are $\lambda_i - \sigma$. The inverse, $(A - \sigma I)^{-1}$, has eigenvalues $1/(\lambda_i - \sigma)$. By choosing a "shift" $\sigma$ close to a desired eigenvalue $\lambda_j$, you make $1/(\lambda_j - \sigma)$ enormous, turning it into the dominant eigenvalue of the shifted matrix. This allows you to find any eigenvalue, provided you have a rough estimate of its value.

## Key ideas, with intuition
1.  **Dominant Eigen-direction Amplification:** Imagine any vector as a mix of ingredients (the eigenvectors). Repeatedly applying matrix $A$ is like a process that amplifies the "strongest" ingredient (the dominant eigenvector $v_1$) at each step. After many steps, the resulting vector is almost pure $v_1$. All other components have faded into relative insignificance.

2.  **Normalization Isolates Direction:** Without normalization, the vector $A^k x_0$ would grow or shrink exponentially, leading to numerical overflow or underflow. By dividing by the norm at each step, we discard the magnitude information (which is converging to the eigenvalue) and keep only the direction vector. This forces the sequence of vectors to converge to the eigenvector itself.
    $$ x_{k+1} = \frac{A x_k}{\|A x_k\|} $$
    The vector $x_{k+1}$ is a unit vector pointing in the direction of $Ax_k$. The scaling factor we divide by, $\|A x_k\|$, is our estimate for the dominant eigenvalue's magnitude, $|\lambda_1|$.

3.  **The Inverse Flips the Spectrum:** The core idea of inverse iteration is simple: small becomes large and large becomes small. If the eigenvalues of $A$ are $\{100, 2, 0.1\}$, the eigenvalues of $A^{-1}$ are $\{0.01, 0.5, 10\}$. Applying the Power Method to $A^{-1}$ will find the dominant eigenvalue, 10, which corresponds to the smallest eigenvalue of $A$, 0.1.

4.  **Shifting as a Targeting System:** The shifted inverse method, using $(A - \sigma I)^{-1}$, is like tuning a radio. The shift $\sigma$ is the frequency you're tuning to. If you set $\sigma$ very close to an eigenvalue $\lambda_j$, the term $1/(\lambda_j - \sigma)$ becomes huge, creating a massive "signal" at that frequency. The Power Method then locks onto this artificially amplified signal, allowing you to precisely find the eigenvalue $\lambda_j$.

## Worked example
Let's find the dominant eigenvalue and eigenvector of $A = \begin{pmatrix} 0 & 1 \\ -2 & 3 \end{pmatrix}$ using the Power Method.
The true eigenvalues are $\lambda=1, 2$. The dominant eigenvalue is $\lambda_1 = 2$.

**Initialization:**
Choose an initial vector, for instance, $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

**Iteration 1:**
-   Calculate $y_1 = A x_0 = \begin{pmatrix} 0 & 1 \\ -2 & 3 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ -2 \end{pmatrix}$.
-   The magnitude (our eigenvalue estimate) is $\lambda^{(1)} = \|y_1\|_{\infty} = |-2| = 2$.
-   Normalize to get the next vector: $x_1 = \frac{y_1}{\lambda^{(1)}} = \frac{1}{2} \begin{pmatrix} 0 \\ -2 \end{pmatrix} = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$. Note: We could have used $-2$ as the scaling factor, which is common. Let's stick to the positive norm for clarity.

**Iteration 2:**
-   Calculate $y_2 = A x_1 = \begin{pmatrix} 0 & 1 \\ -2 & 3 \end{pmatrix} \begin{pmatrix} 0 \\ -1 \end{pmatrix} = \begin{pmatrix} -1 \\ -3 \end{pmatrix}$.
-   The magnitude is $\lambda^{(2)} = \|y_2\|_{\infty} = |-3| = 3$.
-   Normalize: $x_2 = \frac{y_2}{\lambda^{(2)}} = \frac{1}{3} \begin{pmatrix} -1 \\ -3 \end{pmatrix} = \begin{pmatrix} -1/3 \\ -1 \end{pmatrix} \approx \begin{pmatrix} -0.333 \\ -1 \end{pmatrix}$.

**Iteration 3:**
-   Calculate $y_3 = A x_2 = \begin{pmatrix} 0 & 1 \\ -2 & 3 \end{pmatrix} \begin{pmatrix} -1/3 \\ -1 \end{pmatrix} = \begin{pmatrix} -1 \\ 2/3 - 3 \end{pmatrix} = \begin{pmatrix} -1 \\ -7/3 \end{pmatrix}$.
-   The magnitude is $\lambda^{(3)} = \|y_3\|_{\infty} = |-7/3| \approx 2.333$.
-   Normalize: $x_3 = \frac{y_3}{\lambda^{(3)}} = \frac{1}{7/3} \begin{pmatrix} -1 \\ -7/3 \end{pmatrix} = \begin{pmatrix} -3/7 \\ -1 \end{pmatrix} \approx \begin{pmatrix} -0.429 \\ -1 \end{pmatrix}$.

**Reflection:**
-   The eigenvalue estimates are $\lambda^{(1)}=2, \lambda^{(2)}=3, \lambda^{(3)} \approx 2.333$. They are converging towards the true dominant eigenvalue, $\lambda_1 = 2$. The sign is often determined by observing the scaling factor directly rather than its norm. For example, in step 2, if we had used $-3$ as the scaling factor, our next vector would be $\begin{pmatrix} 1/3 \\ 1 \end{pmatrix}$. The key is consistency.
-   The eigenvector estimates are $x_1=\begin{pmatrix} 0 \\ -1 \end{pmatrix}, x_2=\begin{pmatrix} -0.333 \\ -1 \end{pmatrix}, x_3=\begin{pmatrix} -0.429 \\ -1 \end{pmatrix}$. These are converging towards the true eigenvector for $\lambda=2$, which is a multiple of $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$, or equivalently, $\begin{pmatrix} 0.5 \\ 1 \end{pmatrix}$ or $\begin{pmatrix} -0.5 \\ -1 \end{pmatrix}$. Our estimate is approaching $\begin{pmatrix} -0.5 \\ -1 \end{pmatrix}$.
-   Each step worked by applying $A$ to amplify the dominant eigen-direction and then normalizing to prevent numerical overflow and isolate that direction.

## Diagrams
This ASCII diagram illustrates two steps of the Power Method. The vector $x_k$ is multiplied by $A$, resulting in a longer vector $y_{k+1}$ that is also rotated closer to the direction of the dominant eigenvector $v_1$. Normalization then scales it back to the unit circle to get $x_{k+1}$, ready for the next iteration.

```text
       ^ y-axis
       |
       |           v_1 (dominant eigenvector direction)
       |          /
       |         /
       |        /
       |       * y_{k+1} = A*x_k
       |      /
       |     /
       |    /
       |   * x_{k+1}
       |  / \
       | /   \
       |* x_k  \
       +------------> x-axis
      /
     / (unit circle)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    Imagine a noisy room with people talking at different volumes.
    -   **Power Method:** You repeatedly record the sound in the room and play it back, slightly amplified (`Apply A`). The loudest person's voice (the dominant eigenvalue's eigenvector) will quickly drown out everyone else. Normalizing is adjusting the master volume so it doesn't blow the speakers.
    -   **Inverse Iteration:** You use a special filter that inverts the sound, making quiet sounds loud and loud sounds quiet (`Apply A^{-1}`). Now, when you do the same record-and-amplify process, you isolate the originally quietest person (the smallest eigenvalue's eigenvector).

2.  **Must-Know Formulas:**
    -   Power Method Iteration: $$x_{k+1} = \frac{A x_k}{\|A x_k\|}$$
    -   Inverse Iteration (practical form): Solve $$A x_{k+1} = x_k$$ for $x_{k+1}$, then normalize.

3.  **Spaced Repetition Schedule:**
    Review this material (re-derive the method, do one example) at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    If you forget everything, rebuild it from here:
    -   Any vector $x_0$ can be written as a sum of eigenvectors: $x_0 = \sum_{i=1}^n c_i v_i$.
    -   What is $A^k x_0$? It's $A^k(\sum c_i v_i) = \sum c_i A^k v_i = \sum c_i \lambda_i^k v_i$.
    -   $A^k x_0 = c_1 \lambda_1^k v_1 + c_2 \lambda_2^k v_2 + \dots$.
    -   Factor out the largest term: $A^k x_0 = \lambda_1^k \left( c_1 v_1 + c_2 \left(\frac{\lambda_2}{\lambda_1}\right)^k v_2 + \dots \right)$.
    -   Since $|\lambda_1| > |\lambda_i|$ for $i>1$, the terms $(\lambda_i/\lambda_1)^k \to 0$ as $k \to \infty$.
    -   Therefore, for large $k$, $A^k x_0 \approx \lambda_1^k c_1 v_1$. The direction of the vector aligns with $v_1$.

## Common mistakes
1.  **Forgetting to Normalize:** If you compute $x_{k+1} = A x_k$ without dividing by the norm, the vector's components will either grow to infinity (overflow) or shrink to zero (underflow), destroying the calculation.
2.  **Incorrect Eigenvalue Estimate:** The eigenvalue estimate is the scaling factor you divide by at each step (e.g., the norm of $Ax_k$). A common mistake is to report the norm of the final eigenvector $x_k$ (which is 1) as the eigenvalue.
3.  **Initial Vector Choice:** If your initial vector $x_0$ is by chance orthogonal to the dominant eigenvector $v_1$, then its coefficient $c_1$ is zero. The method will then converge to the *next* dominant eigenvalue. In practice, rounding errors usually introduce a small $c_1$ component, but convergence will be very slow.
4.  **Complex or Equal-Magnitude Eigenvalues:** The basic Power Method fails if the dominant eigenvalue is not unique, for instance, if $\lambda_1 = 5$ and $\lambda_2 = -5$. The vector will oscillate and never converge. It also has issues with complex-conjugate dominant eigenvalues.

## Self-check
1.  Perform two iterations of the Power Method for the matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$ with starting vector $x_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
2.  The Power Method will fail to converge for the matrix $A = \begin{pmatrix} 1 & -2 \\ 1 & -1 \end{pmatrix}$. By considering the eigenvalues of this matrix, explain precisely why.
3.  You are analyzing the vibration of a bridge and need to find its fundamental frequency, which corresponds to the smallest non-zero eigenvalue of a very large, sparse matrix $A$. You know this frequency is somewhere near $\sigma = 0.1$. Describe the exact numerical algorithm you would use, including the key equation to be solved at each step.