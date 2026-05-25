## 1. What it is — in plain English

Imagine you're hiking in a vast, hilly landscape. A "critical point" on this landscape is simply a place where the ground is perfectly flat. It's not sloping upwards, and it's not sloping downwards in any direction you immediately look.

Think of the very top of a hill, or the very bottom of a valley. At these spots, if you were to stand still, you wouldn't feel yourself being pulled in any direction by gravity (assuming a perfectly smooth surface). The ground is level. These are critical points.

But there's another kind of flat spot: a "saddle point." Imagine the middle of a horse's saddle, or the pass between two mountains. If you walk along the length of the saddle, you go down into a dip. But if you walk across the saddle, you go up over a hump. Right in the middle, it's flat, but it's neither a true peak nor a true valley. It's flat, but it's a transition point.

In mathematics, for a function that describes a surface (like our landscape), a critical point is where its "slope" (measured by derivatives) is zero in all directions, or sometimes, where the slope isn't even well-defined. We're interested in these points because they often tell us where the maximum or minimum values of the function might occur.

## 2. Why it matters — real-world applications

Critical points are fundamental to optimization problems across science and engineering. Finding and classifying them allows us to pinpoint optimal conditions.

1.  **Engineering Design & Optimization:**
    *   **Aerospace:** When designing an aircraft wing, engineers might create a function representing the lift-to-drag ratio based on various parameters (e.g., wing shape, angle of attack). Finding the critical points of this function helps determine the optimal design parameters that maximize lift while minimizing drag, leading to more fuel-efficient and stable flight.
    *   **Automotive:** Car manufacturers use optimization to design components. For instance, minimizing the weight of a car chassis while maintaining structural integrity involves complex functions with many variables. Critical points help identify the design parameters that achieve the minimum weight without compromising safety.

2.  **Machine Learning:**
    *   **Neural Networks & Gradient Descent:** Machine learning models, especially neural networks, learn by minimizing a "loss function." This function quantifies how far off the model's predictions are from the actual values. Algorithms like gradient descent iteratively adjust the model's parameters (weights and biases) to move towards critical points where the loss function is minimized. These minima represent the optimal set of parameters for the model to make accurate predictions. While not always finding global minima, identifying local minima (critical points) is crucial for training effective models.

3.  **Physics & Equilibrium States:**
    *   **Potential Energy Minimization:** In classical mechanics, systems tend to move towards states of minimum potential energy. For example, a ball placed on a surface will roll to the lowest point. If we describe the potential energy of a system (e.g., a system of springs and masses, or particles interacting via forces) as a function of its configuration, the critical points of this potential energy function correspond to equilibrium states. A local minimum represents a stable equilibrium (like the bottom of a valley), a local maximum represents an unstable equilibrium (like a ball perfectly balanced on a hilltop), and a saddle point represents a semi-stable or unstable equilibrium.

4.  **Economics & Business:**
    *   **Profit Maximization:** Businesses aim to maximize profit. If profit can be expressed as a function of multiple variables (e.g., production levels of different products, pricing strategies, advertising spend), finding the critical points of this profit function helps identify the optimal combination of these variables to achieve maximum profit. Similarly, cost functions can be minimized by finding their critical points.

## 3. Prerequisites — what you must know first

Before diving into critical points for multivariable functions, ensure you have a solid grasp of these foundational concepts:

*   **Single Variable Calculus - Derivatives:** Understanding what a derivative represents (rate of change, slope of a tangent line) and how to compute derivatives of various functions.
*   **Single Variable Calculus - Local Maxima and Minima:** Knowing how to find local extrema for functions of one variable using the First Derivative Test (where $f'(x)=0$) and the Second Derivative Test ($f''(x)$ sign).
*   **Partial Derivatives:** The ability to compute partial derivatives of a multivariable function with respect to each independent variable, treating other variables as constants.
*   **Gradient Vector:** Understanding that the gradient $\nabla f$ of a scalar function $f(x,y,z)$ is a vector containing all its partial derivatives, and that it points in the direction of the steepest ascent.
*   **Hessian Matrix:** For a multivariable function, the Hessian matrix is a square matrix of its second-order partial derivatives. You should know how to construct it.
*   **Determinants of 2x2 Matrices:** The ability to compute the determinant of a $2 \times 2$ matrix, as this is crucial for the multivariable Second Derivative Test.
*   **Solving Systems of Equations:** Proficiency in solving systems of linear and non-linear algebraic equations, as this is required to find critical points.

## 4. The core idea — step by step

Finding and classifying critical points for a multivariable function $f(x,y)$ involves two main stages: first, locating the points where the "slope is flat," and second, determining what kind of flat spot each point is (a peak, a valley, or a saddle).

### Step 1: The Intuition of "Flatness"

**Plain English:** For a surface, if you're standing at a peak, a valley, or a saddle point, the ground directly under your feet feels flat. There's no immediate uphill or downhill direction. If you were to roll a tiny ball from that exact spot, it wouldn't roll away unless given a push.

**Small Concrete Example:** Imagine the function $f(x,y) = x^2 + y^2$. This describes a paraboloid, a bowl shape with its lowest point at $(0,0)$. At $(0,0)$, the surface is perfectly flat. If you take a step in any direction (along the x-axis, y-axis, or any diagonal), you'll start going uphill.

**Formal/Mathematical Version:** For a differentiable function $f(x,y)$, a point $(a,b)$ is a critical point if the gradient vector at that point is the zero vector, or if one or more partial derivatives do not exist.
$$ \nabla f(a,b) = \vec{0} \quad \text{or} \quad \text{one or more partial derivatives are undefined at } (a,b) $$
The gradient vector is given by:
$$ \nabla f(x,y) = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle $$
So, setting the gradient to zero means:
$$ \frac{\partial f}{\partial x}(a,b) = 0 \quad \text{and} \quad \frac{\partial f}{\partial y}(a,b) = 0 $$

**What could go wrong:** Simply finding where the gradient is zero doesn't tell you *what kind* of critical point it is. It could be a local maximum, a local minimum, or a saddle point. Forgetting to check for undefined partial derivatives can also lead to missing critical points, though this is less common for typical polynomial or exponential functions encountered in calculus.

### Step 2: Finding Critical Points (The "Where")

**Plain English:** To find these flat spots, we need to mathematically identify where the slope is zero in all directions. This means calculating the partial derivatives with respect to each variable, setting them all to zero, and then solving the resulting system of equations for $x$ and $y$. Each solution $(x,y)$ is a critical point.

**Small Concrete Example:** Let's find the critical points for $f(x,y) = x^2 + y^2 - 2x + 4y$.
1.  Compute partial derivatives:
    $\frac{\partial f}{\partial x} = 2x - 2$
    $\frac{\partial f}{\partial y} = 2y + 4$
2.  Set them to zero:
    $2x - 2 = 0 \implies x = 1$
    $2y + 4 = 0 \implies y = -2$
3.  The only critical point is $(1, -2)$.

**Formal/Mathematical Version:**
Given a function $f(x,y)$:
1.  Compute the first-order partial derivatives $f_x = \frac{\partial f}{\partial x}$ and $f_y = \frac{\partial f}{\partial y}$.
2.  Set both partial derivatives equal to zero:
    $$ f_x(x,y) = 0 $$
    $$ f_y(x,y) = 0 $$
3.  Solve this system of two equations for the variables $x$ and $y$. Each pair $(x,y)$ that satisfies both equations is a critical point.
4.  Also, identify any points where $f_x$ or $f_y$ are undefined. These are also critical points.

**What could go wrong:** Algebraic errors when solving the system of equations are common. Sometimes, the system can be non-linear and difficult to solve, requiring careful factorization or substitution. Forgetting to solve for *all* possible solutions can lead to missing critical points.

### Step 3: Classifying Critical Points (The "What Kind")

**Plain English:** Once we've found a flat spot, we need to know if it's a peak (local maximum), a valley (local minimum), or a saddle point. We do this by looking at the "curvature" of the surface at that point. If it curves upwards in all directions, it's a valley. If it curves downwards in all directions, it's a peak. If it curves up in some directions and down in others, it's a saddle. We use a test involving second-order partial derivatives to determine this.

**Small Concrete Example:**
Consider the function $f(x,y) = x^2 + y^2$. We found the critical point $(0,0)$.
Now consider $g(x,y) = x^2 - y^2$. The critical point is also $(0,0)$.
For $f(x,y)$, at $(0,0)$, the surface is a bowl opening upwards – a local minimum.
For $g(x,y)$, at $(0,0)$, the surface is a saddle shape. If you move along the x-axis, $x^2$ increases, but along the y-axis, $-y^2$ decreases. This is a saddle point.

**Formal/Mathematical Version (The Second Derivative Test):**
To classify a critical point $(a,b)$, we use the second-order partial derivatives.
1.  Compute the second-order partial derivatives:
    $$ f_{xx} = \frac{\partial^2 f}{\partial x^2} $$
    $$ f_{yy} = \frac{\partial^2 f}{\partial y^2} $$
    $$ f_{xy} = \frac{\partial^2 f}{\partial x \partial y} $$
    (Note: For most functions we encounter, $f_{xy} = f_{yx}$ by Clairaut's Theorem.)
2.  Form the Hessian matrix, or more directly, compute the discriminant $D(x,y)$:
    $$ D(x,y) = f_{xx}(x,y) f_{yy}(x,y) - [f_{xy}(x,y)]^2 $$
    This $D$ value is the determinant of the Hessian matrix for a 2-variable function.
    $$ H(x,y) = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix} $$
    $$ \det(H) = f_{xx}f_{yy} - f_{xy}f_{yx} = f_{xx}f_{yy} - (f_{xy})^2 $$
3.  Evaluate $D(a,b)$ and $f_{xx}(a,b)$ at each critical point $(a,b)$.

**What could go wrong:** Incorrectly calculating second partial derivatives, especially the mixed partial $f_{xy}$, is a common error. Also, misremembering the conditions of the test (which signs mean what) is a frequent trap.

### Step 4: Applying the Second Derivative Test (Detailed Classification)

**Plain English:** Once we have our $D$ value and $f_{xx}$ value for a specific critical point, we use a set of rules to classify it. It's like a diagnostic chart:

*   If $D$ is positive, it's either a peak or a valley. We then look at $f_{xx}$: if $f_{xx}$ is positive (like a "smiley face" curvature), it's a valley (local minimum). If $f_{xx}$ is negative (like a "frowning face" curvature), it's a peak (local maximum).
*   If $D$ is negative, it's definitely a saddle point – curving up in one direction, down in another.
*   If $D$ is zero, the test is inconclusive. We can't tell using this method and would need to use other techniques or graphical analysis.

**Small Concrete Example:**
Let's apply the test to $f(x,y) = x^2 + y^2$. Critical point $(0,0)$.
$f_x = 2x$, $f_y = 2y$.
$f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = 0$.
At $(0,0)$:
$D(0,0) = f_{xx}(0,0)f_{yy}(0,0) - [f_{xy}(0,0)]^2 = (2)(2) - (0)^2 = 4$.
Since $D(0,0) = 4 > 0$, it's either a max or min.
Since $f_{xx}(0,0) = 2 > 0$, it's a **local minimum**. This matches our intuition of a bowl.

Now, for $g(x,y) = x^2 - y^2$. Critical point $(0,0)$.
$g_x = 2x$, $g_y = -2y$.
$g_{xx} = 2$, $g_{yy} = -2$, $g_{xy} = 0$.
At $(0,0)$:
$D(0,0) = g_{xx}(0,0)g_{yy}(0,0) - [g_{xy}(0,0)]^2 = (2)(-2) - (0)^2 = -4$.
Since $D(0,0) = -4 < 0$, it's a **saddle point**. This also matches our intuition.

**Formal/Mathematical Version:**
Let $(a,b)$ be a critical point of $f(x,y)$.
1.  **If $D(a,b) > 0$:**
    *   If $f_{xx}(a,b) > 0$, then $f$ has a **local minimum** at $(a,b)$.
    *   If $f_{xx}(a,b) < 0$, then $f$ has a **local maximum** at $(a,b)$.
2.  **If $D(a,b) < 0$:**
    *   Then $f$ has a **saddle point** at $(a,b)$.
3.  **If $D(a,b) = 0$:**
    *   The test is **inconclusive**. Further analysis (e.g., examining higher-order derivatives or using graphical methods) is needed to classify the point.

**What could go wrong:** Mixing up the conditions for local max/min (e.g., confusing $f_{xx} > 0$ with a maximum). Forgetting about the $D=0$ case and incorrectly assuming it means no extremum.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Local Minimum

**Problem:** Find and classify all critical points of the function $f(x,y) = x^2 + y^2 - 6x + 4y + 10$.

**Given:** A multivariable function $f(x,y) = x^2 + y^2 - 6x + 4y + 10$.
**Want:** All critical points and their classification (local max, local min, saddle point).

**Step 1: Find the first-order partial derivatives.**
$$ f_x = \frac{\partial}{\partial x}(x^2 + y^2 - 6x + 4y + 10) = 2x - 6 $$
$$ f_y = \frac{\partial}{\partial y}(x^2 + y^2 - 6x + 4y + 10) = 2y + 4 $$
*Explanation: We differentiate $f$ with respect to $x$, treating $y$ as a constant. Then we differentiate $f$ with respect to $y$, treating $x$ as a constant.*

**Step 2: Set the partial derivatives to zero and solve the system to find critical points.**
$$ 2x - 6 = 0 \quad \Rightarrow \quad 2x = 6 \quad \Rightarrow \quad x = 3 $$
$$ 2y + 4 = 0 \quad \Rightarrow \quad 2y = -4 \quad \Rightarrow \quad y = -2 $$
*Explanation: We are looking for points where the gradient vector is zero. This means both partial derivatives must be zero simultaneously. We solve each equation for its respective variable.*

The only critical point is $(3, -2)$.

**Step 3: Find the second-order partial derivatives.**
$$ f_{xx} = \frac{\partial}{\partial x}(2x - 6) = 2 $$
$$ f_{yy} = \frac{\partial}{\partial y}(2y + 4) = 2 $$
$$ f_{xy} = \frac{\partial}{\partial y}(2x - 6) = 0 $$
*Explanation: We differentiate $f_x$ with respect to $x$ to get $f_{xx}$. We differentiate $f_y$ with respect to $y$ to get $f_{yy}$. We differentiate $f_x$ with respect to $y$ (or $f_y$ with respect to $x$) to get $f_{xy}$. Since $f_{xy}=f_{yx}$ for well-behaved functions, we only need one mixed partial.*

**Step 4: Compute the discriminant $D(x,y) = f_{xx}f_{yy} - (f_{xy})^2$.**
$$ D(x,y) = (2)(2) - (0)^2 = 4 $$
*Explanation: We plug the second partial derivatives into the formula for the discriminant $D$. In this case, the second partials are constants, so $D$ is also a constant.*

**Step 5: Evaluate $D$ and $f_{xx}$ at the critical point and classify.**
At the critical point $(3, -2)$:
$$ D(3,-2) = 4 $$
$$ f_{xx}(3,-2) = 2 $$
*Explanation: We evaluate $D$ and $f_{xx}$ at the specific critical point we found. Since $D$ is a constant here, its value is 4 at $(3,-2)$. Similarly, $f_{xx}$ is a constant 2.*

Since $D(3,-2) = 4 > 0$ and $f_{xx}(3,-2) = 2 > 0$, the function has a **local minimum** at $(3, -2)$.
The value of the function at this minimum is $f(3,-2) = (3)^2 + (-2)^2 - 6(3) + 4(-2) + 10 = 9 + 4 - 18 - 8 + 10 = -3$.

**Final Answer:**
The function $f(x,y)$ has one critical point at $(3, -2)$, which is a **local minimum**.

**Reflection:** This example was straightforward because the partial derivatives were linear, leading to a simple system of equations and constant second partials. The function is a paraboloid, so it has a single global minimum.

---

### Example 2: Multiple Critical Points (Max, Min, and Saddle)

**Problem:** Find and classify all critical points of the function $f(x,y) = x^3 + y^3 - 3xy$.

**Given:** A multivariable function $f(x,y) = x^3 + y^3 - 3xy$.
**Want:** All critical points and their classification.

**Step 1: Find the first-order partial derivatives.**
$$ f_x = \frac{\partial}{\partial x}(x^3 + y^3 - 3xy) = 3x^2 - 3y $$
$$ f_y = \frac{\partial}{\partial y}(x^3 + y^3 - 3xy) = 3y^2 - 3x $$
*Explanation: Differentiate $f$ with respect to $x$ (treating $y$ as constant) and then with respect to $y$ (treating $x$ as constant).*

**Step 2: Set the partial derivatives to zero and solve the system.**
$$ 3x^2 - 3y = 0 \quad \Rightarrow \quad x^2 = y \quad \text{(Equation 1)} $$
$$ 3y^2 - 3x = 0 \quad \Rightarrow \quad y^2 = x \quad \text{(Equation 2)} $$
*Explanation: We set both partial derivatives to zero. This gives us a system of non-linear equations to solve.*

Substitute Equation 1 into Equation 2:
$$ (x^2)^2 = x $$
$$ x^4 = x $$
$$ x^4 - x = 0 $$
$$ x(x^3 - 1) = 0 $$
*Explanation: We use substitution to reduce the system to a single equation in one variable.*

This equation gives two possibilities for $x$:
1.  $x = 0$
2.  $x^3 - 1 = 0 \quad \Rightarrow \quad x^3 = 1 \quad \Rightarrow \quad x = 1$ (We only consider real solutions for $x$ and $y$ here).
*Explanation: Factor out $x$ and solve for the roots.*

Now find the corresponding $y$ values using $y = x^2$:
*   If $x = 0$, then $y = (0)^2 = 0$. Critical point: $(0,0)$.
*   If $x = 1$, then $y = (1)^2 = 1$. Critical point: $(1,1)$.
*Explanation: Plug the $x$ values back into one of the original simplified equations ($y=x^2$) to find the corresponding $y$ values.*

The critical points are $(0,0)$ and $(1,1)$.

**Step 3: Find the second-order partial derivatives.**
$$ f_{xx} = \frac{\partial}{\partial x}(3x^2 - 3y) = 6x $$
$$ f_{yy} = \frac{\partial}{\partial y}(3y^2 - 3x) = 6y $$
$$ f_{xy} = \frac{\partial}{\partial y}(3x^2 - 3y) = -3 $$
*Explanation: Compute the second partial derivatives from the first partial derivatives.*

**Step 4: Compute the discriminant $D(x,y) = f_{xx}f_{yy} - (f_{xy})^2$.**
$$ D(x,y) = (6x)(6y) - (-3)^2 = 36xy - 9 $$
*Explanation: Plug the second partial derivatives into the formula for $D$. Note that $D$ is now a function of $x$ and $y$, so its value will change at different critical points.*

**Step 5: Evaluate $D$ and $f_{xx}$ at each critical point and classify.**

**For critical point $(0,0)$:**
$$ D(0,0) = 36(0)(0) - 9 = -9 $$
$$ f_{xx}(0,0) = 6(0) = 0 $$
*Explanation: Substitute $x=0, y=0$ into the expressions for $D$ and $f_{xx}$.*

Since $D(0,0) = -9 < 0$, the point $(0,0)$ is a **saddle point**.

**For critical point $(1,1)$:**
$$ D(1,1) = 36(1)(1) - 9 = 36 - 9 = 27 $$
$$ f_{xx}(1,1) = 6(1) = 6 $$
*Explanation: Substitute $x=1, y=1$ into the expressions for $D$ and $f_{xx}$.*

Since $D(1,1) = 27 > 0$ and $f_{xx}(1,1) = 6 > 0$, the point $(1,1)$ is a **local minimum**.
The value of the function at this minimum is $f(1,1) = (1)^3 + (1)^3 - 3(1)(1) = 1 + 1 - 3 = -1$.

**Final Answer:**
The function $f(x,y)$ has two critical points:
1.  $(0,0)$, which is a **saddle point**.
2.  $(1,1)$, which is a **local minimum**.

**Reflection:** This example required solving a non-linear system of equations, which is a common challenge. It also demonstrated how $D$ and $f_{xx}$ can vary between critical points, leading to different classifications.

---

### Example 3: Infinitely Many Critical Points (All Saddles)

**Problem:** Find and classify all critical points of the function $f(x,y) = \sin x \sin y$.

**Given:** A multivariable function $f(x,y) = \sin x \sin y$.
**Want:** All critical points and their classification.

**Step 1: Find the first-order partial derivatives.**
$$ f_x = \frac{\partial}{\partial x}(\sin x \sin y) = \cos x \sin y $$
$$ f_y = \frac{\partial}{\partial y}(\sin x \sin y) = \sin x \cos y $$
*Explanation: Apply differentiation rules. $\sin y$ is treated as a constant when differentiating with respect to $x$, and $\sin x$ is treated as a constant when differentiating with respect to $y$.*

**Step 2: Set the partial derivatives to zero and solve the system.**
$$ \cos x \sin y = 0 \quad \text{(Equation 1)} $$
$$ \sin x \cos y = 0 \quad \text{(Equation 2)} $$
*Explanation: We need both equations to be true simultaneously.*

From Equation 1, either $\cos x = 0$ or $\sin y = 0$.
From Equation 2, either $\sin x = 0$ or $\cos y = 0$.

Let's consider the cases:

**Case A: $\cos x = 0$.**
This means $x = \frac{\pi}{2} + n\pi$ for any integer $n$.
If $\cos x = 0$, then $\sin x \neq 0$ (since $\sin^2 x + \cos^2 x = 1$).
For Equation 2 to be true ($\sin x \cos y = 0$), we must have $\cos y = 0$.
This means $y = \frac{\pi}{2} + m\pi$ for any integer $m$.
So, critical points are of the form $\left( \frac{\pi}{2} + n\pi, \frac{\pi}{2} + m\pi \right)$.

**Case B: $\sin y = 0$.**
This means $y = k\pi$ for any integer $k$.
If $\sin y = 0$, then $\cos y \neq 0$.
For Equation 2 to be true ($\sin x \cos y = 0$), we must have $\sin x = 0$.
This means $x = j\pi$ for any integer $j$.
So, critical points are of the form $\left( j\pi, k\pi \right)$.

*Explanation: We systematically consider the conditions under which the product of trigonometric functions is zero. We must ensure that the choices satisfy both equations. For example, if $\cos x = 0$, then $x$ is an odd multiple of $\pi/2$. For $\sin x \cos y = 0$ to hold, since $\sin x \neq 0$ (when $\cos x = 0$), we must have $\cos y = 0$. This leads to the first set of critical points. Similarly for the second set.*

The critical points are $\left( \frac{\pi}{2} + n\pi, \frac{\pi}{2} + m\pi \right)$ and $\left( j\pi, k\pi \right)$ for any integers $n, m, j, k$.

**Step 3: Find the second-order partial derivatives.**
$$ f_{xx} = \frac{\partial}{\partial x}(\cos x \sin y) = -\sin x \sin y $$
$$ f_{yy} = \frac{\partial}{\partial y}(\sin x \cos y) = -\sin x \sin y $$
$$ f_{xy} = \frac{\partial}{\partial y}(\cos x \sin y) = \cos x \cos y $$
*Explanation: Compute the second partial derivatives.*

**Step 4: Compute the discriminant $D(x,y) = f_{xx}f_{yy} - (f_{xy})^2$.**
$$ D(x,y) = (-\sin x \sin y)(-\sin x \sin y) - (\cos x \cos y)^2 $$
$$ D(x,y) = (\sin x \sin y)^2 - (\cos x \cos y)^2 $$
*Explanation: Plug the second partial derivatives into the formula for $D$.*

**Step 5: Evaluate $D$ and $f_{xx}$ at each critical point and classify.**

**For critical points of the form $\left( \frac{\pi}{2} + n\pi, \frac{\pi}{2} + m\pi \right)$:**
At these points, $\cos x = 0$ and $\cos y = 0$.
Also, $\sin x = \pm 1$ and $\sin y = \pm 1$.
$$ D\left( \frac{\pi}{2} + n\pi, \frac{\pi}{2} + m\pi \right) = (\sin(\frac{\pi}{2} + n\pi) \sin(\frac{\pi}{2} + m\pi))^2 - (\cos(\frac{\pi}{2} + n\pi) \cos(\frac{\pi}{2} + m\pi))^2 $$
$$ D = (\pm 1 \cdot \pm 1)^2 - (0 \cdot 0)^2 = ( \pm 1 )^2 - 0 = 1 $$
Since $D = 1 > 0$, these points are either local maxima or local minima.
Now check $f_{xx}$:
$$ f_{xx}\left( \frac{\pi}{2} + n\pi, \frac{\pi}{2} + m\pi \right) = -\sin\left(\frac{\pi}{2} + n\pi\right) \sin\left(\frac{\pi}{2} + m\pi\right) $$
This value will be $-(\pm 1)(\pm 1)$, which means $f_{xx}$ can be either $-1$ or $1$.
*   If $f_{xx} = -1 < 0$, it's a local maximum. This happens when $n$ and $m$ are both even or both odd (e.g., $x=\pi/2, y=\pi/2 \implies \sin x=1, \sin y=1 \implies f_{xx}=-1$).
*   If $f_{xx} = 1 > 0$, it's a local minimum. This happens when one of $n,m$ is even and the other is odd (e.g., $x=\pi/2, y=3\pi/2 \implies \sin x=1, \sin y=-1 \implies f_{xx}=1$).
*Explanation: We substitute the forms of $x$ and $y$ into $D$ and $f_{xx}$. The key is that $\cos x = 0$ and $\cos y = 0$ at these points, simplifying $D$. Then we analyze $f_{xx}$ to distinguish between max and min.*

**For critical points of the form $\left( j\pi, k\pi \right)$:**
At these points, $\sin x = 0$ and $\sin y = 0$.
Also, $\cos x = \pm 1$ and $\cos y = \pm 1$.
$$ D(j\pi, k\pi) = (\sin(j\pi) \sin(k\pi))^2 - (\cos(j\pi) \cos(k\pi))^2 $$
$$ D = (0 \cdot 0)^2 - ((\pm 1) \cdot (\pm 1))^2 = 0 - (\pm 1)^2 = -1 $$
*Explanation: Here, $\sin x = 0$ and $\sin y = 0$ simplifies $D$ to $-(\cos x \cos y)^2$. Since $\cos x$ and $\cos y$ are always $\pm 1$ at these points, their product is $\pm 1$, and its square is $1$. Thus $D=-1$.*

Since $D(j\pi, k\pi) = -1 < 0$, all points of the form $(j\pi, k\pi)$ are **saddle points**.

**Final Answer:**
The function $f(x,y)$ has infinitely many critical points:
1.  Points of the form $(j\pi, k\pi)$ for integers $j, k$ are **saddle points**.
2.  Points of the form $\left( \frac{\pi}{2} + n\pi, \frac{\pi}{2} + m\pi \right)$ for integers $n, m$ are either **local maxima** (if $f_{xx} < 0$) or **local minima** (if $f_{xx} > 0$).
    *   Specifically, if $n$ and $m$ have the same parity (both even or both odd), $f_{xx} = -1$, leading to a local maximum.
    *   If $n$ and $m$ have different parity (one even, one odd), $f_{xx} = 1$, leading to a local minimum.

**Reflection:** This example highlights functions with periodic behavior, leading to an infinite number of critical points. It also shows how the classification can depend on the specific integer values of $n$ and $m$, as $f_{xx}$ changes sign. The algebraic manipulation of trigonometric identities is key here.

---

### Example 4: More Complex Algebra and Multiple Critical Points

**Problem:** Find and classify all critical points of $f(x,y) = (x^2 + y^2)e^{-x}$.

**Given:** A multivariable function $f(x,y) = (x^2 + y^2)e^{-x}$.
**Want:** All critical points and their classification.

**Step 1: Find the first-order partial derivatives.**
Using the product rule for $f_x$:
$$ f_x = \frac{\partial}{\partial x}((x^2 + y^2)e^{-x}) = (2x)e^{-x} + (x^2 + y^2)(-e^{-x}) = e^{-x}(2x - x^2 - y^2) $$
$$ f_y = \frac{\partial}{\partial y}((x^2 + y^2)e^{-x}) = (2y)e^{-x} $$
*Explanation: Apply the product rule for $f_x$ (since both $x^2+y^2$ and $e^{-x}$ depend on $x$). For $f_y$, only $y^2$ depends on $y$, so $e^{-x}$ is treated as a constant factor.*

**Step 2: Set the partial derivatives to zero and solve the system.**
$$ e^{-x}(2x - x^2 - y^2) = 0 \quad \text{(Equation 1)} $$
$$ 2ye^{-x} = 0 \quad \text{(Equation 2)} $$
*Explanation: Set both $f_x$ and $f_y$ to zero.*

From Equation 2: $2ye^{-x} = 0$. Since $e^{-x}$ is never zero, we must have $2y = 0$, which implies $y = 0$.
*Explanation: $e^{-x}$ is always positive, so for the product to be zero, $2y$ must be zero.*

Now substitute $y=0$ into Equation 1:
$$ e^{-x}(2x - x^2 - (0)^2) = 0 $$
$$ e^{-x}(2x - x^2) = 0 $$
Again, since $e^{-x} \neq 0$, we must have $2x - x^2 = 0$.
$$ x(2 - x) = 0 $$
This gives two possibilities for $x$:
1.  $x = 0$
2.  $x = 2$
*Explanation: We use the fact that $e^{-x} \neq 0$ to simplify the equations. Then we solve the resulting quadratic equation for $x$.*

So, with $y=0$, the critical points are:
*   $(0,0)$
*   $(2,0)$

**Step 3: Find the second-order partial derivatives.**
$$ f_{xx} = \frac{\partial}{\partial x}(e^{-x}(2x - x^2 - y^2)) $$
Using the product rule: $(-e^{-x})(2x - x^2 - y^2) + e^{-x}(2 - 2x)$
$$ f_{xx} = e^{-x}(-2x + x^2 + y^2 + 2 - 2x) = e^{-x}(x^2 - 4x + y^2 + 2) $$
$$ f_{yy} = \frac{\partial}{\partial y}(2ye^{-x}) = 2e^{-x} $$
$$ f_{xy} = \frac{\partial}{\partial y}(e^{-x}(2x - x^2 - y^2)) = e^{-x}(-2y) = -2ye^{-x} $$
*Explanation: This step requires careful application of the product rule and chain rule for $f_{xx}$ and $f_{xy}$. $f_{yy}$ is simpler.*

**Step 4: Compute the discriminant $D(x,y) = f_{xx}f_{yy} - (f_{xy})^2$.**
$$ D(x,y) = (e^{-x}(x^2 - 4x + y^2 + 2))(2e^{-x}) - (-2ye^{-x})^2 $$
$$ D(x,y) = 2e^{-2x}(x^2 - 4x + y^2 + 2) - 4y^2e^{-2x} $$
Factor out $e^{-2x}$:
$$ D(x,y) = e^{-2x}[2(x^2 - 4x + y^2 + 2) - 4y^2] $$
$$ D(x,y) = e^{-2x}[2x^2 - 8x + 2y^2 + 4 - 4y^2] $$
$$ D(x,y) = e^{-2x}[2x^2 - 8x - 2y^2 + 4] $$
*Explanation: Substitute the second partial derivatives into the formula for $D$. Simplify the expression by factoring out $e^{-2x}$ and combining terms.*

**Step 5: Evaluate $D$ and $f_{xx}$ at each critical point and classify.**

**For critical point $(0,0)$:**
$$ D(0,0) = e^{-2(0)}[2(0)^2 - 8(0) - 2(0)^2 + 4] = 1[0 - 0 - 0 + 4] = 4 $$
$$ f_{xx}(0,0) = e^{-0}(0^2 - 4(0) + 0^2 + 2) = 1(2) = 2 $$
*Explanation: Substitute $x=0, y=0$ into the expressions for $D$ and $f_{xx}$.*

Since $D(0,0) = 4 > 0$ and $f_{xx}(0,0) = 2 > 0$, the point $(0,0)$ is a **local minimum**.
The value of the function at this minimum is $f(0,0) = (0^2+0^2)e^{-0} = 0$.

**For critical point $(2,0)$:**
$$ D(2,0) = e^{-2(2)}[2(2)^2 - 8(2) - 2(0)^2 + 4] = e^{-4}[2(4) - 16 - 0 + 4] $$
$$ D(2,0) = e^{-4}[8 - 16 + 4] = e^{-4}[-4] = -4e^{-4} $$
*Explanation: Substitute $x=2, y=0$ into the expressions for $D$. Note that $e^{-4}$ is positive, so the sign of $D$ is determined by $-4$.*

Since $D(2,0) = -4e^{-4} < 0$, the point $(2,0)$ is a **saddle point**.

**Final Answer:**
The function $f(x,y)$ has two critical points:
1.  $(0,0)$, which is a **local minimum**.
2.  $(2,0)$, which is a **saddle point**.

**Reflection:** This example involved more complex derivatives due to the exponential term and required careful algebraic simplification of the discriminant. It's a good illustration of how critical points can exist at various locations and have different classifications.

## 6. Common mistakes and traps

1.  **Algebraic Errors in Solving the System:** This is by far the most common mistake. Students might miscalculate when setting partial derivatives to zero, especially with non-linear systems or when factors need to be carefully handled (e.g., $x(x-1)=0$ means $x=0$ or $x=1$, not just $x=1$).
2.  **Incorrect Partial Derivatives:** Errors in computing $f_x$, $f_y$, $f_{xx}$, $f_{yy}$, or especially $f_{xy}$. A single sign error or forgotten chain rule can propagate through the entire classification process.
3.  **Forgetting to Check for Undefined Derivatives:** While less common in typical exam problems, a critical point can exist where partial derivatives are undefined (e.g., at a sharp corner or cusp on the surface). These points must also be identified.
4.  **Misremembering Second Derivative Test Conditions:** Confusing $f_{xx} > 0$ for a local maximum or $f_{xx} < 0$ for a local minimum. Remember: $f_{xx} > 0$ implies concavity *up* (like a bowl), so it's a minimum. $f_{xx} < 0$ implies concavity *down* (like an inverted bowl), so it's a maximum.
5.  **Assuming $D=0$ Means No Extremum:** When $D=0$, the test is inconclusive. It does *not* mean there is no local maximum or minimum, nor does it mean it's necessarily a saddle point. It simply means this particular test doesn't provide enough information.
6.  **Evaluating $D$ and $f_{xx}$ at the wrong point:** After finding critical points, remember to plug the specific $(x,y)$ coordinates of *each* critical point into the expressions for $D$ and $f_{xx}$ before classifying them. $D$ and $f_{xx}$ are usually functions of $x$ and $y$.

## 7. Textbook-precise explanation

Let $f$ be a function of two variables, $f: \mathbb{R}^2 \to \mathbb{R}$, with continuous second-order partial derivatives in an open disk containing a point $(a,b)$.

**Definition: Critical Point**
A point $(a,b)$ in the domain of $f$ is called a **critical point** if either:
1.  $\nabla f(a,b) = \vec{0}$, which means $f_x(a,b) = 0$ and $f_y(a,b) = 0$.
2.  One or both of the first-order partial derivatives, $f_x(a,b)$ or $f_y(a,b)$, do not exist.

**Definition: Local Maximum/Minimum**
*   $f$ has a **local maximum** at $(a,b)$ if $f(x,y) \le f(a,b)$ for all $(x,y)$ in an open disk centered at $(a,b)$.
*   $f$ has a **local minimum** at $(a,b)$ if $f(x,y) \ge f(a,b)$ for all $(x,y)$ in an open disk centered at $(a,b)$.
*   A local maximum or local minimum is collectively referred to as a **local extremum**.

**Theorem: Second Derivative Test (for functions of two variables)**
Let $(a,b)$ be a critical point of $f(x,y)$ where $f_x(a,b) = 0$ and $f_y(a,b) = 0$. Assume that the second-order partial derivatives $f_{xx}$, $f_{yy}$, and $f_{xy}$ are continuous on an open disk containing $(a,b)$.
Define the **discriminant** (or Hessian determinant) $D(x,y)$ as:
$$ D(x,y) = f_{xx}(x,y) f_{yy}(x,y) - [f_{xy}(x,y)]^2 $$
Then:
1.  If $D(a,b) > 0$ and $f_{xx}(a,b) > 0$, then $f$ has a **local minimum** at $(a,b)$.
2.  If $D(a,b) > 0$ and $f_{xx}(a,b) < 0$, then $f$ has a **local maximum** at $(a,b)$.
3.  If $D(a,b) < 0$, then $f$ has a **saddle point** at $(a,b)$.
4.  If $D(a,b) = 0$, the test is **inconclusive**. The point could be a local maximum, a local minimum, or a saddle point, or none of these. Further investigation is required.

*Reference: Stewart, Calculus: Early Transcendentals, 9th ed., §14.7*

## 8. ASCII diagrams

Here are descriptions and an ASCII diagram for visualizing critical points:

**1. Local Minimum (Valley):**
Imagine a bowl sitting on a table. The lowest point in the center of the bowl is a local minimum. If you walk in any direction from that point, you will go uphill. The surface curves upwards in all directions.
```text
       ^ z
       |
       |     _.-'-._
       |   .'       '.
       |  /           \
       | |             |
       +-'-------------'-+  (x-y plane)
         \             /
          '.         .'
            '-._ _.-'

This represents a local minimum. The point at the very bottom (center) is a critical point.
```

**2. Local Maximum (Hilltop):**
Imagine an inverted bowl or the top of a smooth, rounded hill. The highest point on the hill is a local maximum. If you walk in any direction from that point, you will go downhill. The surface curves downwards in all directions.
```text
       ^ z
       |     _.-'-._
       |   .'       '.
       |  /           \
       | |             |  (Peak at center)
       +-'-------------'-+  (x-y plane)
         \             /
          '.         .'
            '-._ _.-'
            (This diagram is an inverted version of the minimum,
             representing the peak of a hill.)

This represents a local maximum. The point at the very top (center) is a critical point.
```

**3. Saddle Point:**
Imagine a horse's saddle or a mountain pass. At the very center of the saddle, the ground is flat. If you walk along the length of the saddle (e.g., along the x-axis), you might go down into a dip. But if you walk across the saddle (e.g., along the y-axis), you might go up over a hump. It's a critical point because the gradient is zero, but it's neither a true peak nor a true valley.

Here's a contour map representation of a saddle point:
```text
       ^ y
       |
    ---\---/---   (Contour line for a higher value, e.g., z=1)
   /    \ /    \
  |      X      |  (Saddle point at X, e.g., z=0)
   \    / \    /
    ---/---\---   (Contour line for a lower value, e.g., z=-1)
       |
       +-------> x

In this contour map, moving horizontally through X might lead to increasing values (like going over a ridge), while moving vertically through X might lead to decreasing values (like going into a valley). The point X itself is flat.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    "**G**radient **Z**ero **H**essian **T**ells **S**tory"
    *   **G**radient **Z**ero: This is how you *find* the critical points ($\nabla f = \vec{0}$).
    *   **H**essian **T**ells **S**tory: This refers to the Second Derivative Test using the Hessian determinant ($D$) to *classify* the critical points.
    Visualize a flat landscape (gradient zero). Then zoom in on each flat spot: is it a bowl (min), a dome (max), or a saddle? The Hessian (curvature) tells you.

2.  **Formulas/Facts to Overlearn:**
    *   **Finding Critical Points:** Set the gradient to zero:
        $$ \frac{\partial f}{\partial x} = 0 \quad \text{and} \quad \frac{\partial f}{\partial y} = 0 $$
    *   **The Discriminant (Hessian Determinant):**
        $$ D = f_{xx}f_{yy} - (f_{xy})^2 $$
    *   **Classification Rules (Second Derivative Test):**
        *   If $D > 0$ and $f_{xx} > 0 \implies$ Local Minimum
        *   If $D > 0$ and $f_{xx} < 0 \implies$ Local Maximum
        *   If $D < 0 \implies$ Saddle Point
        *   If $D = 0 \implies$ Inconclusive

3.  **Spaced Repetition Schedule:**
    *   **Review 1:** After 1 day.
    *   **Review 2:** After 3 days.
    *   **Review 3:** After 7 days.
    *   **Review 4:** After 16 days.
    *   **Review 5:** After 35 days.
    Actively recall the steps, formulas, and classification rules for a few minutes at each interval. Try to work through a simple example from scratch.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the Second Derivative Test rules, think back to single-variable calculus:
    *   For $g(x)$, a critical point is where $g'(x)=0$.
    *   If $g''(x) > 0$, it's a local minimum (concave up).
    *   If $g''(x) < 0$, it's a local maximum (concave down).
    Now, extend this to two variables. A multivariable function $f(x,y)$ can be viewed by taking cross-sections.
    *   If you fix $y=b$, you get $g(x) = f(x,b)$. Its second derivative is $f_{xx}(a,b)$.
    *   If you fix $x=a$, you get $h(y) = f(a,y)$. Its second derivative is $f_{yy}(a,b)$.
    If $f_{xx}(a,b) > 0$ and $f_{yy}(a,b) > 0$, it suggests a minimum. If both are negative, it suggests a maximum. If they have opposite signs, it suggests a saddle.
    The $D$ value incorporates the *mixed* partial derivative $f_{xy}$, which accounts for how the curvature changes off-axis. The derivation of $D$ itself comes from considering the quadratic approximation of $f(x,y)$ around the critical point using Taylor series, and analyzing the eigenvalues of the Hessian matrix. The signs of the eigenvalues determine the nature of the critical point. For a $2 \times 2$ Hessian, the determinant ($D$) and the top-left element ($f_{xx}$) are sufficient to determine the signs of the eigenvalues.

## 10. Connections — what this leads to

Understanding critical points is a cornerstone for many advanced mathematical and applied topics:

1.  **Constrained Optimization (Lagrange Multipliers):** This topic extends the idea of finding extrema to situations where the variables are subject to one or more constraints (e.g., finding the maximum volume of a box given a fixed surface area). Critical points are still the underlying mechanism, but the method for finding them is modified.
2.  **Optimization in Machine Learning:** Algorithms like Gradient Descent, Newton's Method, and their variants are fundamentally searching for critical points (specifically, local minima) of loss functions in high-dimensional spaces. The concepts of gradient and Hessian generalize directly to many variables.
3.  **Stability Analysis in Dynamical Systems:** In physics and engineering, the stability of an equilibrium point (a state where a system doesn't change) is often determined by analyzing the critical points of a potential energy function or a Lyapunov function. Local minima correspond to stable equilibria, while saddle points and local maxima correspond to unstable equilibria.
4.  **Morse Theory:** This is a branch of differential topology that relates the critical points of a smooth function on a manifold to the topology of the manifold. It provides a deeper understanding of how the number and type of critical points influence the "shape" of the space.
5.  **Variational Calculus:** This field deals with optimizing functionals (functions of functions), such as finding the path of shortest distance between two points on a surface. The Euler-Lagrange equations, which are central to variational calculus, are analogous to setting partial derivatives to zero to find critical points.
6.  **Global Optimization:** While the Second Derivative Test classifies *local* extrema, understanding critical points is the first step towards finding *global* maxima and minima over a given domain. This often involves comparing the values at critical points with values on the boundary of the domain.

## 11. Self-check questions

1.  Find and classify all critical points of $f(x,y) = x^2 + xy + y^2 + 3x - 3y + 4$.
2.  Find and classify all critical points of $f(x,y) = x^4 + y^4 - 4xy + 1$.
3.  Consider the function $f(x,y) = (x-1)^2 y^2$. Find its critical points. What happens when you apply the Second Derivative Test to these points?
4.  Find and classify all critical points of $f(x,y) = x e^{y^2 - x^2}$.
5.  Suppose a function $g(x,y)$ has continuous second partial derivatives. If $g_x(1,2) = 0$, $g_y(1,2) = 0$, $g_{xx}(1,2) = 3$, $g_{yy}(1,2) = -2$, and $g_{xy}(1,2) = 4$, what can you conclude about the point $(1,2)$? If $g_{xy}(1,2)$ were $1$, what would you conclude?