## What it is
A partial derivative measures the rate of change of a multi-variable function with respect to one of its input variables, while holding all other input variables constant. It is the generalization of the ordinary derivative from single-variable calculus to functions of higher dimensions.

## Why it matters
Partial derivatives are the language of modern physics and machine learning. Maxwell's equations for electromagnetism and the Navier-Stokes equations for fluid dynamics (essential for aerodynamics) are partial differential equations. In machine learning, the core optimization algorithm, gradient descent, works by calculating the partial derivative of a loss function with respect to each model parameter to find the direction of steepest descent.

## When to study it
You must have complete fluency with single-variable calculus. This includes the limit definition of the derivative, all differentiation rules (power, product, quotient, chain), and the geometric interpretation of a derivative as the slope of a tangent line. You should also be comfortable with the concept of a function of several variables, $f(x, y)$, and its representation as a surface in three-dimensional space.

## How to study it (step by step)
1.  **Revisit the core:** Write down the single-variable derivative definition: $f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}$. Remind yourself this is the slope of the tangent line to the curve $y=f(x)$.
2.  **Calculate mechanically:** Take the function $f(x, y) = x^2y^3$. To find the partial derivative with respect to $x$, treat $y^3$ as a constant coefficient. The derivative is $2xy^3$. Now find the partial with respect to $y$, treating $x^2$ as the constant. The derivative is $x^2(3y^2) = 3x^2y^2$. Do 5-10 such polynomial examples until the process is automatic.
3.  **Build the geometric bridge:** Consider the surface $z = x^2 + y^2$, which is a paraboloid. Imagine you are standing at the point $(1, 2, 5)$ on this surface. To find the partial derivative with respect to $x$, you "freeze" $y$ at $y=2$. The intersection of the plane $y=2$ with the surface $z=x^2+y^2$ is the curve $z = x^2 + 4$. The partial derivative $\frac{\partial z}{\partial x}$ at $(1, 2)$ is simply the ordinary slope of the tangent line to this parabola at $x=1$.
4.  **Formalize the definition:** Write down the formal limit definition for the partial derivative of $f(x,y)$ with respect to $x$ at a point $(x_0, y_0)$:
    $$ \frac{\partial f}{\partial x}(x_0, y_0) = \lim_{h \to 0} \frac{f(x_0+h, y_0) - f(x_0, y_0)}{h} $$
    Notice this is identical to the single-variable definition, with $y_0$ simply held fixed.
5.  **Learn the notations:** There are several common notations for the partial derivative of $f$ with respect to its first variable (e.g., $x$). All mean the same thing.
    *   Leibniz notation: $\frac{\partial f}{\partial x}$, $\frac{\partial z}{\partial x}$
    *   Subscript notation: $f_x(x,y)$, $f_1(x,y)$
    *   Operator notation: $D_x f$, $D_1 f$
    Subscript is common for clean equations; Leibniz is explicit and prevents ambiguity.
6.  **Practice with the chain rule:** Calculate $\frac{\partial f}{\partial y}$ for $f(x,y) = e^{x^2y}$. Here, $x^2$ is a constant. The derivative is $e^{x^2y} \cdot \frac{\partial}{\partial y}(x^2y) = x^2e^{x^2y}$. This is the most common place for errors.

## Key ideas, with intuition
1.  **Freeze and Differentiate:** This is the core computational trick. To find $\frac{\partial f}{\partial x}$, you mentally treat every other variable ($y, z, \dots$) as if it were a constant number, like $5$ or $\pi$. Then you apply all the familiar rules of single-variable differentiation with respect to $x$.

2.  **Geometric Slicing:** The partial derivative $\frac{\partial f}{\partial x}$ at a point $(x_0, y_0)$ is the slope of a tangent line. It's not the tangent to the surface itself, but to the *curve* you get when you slice the surface $z=f(x,y)$ with the vertical plane $y=y_0$. It's the instantaneous rate of change if you move from that point purely in the x-direction.

3.  **Orthogonal Rates of Change:** The partial derivatives $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ give you the rates of change in two very specific, perpendicular directions: parallel to the x-axis and parallel to the y-axis. They provide the fundamental components for describing how the function changes in *any* direction (a concept called the directional derivative).

## Worked example
Let $f(x, y) = x^3 \sin(y) + 2y^2$. Find the partial derivatives $f_x$ and $f_y$ and evaluate them at the point $P(\pi, 1)$.

**Step 1: Find the partial derivative with respect to x, $f_x(x,y)$.**
Treat $y$ as a constant. This means $\sin(y)$ is just a constant coefficient and $2y^2$ is a constant term.
$$ \frac{\partial f}{\partial x} = \frac{\partial}{\partial x} (x^3 \sin(y) + 2y^2) $$
$$ = \frac{\partial}{\partial x} (x^3 \sin(y)) + \frac{\partial}{\partial x}(2y^2) $$
The derivative of a constant is zero. The derivative of $c \cdot x^3$ is $c \cdot 3x^2$.
$$ = (\sin(y)) \cdot (3x^2) + 0 $$
$$ f_x(x,y) = 3x^2 \sin(y) $$

**Step 2: Evaluate $f_x$ at $P(\pi, 1)$.**
Substitute $x=\pi$ and $y=1$ into the expression for $f_x$.
$$ f_x(\pi, 1) = 3(\pi)^2 \sin(1) = 3\pi^2 \sin(1) $$

**Step 3: Find the partial derivative with respect to y, $f_y(x,y)$.**
Treat $x$ as a constant. This means $x^3$ is a constant coefficient.
$$ \frac{\partial f}{\partial y} = \frac{\partial}{\partial y} (x^3 \sin(y) + 2y^2) $$
$$ = \frac{\partial}{\partial y} (x^3 \sin(y)) + \frac{\partial}{\partial y}(2y^2) $$
The derivative of $\sin(y)$ is $\cos(y)$. The derivative of $2y^2$ is $4y$.
$$ = x^3 \cos(y) + 4y $$
$$ f_y(x,y) = x^3 \cos(y) + 4y $$

**Step 4: Evaluate $f_y$ at $P(\pi, 1)$.**
Substitute $x=\pi$ and $y=1$ into the expression for $f_y$.
$$ f_y(\pi, 1) = (\pi)^3 \cos(1) + 4(1) = \pi^3 \cos(1) + 4 $$

**Reflection:** Each step worked because we strictly adhered to the "freeze and differentiate" principle. In Step 1, the term $2y^2$ vanished because, from the perspective of $x$, it's a constant. In Step 3, the term $x^3\sin(y)$ was handled by treating $x^3$ as a constant multiplier, just as if it were the number 7 in front of $\sin(y)$.

## Diagrams
Here is a geometric interpretation of $\frac{\partial f}{\partial x}(x_0, y_0)$.

```text
       z ^
         |
         |         /
         |       ,/
         |      /,'
         |     /,'  <-- Curve C is the intersection of the surface
         |    /,'       z=f(x,y) and the plane y=y_0.
         |   /,'
         |  /,'
         | /,'   /
         |/,'   /
         *-----/-----> y
        / \   /
       /   \ /
      /     `
     /
    x

       z ^
         |
         |
         |      .
         |     / \
         |    /   ` P(x_0, y_0, z_0)
         |   /-----`--- Tangent line T
         |  /,'
         | /,'
         |/,'
         *------------> x_axis_slice
        /
       /
      /

Description:
1. The first diagram shows a surface z=f(x,y). A plane y=y_0 (parallel to the xz-plane) slices through the surface.
2. The intersection of the plane and the surface creates a 2D curve, C.
3. The second diagram zooms in on this curve C. At the point P, we draw a tangent line T *to this curve C*.
4. The slope of the tangent line T is the value of the partial derivative with respect to x at that point, $\frac{\partial f}{\partial x}(x_0, y_0)$.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Slice and Scan". Imagine the function's surface is a mountain range. To find the partial derivative with respect to $x$ ($f_x$), you are only allowed to look and move East-West (the x-direction). You take a "vertical slice" of the mountain in that direction and find the slope ("scan" the steepness) at your current location. For $f_y$, you slice North-South.

2.  **Must-know formulas:**
    *   The definition: $\frac{\partial f}{\partial x}(x_0, y_0) = \lim_{h \to 0} \frac{f(x_0+h, y_0) - f(x_0, y_0)}{h}$
    *   The rule: To find $\frac{\partial f}{\partial x}$, treat $y$ as a constant and differentiate normally.

3.  **Spaced repetition schedule:** Review this concept and re-do the worked example and self-check problems in **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First principles pathway:** If you are ever confused, you can always rebuild the concept from the limit definition. It reduces a multivariable problem to a single-variable limit by freezing all other variables, which is the foundational idea of a partial derivative.

## Common mistakes
1.  **Forgetting the chain rule:** When differentiating $f(x,y) = e^{xy}$ with respect to $x$, the answer is $e^{xy} \cdot \frac{\partial}{\partial x}(xy) = y e^{xy}$. A common mistake is to forget the second factor, $y$.
2.  **Treating a variable as zero:** When finding $\frac{\partial}{\partial x}(x^2y)$, some students incorrectly set $y$ to 0. You must treat $y$ as a *constant parameter*, not the specific constant 0. The derivative of $c \cdot x^2$ is $2cx$, so the derivative of $y \cdot x^2$ is $2yx$.
3.  **Confusing partial and total derivatives:** The notation $\frac{\partial f}{\partial x}$ is a specific command: hold all other variables in $f$ constant. The notation $\frac{df}{dx}$ (a total derivative) implies that other variables (like $y$) might themselves be functions of $x$, leading to a more complex calculation involving the chain rule. Do not use them interchangeably.

## Self-check
1.  Let $f(x, y) = 3x^5y^2 - 2x + 7y^3$. Find $f_x(x,y)$ and $f_y(x,y)$.
2.  Let $z = \frac{\cos(x^2)}{y}$. Find $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$ at the point $(\sqrt{\pi}, 2)$.
3.  The pressure $P$ of a gas is related to its volume $V$ and temperature $T$ by the ideal gas law, $P = \frac{nRT}{V}$ where $n$ and $R$ are constants. Find $\frac{\partial P}{\partial V}$ and $\frac{\partial P}{\partial T}$. What do these quantities represent physically?