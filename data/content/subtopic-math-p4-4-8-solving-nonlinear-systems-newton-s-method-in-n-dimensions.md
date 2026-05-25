## What it is
Newton's method in n-dimensions is an iterative algorithm for finding the roots of a system of $n$ nonlinear equations in $n$ variables. It works by starting with an initial guess and repeatedly refining it by approximating the nonlinear system with a more manageable linear system, which is then solved to find the next, better guess. This linear approximation is constructed using the Jacobian matrix, the higher-dimensional analogue of the derivative.

## Why it matters
This method is the foundation for solving countless problems where systems of nonlinear equations appear. In aerospace, it's used in trajectory optimization and solving implicit numerical schemes for simulating fluid dynamics or orbital mechanics. In machine learning, optimization algorithms like the Newton-Raphson method (which finds minima by finding roots of the gradient) are direct applications used to train complex models.

## When to study it
You must be comfortable with the following prerequisites. If not, master them first.
1.  **Multivariable Calculus:** First-order Taylor series expansion for vector-valued functions, the definition and computation of the gradient ($\nabla f$), and especially the Jacobian matrix.
2.  **Linear Algebra:** Solving systems of linear equations of the form $A\mathbf{x} = \mathbf{b}$ using methods like Gaussian elimination, understanding matrix-vector multiplication, and the concept of a singular vs. non-singular matrix.
3.  **Single-Variable Numerics:** The derivation and application of Newton's method for a single equation, $x_{k+1} = x_k - f(x_k)/f'(x_k)$. The n-dimensional version is a direct generalization of this idea.

## How to study it (step by step)
1.  **Re-derive 1D Newton's Method.** Start with the first-order Taylor expansion of a function $f(x)$ around a point $x_k$: $f(x) \approx f(x_k) + f'(x_k)(x - x_k)$. Set $f(x) = 0$ to find the root, and solve for the new guess $x = x_{k+1}$. This will solidify the core concept of linear approximation.
2.  **Generalize the Taylor Expansion.** Write down the first-order Taylor expansion for a vector function $\mathbf{F}(\mathbf{x})$ where $\mathbf{x} \in \mathbb{R}^n$ and $\mathbf{F}: \mathbb{R}^n \to \mathbb{R}^n$. This will introduce the Jacobian matrix $J(\mathbf{x})$ as the coefficient of the displacement vector $\Delta \mathbf{x}$. The expansion is $\mathbf{F}(\mathbf{x}_k + \Delta \mathbf{x}) \approx \mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) \Delta \mathbf{x}$.
3.  **Derive the n-D Update Rule.** Following the logic from step 1, set the Taylor approximation to zero: $\mathbf{0} \approx \mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) \Delta \mathbf{x}$. Rearrange this to form a linear system for the update step $\Delta \mathbf{x}$. This gives the heart of the algorithm.
4.  **Work a 2x2 Example by Hand.** Take a simple system like $x^2+y^2=4$ and $e^x+y=1$. Choose an initial guess and perform two full iterations manually. Calculate the function vector, the Jacobian matrix, solve the resulting 2x2 linear system for the step, and find the next guess.
5.  **Code it.** Implement the algorithm in a language like Python with NumPy. Write a function that takes $\mathbf{F}$, its Jacobian $J$, and an initial guess $\mathbf{x}_0$ as input. Use a library function like `np.linalg.solve` to handle the linear system at each step. Test it on the problem from step 4.

## Key ideas, with intuition
1.  **Linearize, then Solve.** A nonlinear system is hard. A linear system is easy ($A\mathbf{x}=\mathbf{b}$). The core idea of Newton's method is to replace the hard problem with a sequence of easy ones. At your current guess $\mathbf{x}_k$, you pretend the system is linear and find the exact root of that *linearized* system. This root becomes your next guess, $\mathbf{x}_{k+1}$.
2.  **The Jacobian is the "Multidimensional Slope".** For a single function $f(x)$, the derivative $f'(x)$ tells you how much $f$ changes for a small change in $x$. For a system of functions $\mathbf{F}(\mathbf{x})$, the Jacobian matrix $J$ does the same thing. The element $J_{ij} = \frac{\partial F_i}{\partial x_j}$ tells you how the $i$-th function changes in response to a small change in the $j$-th variable. It captures all the local "slopes" in one matrix.
    $$
    J(\mathbf{x}) = \begin{pmatrix}
    \frac{\partial F_1}{\partial x_1} & \frac{\partial F_1}{\partial x_2} & \cdots & \frac{\partial F_1}{\partial x_n} \\
    \frac{\partial F_2}{\partial x_1} & \frac{\partial F_2}{\partial x_2} & \cdots & \frac{\partial F_2}{\partial x_n} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial F_n}{\partial x_1} & \frac{\partial F_n}{\partial x_2} & \cdots & \frac{\partial F_n}{\partial x_n}
    \end{pmatrix}
    $$
3.  **Solve for the Step, Don't Invert.** The derivation leads to $J(\mathbf{x}_k) \Delta \mathbf{x} = -\mathbf{F}(\mathbf{x}_k)$. It is tempting to write this as $\Delta \mathbf{x} = -J(\mathbf{x}_k)^{-1} \mathbf{F}(\mathbf{x}_k)$. While mathematically equivalent for non-singular $J$, you should never compute the matrix inverse. Solving the linear system directly is far more numerically stable and computationally efficient. The algorithm is about finding the correction step $\Delta \mathbf{x}$, not directly finding the next point.
    $$
    \mathbf{x}_{k+1} = \mathbf{x}_k + \Delta \mathbf{x}_k
    $$

## Worked example
Find a root of the system:
$$
F_1(x, y) = x^2 + y^2 - 5 = 0 \\
F_2(x, y) = y - 3x^2 + 7 = 0
$$
Let's start with an initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ -3 \end{pmatrix}$.

**Step 1: Define the vector function $\mathbf{F}$ and compute its Jacobian $J$.**
$$
\mathbf{F}(\mathbf{x}) = \begin{pmatrix} x^2 + y^2 - 5 \\ y - 3x^2 + 7 \end{pmatrix}
$$
$$
J(\mathbf{x}) = \begin{pmatrix} \frac{\partial F_1}{\partial x} & \frac{\partial F_1}{\partial y} \\ \frac{\partial F_2}{\partial x} & \frac{\partial F_2}{\partial y} \end{pmatrix} = \begin{pmatrix} 2x & 2y \\ -6x & 1 \end{pmatrix}
$$

**Step 2: Evaluate $\mathbf{F}$ and $J$ at the current guess $\mathbf{x}_0$.**
$$
\mathbf{F}(\mathbf{x}_0) = \begin{pmatrix} (1)^2 + (-3)^2 - 5 \\ (-3) - 3(1)^2 + 7 \end{pmatrix} = \begin{pmatrix} 1 + 9 - 5 \\ -3 - 3 + 7 \end{pmatrix} = \begin{pmatrix} 5 \\ 1 \end{pmatrix}
$$
$$
J(\mathbf{x}_0) = \begin{pmatrix} 2(1) & 2(-3) \\ -6(1) & 1 \end{pmatrix} = \begin{pmatrix} 2 & -6 \\ -6 & 1 \end{pmatrix}
$$

**Step 3: Set up and solve the linear system $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$.**
Let $\Delta \mathbf{x}_0 = \begin{pmatrix} \Delta x \\ \Delta y \end{pmatrix}$.
$$
\begin{pmatrix} 2 & -6 \\ -6 & 1 \end{pmatrix} \begin{pmatrix} \Delta x \\ \Delta y \end{pmatrix} = -\begin{pmatrix} 5 \\ 1 \end{pmatrix} = \begin{pmatrix} -5 \\ -1 \end{pmatrix}
$$
This is a standard 2x2 linear system:
$2\Delta x - 6\Delta y = -5$
$-6\Delta x + \Delta y = -1$

From the second equation, $\Delta y = 6\Delta x - 1$. Substituting into the first:
$2\Delta x - 6(6\Delta x - 1) = -5 \implies 2\Delta x - 36\Delta x + 6 = -5 \implies -34\Delta x = -11 \implies \Delta x = 11/34$.
Then $\Delta y = 6(11/34) - 1 = 66/34 - 34/34 = 32/34 = 16/17$.
So, $\Delta \mathbf{x}_0 = \begin{pmatrix} 11/34 \\ 16/17 \end{pmatrix} \approx \begin{pmatrix} 0.3235 \\ 0.9412 \end{pmatrix}$.

**Step 4: Compute the next guess $\mathbf{x}_1 = \mathbf{x}_0 + \Delta \mathbf{x}_0$.**
$$
\mathbf{x}_1 = \begin{pmatrix} 1 \\ -3 \end{pmatrix} + \begin{pmatrix} 11/34 \\ 32/34 \end{pmatrix} = \begin{pmatrix} 45/34 \\ -70/34 \end{pmatrix} \approx \begin{pmatrix} 1.3235 \\ -2.0588 \end{pmatrix}
$$

**Reflection:** The initial guess $(1, -3)$ gave a function value of $(5, 1)$, which is far from the desired $(0, 0)$. By linearizing the system at our guess, we found a "correction step" $(\Delta x, \Delta y)$ that would take us to the root if the system were actually linear. We applied that correction to get a much better guess, $\mathbf{x}_1$. One would now repeat this process starting from $\mathbf{x}_1$.

## Diagrams
The intuition comes from the 1D case. At guess $x_k$, we approximate the curve $y=f(x)$ with its tangent line. The next guess $x_{k+1}$ is where that tangent line intersects the x-axis.

```text
       y
       |
 f(x_k)|--. . . . . . . . . . . . . . . . . (x_k, f(x_k))
       |  \ ` .                     
       |   \   ` .                  Tangent line at x_k
       |    \     ` .               with slope f'(x_k)
       |     \       ` .
-------+------+----------\----------------------> x
       |      x_k         x_{k+1}`
       |                      \
       |                       ` .
       |                          ` . y = f(x)
```

In 2D, this generalizes. Imagine two surfaces, $z = F_1(x,y)$ and $z = F_2(x,y)$. We are looking for the point $(x,y)$ where both surfaces have height zero (i.e., where they both cross the $xy$-plane). At a guess $(x_k, y_k)$, we approximate each surface with its tangent plane. The intersection of these two tangent planes is a line. Where this line intersects the $xy$-plane gives our next guess, $(x_{k+1}, y_{k+1})$.

## Memory technique — remember this forever
1.  **The Story: Newton's GPS for Roots.** You're lost in a hilly terrain ($\mathbf{F}(\mathbf{x})$) and your goal is to get to a specific point at sea level ($\mathbf{F}=\mathbf{0}$). Your GPS is broken. At your current position $\mathbf{x}_k$, you can only measure your altitude ($\mathbf{F}(\mathbf{x}_k)$) and the slope of the ground in every direction (the Jacobian, $J(\mathbf{x}_k)$). You assume the ground is a perfectly flat, tilted plane (the linear approximation). You ask: "On this *simple, flat map*, where is sea level?" You solve that simple problem, and it gives you a direction and distance to walk (the step, $\Delta \mathbf{x}_k$). You take that step, arriving at $\mathbf{x}_{k+1}$, and repeat the process.

2.  **Must-Know Formulas:**
    *   The linear system for the step: $J(\mathbf{x}_k) \Delta \mathbf{x}_k = -\mathbf{F}(\mathbf{x}_k)$
    *   The update rule: $\mathbf{x}_{k+1} = \mathbf{x}_k + \Delta \mathbf{x}_k$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the update rule from the Taylor expansion at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, remember the **multivariate Taylor expansion**.
    $\mathbf{F}(\mathbf{x}_{\text{new}}) \approx \mathbf{F}(\mathbf{x}_{\text{current}}) + J(\mathbf{x}_{\text{current}}) (\mathbf{x}_{\text{new}} - \mathbf{x}_{\text{current}})$.
    Our goal is to make $\mathbf{F}(\mathbf{x}_{\text{new}}) = \mathbf{0}$.
    Substitute this in: $\mathbf{0} \approx \mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) (\mathbf{x}_{k+1} - \mathbf{x}_k)$.
    Let the step be $\Delta \mathbf{x}_k = \mathbf{x}_{k+1} - \mathbf{x}_k$.
    $\mathbf{0} \approx \mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) \Delta \mathbf{x}_k$.
    Rearrange to get the formula for the step: $J(\mathbf{x}_k) \Delta \mathbf{x}_k = -\mathbf{F}(\mathbf{x}_k)$.

## Common mistakes
1.  **Calculating the Inverse.** Students often try to compute $\Delta \mathbf{x}_k = -J^{-1}\mathbf{F}$. This is slow and numerically unstable. Always formulate the problem as solving a linear system for $\Delta \mathbf{x}_k$.
2.  **Incorrect Jacobian.** A single sign error or misplaced variable in the Jacobian matrix will cause the entire method to fail, often diverging rapidly. Double-check your partial derivatives.
3.  **Ignoring Singular Jacobians.** If at some iterate $\mathbf{x}_k$ the matrix $J(\mathbf{x}_k)$ becomes singular (its determinant is zero), the linear system has no unique solution and the method fails. This happens at critical points of the function.
4.  **Expecting Global Convergence.** Newton's method is a Lamborghini: incredibly fast when it's near the solution, but it can easily spin out and crash if you start too far away. The initial guess $\mathbf{x}_0$ must be "sufficiently close" to the true root.

## Self-check
1.  Consider the system of equations for the intersection of a circle and a hyperbola: $x^2 + y^2 = 2$ and $x^2 - y^2 = 1$. What is the function vector $\mathbf{F}(\mathbf{x})$ and its Jacobian matrix $J(\mathbf{x})$?
2.  For the system in question 1, take the initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. Perform one full iteration of Newton's method to find $\mathbf{x}_1$.
3.  Consider the simple system $x - y = 0$ and $x + y = 2$. This is a linear system, so Newton's method should be very effective. Show that, regardless of your initial guess, Newton's method converges to the exact solution in a single step. Why does this happen? Relate your answer to the Taylor expansion.