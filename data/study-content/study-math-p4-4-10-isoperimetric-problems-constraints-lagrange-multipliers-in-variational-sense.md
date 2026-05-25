## 1. What it is — in plain English

Imagine you have a piece of rope, say 10 meters long. You want to use this rope to enclose the largest possible area on the ground. What shape should you make? Should it be a square, a triangle, or something else? This is the essence of an "isoperimetric problem." "Iso" means "same," and "perimeter" means the boundary length. So, an isoperimetric problem is about finding the optimal shape (like the one enclosing the most area) when its "perimeter" (or some other boundary measurement) is fixed.

Now, what about "variational sense" and "Lagrange multipliers"? In basic calculus, you find the maximum or minimum of a *function* by taking its derivative and setting it to zero. For example, you find the height that maximizes a ball's trajectory. But here, we're not looking for a single number; we're looking for an entire *function* or *shape* that optimizes something. This is what "variational sense" means – we're varying a function, not just a number.

The "Lagrange multipliers" part comes in when you have a constraint. Think of it like this: if you wanted to maximize the area of *any* shape, you could just make it infinitely big! But our rope has a fixed length – that's our constraint. Lagrange multipliers are a clever mathematical trick to handle these constraints. They allow us to combine the thing we want to optimize (like area) with the thing that's fixed (like perimeter) into a single problem, making it solvable.

So, in simple terms, this topic is about finding the best possible shape or path to achieve a goal (like maximum area or minimum time) when there's a strict rule or limit (like a fixed boundary length or a fixed amount of material) that the shape or path must obey.

## 2. Why it matters — real-world applications

Isoperimetric problems, especially when tackled with variational Lagrange multipliers, are not just abstract mathematical puzzles; they underpin fundamental principles in science and engineering.

1.  **Aerospace Engineering & Fluid Dynamics (Optimal Shapes):** Consider the design of an aircraft wing or a submarine hull. Engineers want to minimize drag for a given lift or buoyancy, or maximize volume for a given surface area. The shape a soap bubble naturally takes (a sphere) is an isoperimetric solution: it minimizes surface area for a given enclosed volume. Similarly, the shape of a liquid drop on a surface or the form of a minimal surface in architecture (like a tent structure that minimizes fabric for a given span) are direct applications. Companies like **Boeing** or **Airbus** use these principles to optimize aerodynamic profiles for fuel efficiency.

2.  **Physics (Principle of Least Action & Conservation Laws):** One of the most profound applications is in classical mechanics. Hamilton's Principle states that the path a physical system takes between two points in time is the one that minimizes the "action" (an integral quantity related to kinetic and potential energy). When there are conservation laws (like conservation of energy or momentum), these act as constraints on the system's evolution. Variational Lagrange multipliers are precisely the tool to incorporate these constraints into the action principle, leading to the correct equations of motion. For example, deriving the motion of a pendulum with a fixed length rod. This is fundamental to understanding how the universe works.

3.  **Materials Science & Manufacturing (Optimal Material Use):** Imagine designing a beam or a column that needs to support a certain load. Engineers want to find the cross-sectional shape that provides maximum strength or stiffness using the minimum amount of material. This is an isoperimetric problem where the "material amount" (e.g., cross-sectional area) is fixed, and we want to optimize a structural property. This leads to efficient designs, reducing waste and cost. **Tesla** or **SpaceX** might use such optimization to design lightweight yet strong structural components for their vehicles.

4.  **Economics and Resource Allocation (Constrained Optimization):** In economics, firms often seek to maximize profit or minimize cost subject to budget constraints, production capacity limits, or regulatory requirements. While often modeled with finite-dimensional Lagrange multipliers, the conceptual extension to continuous processes (e.g., optimizing production rates over time under a fixed total resource budget) involves variational principles and their constrained counterparts. Governments might use similar methods to allocate resources for public projects over time.

## 3. Prerequisites — what you must know first

Before diving deep into isoperimetric problems with variational Lagrange multipliers, ensure you have a solid grasp of the following concepts. If any feel unfamiliar, pause and review them.

*   **Calculus I (Single Variable):**
    *   **Derivatives:** Rules of differentiation (product, quotient, chain rule).
    *   **Integrals:** Techniques of integration (substitution, by parts), definite and indefinite integrals.
    *   **Optimization:** Finding maxima and minima of functions using first and second derivatives.
*   **Calculus II (Multivariable):**
    *   **Partial Derivatives:** Differentiating functions of multiple variables with respect to one variable while holding others constant.
    *   **Gradient:** The vector of partial derivatives, indicating the direction of steepest ascent.
    *   **Chain Rule for Multivariable Functions:** How to differentiate composite functions involving multiple variables.
*   **Vector Calculus:**
    *   **Line Integrals:** Integrating a function along a curve. This is crucial for defining functionals like arc length or work.
*   **Ordinary Differential Equations (ODEs):**
    *   **Solving First and Second Order ODEs:** Techniques for solving common types of ODEs (separation of variables, integrating factors, homogeneous equations, constant coefficients). The Euler-Lagrange equation often results in a second-order ODE.
*   **Linear Algebra:**
    *   **Vectors and Matrices:** Basic operations, understanding linear independence. (Less directly applied here, but foundational for general mathematical maturity).
*   **Introduction to Optimization:**
    *   **Constrained Optimization:** The general idea of finding extrema subject to conditions.
*   **Lagrange Multipliers (Finite-Dimensional):**
    *   **The Method:** How to find the extrema of a function $f(x_1, \dots, x_n)$ subject to a constraint $g(x_1, \dots, x_n) = c$. Understanding the geometric intuition that $\nabla f$ must be parallel to $\nabla g$ at an extremum. This is the direct conceptual precursor to the variational method.
*   **Calculus of Variations (Unconstrained):**
    *   **Functionals:** Understanding that a functional takes a function as input and returns a scalar. (e.g., $J[y] = \int_a^b F(x, y(x), y'(x)) dx$).
    *   **Variation of a Functional:** The concept of $\delta J$, which is the functional equivalent of a differential.
    *   **Euler-Lagrange Equation:** The fundamental differential equation $\frac{\partial F}{\partial y} - \frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right) = 0$ that a function $y(x)$ must satisfy to extremize an unconstrained functional $J[y] = \int_a^b F(x, y, y') dx$. This is the absolute core prerequisite.

## 4. The core idea — step by step

Let's build up the concept of using Lagrange multipliers in the calculus of variations, step by step.

### ### Step 1: Recall the unconstrained Calculus of Variations

**Plain English:** Imagine you want to find the path (a function $y(x)$) between two points that makes some quantity as small or large as possible. For example, the path a light ray takes to minimize travel time, or the shape of a hanging chain that minimizes its potential energy. In these cases, there are no extra rules beyond the starting and ending points. The tool for this is the Euler-Lagrange equation.

**Small concrete example showing what it means:** Find the shortest path between two points $(x_1, y_1)$ and $(x_2, y_2)$ in a plane. The length of a path $y(x)$ is given by the arc length formula. We want to minimize this.

**Formal/mathematical version:**
We want to extremize a functional of the form:
$$ J[y] = \int_{a}^{b} F(x, y(x), y'(x)) dx $$
where $y(a)=y_a$ and $y(b)=y_b$ are fixed boundary conditions.
The function $y(x)$ that extremizes $J[y]$ must satisfy the Euler-Lagrange equation:
$$ \frac{\partial F}{\partial y} - \frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right) = 0 $$
For the shortest path example, $F(x, y, y') = \sqrt{1 + (y')^2}$.
The Euler-Lagrange equation for this $F$ simplifies to:
$$ 0 - \frac{d}{dx}\left(\frac{y'}{\sqrt{1+(y')^2}}\right) = 0 $$
$$ \frac{y'}{\sqrt{1+(y')^2}} = C_1 $$
This implies $y'$ is a constant, so $y(x)$ is a straight line, which is indeed the shortest path between two points.

**What could go wrong:** Forgetting to apply the chain rule correctly when taking derivatives, especially $\frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right)$. Also, neglecting the boundary conditions when solving the resulting differential equation.

### ### Step 2: Introduce the Isoperimetric Constraint

**Plain English:** Now, let's add a twist. What if, in addition to finding the optimal path for one thing, we also need to make sure another quantity related to the path has a *specific, fixed value*? This is the "isoperimetric constraint." It's like saying, "Find the path that minimizes travel time, *but* the total fuel consumed (another integral quantity) must be exactly 100 liters."

**Small concrete example showing what it means:** We want to maximize the area enclosed by a curve $y(x)$ and the x-axis, between $x=0$ and $x=L$. However, the *length* of the curve $y(x)$ itself must be a fixed value, say $P$.
Objective: Maximize Area $J[y] = \int_0^L y(x) dx$.
Constraint: Fixed Arc Length $K[y] = \int_0^L \sqrt{1 + (y'(x))^2} dx = P$.

**Formal/mathematical version:**
We want to extremize a functional:
$$ J[y] = \int_{a}^{b} F(x, y(x), y'(x)) dx $$
subject to an integral constraint:
$$ K[y] = \int_{a}^{b} G(x, y(x), y'(x)) dx = C $$
where $C$ is a given constant, and $y(a)=y_a$, $y(b)=y_b$ are fixed.

**What could go wrong:** Confusing which integral is the objective functional ($J$) and which is the constraint functional ($K$). Also, forgetting that $C$ is a specific numerical value, not a variable.

### ### Step 3: The Analogy to Finite-Dimensional Lagrange Multipliers

**Plain English:** Before tackling functions, let's remember how we solve constrained optimization problems for regular functions of several variables. If you want to find the maximum of $f(x,y)$ but you're stuck on a curve $g(x,y)=c$, the trick is to form a new function $L(x,y,\lambda) = f(x,y) - \lambda g(x,y)$. Then you find the critical points of $L$ by setting its partial derivatives with respect to $x, y,$ and $\lambda$ to zero. Geometrically, this means the gradient of $f$ is parallel to the gradient of $g$ at the extremum.

**Small concrete example showing what it means:** Find the maximum value of $f(x,y) = xy$ subject to the constraint $g(x,y) = x^2 + y^2 = 1$.
We form the Lagrangian: $L(x,y,\lambda) = xy - \lambda(x^2+y^2-1)$.
Set partial derivatives to zero:
$\frac{\partial L}{\partial x} = y - 2\lambda x = 0 \implies y = 2\lambda x$
$\frac{\partial L}{\partial y} = x - 2\lambda y = 0 \implies x = 2\lambda y$
$\frac{\partial L}{\partial \lambda} = -(x^2+y^2-1) = 0 \implies x^2+y^2=1$
Substitute $y$ into the second equation: $x = 2\lambda(2\lambda x) = 4\lambda^2 x$.
Since $x \neq 0$ (otherwise $y=0$ and $f=0$, which is not a maximum), we have $1 = 4\lambda^2 \implies \lambda = \pm 1/2$.
If $\lambda = 1/2$, then $y=x$. From $x^2+y^2=1$, we get $2x^2=1 \implies x = \pm 1/\sqrt{2}$. So $(1/\sqrt{2}, 1/\sqrt{2})$ and $(-1/\sqrt{2}, -1/\sqrt{2})$. $f = 1/2$.
If $\lambda = -1/2$, then $y=-x$. From $x^2+y^2=1$, we get $2x^2=1 \implies x = \pm 1/\sqrt{2}$. So $(1/\sqrt{2}, -1/\sqrt{2})$ and $(-1/\sqrt{2}, 1/\sqrt{2})$. $f = -1/2$.
The maximum is $1/2$.

**Formal/mathematical version:**
To extremize $f(\mathbf{x})$ subject to $g(\mathbf{x}) = c$, we form the Lagrangian $L(\mathbf{x}, \lambda) = f(\mathbf{x}) - \lambda (g(\mathbf{x}) - c)$.
At an extremum, $\nabla L = \mathbf{0}$, which implies:
$$ \nabla f(\mathbf{x}) = \lambda \nabla g(\mathbf{x}) $$
$$ g(\mathbf{x}) = c $$
The scalar $\lambda$ is called the Lagrange multiplier.

**What could go wrong:** Not understanding the geometric intuition behind Lagrange multipliers (that the level sets of $f$ and $g$ must be tangent at the extremum, meaning their gradients are parallel). Incorrectly setting up the Lagrangian (e.g., adding instead of subtracting the constraint term, though mathematically it only changes the sign of $\lambda$).

### ### Step 4: Extending to Functionals — The Variational Lagrange Multiplier

**Plain English:** We take the same idea from Step 3 and apply it to functionals. Instead of combining functions $f$ and $g$ into $L$, we combine the objective functional $J[y]$ and the constraint functional $K[y]$ into a new "Lagrangian functional" $L[y, \lambda]$. The crucial insight is that the Lagrange multiplier $\lambda$ in the variational context is a *constant*, just like in the finite-dimensional case, not a function of $x$.

**Small concrete example showing what it means:** For the problem of maximizing area $J[y] = \int_0^L y(x) dx$ subject to fixed arc length $K[y] = \int_0^L \sqrt{1 + (y'(x))^2} dx = P$:
The integrand for $J$ is $F = y$.
The integrand for $K$ is $G = \sqrt{1 + (y')^2}$.
We form the Lagrangian functional by combining these integrands, weighted by the constant $\lambda$:
$$ L[y, \lambda] = \int_0^L \left( F(x,y,y') - \lambda G(x,y,y') \right) dx $$
$$ L[y, \lambda] = \int_0^L \left( y - \lambda \sqrt{1 + (y')^2} \right) dx $$
Notice that the constraint constant $P$ does not explicitly appear in the integrand, but will be used later to determine $\lambda$.

**Formal/mathematical version:**
To extremize $J[y] = \int_{a}^{b} F(x, y, y') dx$ subject to $K[y] = \int_{a}^{b} G(x, y, y') dx = C$, we define a new Lagrangian functional:
$$ L[y, \lambda] = J[y] - \lambda K[y] $$
$$ L[y, \lambda] = \int_{a}^{b} \left( F(x, y, y') - \lambda G(x, y, y') \right) dx $$
Let $H(x, y, y') = F(x, y, y') - \lambda G(x, y, y')$. Our problem is now to extremize the unconstrained functional $L[y, \lambda] = \int_{a}^{b} H(x, y, y') dx$.

**What could go wrong:** Accidentally treating $\lambda$ as a function of $x$ (i.e., $\lambda(x)$) instead of a constant. This is a common and critical error. The power of the method relies on $\lambda$ being a constant.

### ### Step 5: Applying the Euler-Lagrange Equation to the Lagrangian Functional

**Plain English:** Now that we've combined our objective and constraint into a single "super-integrand" $H$, we can treat this new functional $L[y, \lambda]$ as an unconstrained problem. This means we can directly apply the good old Euler-Lagrange equation from Step 1 to the integrand $H(x, y, y')$.

**Small concrete example showing what it means:** Continuing with $H(x, y, y') = y - \lambda \sqrt{1 + (y')^2}$:
We need to calculate the partial derivatives of $H$ with respect to $y$ and $y'$:
$\frac{\partial H}{\partial y} = \frac{\partial}{\partial y} \left( y - \lambda \sqrt{1 + (y')^2} \right) = 1$
$\frac{\partial H}{\partial y'} = \frac{\partial}{\partial y'} \left( y - \lambda \sqrt{1 + (y')^2} \right) = -\lambda \frac{1}{2\sqrt{1+(y')^2}} (2y') = -\frac{\lambda y'}{\sqrt{1+(y')^2}}$
Now, substitute these into the Euler-Lagrange equation for $H$:
$$ \frac{\partial H}{\partial y} - \frac{d}{dx}\left(\frac{\partial H}{\partial y'}\right) = 0 $$
$$ 1 - \frac{d}{dx}\left(-\frac{\lambda y'}{\sqrt{1+(y')^2}}\right) = 0 $$
$$ 1 + \lambda \frac{d}{dx}\left(\frac{y'}{\sqrt{1+(y')^2}}\right) = 0 $$
This is the differential equation we need to solve for $y(x)$.

**Formal/mathematical version:**
The extremizing function $y(x)$ must satisfy the Euler-Lagrange equation applied to $H$:
$$ \frac{\partial H}{\partial y} - \frac{d}{dx}\left(\frac{\partial H}{\partial y'}\right) = 0 $$
Substituting $H = F - \lambda G$:
$$ \frac{\partial (F - \lambda G)}{\partial y} - \frac{d}{dx}\left(\frac{\partial (F - \lambda G)}{\partial y'}\right) = 0 $$
This can be expanded as:
$$ \left(\frac{\partial F}{\partial y} - \lambda \frac{\partial G}{\partial y}\right) - \frac{d}{dx}\left(\frac{\partial F}{\partial y'} - \lambda \frac{\partial G}{\partial y'}\right) = 0 $$
This is the fundamental equation for isoperimetric problems.

**What could go wrong:** Algebraic errors in computing the partial derivatives of $H$, especially when $F$ or $G$ are complex. Forgetting the chain rule when differentiating $y'$ terms.

### ### Step 6: Solving the Differential Equation and Finding $\lambda$

**Plain English:** After applying the Euler-Lagrange equation, you'll end up with a differential equation that describes the optimal function $y(x)$. This equation will usually contain the unknown constant $\lambda$. You solve this differential equation, which will introduce some integration constants. Then, you use *all* the given conditions: the boundary conditions (fixed endpoints) and the original integral constraint ($K[y]=C$) to find the values of the integration constants and, crucially, the value of $\lambda$.

**Small concrete example showing what it means:** From Step 5, we have the ODE:
$$ 1 + \lambda \frac{d}{dx}\left(\frac{y'}{\sqrt{1+(y')^2}}\right) = 0 $$
Let $u = \frac{y'}{\sqrt{1+(y')^2}}$. Then $1 + \lambda \frac{du}{dx} = 0$, so $\frac{du}{dx} = -\frac{1}{\lambda}$.
Integrating with respect to $x$:
$u = -\frac{x}{\lambda} + C_1$
So, $\frac{y'}{\sqrt{1+(y')^2}} = -\frac{x}{\lambda} + C_1$.
This is a first-order ODE for $y'$. Let $K_1 = -\frac{x}{\lambda} + C_1$.
$y'^2 = K_1^2 (1+y'^2)$
$y'^2 (1 - K_1^2) = K_1^2$
$y'^2 = \frac{K_1^2}{1 - K_1^2}$
$y' = \frac{K_1}{\sqrt{1 - K_1^2}}$ (assuming positive slope for simplicity or choosing sign based on context)
This implies $y'$ is a constant if $K_1$ is constant, but $K_1$ depends on $x$. This form $\frac{y'}{\sqrt{1+(y')^2}}$ is characteristic of the sine of the angle the tangent makes with the x-axis.
If we let $\sin \theta = \frac{y'}{\sqrt{1+(y')^2}}$, then $y' = \tan \theta$.
So, $\sin \theta = -\frac{x}{\lambda} + C_1$.
This means $\theta = \arcsin(-\frac{x}{\lambda} + C_1)$.
And $y' = \tan(\arcsin(-\frac{x}{\lambda} + C_1))$. This is becoming complex.
A more common approach for this specific form is to recognize that $\frac{y'}{\sqrt{1+(y')^2}}$ is the sine of the angle $\phi$ that the tangent to the curve makes with the x-axis. So, $\sin \phi = -\frac{x}{\lambda} + C_1$.
If we differentiate $y = \int y' dx$, this will lead to a solution involving circular functions, suggesting the optimal shape is an arc of a circle.
After solving for $y(x)$ in terms of $\lambda, C_1, C_2$ (if it's a second-order ODE), we use:
1.  $y(a) = y_a$
2.  $y(b) = y_b$
3.  $K[y] = \int_{a}^{b} G(x, y(x), y'(x)) dx = C$
These three conditions will give us a system of equations to solve for $C_1, C_2, \lambda$.

**Formal/mathematical version:**
1.  Solve the differential equation obtained in Step 5 for $y(x)$. This solution will generally contain arbitrary integration constants (e.g., $C_1, C_2$) and the Lagrange multiplier $\lambda$.
2.  Apply the boundary conditions $y(a)=y_a$ and $y(b)=y_b$ to determine some of the integration constants in terms of $\lambda$.
3.  Substitute the resulting $y(x)$ (now dependent only on $\lambda$ and possibly one remaining integration constant) into the original constraint integral $K[y]=C$.
4.  Solve the resulting equation for $\lambda$. Once $\lambda$ is known, all constants are determined, and the specific extremizing function $y(x)$ is found.

**What could go wrong:** Errors in solving the ODE, especially complex ones. Forgetting to use all boundary conditions and the constraint equation. Algebraic mistakes when solving for $\lambda$. Sometimes, the solution for $\lambda$ might not be unique, requiring further analysis (e.g., second variation test, though often omitted in introductory treatments).

## 5. Worked examples — multiple, with every step shown

### Example 1: Maximizing Area for a Fixed Arc Length (Simplified)

**Problem:** Find the curve $y(x)$ that passes through $(0,0)$ and $(1,0)$ and encloses the maximum area between itself and the x-axis, given that its arc length is fixed at $L$.
Assume $y(x) \ge 0$.

**Identify what's given and what we want:**
*   Objective Functional (Area): $J[y] = \int_{0}^{1} y(x) dx$. So, $F(x,y,y') = y$.
*   Constraint Functional (Arc Length): $K[y] = \int_{0}^{1} \sqrt{1 + (y'(x))^2} dx = L$. So, $G(x,y,y') = \sqrt{1 + (y')^2}$.
*   Boundary Conditions: $y(0) = 0$ and $y(1) = 0$.

**Show every algebraic / logical step:**

**Step 1: Form the Lagrangian functional.**
We combine the objective and constraint integrands using a Lagrange multiplier $\lambda$.
Let $H(x, y, y') = F(x, y, y') - \lambda G(x, y, y')$.
$$ H(x, y, y') = y - \lambda \sqrt{1 + (y')^2} $$
*Explanation: This step transforms the constrained optimization problem into an unconstrained one for the new functional defined by $H$. $\lambda$ is a constant.*

**Step 2: Apply the Euler-Lagrange equation to $H$.**
The Euler-Lagrange equation is $\frac{\partial H}{\partial y} - \frac{d}{dx}\left(\frac{\partial H}{\partial y'}\right) = 0$.

First, calculate the partial derivatives of $H$:
$$ \frac{\partial H}{\partial y} = \frac{\partial}{\partial y} \left( y - \lambda \sqrt{1 + (y')^2} \right) = 1 $$
*Explanation: The term $y$ differentiates to 1. The term $\lambda \sqrt{1+(y')^2}$ does not depend on $y$, so its partial derivative with respect to $y$ is 0.*

$$ \frac{\partial H}{\partial y'} = \frac{\partial}{\partial y'} \left( y - \lambda \sqrt{1 + (y')^2} \right) = -\lambda \frac{1}{2\sqrt{1+(y')^2}} (2y') = -\frac{\lambda y'}{\sqrt{1+(y')^2}} $$
*Explanation: The term $y$ does not depend on $y'$, so its partial derivative is 0. For the second term, we use the chain rule: $\frac{d}{du} (\sqrt{u}) = \frac{1}{2\sqrt{u}}$ where $u = 1+(y')^2$, and $\frac{d}{dy'} (1+(y')^2) = 2y'$.*

Now, substitute these into the Euler-Lagrange equation:
$$ 1 - \frac{d}{dx}\left(-\frac{\lambda y'}{\sqrt{1+(y')^2}}\right) = 0 $$
$$ 1 + \lambda \frac{d}{dx}\left(\frac{y'}{\sqrt{1+(y')^2}}\right) = 0 $$
*Explanation: This is the differential equation that the extremizing function $y(x)$ must satisfy. It relates $y(x)$, its derivatives, and the constant $\lambda$.*

**Step 3: Solve the resulting differential equation.**
Let $C_1$ be an integration constant.
$$ \frac{d}{dx}\left(\frac{y'}{\sqrt{1+(y')^2}}\right) = -\frac{1}{\lambda} $$
Integrate both sides with respect to $x$:
$$ \frac{y'}{\sqrt{1+(y')^2}} = -\frac{x}{\lambda} + C_1 $$
*Explanation: We integrate the derivative to get the function inside the derivative. This introduces an arbitrary constant of integration, $C_1$.*

Let $K = -\frac{x}{\lambda} + C_1$. We have $\frac{y'}{\sqrt{1+(y')^2}} = K$.
To solve for $y'$, square both sides:
$$ \frac{(y')^2}{1+(y')^2} = K^2 $$
Multiply by $1+(y')^2$:
$$ (y')^2 = K^2 (1+(y')^2) $$
$$ (y')^2 = K^2 + K^2 (y')^2 $$
Rearrange to solve for $(y')^2$:
$$ (y')^2 (1 - K^2) = K^2 $$
$$ (y')^2 = \frac{K^2}{1 - K^2} $$
Take the square root:
$$ y' = \pm \frac{K}{\sqrt{1 - K^2}} $$
*Explanation: We are algebraically manipulating the equation to isolate $y'$. Note that $1-K^2$ must be positive, so $|K| < 1$. Also, we introduce a $\pm$ sign because taking a square root can yield two values.*

This is a constant if $K$ is constant. But $K$ is a function of $x$. This form $\frac{y'}{\sqrt{1+(y')^2}}$ is recognized as $\sin \phi$, where $\phi$ is the angle the tangent to the curve makes with the x-axis.
So, $\sin \phi = -\frac{x}{\lambda} + C_1$.
This implies that the curve is an arc of a circle.
Let's rewrite the expression for $y'$:
$$ y' = \frac{dy}{dx} = \frac{K}{\sqrt{1-K^2}} $$
This is the slope. We can write $K = \sin \phi_0$, where $\phi_0$ is the angle.
Then $y' = \tan \phi_0$.
If $y' = \tan \phi$, then $\sin \phi = \frac{y'}{\sqrt{1+(y')^2}}$.
So, we have $\sin \phi = -\frac{x}{\lambda} + C_1$.
This means $\phi = \arcsin\left(-\frac{x}{\lambda} + C_1\right)$.
Then $y' = \tan\left(\arcsin\left(-\frac{x}{\lambda} + C_1\right)\right)$.
This is of the form $y' = \frac{A-x/ \lambda}{\sqrt{1-(A-x/\lambda)^2}}$ where $A=C_1$.
This is the derivative of a circular arc.
Recall the general form of a circle: $(x-a)^2 + (y-b)^2 = R^2$.
Differentiating with respect to $x$: $2(x-a) + 2(y-b)y' = 0$.
So, $y' = -\frac{x-a}{y-b}$.
Comparing this with $y' = \frac{K}{\sqrt{1-K^2}}$ where $K = -\frac{x}{\lambda} + C_1$.
Let's try a different approach. The general solution to $y' = \frac{K}{\sqrt{1-K^2}}$ where $K = \frac{x-C_1}{\lambda}$ (redefining $C_1$ with a minus sign for convenience) is a circle:
$$ (x-C_1)^2 + (y-C_2)^2 = \lambda^2 $$
*Explanation: This is a standard result for this type of Euler-Lagrange equation. The equation $y'/\sqrt{1+(y')^2} = (x-C_1)/\lambda$ implicitly defines a circle. You can verify this by differentiating the circle equation and matching the form.*

**Step 4: Apply boundary conditions and the constraint to find constants.**
We have $y(0)=0$ and $y(1)=0$.
From $(x-C_1)^2 + (y-C_2)^2 = \lambda^2$:
At $(0,0)$: $(0-C_1)^2 + (0-C_2)^2 = \lambda^2 \implies C_1^2 + C_2^2 = \lambda^2$. (Equation 1)
At $(1,0)$: $(1-C_1)^2 + (0-C_2)^2 = \lambda^2 \implies (1-C_1)^2 + C_2^2 = \lambda^2$. (Equation 2)

Equating (1) and (2):
$C_1^2 + C_2^2 = (1-C_1)^2 + C_2^2$
$C_1^2 = 1 - 2C_1 + C_1^2$
$0 = 1 - 2C_1 \implies 2C_1 = 1 \implies C_1 = 1/2$.
*Explanation: We use the boundary conditions to solve for the integration constants. By equating the expressions for $\lambda^2$, we can solve for $C_1$.*

Now substitute $C_1 = 1/2$ back into Equation 1:
$(1/2)^2 + C_2^2 = \lambda^2 \implies 1/4 + C_2^2 = \lambda^2$. (Equation 3)
So, the equation of the curve is:
$$ (x - 1/2)^2 + (y - C_2)^2 = \lambda^2 $$
Since $y \ge 0$, the center of the circle $(1/2, C_2)$ must have $C_2 \le 0$ for the arc to be above the x-axis (or $C_2 \ge 0$ if the arc is below, but the problem implies $y \ge 0$). Let's assume $C_2 < 0$. Then $y = C_2 + \sqrt{\lambda^2 - (x-1/2)^2}$.
However, for maximum area, we expect $y \ge 0$, so $C_2$ must be negative to make the lower part of the circle for $y \ge 0$.
So $y(x) = C_2 + \sqrt{\lambda^2 - (x-1/2)^2}$ is incorrect. It should be $y(x) = C_2 + \sqrt{\lambda^2 - (x-1/2)^2}$ or $y(x) = C_2 - \sqrt{\lambda^2 - (x-1/2)^2}$. Since $y(0)=0$ and $y(1)=0$, and we want $y \ge 0$, we must have $C_2$ being the y-coordinate of the center of the circle, and the curve being the *upper* part of the circle (if $C_2 \le 0$) or the *lower* part (if $C_2 \ge 0$). For $y \ge 0$, we must have $C_2 \le 0$ and $y = C_2 + \sqrt{\lambda^2 - (x-1/2)^2}$ or $C_2 \ge 0$ and $y = C_2 - \sqrt{\lambda^2 - (x-1/2)^2}$.
Let's take the standard form for an arc above the x-axis:
$$ y(x) = \sqrt{\lambda^2 - (x-1/2)^2} - C_2 $$
No, this is not right. The equation of the circle is $(x-C_1)^2 + (y-C_2)^2 = \lambda^2$.
So $y - C_2 = \pm \sqrt{\lambda^2 - (x-C_1)^2}$.
Since $y(0)=0$ and $y(1)=0$ and we assume $y \ge 0$, the center $(C_1, C_2)$ must be such that $C_2$ is the y-coordinate of the center.
If $C_2 > 0$, then $y = C_2 - \sqrt{\lambda^2 - (x-C_1)^2}$ would give $y \ge 0$.
If $C_2 < 0$, then $y = C_2 + \sqrt{\lambda^2 - (x-C_1)^2}$ would give $y \ge 0$.
Let's choose $C_2 < 0$ for now, as is typical for this problem, so $\lambda$ can represent the radius $R$.
So, $y(x) = C_2 + \sqrt{\lambda^2 - (x-1/2)^2}$.
Since $y(0)=0$, $0 = C_2 + \sqrt{\lambda^2 - (0-1/2)^2} = C_2 + \sqrt{\lambda^2 - 1/4}$.
Thus, $C_2 = -\sqrt{\lambda^2 - 1/4}$.
This means $y(x) = \sqrt{\lambda^2 - (x-1/2)^2} - \sqrt{\lambda^2 - 1/4}$.
This is a segment of a circle. $\lambda$ is the radius of the circle. Let $R = \lambda$.
So $y(x) = \sqrt{R^2 - (x-1/2)^2} - \sqrt{R^2 - 1/4}$.
*Explanation: We express $C_2$ in terms of $\lambda$ using one of the boundary conditions. This gives us the specific form of the circular arc, where $R$ (our $\lambda$) is the radius and $C_2$ is the y-coordinate of the center.*

Now, use the constraint $K[y] = L$. The arc length of this curve is $L$.
The arc length of a circular arc is $R \theta_{total}$, where $\theta_{total}$ is the angle subtended by the arc.
The chord length is 1 (from $x=0$ to $x=1$). The height of the arc is $y_{max} = R - |C_2| = R - \sqrt{R^2 - 1/4}$.
Let $h = \sqrt{R^2 - 1/4}$. Then $C_2 = -h$.
The curve is $y(x) = \sqrt{R^2 - (x-1/2)^2} - h$.
The length of the chord is $1$. The half-chord is $1/2$.
The distance from the center $(1/2, -h)$ to $(0,0)$ is $R$.
So $R^2 = (1/2)^2 + (-h)^2 \implies R^2 = 1/4 + h^2$, which is consistent.
The angle $\alpha$ from the center to $(0,0)$ and $(1/2, -h)$ is given by $\sin \alpha = (1/2)/R$.
The total angle subtended by the arc is $2\alpha = 2 \arcsin(1/(2R))$.
So the arc length $L = R \cdot (2 \arcsin(1/(2R)))$.
*Explanation: We use the geometric properties of a circle to calculate its arc length in terms of $R$. The constraint equation $K[y]=L$ then becomes an equation for $R$ (which is $\lambda$).*

Finally, we solve for $\lambda$ (our $R$):
$$ L = 2\lambda \arcsin\left(\frac{1}{2\lambda}\right) $$
This equation needs to be solved numerically for $\lambda$ given a specific $L$.
For example, if $L = \pi/2$, then $1 = 2\lambda \arcsin(1/(2\lambda)) / (\pi/2) = (4\lambda/\pi) \arcsin(1/(2\lambda))$.
If $L = \pi/2$ and $2\lambda=1$, then $1 = 1/\pi \cdot \pi/2 \cdot \arcsin(1) = 1/\pi \cdot \pi/2 \cdot \pi/2 = \pi/4 \neq 1$.
If $L = \pi/2$, and we assume $1/(2\lambda) = \sin(\pi/4) = 1/\sqrt{2}$, then $2\lambda = \sqrt{2}$, $\lambda = 1/\sqrt{2}$.
Then $L = 2(1/\sqrt{2}) \arcsin(1/\sqrt{2}) = \sqrt{2} (\pi/4) = \pi/(2\sqrt{2})$. This is not $\pi/2$.

Let's check the case where $L=1$.
If $y(x)$ is a straight line, $y(x)=0$, then $L=1$. Area is 0.
As $L$ increases, the area increases.
The equation $L = 2\lambda \arcsin\left(\frac{1}{2\lambda}\right)$ determines $\lambda$.
The function $f(z) = z \arcsin(1/z)$ is increasing for $z>1$.
Given $L$, we find $\lambda$.
Then the optimal curve is an arc of a circle with radius $\lambda$, centered at $(1/2, C_2)$ where $C_2 = -\sqrt{\lambda^2 - 1/4}$.

Final Answer:
The optimal curve $y(x)$ is an arc of a circle given by:
$$ (x - 1/2)^2 + (y - C_2)^2 = \lambda^2 $$
where $C_2 = -\sqrt{\lambda^2 - 1/4}$ and $\lambda$ is determined by solving the transcendental equation:
$$ L = 2\lambda \arcsin\left(\frac{1}{2\lambda}\right) $$
for the given arc length $L$.

**Reflection:** This example is tricky because the solution to the ODE is a circle, and then calculating the arc length of a circular segment requires geometric understanding. The final equation for $\lambda$ is transcendental and generally needs numerical solution. It highlights that $\lambda$ is implicitly determined by the constraint.

### Example 2: Dido's Problem (Classic Isoperimetric Problem)

**Problem:** Among all curves of a given length $L$ connecting two points $(0,0)$ and $(a,0)$ on the x-axis, find the one that encloses the maximum area with the x-axis. (This is a simplified version of Dido's problem, where the x-axis acts as a straight shoreline).

**Identify what's given and what we want:**
*   Objective Functional (Area): $J[y] = \int_{0}^{a} y(x) dx$. So, $F(x,y,y') = y$.
*   Constraint Functional (Arc Length): $K[y] = \int_{0}^{a} \sqrt{1 + (y'(x))^2} dx = L$. So, $G(x,y,y') = \sqrt{1 + (y')^2}$.
*   Boundary Conditions: $y(0) = 0$ and $y(a) = 0$.

**Show every algebraic / logical step:**

**Step 1: Form the Lagrangian functional.**
$$ H(x, y, y') = y - \lambda \sqrt{1 + (y')^2} $$
*Explanation: Same as Example 1, combining the area and arc length integrands.*

**Step 2: Apply the Euler-Lagrange equation to $H$.**
The partial derivatives are:
$$ \frac{\partial H}{\partial y} = 1 $$
$$ \frac{\partial H}{\partial y'} = -\frac{\lambda y'}{\sqrt{1+(y')^2}} $$
The Euler-Lagrange equation is:
$$ 1 - \frac{d}{dx}\left(-\frac{\lambda y'}{\sqrt{1+(y')^2}}\right) = 0 $$
$$ 1 + \lambda \frac{d}{dx}\left(\frac{y'}{\sqrt{1+(y')^2}}\right) = 0 $$
*Explanation: Identical to Example 1, as the integrands are the same.*

**Step 3: Solve the resulting differential equation.**
From Example 1, the general solution to this ODE is a circle:
$$ (x-C_1)^2 + (y-C_2)^2 = \lambda^2 $$
Here, $\lambda$ is the radius of the circle, let's call it $R$ for clarity.
$$ (x-C_1)^2 + (y-C_2)^2 = R^2 $$
*Explanation: The general solution for $y(x)$ is a circle, parameterized by constants $C_1, C_2$ (center coordinates) and $R$ (radius, which is $\lambda$).*

**Step 4: Apply boundary conditions and the constraint to find constants.**
We have $y(0)=0$ and $y(a)=0$.
At $(0,0)$: $(0-C_1)^2 + (0-C_2)^2 = R^2 \implies C_1^2 + C_2^2 = R^2$. (Equation 1)
At $(a,0)$: $(a-C_1)^2 + (0-C_2)^2 = R^2 \implies (a-C_1)^2 + C_2^2 = R^2$. (Equation 2)

Equating (1) and (2):
$C_1^2 + C_2^2 = (a-C_1)^2 + C_2^2$
$C_1^2 = a^2 - 2aC_1 + C_1^2$
$0 = a^2 - 2aC_1$
Since $a \neq 0$, we can divide by $a$:
$0 = a - 2C_1 \implies C_1 = a/2$.
*Explanation: The center of the circle must lie on the perpendicular bisector of the chord connecting $(0,0)$ and $(a,0)$, which is the line $x=a/2$.*

Substitute $C_1 = a/2$ into Equation 1:
$(a/2)^2 + C_2^2 = R^2 \implies a^2/4 + C_2^2 = R^2$. (Equation 3)
So the equation of the optimal curve is:
$$ (x - a/2)^2 + (y - C_2)^2 = R^2 $$
Since we want to maximize area and $y(x) \ge 0$, the curve must be the upper arc of the circle. This means $C_2$ must be negative, so the center is below the x-axis, and we take the positive square root for $y$.
$$ y(x) = C_2 + \sqrt{R^2 - (x-a/2)^2} $$
Since $y(0)=0$:
$0 = C_2 + \sqrt{R^2 - (0-a/2)^2} = C_2 + \sqrt{R^2 - a^2/4}$.
So, $C_2 = -\sqrt{R^2 - a^2/4}$.
This means the y-coordinate of the center is $C_2 = -\sqrt{R^2 - (a/2)^2}$.
The function is:
$$ y(x) = \sqrt{R^2 - (x-a/2)^2} - \sqrt{R^2 - a^2/4} $$
*Explanation: We've determined the specific circular arc. $R$ (our $\lambda$) is still unknown, and needs to be found from the length constraint.*

Now, use the constraint $K[y] = L$. The arc length of this curve is $L$.
The chord length is $a$. The half-chord is $a/2$.
From the center $(a/2, C_2)$ to $(0,0)$, the distance is $R$.
The angle $\alpha$ from the center to $(0,0)$ and $(a/2, C_2)$ is given by $\sin \alpha = (a/2)/R$.
The total angle subtended by the arc is $2\alpha = 2 \arcsin(a/(2R))$.
The arc length $L = R \cdot (2 \arcsin(a/(2R)))$.
*Explanation: Same geometric calculation as Example 1, but with $a$ instead of $1$.*

Finally, we solve for $R$ (our $\lambda$):
$$ L = 2R \arcsin\left(\frac{a}{2R}\right) $$
This equation determines the radius $R$ (and thus $\lambda$) for a given length $L$ and chord $a$.
For a solution to exist, we must have $a/(2R) \le 1$, so $2R \ge a$. This makes sense: the diameter must be at least as long as the chord.
If $L = \pi R$ (a semicircle), then $\pi R = 2R \arcsin(a/(2R))$.
$\pi/2 = \arcsin(a/(2R))$.
So $a/(2R) = \sin(\pi/2) = 1$. This means $a = 2R$, or $R = a/2$.
In this special case, the curve is a semicircle with radius $a/2$, centered at $(a/2, 0)$, and $L = \pi a/2$.

Final Answer:
The optimal curve $y(x)$ is an arc of a circle given by:
$$ (x - a/2)^2 + (y - C_2)^2 = R^2 $$
where $C_2 = -\sqrt{R^2 - a^2/4}$ and $R$ (which is $\lambda$) is determined by solving the transcendental equation:
$$ L = 2R \arcsin\left(\frac{a}{2R}\right) $$
for the given arc length $L$ and chord length $a$.

**Reflection:** This is the canonical Dido's problem. The solution being a circular arc is a famous result. The challenge lies in correctly setting up the geometry for the arc length and solving for the radius.

### Example 3: Brachistochrone with Fixed Time (Harder)

**Problem:** Find the path $y(x)$ from $(0,0)$ to $(x_1, y_1)$ such that a particle sliding under gravity without friction takes a fixed time $T$ to travel along it. Minimize the "effective length" or some other functional if this is not a pure time minimization.
Actually, the standard Brachistochrone problem is to minimize time. A constrained version would be: Find the curve $y(x)$ from $(0,0)$ to $(x_1, y_1)$ that minimizes the arc length, but takes a fixed time $T$. This is a more complex setup. Let's simplify to a more common constrained problem.

Let's rephrase: **Find the curve $y(x)$ that minimizes the integral $J[y] = \int_0^1 (y')^2 dx$ subject to the constraint $K[y] = \int_0^1 y^2 dx = C$, with $y(0)=0$ and $y(1)=0$.**
This problem is often used in quantum mechanics (e.g., finding the ground state of a particle in a box with a normalization constraint).

**Identify what's given and what we want:**
*   Objective Functional: $J[y] = \int_{0}^{1} (y'(x))^2 dx$. So, $F(x,y,y') = (y')^2$.
*   Constraint Functional: $K[y] = \int_{0}^{1} y(x)^2 dx = C$. So, $G(x,y,y') = y^2$.
*   Boundary Conditions: $y(0) = 0$ and $y(1) = 0$.

**Show every algebraic / logical step:**

**Step 1: Form the Lagrangian functional.**
Let $H(x, y, y') = F(x, y, y') - \lambda G(x, y, y')$.
$$ H(x, y, y') = (y')^2 - \lambda y^2 $$
*Explanation: Combining the two integrands with the constant Lagrange multiplier $\lambda$.*

**Step 2: Apply the Euler-Lagrange equation to $H$.**
The Euler-Lagrange equation is $\frac{\partial H}{\partial y} - \frac{d}{dx}\left(\frac{\partial H}{\partial y'}\right) = 0$.

First, calculate the partial derivatives of $H$:
$$ \frac{\partial H}{\partial y} = \frac{\partial}{\partial y} \left( (y')^2 - \lambda y^2 \right) = -2\lambda y $$
*Explanation: $(y')^2$ does not depend on $y$. $-\lambda y^2$ differentiates to $-2\lambda y$.*

$$ \frac{\partial H}{\partial y'} = \frac{\partial}{\partial y'} \left( (y')^2 - \lambda y^2 \right) = 2y' $$
*Explanation: $-\lambda y^2$ does not depend on $y'$. $(y')^2$ differentiates to $2y'$.*

Now, substitute these into the Euler-Lagrange equation:
$$ -2\lambda y - \frac{d}{dx}(2y') = 0 $$
$$ -2\lambda y - 2y'' = 0 $$
Divide by $-2$:
$$ y'' + \lambda y = 0 $$
*Explanation: This is a second-order linear homogeneous ordinary differential equation with constant coefficients. This is a common type of ODE encountered in physics.*

**Step 3: Solve the resulting differential equation.**
The characteristic equation for $y'' + \lambda y = 0$ is $r^2 + \lambda = 0$.
The roots are $r = \pm \sqrt{-\lambda}$.

We need to consider cases for $\lambda$:
Case 1: $\lambda < 0$. Let $\lambda = -\omega^2$ for some $\omega > 0$.
Then $r^2 - \omega^2 = 0 \implies r = \pm \omega$.
The general solution is $y(x) = C_1 e^{\omega x} + C_2 e^{-\omega x}$.
Applying boundary conditions:
$y(0) = 0 \implies C_1 + C_2 = 0 \implies C_2 = -C_1$.
So $y(x) = C_1 (e^{\omega x} - e^{-\omega x}) = 2C_1 \sinh(\omega x)$.
$y(1) = 0 \implies 2C_1 \sinh(\omega) = 0$.
Since $\omega > 0$, $\sinh(\omega) \neq 0$. Thus $C_1 = 0$.
This implies $y(x) = 0$ for all $x$.
If $y(x)=0$, then $K[y] = \int_0^1 0^2 dx = 0$. But the constraint is $K[y]=C$, and we assume $C>0$.
So, $\lambda < 0$ does not yield a non-trivial solution.

Case 2: $\lambda = 0$.
Then $y'' = 0$. Integrating twice gives $y(x) = C_1 x + C_2$.
Applying boundary conditions:
$y(0) = 0 \implies C_2 = 0$.
So $y(x) = C_1 x$.
$y(1) = 0 \implies C_1 (1) = 0 \implies C_1 = 0$.
This again implies $y(x) = 0$, which is not a non-trivial solution for $C>0$.

Case 3: $\lambda > 0$. Let $\lambda = \omega^2$ for some $\omega > 0$.
Then $r^2 + \omega^2 = 0 \implies r = \pm i\omega$.
The general solution is $y(x) = C_1 \cos(\omega x) + C_2 \sin(\omega x)$.
Applying boundary conditions:
$y(0) = 0 \implies C_1 \cos(0) + C_2 \sin(0) = 0 \implies C_1 = 0$.
So $y(x) = C_2 \sin(\omega x)$.
$y(1) = 0 \implies C_2 \sin(\omega) = 0$.
If $C_2 = 0$, then $y(x)=0$, which is trivial. So we must have $\sin(\omega) = 0$.
This means $\omega$ must be an integer multiple of $\pi$:
$\omega = n\pi$ for $n = 1, 2, 3, \dots$. (We take $n \ge 1$ because $\omega > 0$).
So, $\lambda = \omega^2 = (n\pi)^2$.
The solution is $y(x) = C_2 \sin(n\pi x)$.
*Explanation: We solve the ODE based on the sign of $\lambda$. Only $\lambda > 0$ yields non-trivial solutions that satisfy the boundary conditions. This is an eigenvalue problem, where $\lambda$ are the eigenvalues and $\sin(n\pi x)$ are the eigenfunctions.*

**Step 4: Apply the constraint to find $C_2$ and $\lambda$.**
We have $y(x) = C_2 \sin(n\pi x)$ and $\lambda = (n\pi)^2$.
Now we use the constraint $K[y] = \int_{0}^{1} y(x)^2 dx = C$.
$$ \int_{0}^{1} (C_2 \sin(n\pi x))^2 dx = C $$
$$ C_2^2 \int_{0}^{1} \sin^2(n\pi x) dx = C $$
Recall that $\sin^2\theta = \frac{1 - \cos(2\theta)}{2}$.
$$ C_2^2 \int_{0}^{1} \frac{1 - \cos(2n\pi x)}{2} dx = C $$
$$ C_2^2 \left[ \frac{x}{2} - \frac{\sin(2n\pi x)}{4n\pi} \right]_{0}^{1} = C $$
$$ C_2^2 \left( \left( \frac{1}{2} - \frac{\sin(2n\pi)}{4n\pi} \right) - \left( \frac{0}{2} - \frac{\sin(0)}{4n\pi} \right) \right) = C $$
Since $\sin(2n\pi) = 0$ for integer $n$:
$$ C_2^2 \left( \frac{1}{2} - 0 - 0 + 0 \right) = C $$
$$ \frac{C_2^2}{2} = C \implies C_2^2 = 2C \implies C_2 = \pm \sqrt{2C} $$
*Explanation: We substitute the general solution $y(x)$ into the constraint integral. This allows us to solve for the amplitude $C_2$ in terms of the given constant $C$.*

The values for $\lambda$ are $(n\pi)^2$. We need to choose the value of $n$ that minimizes $J[y]$.
The objective functional is $J[y] = \int_0^1 (y')^2 dx$.
$y(x) = C_2 \sin(n\pi x) \implies y'(x) = C_2 n\pi \cos(n\pi x)$.
$$ J[y] = \int_0^1 (C_2 n\pi \cos(n\pi x))^2 dx $$
$$ J[y] = C_2^2 (n\pi)^2 \int_0^1 \cos^2(n\pi x) dx $$
Recall that $\cos^2\theta = \frac{1 + \cos(2\theta)}{2}$.
$$ J[y] = C_2^2 (n\pi)^2 \int_0^1 \frac{1 + \cos(2n\pi x)}{2} dx $$
$$ J[y] = C_2^2 (n\pi)^2 \left[ \frac{x}{2} + \frac{\sin(2n\pi x)}{4n\pi} \right]_{0}^{1} $$
$$ J[y] = C_2^2 (n\pi)^2 \left( \frac{1}{2} + 0 - 0 - 0 \right) = C_2^2 (n\pi)^2 \frac{1}{2} $$
Substitute $C_2^2 = 2C$:
$$ J[y] = (2C) (n\pi)^2 \frac{1}{2} = C (n\pi)^2 $$
To minimize $J[y]$, we must choose the smallest possible value for $n$, which is $n=1$.
So, $\lambda = (1\pi)^2 = \pi^2$.
And $C_2 = \pm \sqrt{2C}$.

Final Answer:
The curve $y(x)$ that minimizes $J[y]$ subject to $K[y]=C$ is:
$$ \boxed{y(x) = \pm \sqrt{2C} \sin(\pi x)} $$
with the Lagrange multiplier $\lambda = \pi^2$.

**Reflection:** This example demonstrates how the Lagrange multiplier $\lambda$ can take on discrete values (eigenvalues) when boundary conditions are involved. The choice of $\lambda$ (or $n$) is determined by the optimization objective (minimizing $J[y]$). It's a fundamental problem in quantum mechanics (particle in a box) and Fourier series.

### Example 4: General Case with $F$ and $G$ (More Abstract)

**Problem:** Extremize $J[y] = \int_0^1 (y'^2 + xy) dx$ subject to $K[y