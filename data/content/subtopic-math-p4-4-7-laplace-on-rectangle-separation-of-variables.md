## What it is
Solving Laplace's equation, $\nabla^2 u = 0$, on a rectangular domain is the archetypal problem for the method of **separation of variables**. This technique finds the steady-state value of a quantity $u(x,y)$ (like temperature or electric potential) inside a rectangle, given its fixed values on the four boundary edges. The core idea is to break the single partial differential equation (PDE) into two simpler ordinary differential equations (ODEs), solve them, and combine the results to satisfy the boundary conditions.

## Why it matters
This problem is a cornerstone of mathematical physics and engineering. It models steady-state heat conduction in a plate, electrostatic potential in a 2D region, and ideal fluid flow. Understanding this method is critical because separation of variables is the primary analytical tool for solving linear PDEs on simple domains (rectangles, circles, cylinders), which forms the basis for analyzing wave propagation, heat transfer, and quantum mechanics.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Partial Derivatives:** The definition and calculation of $u_{xx}$ and $u_{yy}$.
*   **Second-Order Linear ODEs:** You must be able to solve equations of the form $y'' + ky = 0$ and $y'' - ky = 0$ without hesitation. This includes knowing when solutions are sines/cosines versus exponentials/hyperbolic functions.
*   **Fourier Series:** This is non-negotiable. The final step of the solution relies entirely on representing a boundary condition as a Fourier series. You must understand orthogonality and the formula for calculating Fourier coefficients.
*   **Linearity and Superposition:** The principle that if $u_1$ and $u_2$ are solutions to a linear homogeneous PDE, then $c_1 u_1 + c_2 u_2$ is also a solution.

If any of these are weak, master them first. This topic integrates all of them.

## How to study it (step by step)
1.  **Set up the problem.** Write down Laplace's equation $\nabla^2 u = u_{xx} + u_{yy} = 0$ on a rectangle $[0, L] \times [0, H]$. For simplicity, start with three "homogeneous" (zero) boundary conditions and one "non-homogeneous" (non-zero) boundary condition. Example: $u(0,y)=0$, $u(L,y)=0$, $u(x,0)=0$, and $u(x,H)=f(x)$.
2.  **Assume a separated solution.** Postulate a solution of the form $u(x,y) = X(x)Y(y)$, where $X$ is a function of $x$ only and $Y$ is a function of $y$ only. Substitute this into the PDE.
3.  **Separate the variables.** Differentiate $u(x,y) = X(x)Y(y)$ to get $X''(x)Y(y) + X(x)Y''(y) = 0$. Divide the entire equation by $X(x)Y(y)$ to isolate the variables: $\frac{X''(x)}{X(x)} = -\frac{Y''(y)}{Y(y)}$.
4.  **Introduce the separation constant.** The left side depends only on $x$ and the right side only on $y$. The only way they can be equal for all $(x,y)$ is if they are both equal to a constant. Call this constant $-\lambda$. This gives two ODEs: $X'' + \lambda X = 0$ and $Y'' - \lambda Y = 0$.
5.  **Solve the eigenvalue problem.** Use the homogeneous boundary conditions to find the allowed values (eigenvalues) of $\lambda$. For example, $u(0,y)=X(0)Y(y)=0 \implies X(0)=0$, and $u(L,y)=X(L)Y(y)=0 \implies X(L)=0$. Solving $X'' + \lambda X = 0$ with $X(0)=X(L)=0$ forces $\lambda_n = (n\pi/L)^2$ for $n=1, 2, ...$ and yields solutions (eigenfunctions) $X_n(x) = \sin(n\pi x/L)$.
6.  **Solve the other ODE.** For each $\lambda_n$, solve the corresponding ODE for $Y(y)$, which is now $Y_n'' - (n\pi/L)^2 Y_n = 0$. The general solution involves $\cosh$ and $\sinh$. Apply the remaining homogeneous boundary condition (e.g., $u(x,0)=0 \implies Y(0)=0$) to simplify this solution.
7.  **Construct the general solution and match the final boundary condition.** Use superposition to write the full solution as an infinite series: $u(x,y) = \sum_{n=1}^\infty c_n u_n(x,y) = \sum_{n=1}^\infty c_n X_n(x)Y_n(y)$. Finally, set $y=H$ and equate the series to the last boundary condition, $f(x)$. This will be a Fourier series, and you can solve for the coefficients $c_n$ using the standard integral formula.

## Key ideas, with intuition
1.  **Separation of Variables: Turning one hard problem into two easy ones.** The assumption $u(x,y) = X(x)Y(y)$ is a powerful guess. It works because it transforms the interconnected rates of change in the PDE into two independent ODEs. The intuition is that the fundamental "modes" of the system can be expressed as products of functions of one variable each, like the vibrations of a rectangular drumhead.
2.  **The Separation Constant $\lambda$: The communication link.** The constant $\lambda$ connects the two ODEs. It has a physical meaning: its sign determines the character of the solution.
    *   If $\lambda > 0$, $X(x)$ is oscillatory ($\sin, \cos$). This is required to satisfy boundary conditions that are zero at two different points (like $X(0)=0, X(L)=0$).
    *   If $\lambda < 0$, $X(x)$ is exponential ($e^{kx}, e^{-kx}$).
    *   The choice of which direction gets the oscillatory solution is dictated by where the homogeneous (zero) boundary conditions are. The direction with two zero-BCs gets the sines/cosines.
3.  **Eigenvalues and Eigenfunctions: The only shapes that fit.** The homogeneous boundary conditions act as constraints. Not just any sine wave will work for $X(x)$; only those that are zero at $x=0$ and $x=L$ are allowed. This quantizes the separation constant into a discrete set of eigenvalues $\lambda_n = (n\pi/L)^2$. The corresponding solutions $X_n(x) = \sin(n\pi x/L)$ are the eigenfunctions, the "natural" shapes that fit the boundary constraints.
    $$X'' + \lambda X = 0, \quad X(0)=0, \quad X(L)=0 \quad \implies \quad \lambda_n = \left(\frac{n\pi}{L}\right)^2, \quad n \in \{1, 2, 3, ...\}$$
4.  **Superposition and Fourier Series: Building complexity from simplicity.** The PDE is linear, so we can add simple solutions to get a more complex one. The final solution is an infinite sum of our simple product solutions $X_n(x)Y_n(y)$. This sum is precisely a Fourier series. We use the power of Fourier analysis to find the coefficients that make this series match the last, non-homogeneous boundary condition. It's like building a complex musical chord (the boundary function $f(x)$) out of pure tones (the eigenfunctions $\sin(n\pi x/L)$).

## Worked example
**Problem:** Solve Laplace's equation $\nabla^2 u = 0$ on the rectangle defined by $0 \le x \le L$ and $0 \le y \le H$, with the following boundary conditions:
1.  $u(0, y) = 0$
2.  $u(L, y) = 0$
3.  $u(x, 0) = 0$
4.  $u(x, H) = f(x)$

**Solution:**

1.  **Assume and Separate:** Let $u(x,y) = X(x)Y(y)$. Plugging into $u_{xx} + u_{yy} = 0$ gives $X''Y + XY'' = 0$. Dividing by $XY$ yields $\frac{X''}{X} = -\frac{Y''}{Y} = -\lambda$. This gives two ODEs:
    *   $X'' + \lambda X = 0$
    *   $Y'' - \lambda Y = 0$

2.  **Solve for $X(x)$:** The boundary conditions on $x$ are $u(0,y)=0 \implies X(0)=0$ and $u(L,y)=0 \implies X(L)=0$.
    *   If $\lambda \le 0$, the only solution to $X''+\lambda X=0$ with these BCs is the trivial solution $X(x)=0$. This is not useful.
    *   We must have $\lambda > 0$. Let $\lambda = k^2$. The ODE is $X'' + k^2 X = 0$, with general solution $X(x) = A\cos(kx) + B\sin(kx)$.
    *   $X(0)=0 \implies A\cos(0) + B\sin(0) = A = 0$.
    *   $X(L)=0 \implies B\sin(kL) = 0$. We need $B\ne 0$ for a non-trivial solution, so $\sin(kL)=0$. This means $kL = n\pi$ for $n=1, 2, 3, ...$.
    *   The eigenvalues are $\lambda_n = k_n^2 = (\frac{n\pi}{L})^2$.
    *   The eigenfunctions are $X_n(x) = \sin(\frac{n\pi x}{L})$. (We absorb the constant $B$ into the final coefficient).

3.  **Solve for $Y(y)$:** For each $\lambda_n$, the ODE for $Y$ is $Y'' - (\frac{n\pi}{L})^2 Y = 0$.
    *   The general solution is $Y_n(y) = C_n \cosh(\frac{n\pi y}{L}) + D_n \sinh(\frac{n\pi y}{L})$.
    *   Apply the third BC: $u(x,0)=0 \implies Y(0)=0$.
    *   $Y_n(0) = C_n \cosh(0) + D_n \sinh(0) = C_n \cdot 1 + D_n \cdot 0 = C_n = 0$.
    *   So, the solution for $Y$ is $Y_n(y) = D_n \sinh(\frac{n\pi y}{L})$.

4.  **Superpose and Match Final BC:** Combine the solutions $X_n$ and $Y_n$ and sum them up. Let the final coefficient be $B_n = D_n$.
    $$u(x,y) = \sum_{n=1}^\infty B_n X_n(x) Y_n(y) = \sum_{n=1}^\infty B_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi y}{L}\right)$$
    Now, apply the last BC, $u(x,H) = f(x)$:
    $$f(x) = \sum_{n=1}^\infty B_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi H}{L}\right)$$
    This is a Fourier sine series for $f(x)$. The coefficient of the sine term is the whole expression $B_n \sinh(\frac{n\pi H}{L})$. From the formula for Fourier sine coefficients:
    $$B_n \sinh\left(\frac{n\pi H}{L}\right) = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
    Solving for our unknown coefficient $B_n$:
    $$B_n = \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$

**Reflection:** The process systematically incorporated each piece of information. The PDE's structure allowed separation. The three homogeneous BCs constrained the separated solutions into a specific family of functions (sines and sinhs). The principle of superposition allowed us to build a general solution. The final non-homogeneous BC provided the specific weights for each simple solution via the machinery of Fourier series.

## Diagrams

A diagram of the rectangular domain and its boundary conditions.

```text
      y
      ^
      |
 H    +--------------------------------+ u(x,H) = f(x)
      |                                |
      |                                |
      | u(0,y)=0                       | u(L,y)=0
      |                                |
      |                                |
 0    +--------------------------------+--> x
      0         u(x,0) = 0             L
```

## Memory technique — remember this forever
1.  **The Story: "Separate, Constrain, Superpose, Match"**
    *   **Separate:** See $u_{xx}+u_{yy}=0$ on a rectangle? Immediately assume $u=X(x)Y(y)$ and separate it into two ODEs linked by $\lambda$.
    *   **Constrain:** Use the three zero-boundary conditions to kill constants and find the eigenvalues ($\lambda_n$) and eigenfunctions (the sines or cosines). This builds your "Lego bricks".
    *   **Superpose:** Build the general solution by summing all the Lego bricks: $\sum c_n X_n Y_n$.
    *   **Match:** Use the last, non-zero boundary condition to determine the coefficients $c_n$. This step is always a Fourier series calculation.

2.  **Must-Know Formulas:**
    *   Laplace's Equation: $\nabla^2 u = u_{xx} + u_{yy} = 0$
    *   The Separated ODEs: $X'' + \lambda X = 0$ and $Y'' - \lambda Y = 0$
    *   Fourier Sine Coefficient for $f(x)$ on $[0, L]$: $c_n = \frac{2}{L} \int_0^L f(x) \sin(\frac{n\pi x}{L}) dx$

3.  **Spaced Repetition Schedule:**
    *   Redo the worked example from scratch in **1 day**.
    *   Solve a new problem with a non-zero BC on a different side in **3 days**.
    *   Derive the general case again in **7 days**.
    *   Explain the "why" of each step to a friend (or a rubber duck) in **16 days**.
    *   Solve a problem with Neumann (derivative) boundary conditions in **35 days**.

4.  **First Principles Pathway:** If you forget everything, remember this:
    *   The assumption is $u(x,y) = X(x)Y(y)$.
    *   Plug this into $u_{xx} + u_{yy} = 0$.
    *   Divide by $XY$. This will always achieve separation.
    *   The rest is just solving two ODEs and applying boundary conditions one by one. You can rebuild the entire solution from this single starting assumption.

## Common mistakes
*   **Sign error on $\lambda$.** Choosing the wrong sign for the separation constant. Remember: the direction with two homogeneous BCs (e.g., $u=0$ at $x=0$ and $x=L$) needs an oscillatory solution ($\sin, \cos$), which requires $X''+\lambda X = 0$ to have $\lambda > 0$. The other direction will get the exponential/hyperbolic solution.
*   **Solving for the wrong coefficient.** In the final step, students often calculate the Fourier coefficient for $f(x)$ and call it $B_n$. But the Fourier coefficient is the *entire* term multiplying the sine function, i.e., $B_n \sinh(\frac{n\pi H}{L})$. You must remember to divide by the $\sinh$ term to isolate $B_n$.
*   **Handling multiple non-zero boundaries.** Trying to solve a problem with two, three, or four non-zero boundary functions ($f(x), g(y)$, etc.) all at once. The method only works with one. The correct approach is to break the problem into a sum of four simpler problems, where each has only one non-zero boundary condition. Solve each one and add the results.
*   **Forgetting $n=0$ or constant solutions.** When the boundary conditions allow it (e.g., derivative boundary conditions), you might have a $\lambda=0$ case which yields a solution like $u(x,y) = A_0 x + B_0$. Don't discard it unless the BCs force it to be zero.

## Self-check
1.  What are the separated ODEs if you choose the separation constant to be $+\lambda$ instead of $-\lambda$? Does the final solution change?
2.  Set up and solve for the general solution of Laplace's equation on the same rectangle $[0,L] \times [0,H]$, but with the boundary conditions: $u(x,0)=0$, $u(x,H)=0$, $u(0,y)=0$, and $u(L,y)=g(y)$. Do not solve for the final coefficients, but write the correct form of the infinite series solution.
3.  Consider the problem on a square $[0, \pi] \times [0, \pi]$ with $u(x,0)=0$, $u(x,\pi)=\sin(3x)$, $u(0,y)=0$, $u(\pi,y)=\sin(y)$. (Hint: this problem can be decomposed into two simpler problems whose solutions you already know how to find). Write down the final solution without re-deriving everything.