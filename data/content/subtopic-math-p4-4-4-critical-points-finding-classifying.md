## What it is
A critical point of a multivariable function $f(x_1, ..., x_n)$ is a point in its domain where the gradient is the zero vector ($\nabla f = \vec{0}$) or is undefined. These points are the only candidates for local maxima, local minima, or saddle points, representing locations where the function's rate of change is momentarily zero in all directions.

## Why it matters
This concept is the foundation of unconstrained optimization. In machine learning, you find critical points of a loss function to find the model parameters that minimize error (e.g., gradient descent seeks these points). In physics, critical points of a potential energy function correspond to equilibrium states; local minima are stable equilibria, while local maxima and saddle points are unstable equilibria.

## When to study it
You must be fluent with single-variable calculus, specifically finding critical points using $f'(x)=0$. You also need a solid command of partial derivatives and the gradient vector ($\nabla f$). Without these, the core computations will be impossible.

## How to study it (step by step)
1.  **Review the 1D case.** Re-derive the second derivative test for a single-variable function $f(x)$ using a Taylor expansion around a critical point $x_0$. This will build the intuition for the multivariable case.
2.  **Define the condition.** For a function $f(x, y)$, a critical point $(a, b)$ occurs where $\nabla f(a, b) = \langle f_x(a, b), f_y(a, b) \rangle = \langle 0, 0 \rangle$. Practice setting up and solving this system of two equations for a few simple polynomials.
3.  **Introduce the Hessian.** The second derivatives are organized into the Hessian matrix, $H$. For $f(x, y)$, it is $H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$. Calculate this for the functions from the previous step. Note that by Clairaut's Theorem, $f_{xy} = f_{yx}$ for most functions you will encounter.
4.  **Learn the Discriminant.** The key to classifying critical points is the determinant of the Hessian, called the Discriminant: $D = \det(H) = f_{xx}f_{yy} - (f_{xy})^2$. Understand that its sign tells you whether the curvatures along different axes agree or oppose each other.
5.  **Master the Second Derivatives Test.** Memorize and apply the classification rules based on the signs of $D$ and $f_{xx}$ at the critical point. Solve at least one example for each case: local min, local max, and saddle point.
6.  **Consider the $D=0$ case.** Find a function like $f(x, y) = x^4 + y^4$ and another like $f(x, y) = x^3+y^3$. Show that for both, the critical point at the origin yields $D=0$. Yet, the first has a minimum and the second has a saddle, proving why the test is inconclusive when $D=0$.

## Key ideas, with intuition
1.  **Horizontal Tangent Plane:** In 1D, a critical point has a horizontal tangent line. In 2D, a critical point $(a, b)$ of $z=f(x,y)$ has a horizontal tangent plane. The condition $\nabla f(a, b) = \vec{0}$ means the slope is zero along every direction, defining this flat plane. This is the geometric meaning of a critical point.

2.  **The Discriminant $D$ as a "Shape" Test:** The value $D = f_{xx}f_{yy} - (f_{xy})^2$ tells you the shape of the surface near the critical point.
    *   **Intuition:** Think of $f_{xx}$ and $f_{yy}$ as the primary curvatures (like bowls opening up or down). The $f_{xy}$ term represents a "twist." The discriminant checks if the primary curvatures are strong enough to overcome the twist.
    *   If $D > 0$, the $f_{xx}f_{yy}$ term dominates. This means $f_{xx}$ and $f_{yy}$ must have the same sign. The curvatures agree: either both are positive (a bowl opening up, a local min) or both are negative (a dome, a local max).
    *   If $D < 0$, the twist term $(f_{xy})^2$ dominates. The surface is pulling in opposite directions along different axes, creating a Pringles chip shape, known as a saddle point.

3.  **$f_{xx}$ as a "Direction" Test:** Once you know the shape is a bowl or a dome ($D>0$), you need to know which way it opens. The sign of $f_{xx}$ tells you the concavity along the x-axis.
    $$f_{xx} > 0 \implies \text{Concave up (like } x^2\text{), so it's a local minimum.}$$
    $$f_{xx} < 0 \implies \text{Concave down (like } -x^2\text{), so it's a local maximum.}$$
    (You could use $f_{yy}$ instead; if $D>0$, its sign will match $f_{xx}$.)

## Worked example
Find and classify the critical points of $f(x, y) = x^3 - 12xy + 8y^3$.

**Step 1: Find the gradient and set it to zero.**
First, compute the partial derivatives:
$$f_x = \frac{\partial}{\partial x}(x^3 - 12xy + 8y^3) = 3x^2 - 12y$$
$$f_y = \frac{\partial}{\partial y}(x^3 - 12xy + 8y^3) = -12x + 24y^2$$
Set them to zero to find the critical points:
1.  $3x^2 - 12y = 0 \implies x^2 = 4y$
2.  $-12x + 24y^2 = 0 \implies x = 2y^2$

**Step 2: Solve the system of equations.**
Substitute the expression for $x$ from (2) into (1):
$$(2y^2)^2 = 4y$$
$$4y^4 = 4y$$
$$4y^4 - 4y = 0$$
$$4y(y^3 - 1) = 0$$
This gives two solutions for $y$: $y=0$ and $y=1$.
Now find the corresponding $x$ values using $x = 2y^2$:
*   If $y=0$, then $x = 2(0)^2 = 0$. Critical point is $(0, 0)$.
*   If $y=1$, then $x = 2(1)^2 = 2$. Critical point is $(2, 1)$.

**Step 3: Compute the second derivatives and the Discriminant.**
$$f_{xx} = \frac{\partial}{\partial x}(3x^2 - 12y) = 6x$$
$$f_{yy} = \frac{\partial}{\partial y}(-12x + 24y^2) = 48y$$
$$f_{xy} = \frac{\partial}{\partial y}(3x^2 - 12y) = -12$$
The Discriminant is $D(x, y) = f_{xx}f_{yy} - (f_{xy})^2 = (6x)(48y) - (-12)^2 = 288xy - 144$.

**Step 4: Classify each critical point.**
*   **For (0, 0):**
    $D(0, 0) = 288(0)(0) - 144 = -144$.
    Since $D < 0$, the point $(0, 0)$ is a **saddle point**.

*   **For (2, 1):**
    $D(2, 1) = 288(2)(1) - 144 = 576 - 144 = 432$.
    Since $D > 0$, it is a local extremum. We check the sign of $f_{xx}$:
    $f_{xx}(2, 1) = 6(2) = 12$.
    Since $D > 0$ and $f_{xx} > 0$, the point $(2, 1)$ is a **local minimum**.

*Reflection:* Each step was necessary. Finding the gradient identified the candidates. Solving the system isolated the specific coordinates. The Discriminant and the second partials provided the geometric information about the surface's curvature needed for classification.

## Diagrams
A saddle point, like the one at $(0,0)$ in the example. Imagine the x-axis as a parabola opening up, while the y-axis is a parabola opening down.

```text
       z
       ^
       |
      / \
     /   \
    /     \
   /-------\--------> y
  / \     / \
 /   \   /   \
/     \ /     \
      /
     /
    v
   x
```
Description of a local minimum: Imagine a perfect bowl or paraboloid sitting on the xy-plane, opening upwards. Its lowest point, where a marble would come to rest, is the local minimum. The tangent plane at this point is horizontal.

## Memory technique — remember this forever
1.  **Mnemonic Story:** You're a mountain explorer. The gradient ($\nabla f$) points uphill. To find peaks, pits, or passes, you must go where the ground is flat ($\nabla f = \vec{0}$). Once there, you use your "Discriminator" tool, $D$.
    *   If **D** is **P**ositive, it's a **P**eak or a **P**it. Look at the ground's curve along the x-axis ($f_{xx}$). If it's positive (a smile), you're in a pit (min). If it's negative (a frown), you're on a peak (max).
    *   If **D** is **N**egative, it's **N**either. It's a saddle pass.
    *   If **D** is **Z**ero, the tool is **Z**apped. Inconclusive.

2.  **Must-Memorize Formulas:**
    *   Critical Point Condition: $\nabla f(x, y) = \vec{0}$
    *   The Discriminant: $D = f_{xx}f_{yy} - (f_{xy})^2$
    *   The Test:
        *   $D>0, f_{xx}>0 \implies$ local min
        *   $D>0, f_{xx}<0 \implies$ local max
        *   $D<0 \implies$ saddle point

3.  **Spaced Repetition Schedule:** Review this material and re-work the example at:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the test, remember it comes from the second-order Taylor expansion of $f(x,y)$ around a critical point $(a,b)$. The change in $f$ is approximately $\Delta f \approx \frac{1}{2} [f_{xx}(\Delta x)^2 + 2f_{xy}(\Delta x)(\Delta y) + f_{yy}(\Delta y)^2]$. The classification test is simply asking if this quadratic form is positive definite (local min), negative definite (local max), or indefinite (saddle). The Discriminant $D$ and the sign of $f_{xx}$ are just a computational shortcut for determining this.

## Common mistakes
1.  **Solving only one partial derivative.** Setting $f_x=0$ and solving for $x$ in terms of $y$ is only half the job. You must use that relation in the $f_y=0$ equation to solve the *system*.
2.  **Forgetting to square $f_{xy}$ in the Discriminant.** A very common error is to calculate $D = f_{xx}f_{yy} - f_{xy}$. It is $f_{xx}f_{yy} - (f_{xy})^2$.
3.  **Misinterpreting the $D<0$ case.** If $D$ is negative, it is a saddle point. Do not proceed to check the sign of $f_{xx}$. The sign of $f_{xx}$ is irrelevant for a saddle point classification.
4.  **Mixing up points.** When you have multiple critical points, be meticulous. Calculate $D$ and $f_{xx}$ separately for *each* point. The values of $f_{xx}, f_{yy}, f_{xy}$ can (and usually do) depend on $(x,y)$.

## Self-check
1.  Find and classify the critical point(s) of $f(x, y) = 5 - x^2 - 4y^2 + 2x - 16y$.
2.  Find and classify all critical points of the function $f(x,y) = e^y (y^2 - x^2)$.
3.  The potential energy of a system is given by $U(x, y) = \sin(x)\cos(y)$ for $-\pi < x < \pi$ and $-\pi < y < \pi$. Find all equilibrium points and classify them as stable or unstable.