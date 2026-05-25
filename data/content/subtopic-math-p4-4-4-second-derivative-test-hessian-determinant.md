## What it is
The second derivative test for a multivariable function $f(x,y)$ is a method for classifying its critical points (where the gradient is zero) as local maxima, local minima, or saddle points. It uses the determinant of the Hessian matrix—a matrix of the function's second-order partial derivatives—to analyze the local curvature of the function's graph. This is the direct analogue of the single-variable second derivative test, generalized to higher dimensions.

## Why it matters
This test is the cornerstone of unconstrained optimization, a fundamental problem across science and engineering. In machine learning, you use it to determine if the "bottom" of a loss function you've found is a true minimum, ensuring your model is actually optimized. In physics and aerospace, it's used to analyze the stability of equilibria; for a system at a critical point of its potential energy function, a local minimum corresponds to a stable equilibrium, while a maximum or saddle point corresponds to an unstable one.

## When to study it
You must be proficient with the following before tackling this topic:
1.  **Partial Derivatives:** Calculating first and second-order partial derivatives ($\frac{\partial f}{\partial x}$, $\frac{\partial^2 f}{\partial x^2}$, $\frac{\partial^2 f}{\partial y \partial x}$, etc.).
2.  **Clairaut's Theorem:** Understanding that for well-behaved functions, $f_{xy} = f_{yx}$.
3.  **Critical Points:** Finding points $(a,b)$ where the gradient is zero, i.e., $\nabla f(a,b) = \langle f_x(a,b), f_y(a,b) \rangle = \langle 0,0 \rangle$.
4.  **Determinants:** Calculating the determinant of a 2x2 matrix.

If any of these are weak, master them first. The second derivative test builds directly upon them.

## How to study it (step by step)
1.  **Review the Single-Variable Case:** Re-derive the logic for the second derivative test for a function $g(x)$. Remind yourself why $g''(a) > 0$ at a critical point $a$ implies a local minimum (the function is concave up, like a bowl holding water).
2.  **Define the Hessian:** For $f(x,y)$, write down the definition of the Hessian matrix, $H(x,y)$, and compute it for two or three simple functions (e.g., $f=x^2+y^2$, $f=xy$, $f=\sin(x)\cos(y)$).
3.  **Define the Discriminant:** Define the determinant of the Hessian, $D(x,y) = \det(H)$. Understand that this single number summarizes the information in the four second derivatives.
4.  **Connect to Taylor Series:** Read through the derivation of the test from the second-order Taylor expansion of $f(x,y)$ around a critical point $(a,b)$. This is the *why* behind the test conditions. Focus on how the term involving the Hessian becomes a quadratic form that determines the local shape.
5.  **Memorize the Test Conditions:** Write down the three main cases for $D(a,b)$ and the sub-cases for $f_{xx}(a,b)$ on a flashcard. Drill them until they are automatic.
6.  **Solve Systematically:** Work through 5+ problems where you must first find the critical points and then classify each one using the Hessian determinant. Use a consistent, step-by-step procedure for each problem.

## Key ideas, with intuition
1.  **Curvature in Multiple Directions:** For a single-variable function, at a critical point, you only need to know if the curve is bending up or down. For a two-variable function, the surface can curve differently as you move in different directions. It could curve up in all directions (local minimum), down in all directions (local maximum), or up in one direction and down in another (saddle point).

2.  **The Hessian Matrix Encodes All Curvature:** The Hessian matrix neatly packages all the second-order derivative information that describes this local curvature.
    $$
    H(x,y) = \begin{pmatrix} f_{xx}(x,y) & f_{xy}(x,y) \\ f_{yx}(x,y) & f_{yy}(x,y) \end{pmatrix}
    $$
    The diagonal terms, $f_{xx}$ and $f_{yy}$, describe the concavity along the $x$ and $y$ axes, respectively. The off-diagonal terms, $f_{xy}$ and $f_{yx}$, describe how the slope in one direction changes as you move in the other direction—a "twist" in the surface.

3.  **The Determinant as a "Curvature Agreement" Test:** The determinant of the Hessian, often called the discriminant $D$, tells you whether the curvatures in different directions agree or fight each other.
    $$
    D = \det(H) = f_{xx}f_{yy} - (f_{xy})^2
    $$
    *   **Intuition for $D > 0$:** This means $f_{xx}f_{yy}$ is large and positive, overpowering the "twist" term $(f_{xy})^2$. This implies that the concavity along the x-axis ($f_{xx}$) and the y-axis ($f_{yy}$) have the *same sign*. The surface is bowl-shaped (either up or down). We then just check the sign of $f_{xx}$ to see which way the bowl opens.
    *   **Intuition for $D < 0$:** This means the "twist" term $(f_{xy})^2$ dominates, or that $f_{xx}$ and $f_{yy}$ have opposite signs. The curvatures are fighting. The surface curves up in one direction and down in another. This is a saddle point.
    *   **Intuition for $D = 0$:** The test is inconclusive. The concavities might be zero, or they might be perfectly balanced by the twist term. You can't tell the shape from this information alone; you need to use other methods.

## Worked example
Classify the critical points of the function $f(x,y) = x^4 + y^4 - 4xy + 1$.

**Step 1: Find Critical Points**
We need to find where the gradient $\nabla f = \langle 0,0 \rangle$.
$$
f_x = \frac{\partial f}{\partial x} = 4x^3 - 4y = 0 \implies y = x^3
$$
$$
f_y = \frac{\partial f}{\partial y} = 4y^3 - 4x = 0 \implies x = y^3
$$
Substitute the first equation into the second:
$$
x = (x^3)^3 = x^9 \implies x^9 - x = 0 \implies x(x^8 - 1) = 0
$$
This gives $x=0$, $x=1$, and $x=-1$.
Now find the corresponding $y$ values using $y=x^3$:
*   If $x=0$, then $y=0^3=0$. Point: $(0,0)$.
*   If $x=1$, then $y=1^3=1$. Point: $(1,1)$.
*   If $x=-1$, then $y=(-1)^3=-1$. Point: $(-1,-1)$.
The critical points are $(0,0)$, $(1,1)$, and $(-1,-1)$.

**Step 2: Compute the Hessian Matrix**
First, find all second-order partial derivatives:
$f_{xx} = 12x^2$
$f_{yy} = 12y^2$
$f_{xy} = -4$
The Hessian matrix is:
$$
H(x,y) = \begin{pmatrix} 12x^2 & -4 \\ -4 & 12y^2 \end{pmatrix}
$$

**Step 3: Apply the Second Derivative Test to Each Critical Point**
Calculate the discriminant $D(x,y) = \det(H) = (12x^2)(12y^2) - (-4)^2 = 144x^2y^2 - 16$.

*   **At point (0,0):**
    $D(0,0) = 144(0)^2(0)^2 - 16 = -16$.
    Since $D < 0$, the point $(0,0)$ is a **saddle point**.

*   **At point (1,1):**
    $D(1,1) = 144(1)^2(1)^2 - 16 = 144 - 16 = 128$.
    Since $D > 0$, we check the sign of $f_{xx}(1,1)$.
    $f_{xx}(1,1) = 12(1)^2 = 12$.
    Since $D > 0$ and $f_{xx} > 0$, the point $(1,1)$ is a **local minimum**.

*   **At point (-1,-1):**
    $D(-1,-1) = 144(-1)^2(-1)^2 - 16 = 144 - 16 = 128$.
    Since $D > 0$, we check the sign of $f_{xx}(-1,-1)$.
    $f_{xx}(-1,-1) = 12(-1)^2 = 12$.
    Since $D > 0$ and $f_{xx} > 0$, the point $(-1,-1)$ is a **local minimum**.

**Reflection:** This process was systematic. Finding critical points required solving a system of nonlinear equations. Computing the Hessian was a straightforward differentiation exercise. The final classification step involved plugging the coordinates of each critical point into the discriminant $D$ and, where necessary, into $f_{xx}$, and then simply applying the rules of the test.

## Diagrams
Here are ASCII diagrams illustrating the three main possibilities at a critical point.

A local minimum (like the bottom of a bowl):
```text
      z
      ^
     /
    /
   /
  /-- --\
 |       |
 |       | <--- f(x,y) surface
  \     /
   `---'
(a,b) -------> y
  |
  |
  v
  x
```

A local maximum (like the top of a hill):
```text
      z
      ^
      ,---.
     /     \
    |       | <--- f(x,y) surface
    |       |
   /-- --\
  /       \
 /
(a,b) -------> y
  |
  |
  v
  x
```

A saddle point (like a Pringles chip or a mountain pass):
```text
      z
      ^
     /
    /    _----_
   /   ,'      `.
  /   /          \
 |   (    (a,b)   ) <--- Curves down along y-axis
 |    \          /
  \    `.______,'
   \
    `------------> y
     |
     | <--- Curves up along x-axis
     v
     x
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're a tiny hiker standing at a flat spot (a critical point) on a foggy mountain range. To figure out where you are, you send out two scouts: one along the x-axis ($f_{xx}$) and one along the y-axis ($f_{yy}$). The **Determinant $D$** *determines* if your scouts agree on the terrain.
    *   If **$D > 0$ (Determined & Positive)**, the scouts agree! The terrain is bowl-shaped. To know if it's a valley or a peak, you just ask your x-scout ($f_{xx}$). If $f_{xx} > 0$, he's looking up (concave up), so you're in a **minimum**. If $f_{xx} < 0$, he's looking down, so you're at a **maximum**.
    *   If **$D < 0$ (Determined & Negative)**, the scouts disagree! One says the ground curves up, the other says it curves down. You're on a **saddle point**.
    *   If **$D = 0$ (Doubt)**, the fog is too thick. The test is inconclusive.

2.  **Must-Know Formulas:**
    *   The Hessian: $H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$
    *   The Discriminant: $D = f_{xx}f_{yy} - f_{xy}^2$
    *   The Test: At a critical point $(a,b)$:
        *   If $D>0$ and $f_{xx}>0 \implies$ local minimum.
        *   If $D>0$ and $f_{xx}<0 \implies$ local maximum.
        *   If $D<0 \implies$ saddle point.
        *   If $D=0 \implies$ test is inconclusive.

3.  **Spaced Repetition Schedule:** Review this material and re-work the example at **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget the rules, remember the **second-order Taylor expansion** for $f$ around a critical point $(a,b)$:
    $$
    f(x,y) \approx f(a,b) + \frac{1}{2} \left[ f_{xx}(a,b)(x-a)^2 + 2f_{xy}(a,b)(x-a)(y-b) + f_{yy}(a,b)(y-b)^2 \right]
    $$
    The nature of the critical point is determined by whether the quadratic expression in the brackets is always positive (local min), always negative (local max), or changes sign (saddle). The conditions on $D$ and $f_{xx}$ are precisely the conditions for the definiteness of this quadratic form.

## Common mistakes
1.  **Evaluating at the Wrong Time:** Calculating the determinant $D$ as a function of $x$ and $y$, and then trying to classify it before plugging in the coordinates of the specific critical point $(a,b)$. You must evaluate $D(a,b)$ and $f_{xx}(a,b)$.
2.  **Mixing Up the Conditions:** Confusing the roles of $D$ and $f_{xx}$. Remember: $D$ is the first gatekeeper. If $D \le 0$, you are done (saddle or inconclusive). Only if $D > 0$ do you proceed to check the sign of $f_{xx}$.
3.  **Assuming $D=0$ Means Saddle Point:** The test is *inconclusive* when $D=0$. The point could be a min, max, or something more complex (like for $f(x,y)=x^4+y^4$, which has a minimum at $(0,0)$ where $D=0$). You must use other methods, like inspecting the function's behavior along lines passing through the point.

## Self-check
Find and classify all critical points for the following functions. Do not look up the answers until you have committed to your own.

1.  $f(x,y) = 3x^2y + y^3 - 3x^2 - 3y^2 + 2$
2.  $f(x,y) = e^{-x^2-y^2}(x^2+2y^2)$
3.  $f(x,y) = x^3 - 3xy^2$ (What happens at its critical point? Why might the test be inconclusive, and what does the surface look like?)