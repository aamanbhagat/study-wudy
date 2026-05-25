## What it is
The matrix method is a technique for solving systems of coupled, first-order, linear ordinary differential equations with constant coefficients. It transforms the system of scalar equations into a single vector equation, $\vec{x}' = A\vec{x}$, which is then solved using the eigenvalues and eigenvectors of the matrix $A$. This converts a calculus problem into a linear algebra problem.

## Why it matters
This method is fundamental to modeling any system where multiple states influence each other's rate of change. In aerospace, it's used to analyze the vibrational modes of a rocket frame or satellite, where the motion of one part is coupled to others. In control theory, it's the foundation of state-space representation, which is essential for designing guidance and control systems for spacecraft and aircraft.

## When to study it
Before tackling this, you must have a firm grasp of two areas:
1.  **Ordinary Differential Equations:** Solving single first-order linear equations ($y' + p(t)y = g(t)$) and second-order homogeneous linear equations with constant coefficients ($ay'' + by' + cy = 0$). The concept of a characteristic equation is a direct precursor.
2.  **Linear Algebra:** You must be proficient in finding eigenvalues and eigenvectors for a square matrix. Without this, the method is impossible. Also required are matrix multiplication, determinants, and solving systems of linear equations.

If you are not confident in finding eigenvalues and eigenvectors, stop and review that topic first.

## How to study it (step by step)
1.  **Translate:** Take a given system of scalar ODEs (e.g., $x_1' = ax_1 + bx_2$, $x_2' = cx_1 + dx_2$) and practice writing it in matrix form $\vec{x}' = A\vec{x}$. Do this until it's second nature.
2.  **Master the Core Case:** Find a textbook chapter on this topic and solve 3-5 problems where the matrix $A$ has distinct, real eigenvalues. This is the simplest and most common case. Focus on the process: find $\lambda$s, find corresponding $\vec{v}$s, write the general solution.
3.  **Complex Eigenvalues:** Solve 2-3 problems where the eigenvalues are a complex conjugate pair. The process is similar, but requires using Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$) to extract two real-valued solutions from one complex solution.
4.  **Repeated Eigenvalues:** Solve 1-2 problems with repeated eigenvalues. This is the most complex case, often requiring the concept of a "generalized eigenvector." Understand that this case corresponds to a "shearing" behavior in the system's dynamics.
5.  **Connect to the Matrix Exponential:** Read about the formal solution $\vec{x}(t) = e^{At}\vec{x}(0)$. Understand that the eigenvalue method is a practical algorithm for computing the action of the matrix exponential without having to sum the infinite series definition.

## Key ideas, with intuition
1.  **Analogy to $x' = ax$**: A single first-order linear ODE $x' = ax$ has the solution $x(t) = C e^{at}$. We are looking for a vector analogue. We guess a solution of the form $\vec{x}(t) = \vec{v}e^{\lambda t}$, where $\vec{v}$ is a constant vector and $\lambda$ is a scalar. This is the core ansatz.

2.  **Eigenvectors are the "Axes of Motion"**: When we substitute our guess $\vec{x}(t) = \vec{v}e^{\lambda t}$ into the system $\vec{x}' = A\vec{x}$, we get $\lambda \vec{v} e^{\lambda t} = A \vec{v} e^{\lambda t}$, which simplifies to the fundamental eigenvalue problem:
    $$A\vec{v} = \lambda\vec{v}$$
    This equation means that for the special direction defined by the eigenvector $\vec{v}$, the action of the matrix $A$ is simple multiplication by the scalar $\lambda$. A solution that starts on an eigenvector stays on the line defined by that eigenvector for all time, either growing ($\lambda > 0$) or decaying ($\lambda < 0$) along it.

3.  **Superposition builds the General Solution**: For a 2x2 system with two distinct real eigenvalues $\lambda_1, \lambda_2$ and corresponding eigenvectors $\vec{v}_1, \vec{v}_2$, we have two "straight-line" solutions: $\vec{x}_1(t) = \vec{v}_1 e^{\lambda_1 t}$ and $\vec{x}_2(t) = \vec{v}_2 e^{\lambda_2 t}$. Since the system is linear, any linear combination of solutions is also a solution. Thus, the general solution is:
    $$\vec{x}(t) = c_1 \vec{v}_1 e^{\lambda_1 t} + c_2 \vec{v}_2 e^{\lambda_2 t}$$
    The constants $c_1$ and $c_2$ are determined by the initial conditions. This means any initial state can be decomposed into its components along the "axes of motion" (the eigenvectors), and each component evolves independently before being summed back up.

## Worked example
Solve the initial value problem:
$$
\begin{cases}
x_1' = x_1 + x_2 \\
x_2' = 4x_1 + x_2
\end{cases}
\quad \text{with} \quad \vec{x}(0) = \begin{pmatrix} 1 \\ 0 \end{pmatrix}
$$

**Step 1: Write in matrix form.**
Let $\vec{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$. The system is $\vec{x}' = \begin{pmatrix} 1 & 1 \\ 4 & 1 \end{pmatrix} \vec{x}$. So, $A = \begin{pmatrix} 1 & 1 \\ 4 & 1 \end{pmatrix}$.

**Step 2: Find eigenvalues of A.**
We solve the characteristic equation $\det(A - \lambda I) = 0$.
$$
\det \begin{pmatrix} 1-\lambda & 1 \\ 4 & 1-\lambda \end{pmatrix} = (1-\lambda)^2 - 4 = 0
$$
$$
\lambda^2 - 2\lambda + 1 - 4 = 0 \implies \lambda^2 - 2\lambda - 3 = 0
$$
$$
(\lambda-3)(\lambda+1) = 0
$$
The eigenvalues are $\lambda_1 = 3$ and $\lambda_2 = -1$.

**Step 3: Find corresponding eigenvectors.**
For $\lambda_1 = 3$: Solve $(A - 3I)\vec{v}_1 = \vec{0}$.
$$
\begin{pmatrix} 1-3 & 1 \\ 4 & 1-3 \end{pmatrix} \begin{pmatrix} v_{11} \\ v_{12} \end{pmatrix} = \begin{pmatrix} -2 & 1 \\ 4 & -2 \end{pmatrix} \begin{pmatrix} v_{11} \\ v_{12} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
This gives the equation $-2v_{11} + v_{12} = 0$, so $v_{12} = 2v_{11}$. We can choose $v_{11}=1$, which gives $\vec{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.

For $\lambda_2 = -1$: Solve $(A - (-1)I)\vec{v}_2 = \vec{0}$.
$$
\begin{pmatrix} 1-(-1) & 1 \\ 4 & 1-(-1) \end{pmatrix} \begin{pmatrix} v_{21} \\ v_{22} \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 4 & 2 \end{pmatrix} \begin{pmatrix} v_{21} \\ v_{22} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
This gives the equation $2v_{21} + v_{22} = 0$, so $v_{22} = -2v_{21}$. We can choose $v_{21}=1$, which gives $\vec{v}_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$.

**Step 4: Write the general solution.**
The general solution is a linear combination of the two solutions we found.
$$
\vec{x}(t) = c_1 e^{\lambda_1 t} \vec{v}_1 + c_2 e^{\lambda_2 t} \vec{v}_2 = c_1 e^{3t} \begin{pmatrix} 1 \\ 2 \end{pmatrix} + c_2 e^{-t} \begin{pmatrix} 1 \\ -2 \end{pmatrix}
$$

**Step 5: Apply the initial condition.**
Set $t=0$ and use $\vec{x}(0) = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
$$
\vec{x}(0) = c_1 e^0 \begin{pmatrix} 1 \\ 2 \end{pmatrix} + c_2 e^0 \begin{pmatrix} 1 \\ -2 \end{pmatrix} = c_1 \begin{pmatrix} 1 \\ 2 \end{pmatrix} + c_2 \begin{pmatrix} 1 \\ -2 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}
$$
This gives a system of linear equations for $c_1, c_2$:
$c_1 + c_2 = 1$
$2c_1 - 2c_2 = 0 \implies c_1 = c_2$
Substituting $c_1=c_2$ into the first equation gives $2c_1 = 1$, so $c_1 = c_2 = 1/2$.

**Step 6: Write the final solution.**
$$
\vec{x}(t) = \frac{1}{2} e^{3t} \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \frac{1}{2} e^{-t} \begin{pmatrix} 1 \\ -2 \end{pmatrix}
$$

**Reflection:** Each step had a clear purpose. We converted the system to a matrix problem (Step 1), found the "growth rates" (eigenvalues, Step 2) and "axes of motion" (eigenvectors, Step 3), constructed the general solution as a superposition (Step 4), and then used the initial condition to find the specific combination for our trajectory (Step 5), yielding the final answer (Step 6).

## Diagrams
This diagram shows the phase portrait for the worked example. The axes are $x_1$ and $x_2$. The two lines are the directions of the eigenvectors $\vec{v}_1$ and $\vec{v}_2$. Since $\lambda_1=3 > 0$, trajectories move *away* from the origin along the $\vec{v}_1$ direction. Since $\lambda_2=-1 < 0$, trajectories move *toward* the origin along the $\vec{v}_2$ direction. This type of equilibrium point is called a **saddle point**.

```text
      x2
      ^
      |
  v1  |
   \  |       /
    \ |      /
     \|     /
<-----\----/----------------> x1
       \  /|
        \/ |
        /  |  \
       /   |   v2
      /    |
```
*   The line with positive slope is the eigenvector $\vec{v}_1 = (1, 2)^T$. Arrows on it point away from the origin.
*   The line with negative slope is the eigenvector $\vec{v}_2 = (1, -2)^T$. Arrows on it point toward the origin.
*   Other solution curves (not drawn) are hyperbolas that approach the origin along the $\vec{v}_2$ direction and then are flung away along the $\vec{v}_1$ direction.

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of the matrix $A$ as a distorted map of a city. The eigenvectors are the city's perfectly straight "boulevards". If you start on a boulevard, you only travel along that boulevard. The eigenvalue is your speed limit on that boulevard: positive means you speed up away from the city center (the origin), negative means you slow down towards it. Any other starting point is just some combination of being on different boulevards, so your path is a combination of those straight-line motions. Your job is to find the boulevards ($\vec{v}$) and the speed limits ($\lambda$).

2.  **Must-Know Formulas:**
    *   The system: $\vec{x}' = A\vec{x}$
    *   The eigenvalue problem: $A\vec{v} = \lambda\vec{v}$
    *   The general solution (distinct real $\lambda_i$): $\vec{x}(t) = \sum_{i=1}^{n} c_i e^{\lambda_i t} \vec{v}_i$

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-work the example from this lesson without looking at the solution.
    *   Day 3: Solve a new 2x2 problem with distinct real eigenvalues.
    *   Day 7: Solve a 2x2 problem with complex eigenvalues.
    *   Day 16: Re-derive the eigenvalue equation from the ansatz $\vec{x} = \vec{v}e^{\lambda t}$.
    *   Day 35: Solve a 3x3 problem.

4.  **First Principles Pathway:** If you forget everything, remember the guess.
    *   Start with the form of the single-variable solution: $e^{\text{something} \cdot t}$.
    *   The vector version must be $\vec{x}(t) = \vec{v}e^{\lambda t}$.
    *   Differentiate it: $\vec{x}'(t) = \lambda \vec{v} e^{\lambda t}$.
    *   Substitute into the original ODE: $\lambda \vec{v} e^{\lambda t} = A (\vec{v} e^{\lambda t})$.
    *   Since $e^{\lambda t}$ is a non-zero scalar, it can be cancelled. This leaves you with $\lambda \vec{v} = A \vec{v}$. You have just re-derived the eigenvalue problem from scratch. The rest is a standard linear algebra calculation.

## Common mistakes
1.  **Eigenvector Calculation Errors:** When solving $(A - \lambda I)\vec{v} = \vec{0}$, the rows of the matrix $(A - \lambda I)$ must be linearly dependent. If they are not, you have made a mistake in calculating $\lambda$. Do not try to find an inverse; the only solution would be $\vec{v}=\vec{0}$, which is never an eigenvector.
2.  **Incorrect General Solution Form:** Writing something like $\vec{x}(t) = c_1 e^{\lambda_1 t} + c_2 e^{\lambda_2 t}$ without the eigenvectors. The solution is a vector; it must be a sum of vectors.
3.  **Complex Eigenvalue Confusion:** For a complex eigenvalue $\lambda = \alpha + i\beta$ with eigenvector $\vec{v}$, the solution is $e^{\lambda t}\vec{v}$. Students often forget to use Euler's formula to expand $e^{(\alpha+i\beta)t} = e^{\alpha t}(\cos(\beta t) + i\sin(\beta t))$ and then take the real and imaginary parts of the full vector expression to get the two real solutions.

## Self-check
1.  Solve $\vec{x}' = \begin{pmatrix} 5 & -1 \\ 3 & 1 \end{pmatrix} \vec{x}$ with $\vec{x}(0) = \begin{pmatrix} 2 \\ -1 \end{pmatrix}$.
2.  Find the general solution for $\vec{x}' = \begin{pmatrix} 1 & -5 \\ 1 & -3 \end{pmatrix} \vec{x}$. What kind of motion does this system exhibit around the origin?
3.  Given a 3x3 matrix $A$ with eigenvalues $\lambda_1 = -2$, $\lambda_2 = -1$, $\lambda_3 = 1$ and corresponding eigenvectors $\vec{v}_1, \vec{v}_2, \vec{v}_3$. If the initial condition is $\vec{x}(0) = 5\vec{v}_1 - 2\vec{v}_2$, what is the solution $\vec{x}(t)$? What happens to the solution as $t \to \infty$?