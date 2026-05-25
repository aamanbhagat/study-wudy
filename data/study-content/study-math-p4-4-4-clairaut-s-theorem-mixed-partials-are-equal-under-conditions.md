## 1. What it is — in plain English

Imagine you're walking on a hilly landscape, which we can think of as a mathematical function $f(x, y)$ where $x$ and $y$ are your coordinates on the ground, and $f(x, y)$ is your elevation.

When you take a "partial derivative" with respect to $x$ (written as $\frac{\partial f}{\partial x}$), you're finding how steep the hill is if you walk directly east-west (changing only $x$, holding $y$ constant). Similarly, $\frac{\partial f}{\partial y}$ tells you the steepness if you walk directly north-south.

Now, let's talk about "mixed partial derivatives." This is where it gets interesting. Imagine you're interested in how the *steepness in the east-west direction* changes as you walk north-south. That's one type of mixed partial, written as $\frac{\partial}{\partial y} \left( \frac{\partial f}{\partial x} \right)$ or $f_{xy}$. It tells you if the east-west path gets steeper or flatter as you move north.

Clairaut's Theorem (also known as Schwarz's Theorem or Young's Theorem) simply says that for most "nice" and "smooth" landscapes (functions), it doesn't matter which order you measure these changes. So, if you first find how the east-west steepness changes as you move north, you'll get the exact same result as if you first find how the north-south steepness changes as you move east. In mathematical terms, $f_{xy}$ will be equal to $f_{yx}$.

## 2. Why it matters — real-world applications

Clairaut's Theorem is not just a mathematical curiosity; it's a fundamental property of many physical and economic systems, simplifying calculations and validating models.

1.  **Physics — Conservative Vector Fields:** In physics, a force field (like gravity or an electric field) is called "conservative" if the work done by the field on an object moving between two points is independent of the path taken. This is a very important property. Mathematically, a 2D vector field $\mathbf{F}(x, y) = \langle P(x, y), Q(x, y) \rangle$ is conservative if and only if $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$. This condition, which relies on the equality of mixed partials of a potential function, ensures that we can define a potential energy function for the field, simplifying many calculations in mechanics and electromagnetism. For example, knowing that Earth's gravitational field is conservative allows engineers at NASA to calculate orbital trajectories and fuel requirements more efficiently.

2.  **Machine Learning — Optimization:** Many machine learning algorithms, especially deep learning models, involve finding the minimum of a complex "loss function" (a function with many input variables, representing model parameters). This is done using optimization techniques. Second-order optimization methods, like Newton's method, use the Hessian matrix, which is a matrix of second partial derivatives. Clairaut's Theorem guarantees that the Hessian matrix is symmetric (i.e., its entry $(i, j)$ is equal to entry $(j, i)$), provided the second partial derivatives are continuous. This symmetry significantly reduces the computational cost of storing and manipulating the Hessian, making these optimization algorithms more practical for large models.

3.  **Fluid Dynamics and Aerodynamics:** In the study of fluid flow, especially incompressible, irrotational flow, a "velocity potential" function $\phi(x, y, z)$ can be defined such that the fluid velocity vector $\mathbf{v}$ is the gradient of $\phi$, i.e., $\mathbf{v} = \nabla \phi$. For such a flow, the components of velocity are $u = \frac{\partial \phi}{\partial x}$, $v = \frac{\partial \phi}{\partial y}$, $w = \frac{\partial \phi}{\partial z}$. The condition for irrotationality (no swirling motion) involves checking if the curl of the velocity is zero. This translates to conditions like $\frac{\partial u}{\partial y} = \frac{\partial v}{\partial x}$, which are directly applications of Clairaut's Theorem on the potential function. For aerospace engineers designing aircraft wings, understanding these properties of airflow is crucial for predicting lift and drag.

4.  **Economics — Utility Functions and Cross-Price Elasticity:** In microeconomics, a utility function $U(x_1, x_2, \dots, x_n)$ describes the satisfaction a consumer gets from consuming different quantities of goods. The marginal utility of good $x_i$ is $\frac{\partial U}{\partial x_i}$. How the marginal utility of good $x_1$ changes as the consumption of good $x_2$ changes is given by $\frac{\partial^2 U}{\partial x_2 \partial x_1}$. Clairaut's Theorem implies that this is equal to how the marginal utility of good $x_2$ changes as the consumption of good $x_1$ changes, i.e., $\frac{\partial^2 U}{\partial x_2 \partial x_1} = \frac{\partial^2 U}{\partial x_1 \partial x_2}$. This symmetry is often assumed in economic models to simplify analysis and ensure consistent consumer behavior.

## 3. Prerequisites — what you must know first

Before diving deep into Clairaut's Theorem, ensure you have a solid grasp of these foundational concepts:

*   **Functions of multiple variables:** Understanding what $f(x, y)$ or $f(x, y, z)$ represents, typically as a surface in 3D space or a scalar field.
*   **Partial Derivatives:** The ability to compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ (and for more variables), which involves treating all other variables as constants during differentiation.
*   **Continuity:** The intuitive idea that a function can be drawn without lifting your pen, and the formal $\epsilon$-$\delta$ definition for single-variable functions. For multivariable functions, it means that small changes in input lead to small changes in output.
*   **Limits:** Understanding the concept of a limit, especially for multivariable functions, and how it relates to continuity and differentiability.
*   **Differentiability:** Knowing that a function is differentiable if its partial derivatives exist and are continuous (a stronger condition than just existing). This implies the function is "smooth" and has a well-defined tangent plane at each point.

## 4. The core idea — step by step

Let's break down the concept of Clairaut's Theorem step by step, building from basic derivatives to the theorem itself.

### Step 1: Functions of Two Variables

*   **Plain-English Statement:** We're dealing with functions where the output depends on two different input values. Think of a map where for every location (defined by two coordinates, like latitude and longitude), there's a specific elevation.
*   **Small Concrete Example:** Consider the function $f(x, y) = x^2 + 3xy + y^3$. Here, $f$ takes an $x$-value and a $y$-value and gives you a single output number. If $x=1$ and $y=2$, $f(1,2) = (1)^2 + 3(1)(2) + (2)^3 = 1 + 6 + 8 = 15$.
*   **Formal/Mathematical Version:** A function $f: \mathbb{R}^2 \to \mathbb{R}$ maps an ordered pair $(x, y)$ from a domain in two-dimensional space to a single real number.
    $$f(x, y)$$
*   **What Could Go Wrong:** Confusing a function of two variables with a function of a single variable, or thinking of $x$ and $y$ as somehow dependent on each other in the general definition. They are independent input variables.

### Step 2: First Partial Derivatives

*   **Plain-English Statement:** This is how we measure the "slope" or rate of change of our function if we only allow one of the input variables to change, holding the other(s) constant. If $f(x,y)$ is elevation, $\frac{\partial f}{\partial x}$ is the steepness if you walk purely in the $x$-direction (east/west), and $\frac{\partial f}{\partial y}$ is the steepness if you walk purely in the $y$-direction (north/south).
*   **Small Concrete Example:** Let's use $f(x, y) = x^2 + 3xy + y^3$ again.
    *   To find $\frac{\partial f}{\partial x}$: Treat $y$ as a constant.
        $$\frac{\partial f}{\partial x} = \frac{\partial}{\partial x}(x^2 + 3xy + y^3) = 2x + 3y + 0 = 2x + 3y$$
    *   To find $\frac{\partial f}{\partial y}$: Treat $x$ as a constant.
        $$\frac{\partial f}{\partial y} = \frac{\partial}{\partial y}(x^2 + 3xy + y^3) = 0 + 3x + 3y^2 = 3x + 3y^2$$
*   **Formal/Mathematical Version:**
    The partial derivative of $f$ with respect to $x$ is defined as:
    $$\frac{\partial f}{\partial x}(x, y) = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$
    The partial derivative of $f$ with respect to $y$ is defined as:
    $$\frac{\partial f}{\partial y}(x, y) = \lim_{h \to 0} \frac{f(x, y+h) - f(x, y)}{h}$$
    Alternative notations: $f_x$, $f_y$.
*   **What Could Go Wrong:** Incorrectly treating the "constant" variable as if it were still a variable that needs differentiation (e.g., differentiating $y^3$ with respect to $x$ and getting $3y^2 \frac{dy}{dx}$ instead of 0).

### Step 3: Second Partial Derivatives (Pure)

*   **Plain-English Statement:** This tells us how the steepness in one direction changes as we continue to move in that *same* direction. It's like the curvature or concavity in that specific direction. For example, $\frac{\partial^2 f}{\partial x^2}$ tells you if the path you're walking in the $x$-direction is getting steeper or flatter, or curving up or down.
*   **Small Concrete Example:** Using our previous first partial derivatives for $f(x, y) = x^2 + 3xy + y^3$:
    *   We found $\frac{\partial f}{\partial x} = 2x + 3y$. Now, differentiate this with respect to $x$ again:
        $$\frac{\partial^2 f}{\partial x^2} = \frac{\partial}{\partial x}(2x + 3y) = 2 + 0 = 2$$
    *   We found $\frac{\partial f}{\partial y} = 3x + 3y^2$. Now, differentiate this with respect to $y$ again:
        $$\frac{\partial^2 f}{\partial y^2} = \frac{\partial}{\partial y}(3x + 3y^2) = 0 + 6y = 6y$$
*   **Formal/Mathematical Version:**
    $$\frac{\partial^2 f}{\partial x^2} = \frac{\partial}{\partial x} \left( \frac{\partial f}{\partial x} \right) \quad \text{or} \quad f_{xx}$$
    $$\frac{\partial^2 f}{\partial y^2} = \frac{\partial}{\partial y} \left( \frac{\partial f}{\partial y} \right) \quad \text{or} \quad f_{yy}$$
*   **What Could Go Wrong:** Forgetting to apply the differentiation rules correctly to the *result* of the first partial derivative.

### Step 4: Second Partial Derivatives (Mixed)

*   **Plain-English Statement:** This is the heart of Clairaut's Theorem. A mixed partial derivative tells us how the steepness in *one* direction changes as we move in an *orthogonal* (perpendicular) direction. For example, $\frac{\partial^2 f}{\partial y \partial x}$ (read as "the second partial derivative of $f$ with respect to $x$, then with respect to $y$") tells you how the $x$-direction steepness changes as you move in the $y$-direction.
*   **Small Concrete Example:** Let's use $f(x, y) = x^2 + 3xy + y^3$ again.
    *   To find $\frac{\partial^2 f}{\partial y \partial x}$ (also written as $f_{xy}$): First find $\frac{\partial f}{\partial x}$, then differentiate that result with respect to $y$.
        1.  $\frac{\partial f}{\partial x} = 2x + 3y$
        2.  $\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial}{\partial y}(2x + 3y) = 0 + 3 = 3$
    *   To find $\frac{\partial^2 f}{\partial x \partial y}$ (also written as $f_{yx}$): First find $\frac{\partial f}{\partial y}$, then differentiate that result with respect to $x$.
        1.  $\frac{\partial f}{\partial y} = 3x + 3y^2$
        2.  $\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial}{\partial x}(3x + 3y^2) = 3 + 0 = 3$
    Notice that in this example, $f_{xy} = f_{yx} = 3$. This is exactly what Clairaut's Theorem predicts!
*   **Formal/Mathematical Version:**
    $$\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial}{\partial y} \left( \frac{\partial f}{\partial x} \right) \quad \text{or} \quad f_{xy}$$
    $$\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial}{\partial x} \left( \frac{\partial f}{\partial y} \right) \quad \text{or} \quad f_{yx}$$
    The order of differentiation is read from right to left in the $\frac{\partial^2 f}{\partial y \partial x}$ notation (differentiate by $x$ first, then $y$), but left to right in the subscript notation $f_{xy}$ (differentiate by $x$ first, then $y$). This is a common source of confusion. Always be careful!
*   **What Could Go Wrong:** Misinterpreting the notation for mixed partials. Remember: $\frac{\partial^2 f}{\partial y \partial x}$ means differentiate with respect to $x$ *first*, then $y$. $f_{xy}$ means differentiate with respect to $x$ *first*, then $y$. This is consistent.

### Step 5: Clairaut's Theorem (The Equality and its Conditions)

*   **Plain-English Statement:** For most functions you'll encounter in calculus that are "smooth enough" (meaning their derivatives don't jump around or have sudden breaks), the order in which you take mixed partial derivatives doesn't matter. The result will be the same. The crucial condition for this to hold is that these mixed partial derivatives themselves must be *continuous*.
*   **Small Concrete Example:** We just saw for $f(x, y) = x^2 + 3xy + y^3$ that $f_{xy} = 3$ and $f_{yx} = 3$. Since 3 is a constant, it is certainly a continuous function. Thus, Clairaut's Theorem holds for this function.
*   **Formal/Mathematical Version:**
    Let $f$ be a function of two variables $x$ and $y$. If the mixed second-order partial derivatives $f_{xy}$ and $f_{yx}$ are both defined on an open disk $D$ containing the point $(a, b)$, and if $f_{xy}$ and $f_{yx}$ are both continuous at $(a, b)$, then
    $$f_{xy}(a, b) = f_{yx}(a, b)$$
    More generally, if all second-order partial derivatives ($f_{xx}, f_{yy}, f_{xy}, f_{yx}$) exist and are continuous on an open disk $D$, then $f_{xy} = f_{yx}$ at every point in $D$.
*   **What Could Go Wrong:** Assuming the theorem holds universally without checking the continuity condition. While most functions you deal with in an introductory course satisfy this, there are pathological (unusual) functions where the mixed partials are *not* equal because they are not continuous. For example, the function $f(x,y) = \begin{cases} \frac{xy(x^2-y^2)}{x^2+y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ has $f_{xy}(0,0) = -1$ and $f_{yx}(0,0) = 1$. This happens because $f_{xy}$ and $f_{yx}$ are not continuous at $(0,0)$.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify your understanding.

### Example 1: Polynomial Function

**Problem:** Verify Clairaut's Theorem for the function $f(x, y) = x^4 y^3 - 2x^2 y^5$.

**Given:** A function $f(x, y) = x^4 y^3 - 2x^2 y^5$.
**Want:** To show that $\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$.

**Step 1: Calculate the first partial derivative with respect to $x$, $f_x$.**
$$f_x = \frac{\partial}{\partial x}(x^4 y^3 - 2x^2 y^5)$$
This means we treat $y$ as a constant.
$$f_x = \frac{\partial}{\partial x}(x^4 y^3) - \frac{\partial}{\partial x}(2x^2 y^5)$$
$$f_x = (4x^3 y^3) - (4x y^5)$$
*Explanation: Differentiated $x^4$ to $4x^3$ and $x^2$ to $2x$, keeping $y^3$ and $y^5$ as constant multipliers.*

**Step 2: Calculate the mixed partial derivative $f_{xy}$ (differentiate $f_x$ with respect to $y$).**
$$f_{xy} = \frac{\partial}{\partial y}(4x^3 y^3 - 4x y^5)$$
This means we treat $x$ as a constant.
$$f_{xy} = \frac{\partial}{\partial y}(4x^3 y^3) - \frac{\partial}{\partial y}(4x y^5)$$
$$f_{xy} = (4x^3 \cdot 3y^2) - (4x \cdot 5y^4)$$
$$f_{xy} = 12x^3 y^2 - 20x y^4$$
*Explanation: Differentiated $y^3$ to $3y^2$ and $y^5$ to $5y^4$, keeping $4x^3$ and $4x$ as constant multipliers.*

**Step 3: Calculate the first partial derivative with respect to $y$, $f_y$.**
$$f_y = \frac{\partial}{\partial y}(x^4 y^3 - 2x^2 y^5)$$
This means we treat $x$ as a constant.
$$f_y = \frac{\partial}{\partial y}(x^4 y^3) - \frac{\partial}{\partial y}(2x^2 y^5)$$
$$f_y = (x^4 \cdot 3y^2) - (2x^2 \cdot 5y^4)$$
$$f_y = 3x^4 y^2 - 10x^2 y^4$$
*Explanation: Differentiated $y^3$ to $3y^2$ and $y^5$ to $5y^4$, keeping $x^4$ and $2x^2$ as constant multipliers.*

**Step 4: Calculate the mixed partial derivative $f_{yx}$ (differentiate $f_y$ with respect to $x$).**
$$f_{yx} = \frac{\partial}{\partial x}(3x^4 y^2 - 10x^2 y^4)$$
This means we treat $y$ as a constant.
$$f_{yx} = \frac{\partial}{\partial x}(3x^4 y^2) - \frac{\partial}{\partial x}(10x^2 y^4)$$
$$f_{yx} = (3 \cdot 4x^3 y^2) - (10 \cdot 2x y^4)$$
$$f_{yx} = 12x^3 y^2 - 20x y^4$$
*Explanation: Differentiated $x^4$ to $4x^3$ and $x^2$ to $2x$, keeping $3y^2$ and $10y^4$ as constant multipliers.*

**Step 5: Compare the results.**
We found $f_{xy} = 12x^3 y^2 - 20x y^4$ and $f_{yx} = 12x^3 y^2 - 20x y^4$.
Since $f_{xy}$ and $f_{yx}$ are equal, and they are polynomial functions (which are continuous everywhere), Clairaut's Theorem is verified.

The mixed partial derivatives are:
$$\boxed{f_{xy} = 12x^3 y^2 - 20x y^4}$$
$$\boxed{f_{yx} = 12x^3 y^2 - 20x y^4}$$

*Reflection:* This example was straightforward because it involved only polynomial terms, which are easy to differentiate and are continuous everywhere. No complex rules like chain rule or product rule were needed across variables, making the algebra simple.

---

### Example 2: Trigonometric Function

**Problem:** Verify Clairaut's Theorem for the function $f(x, y) = \sin(xy)$.

**Given:** A function $f(x, y) = \sin(xy)$.
**Want:** To show that $\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$.

**Step 1: Calculate the first partial derivative with respect to $x$, $f_x$.**
$$f_x = \frac{\partial}{\partial x}(\sin(xy))$$
We use the chain rule: $\frac{d}{du}(\sin u) = \cos u \cdot \frac{du}{dx}$. Here $u = xy$.
$$f_x = \cos(xy) \cdot \frac{\partial}{\partial x}(xy)$$
Treat $y$ as a constant.
$$f_x = \cos(xy) \cdot y$$
$$f_x = y \cos(xy)$$
*Explanation: Applied the chain rule for $\sin(u)$ where $u=xy$. Differentiating $xy$ with respect to $x$ gives $y$ (since $y$ is constant).*

**Step 2: Calculate the mixed partial derivative $f_{xy}$ (differentiate $f_x$ with respect to $y$).**
$$f_{xy} = \frac{\partial}{\partial y}(y \cos(xy))$$
We use the product rule: $\frac{\partial}{\partial y}(uv) = u'v + uv'$. Here $u=y$ and $v=\cos(xy)$.
$$f_{xy} = \frac{\partial}{\partial y}(y) \cdot \cos(xy) + y \cdot \frac{\partial}{\partial y}(\cos(xy))$$
Differentiating $y$ with respect to $y$ gives $1$.
Differentiating $\cos(xy)$ with respect to $y$ (using chain rule, $u=xy$): $-\sin(xy) \cdot \frac{\partial}{\partial y}(xy) = -\sin(xy) \cdot x$.
$$f_{xy} = (1) \cdot \cos(xy) + y \cdot (-\sin(xy) \cdot x)$$
$$f_{xy} = \cos(xy) - xy \sin(xy)$$
*Explanation: Applied the product rule because $f_x$ is a product of two functions of $y$ ($y$ itself and $\cos(xy)$). Also applied the chain rule for $\cos(xy)$ with respect to $y$.*

**Step 3: Calculate the first partial derivative with respect to $y$, $f_y$.**
$$f_y = \frac{\partial}{\partial y}(\sin(xy))$$
We use the chain rule: $\frac{d}{du}(\sin u) = \cos u \cdot \frac{du}{dy}$. Here $u = xy$.
$$f_y = \cos(xy) \cdot \frac{\partial}{\partial y}(xy)$$
Treat $x$ as a constant.
$$f_y = \cos(xy) \cdot x$$
$$f_y = x \cos(xy)$$
*Explanation: Applied the chain rule for $\sin(u)$ where $u=xy$. Differentiating $xy$ with respect to $y$ gives $x$ (since $x$ is constant).*

**Step 4: Calculate the mixed partial derivative $f_{yx}$ (differentiate $f_y$ with respect to $x$).**
$$f_{yx} = \frac{\partial}{\partial x}(x \cos(xy))$$
We use the product rule: $\frac{\partial}{\partial x}(uv) = u'v + uv'$. Here $u=x$ and $v=\cos(xy)$.
$$f_{yx} = \frac{\partial}{\partial x}(x) \cdot \cos(xy) + x \cdot \frac{\partial}{\partial x}(\cos(xy))$$
Differentiating $x$ with respect to $x$ gives $1$.
Differentiating $\cos(xy)$ with respect to $x$ (using chain rule, $u=xy$): $-\sin(xy) \cdot \frac{\partial}{\partial x}(xy) = -\sin(xy) \cdot y$.
$$f_{yx} = (1) \cdot \cos(xy) + x \cdot (-\sin(xy) \cdot y)$$
$$f_{yx} = \cos(xy) - xy \sin(xy)$$
*Explanation: Applied the product rule because $f_y$ is a product of two functions of $x$ ($x$ itself and $\cos(xy)$). Also applied the chain rule for $\cos(xy)$ with respect to $x$.*

**Step 5: Compare the results.**
We found $f_{xy} = \cos(xy) - xy \sin(xy)$ and $f_{yx} = \cos(xy) - xy \sin(xy)$.
Since $f_{xy}$ and $f_{yx}$ are equal, and they are compositions of trigonometric and polynomial functions (which are continuous everywhere), Clairaut's Theorem is verified.

The mixed partial derivatives are:
$$\boxed{f_{xy} = \cos(xy) - xy \sin(xy)}$$
$$\boxed{f_{yx} = \cos(xy) - xy \sin(xy)}$$

*Reflection:* This example required careful application of both the chain rule and the product rule, which are common sources of error in multivariable differentiation. The symmetry of the resulting expression is a good indicator that the calculations were likely correct.

---

### Example 3: Exponential Function

**Problem:** Verify Clairaut's Theorem for the function $f(x, y) = e^{x/y}$.

**Given:** A function $f(x, y) = e^{x/y}$.
**Want:** To show that $\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$.

**Step 1: Calculate the first partial derivative with respect to $x$, $f_x$.**
$$f_x = \frac{\partial}{\partial x}(e^{x/y})$$
We use the chain rule: $\frac{d}{du}(e^u) = e^u \cdot \frac{du}{dx}$. Here $u = x/y$.
$$f_x = e^{x/y} \cdot \frac{\partial}{\partial x}(x/y)$$
Treat $y$ as a constant. So $x/y = (1/y)x$.
$$f_x = e^{x/y} \cdot (1/y)$$
$$f_x = \frac{1}{y} e^{x/y}$$
*Explanation: Applied the chain rule for $e^u$ where $u=x/y$. Differentiating $x/y$ with respect to $x$ gives $1/y$ (since $1/y$ is constant).*

**Step 2: Calculate the mixed partial derivative $f_{xy}$ (differentiate $f_x$ with respect to $y$).**
$$f_{xy} = \frac{\partial}{\partial y}\left(\frac{1}{y} e^{x/y}\right)$$
We use the product rule: $\frac{\partial}{\partial y}(uv) = u'v + uv'$. Here $u=1/y = y^{-1}$ and $v=e^{x/y}$.
$$f_{xy} = \frac{\partial}{\partial y}(y^{-1}) \cdot e^{x/y} + y^{-1} \cdot \frac{\partial}{\partial y}(e^{x/y})$$
Differentiating $y^{-1}$ with respect to $y$ gives $-1y^{-2} = -1/y^2$.
Differentiating $e^{x/y}$ with respect to $y$ (using chain rule, $u=x/y$): $e^{x/y} \cdot \frac{\partial}{\partial y}(x/y)$.
Since $x/y = x y^{-1}$, its derivative with respect to $y$ is $x(-1y^{-2}) = -x/y^2$.
So, $\frac{\partial}{\partial y}(e^{x/y}) = e^{x/y} \cdot (-x/y^2)$.
$$f_{xy} = \left(-\frac{1}{y^2}\right) e^{x/y} + \frac{1}{y} \left(e^{x/y} \cdot \left(-\frac{x}{y^2}\right)\right)$$
$$f_{xy} = -\frac{1}{y^2} e^{x/y} - \frac{x}{y^3} e^{x/y}$$
Factor out $e^{x/y}$:
$$f_{xy} = e^{x/y} \left(-\frac{1}{y^2} - \frac{x}{y^3}\right)$$
$$f_{xy} = e^{x/y} \left(\frac{-y - x}{y^3}\right)$$
$$f_{xy} = -\frac{x+y}{y^3} e^{x/y}$$
*Explanation: Applied the product rule for $\frac{1}{y}e^{x/y}$. This involved differentiating $y^{-1}$ and applying the chain rule to $e^{x/y}$ with respect to $y$. Careful algebraic simplification was needed.*

**Step 3: Calculate the first partial derivative with respect to $y$, $f_y$.**
$$f_y = \frac{\partial}{\partial y}(e^{x/y})$$
We use the chain rule: $\frac{d}{du}(e^u) = e^u \cdot \frac{du}{dy}$. Here $u = x/y = x y^{-1}$.
$$f_y = e^{x/y} \cdot \frac{\partial}{\partial y}(x y^{-1})$$
Treat $x$ as a constant.
$$f_y = e^{x/y} \cdot (x \cdot (-1y^{-2}))$$
$$f_y = -\frac{x}{y^2} e^{x/y}$$
*Explanation: Applied the chain rule for $e^u$ where $u=x/y$. Differentiating $x/y$ with respect to $y$ gives $-x/y^2$ (since $x$ is constant).*

**Step 4: Calculate the mixed partial derivative $f_{yx}$ (differentiate $f_y$ with respect to $x$).**
$$f_{yx} = \frac{\partial}{\partial x}\left(-\frac{x}{y^2} e^{x/y}\right)$$
We use the product rule: $\frac{\partial}{\partial x}(uv) = u'v + uv'$. Here $u=-x/y^2$ and $v=e^{x/y}$.
$$f_{yx} = \frac{\partial}{\partial x}\left(-\frac{x}{y^2}\right) \cdot e^{x/y} + \left(-\frac{x}{y^2}\right) \cdot \frac{\partial}{\partial x}(e^{x/y})$$
Differentiating $-x/y^2$ with respect to $x$ (treating $y$ as constant) gives $-1/y^2$.
Differentiating $e^{x/y}$ with respect to $x$ (from Step 1) gives $e^{x/y} \cdot (1/y)$.
$$f_{yx} = \left(-\frac{1}{y^2}\right) e^{x/y} + \left(-\frac{x}{y^2}\right) \left(e^{x/y} \cdot \frac{1}{y}\right)$$
$$f_{yx} = -\frac{1}{y^2} e^{x/y} - \frac{x}{y^3} e^{x/y}$$
Factor out $e^{x/y}$:
$$f_{yx} = e^{x/y} \left(-\frac{1}{y^2} - \frac{x}{y^3}\right)$$
$$f_{yx} = e^{x/y} \left(\frac{-y - x}{y^3}\right)$$
$$f_{yx} = -\frac{x+y}{y^3} e^{x/y}$$
*Explanation: Applied the product rule for $-\frac{x}{y^2}e^{x/y}$. This involved differentiating $-x/y^2$ with respect to $x$ and applying the chain rule to $e^{x/y}$ with respect to $x$. Careful algebraic simplification was needed.*

**Step 5: Compare the results.**
We found $f_{xy} = -\frac{x+y}{y^3} e^{x/y}$ and $f_{yx} = -\frac{x+y}{y^3} e^{x/y}$.
Since $f_{xy}$ and $f_{yx}$ are equal, and they are continuous wherever $y \neq 0$, Clairaut's Theorem is verified for $y \neq 0$.

The mixed partial derivatives are:
$$\boxed{f_{xy} = -\frac{x+y}{y^3} e^{x/y}}$$
$$\boxed{f_{yx} = -\frac{x+y}{y^3} e^{x/y}}$$

*Reflection:* This example was more challenging due to the exponential function and the fraction in the exponent. It required careful application of both the product rule and chain rule multiple times and meticulous algebraic simplification. The condition $y \neq 0$ is important for the continuity of the derivatives.

---

### Example 4: Function of Three Variables (Extension)

**Problem:** For the function $f(x, y, z) = x y^2 z^3$, show that $\frac{\partial^3 f}{\partial z \partial y \partial x} = \frac{\partial^3 f}{\partial y \partial x \partial z}$.

**Given:** A function $f(x, y, z) = x y^2 z^3$.
**Want:** To show that $f_{xyz} = f_{yxz}$. (Note: $f_{xyz}$ means differentiate with respect to $x$, then $y$, then $z$. $f_{yxz}$ means differentiate with respect to $y$, then $x$, then $z$).

Clairaut's Theorem extends to functions with more than two variables and to higher-order mixed partials. As long as all the partial derivatives up to the order in question are continuous, the order of differentiation does not matter.

**Part A: Calculate $f_{xyz}$** (differentiate with respect to $x$, then $y$, then $z$)

**Step A1: Calculate $f_x$.**
$$f_x = \frac{\partial}{\partial x}(x y^2 z^3)$$
Treat $y$ and $z$ as constants.
$$f_x = 1 \cdot y^2 z^3 = y^2 z^3$$
*Explanation: Differentiated $x$ to $1$, keeping $y^2 z^3$ as constant multipliers.*

**Step A2: Calculate $f_{xy}$ (differentiate $f_x$ with respect to $y$).**
$$f_{xy} = \frac{\partial}{\partial y}(y^2 z^3)$$
Treat $z$ as a constant.
$$f_{xy} = 2y z^3$$
*Explanation: Differentiated $y^2$ to $2y$, keeping $z^3$ as a constant multiplier.*

**Step A3: Calculate $f_{xyz}$ (differentiate $f_{xy}$ with respect to $z$).**
$$f_{xyz} = \frac{\partial}{\partial z}(2y z^3)$$
Treat $y$ as a constant.
$$f_{xyz} = 2y \cdot 3z^2 = 6y z^2$$
*Explanation: Differentiated $z^3$ to $3z^2$, keeping $2y$ as a constant multiplier.*

**Part B: Calculate $f_{yxz}$** (differentiate with respect to $y$, then $x$, then $z$)

**Step B1: Calculate $f_y$.**
$$f_y = \frac{\partial}{\partial y}(x y^2 z^3)$$
Treat $x$ and $z$ as constants.
$$f_y = x \cdot 2y \cdot z^3 = 2x y z^3$$
*Explanation: Differentiated $y^2$ to $2y$, keeping $x z^3$ as constant multipliers.*

**Step B2: Calculate $f_{yx}$ (differentiate $f_y$ with respect to $x$).**
$$f_{yx} = \frac{\partial}{\partial x}(2x y z^3)$$
Treat $y$ and $z$ as constants.
$$f_{yx} = 2 \cdot 1 \cdot y z^3 = 2y z^3$$
*Explanation: Differentiated $x$ to $1$, keeping $2y z^3$ as constant multipliers.*

**Step B3: Calculate $f_{yxz}$ (differentiate $f_{yx}$ with respect to $z$).**
$$f_{yxz} = \frac{\partial}{\partial z}(2y z^3)$$
Treat $y$ as a constant.
$$f_{yxz} = 2y \cdot 3z^2 = 6y z^2$$
*Explanation: Differentiated $z^3$ to $3z^2$, keeping $2y$ as a constant multiplier.*

**Step C: Compare the results.**
We found $f_{xyz} = 6y z^2$ and $f_{yxz} = 6y z^2$.
Since $f_{xyz}$ and $f_{yxz}$ are equal, and they are polynomial functions (which are continuous everywhere), the extended Clairaut's Theorem is verified.

The mixed partial derivatives are:
$$\boxed{f_{xyz} = 6y z^2}$$
$$\boxed{f_{yxz} = 6y z^2}$$

*Reflection:* This example demonstrates that Clairaut's Theorem is not limited to two variables or second-order derivatives. As long as all the intermediate partial derivatives are continuous, the order of differentiation for any number of variables and any order will not affect the final result. The calculations are straightforward for polynomial functions.

## 6. Common mistakes and traps

1.  **Ignoring the continuity condition:** The most significant conceptual trap. Clairaut's Theorem is *not* universally true. It explicitly requires the mixed partial derivatives ($f_{xy}$ and $f_{yx}$) to be continuous at the point in question. Most "well-behaved" functions in typical calculus problems satisfy this, but it's a critical theoretical assumption.
2.  **Incorrect order of differentiation with notation:**
    *   $\frac{\partial^2 f}{\partial y \partial x}$ means differentiate with respect to $x$ *first*, then $y$.
    *   $f_{xy}$ means differentiate with respect to $x$ *first*, then $y$.
    Students sometimes incorrectly assume the order is read left-to-right for the fractional notation, leading to errors.
3.  **Algebraic errors:**
    *   **Product rule/Chain rule:** These rules are often necessary when taking partial derivatives, especially for mixed partials where one derivative might still contain both variables (e.g., $f_x = y \cos(xy)$). Forgetting or misapplying these rules is common.
    *   **Sign errors:** Especially with negative signs from derivatives of trigonometric functions or negative exponents.
4.  **Treating variables incorrectly as constants:** When differentiating with respect to $x$, all other variables ($y, z, \dots$) are treated as constants. A common mistake is to accidentally differentiate one of these "constants" or apply a chain rule when it's not needed.
5.  **Not simplifying expressions fully:** While the equality might be apparent before full simplification, it's good practice to simplify expressions to their most compact form to clearly see the equality and avoid missing subtle differences.
6.  **Assuming higher-order mixed partials are always equal:** While Clairaut's Theorem extends to higher orders (e.g., $f_{xyz} = f_{yzx}$), the condition for this extension is that *all* partial derivatives up to that order must be continuous.

## 7. Textbook-precise explanation

**Clairaut's Theorem (also known as Schwarz's Theorem or Young's Theorem):**

Let $f(x, y)$ be a function of two variables defined on an open disk $D$ in $\mathbb{R}^2$. If the partial derivatives $f_x$, $f_y$, $f_{xy}$, and $f_{yx}$ all exist on $D$, and if the mixed second-order partial derivatives $f_{xy}$ and $f_{yx}$ are continuous at a point $(a, b) \in D$, then
$$f_{xy}(a, b) = f_{yx}(a, b)$$

More generally, if all second-order partial derivatives of $f(x, y)$ exist and are continuous on an open disk $D$, then $f_{xy}(x, y) = f_{yx}(x, y)$ for all $(x, y) \in D$. Such a function is often referred to as a $C^2$ function (meaning it has continuous second-order partial derivatives).

**Extension to Higher Dimensions and Orders:**
The theorem extends to functions of more than two variables and to higher-order mixed partial derivatives. For a function $f(x_1, x_2, \dots, x_n)$, if all partial derivatives of $f$ of order up to $k$ exist and are continuous on an open set $D$, then any two mixed partial derivatives of order $k$ that involve the same number of differentiations with respect to each variable will be equal, regardless of the order of differentiation. For example, for a $C^3$ function $f(x, y, z)$, we would have $f_{xyz} = f_{xzy} = f_{yxz} = f_{yzx} = f_{zxy} = f_{zyx}$.

**Proof Sketch (Conceptual):**
The proof of Clairaut's Theorem typically involves applying the Mean Value Theorem multiple times. Consider a small rectangle in the $xy$-plane. By applying the Mean Value Theorem to the function $g(x) = f(x, y+\Delta y) - f(x, y)$ with respect to $x$, and then to $h(y) = f(x+\Delta x, y) - f(x, y)$ with respect to $y$, one can show that the difference between the two mixed partial derivatives approaches zero as the size of the rectangle shrinks, provided the partial derivatives are continuous.

**References:**
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021, §14.3.
*   Apostol, Tom M. *Calculus, Vol. 2: Multi-Variable Calculus and Linear Algebra with Applications to Differential Equations and Probability*. 2nd ed., Wiley, 1969, §8.13.

## 8. ASCII diagrams

Let's visualize the concept of mixed partials on a surface.

```text
       Z (f(x,y))
       ^
      /|\
     / | \
    /  |  \
   /   |   \
  /    |    \
 /-----P-----\  <- Surface z=f(x,y)
|      |      |
|      |      |
|      |      |
|      |      |
|      |      |
+-------------+----> Y
 \           /
  \         /
   \       /
    \     /
     \   /
      \ /
       X

Imagine point P on the surface f(x,y).

1.  ∂f/∂x: This represents the slope of the surface if you move from P purely in the +X direction (along a line parallel to the X-axis).
    (Think of a tangent line in the X-Z plane at P).

2.  ∂f/∂y: This represents the slope of the surface if you move from P purely in the +Y direction (along a line parallel to the Y-axis).
    (Think of a tangent line in the Y-Z plane at P).

Now, for the mixed partials:

∂²f/∂y∂x (or f_xy):
- First, find the slope in the X-direction (∂f/∂x). This slope itself is a function of (x,y).
- Second, observe how this X-direction slope changes as you move in the Y-direction.
  Imagine taking a step in the +Y direction from P to P'. Then, at P', find the X-direction slope again.
  ∂²f/∂y∂x tells you the rate at which the X-slope is changing as you traverse in the Y-direction.

∂²f/∂x∂y (or f_yx):
- First, find the slope in the Y-direction (∂f/∂y). This slope itself is a function of (x,y).
- Second, observe how this Y-direction slope changes as you move in the X-direction.
  Imagine taking a step in the +X direction from P to P''. Then, at P'', find the Y-direction slope again.
  ∂²f/∂x∂y tells you the rate at which the Y-slope is changing as you traverse in the X-direction.

Clairaut's Theorem says that for "smooth" surfaces, these two rates of change are identical.
The "change in X-slope as you move in Y" is the same as the "change in Y-slope as you move in X".
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic or Visual Hook:** Think of "Clairaut's Commutativity." In algebra, commutativity means the order of operations doesn't matter (e.g., $a+b = b+a$, $a \times b = b \times a$). Clairaut's Theorem states that for "nice" functions, the operations of partial differentiation with respect to different variables *commute*. You can swap the order and get the same result. Visualize two levers on a machine, one for $x$ and one for $y$. Usually, pressing $x$ then $y$ will lead to the same final state as pressing $y$ then $x$.

2.  **Formulas/Facts They MUST Overlearn:**
    *   The core equality: $\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$ (or $f_{xy} = f_{yx}$).
    *   The crucial condition: These mixed partial derivatives ($f_{xy}$ and $f_{yx}$) must be *continuous* at the point of interest.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the definition, work through one easy example.
    *   **3 Days:** Review the definition, work through one medium example, recall the continuity condition.
    *   **7 Days:** Review the definition, work through one hard example, articulate the "Why it matters" section.
    *   **16 Days:** Review the definition, try to state the theorem precisely, think of a counterexample (where it fails) if possible.
    *   **35 Days:** Re-derive a mixed partial from scratch for a complex function, explain the theorem to an imaginary peer.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the theorem, how can you rebuild the intuition?
    *   **Start with the definition of a partial derivative:**
        $f_x(x,y) = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$
        $f_y(x,y) = \lim_{k \to 0} \frac{f(x, y+k) - f(x, y)}{k}$
    *   **Then, consider the mixed partials using these definitions:**
        $f_{xy}(x,y) = \lim_{k \to 0} \frac{f_x(x, y+k) - f_x(x, y)}{k} = \lim_{k \to 0} \frac{\lim_{h \to 0} \frac{f(x+h, y+k) - f(x, y+k)}{h} - \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}}{k}$
        This looks complicated! The actual rigorous proof involves applying the Mean Value Theorem twice to a small change in the function over a rectangle. You don't need to re-derive the formal proof every time, but understanding that it comes from the fundamental definitions of limits and derivatives, and that the "smoothness" (continuity) is what allows the limits to be interchanged, is the key.
    *   **Simplified Pathway:** Think of a small change in $f(x,y)$ as you move from $(x,y)$ to $(x+\Delta x, y+\Delta y)$. The total change can be approximated in two ways:
        1.  Change in $x$, then change in $y$: $[f(x+\Delta x, y) - f(x, y)] + [f(x+\Delta x, y+\Delta y) - f(x+\Delta x, y)]$.
        2.  Change in $y$, then change in $x$: $[f(x, y+\Delta y) - f(x, y)] + [f(x+\Delta x, y+\Delta y) - f(x, y+\Delta y)]$.
        For smooth functions, these two paths should yield approximately the same total change. Clairaut's Theorem essentially formalizes why the *rate of change of the rate of change* is the same regardless of the order of the dimensions considered.

## 10. Connections — what this leads to

Clairaut's Theorem is a foundational result that underpins several advanced topics in multivariable calculus and its applications:

*   **Hessian Matrix and Optimization:** For functions of multiple variables, the Hessian matrix is a square matrix of second-order partial derivatives. Clairaut's Theorem guarantees that if the function is sufficiently smooth ($C^2$), the Hessian matrix is symmetric. This symmetry is crucial in optimization problems (e.g., finding local maxima, minima, or saddle points), as it simplifies calculations and is fundamental to the theory of quadratic forms and second-order Taylor expansions.
*   **Conservative Vector Fields and Potential Functions:** As mentioned in applications, a vector field $\mathbf{F} = \langle P, Q, R \rangle$ is conservative if and only if its curl is zero. This condition, for example, $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$, is a direct consequence of Clairaut's Theorem when $\mathbf{F}$ is the gradient of a scalar potential function $\phi$, i.e., $P = \frac{\partial \phi}{\partial x}$ and $Q = \frac{\partial \phi}{\partial y}$. The existence of such a potential function is critical in physics (e.g., gravitational and electrostatic fields) and engineering.
*   **Exact Differential Equations:** In the study of differential equations, a first-order differential equation $M(x, y) dx + N(x, y) dy = 0$ is "exact" if $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$. This condition is precisely the condition for the existence of a function $\phi(x, y)$ such that $M = \frac{\partial \phi}{\partial x}$ and $N = \frac{\partial \phi}{\partial y}$, which is a direct application of Clairaut's Theorem.
*   **Taylor Series for Multivariable Functions:** The coefficients in the multivariable Taylor series expansion involve higher-order partial derivatives. Clairaut's Theorem simplifies these expansions by reducing the number of unique partial derivatives that need to be calculated. For example, the second-order terms involve $f_{xx}, f_{yy}, f_{xy}$, but $f_{yx}$ is not a *new* term.
*   **Partial Differential Equations (PDEs):** Understanding the properties of partial derivatives is fundamental to solving and analyzing PDEs. While not a direct solution method, the ability to interchange the order of differentiation can sometimes simplify the form of a PDE or its boundary conditions.
*   **Differential Geometry:** In the study of curves and surfaces, Clairaut's Theorem ensures the smoothness and well-behaved nature of various geometric quantities, such as curvature, which are defined using second partial derivatives.

## 11. Self-check questions

1.  For the function $f(x, y) = x^2 \cos(y) + y^3 \sin(x)$, calculate $f_{xy}$ and $f_{yx}$. Do they agree?
2.  Consider the function $g(x, y) = \ln(x^2 + y^2)$. Find $\frac{\partial^2 g}{\partial x \partial y}$ and $\frac{\partial^2 g}{\partial y \partial x}$. What values of $(x,y)$ must be excluded for these derivatives to be continuous?
3.  Given a function $h(x, y, z) = e^{xyz}$. Calculate $h_{xzy}$ and $h_{yzx}$.
4.  A function $k(x, y)$ is defined such that $k_x = x^2 y + 3y^2$ and $k_y = x y^2 + 6xy$. Is there a potential function $k(x, y)$ that satisfies these first partial derivatives? Explain your reasoning using Clairaut's Theorem.
5.  Construct a function (or describe its properties) where Clairaut's Theorem might *not* hold at a specific point, and explain why the conditions of the theorem are violated.