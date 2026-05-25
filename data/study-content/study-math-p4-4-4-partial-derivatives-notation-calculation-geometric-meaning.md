## 1. What it is — in plain English

Imagine you're controlling a complicated machine, like a flight simulator for an airplane. This machine has many dials and levers: a throttle for speed, a yoke for steering left/right, another control for pitching up/down, and so on.

A "partial derivative" is like asking: "If I only touch *one* control, how much does *that specific control* affect the plane's altitude right now?" You're not changing the steering or the pitch; you're just nudging the throttle forward a tiny bit, and observing only the change in altitude.

In math, we often deal with "functions" that depend on multiple things. For example, the temperature in a room might depend on your position (east-west, north-south) and your height above the floor. A partial derivative tells you how the temperature changes if you only move, say, directly north or directly up, while holding your other positions perfectly still.

It's about isolating the effect of a single input variable on the output, assuming all other inputs are frozen in time or held constant. It gives us a precise measure of the "slope" or "rate of change" in a very specific, constrained direction.

## 2. Why it matters — real-world applications

Partial derivatives are fundamental tools across science, engineering, and economics because most real-world phenomena depend on multiple interacting factors.

1.  **Aerospace Engineering (Aerodynamics & Optimization):** When designing an aircraft wing, engineers need to understand how lift and drag forces change with various parameters like angle of attack, airspeed, wing shape (e.g., curvature, thickness), and air density. Partial derivatives allow them to calculate, for example, how much lift increases if *only* the angle of attack is slightly increased, holding all other factors constant. This is crucial for optimizing wing designs for fuel efficiency and performance. Companies like Boeing and Airbus heavily rely on these calculations, often integrated into Computational Fluid Dynamics (CFD) simulations.

2.  **Machine Learning (Gradient Descent):** One of the most common algorithms for training machine learning models (like neural networks) is called gradient descent. The goal is to minimize a "cost function" that measures how well the model performs. This cost function depends on millions of "weights" and "biases" in the neural network. Partial derivatives tell the algorithm how much the cost changes with respect to each individual weight or bias. By calculating all these partial derivatives (which form the "gradient"), the algorithm knows which way to adjust each weight to reduce the cost most efficiently, leading to better model accuracy. Google's TensorFlow and Meta's PyTorch frameworks are built upon the efficient computation of these partial derivatives.

3.  **Physics (Thermodynamics & Fluid Dynamics):** In thermodynamics, the pressure of a gas might be a function of its volume and temperature ($P(V, T)$). Partial derivatives like $\frac{\partial P}{\partial V}$ (how pressure changes with volume at constant temperature) or $\frac{\partial P}{\partial T}$ (how pressure changes with temperature at constant volume) are essential for understanding gas behavior, designing engines, and predicting weather patterns. Similarly, in fluid dynamics, understanding how fluid velocity or pressure changes with position in different directions (e.g., $\frac{\partial v_x}{\partial x}$, $\frac{\partial p}{\partial y}$) is critical for designing pipelines, understanding ocean currents, or modeling blood flow.

4.  **Economics (Marginal Analysis):** Economists use partial derivatives to understand "marginal" effects. For example, a company's profit might depend on the amount of labor ($L$) and capital ($K$) it employs. $\frac{\partial \text{Profit}}{\partial L}$ would tell them the "marginal profit of labor"—how much profit increases if they hire one more unit of labor, assuming capital investment remains constant. This helps businesses make optimal decisions about resource allocation and pricing strategies.

## 3. Prerequisites — what you must know first

Before diving deep into partial derivatives, ensure you have a solid grasp of these foundational concepts:

*   **Functions of a Single Variable:** Understanding $y = f(x)$, its domain, range, and how to evaluate it.
*   **Limits:** The concept of approaching a value, formal definition ($\epsilon-\delta$), and basic limit laws. This is crucial for the formal definition of a derivative.
*   **Derivatives of a Single Variable:** The definition of a derivative ($f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$), all differentiation rules (power, product, quotient, chain rule), and their geometric meaning (slope of a tangent line).
*   **Continuity:** What it means for a function to be continuous at a point and over an interval.
*   **Multivariable Functions:** The concept of a function $z = f(x, y)$ or $w = f(x, y, z)$, its domain, range, and basic ways to visualize them (e.g., level curves or surfaces).
*   **Analytic Geometry in 3D:** Understanding points $(x,y,z)$, lines, planes, and basic surfaces (like spheres, cylinders, paraboloids) in three-dimensional space.

## 4. The core idea — step by step

Let's build up the concept of a partial derivative slowly, piece by piece.

### Step 1: Revisiting Single-Variable Derivatives

**Plain-English Statement:** When you have a function that depends on just one input, its derivative tells you how sensitive the output is to tiny changes in that single input. It's the instantaneous rate of change.

**Small Concrete Example:** Consider the function $f(x) = x^2$. If you're at $x=3$, and you nudge $x$ a tiny bit, how much does $f(x)$ change? The derivative $\frac{df}{dx} = 2x$ tells us that at $x=3$, the rate of change is $2(3)=6$. This means for a tiny increase in $x$ from $3$, $f(x)$ increases about 6 times as fast. Geometrically, it's the slope of the tangent line to the parabola $y=x^2$ at $x=3$.

**Formal/Mathematical Version:**
For a function $y = f(x)$, its derivative $f'(x)$ (or $\frac{df}{dx}$) is defined as:
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
This limit, if it exists, gives the instantaneous rate of change of $f$ with respect to $x$.

**What Could Go Wrong:** You might confuse the derivative (instantaneous rate of change) with the average rate of change over an interval. The derivative is the limit as that interval shrinks to zero.

### Step 2: Introducing Multivariable Functions

**Plain-English Statement:** Most things in the real world don't just depend on one factor. A multivariable function is simply a mathematical way to describe an output that depends on several different inputs simultaneously.

**Small Concrete Example:** The volume of a cylindrical can depends on its radius $r$ and its height $h$. So, Volume $V(r, h) = \pi r^2 h$. Here, $V$ is a function of two variables, $r$ and $h$. Another example: the temperature $T$ at a point $(x, y)$ on a metal plate could be $T(x, y) = x^2 + y^2$.

**Formal/Mathematical Version:**
A function $f$ of $n$ variables $x_1, x_2, \dots, x_n$ is a rule that assigns to each ordered $n$-tuple $(x_1, x_2, \dots, x_n)$ in its domain $D \subset \mathbb{R}^n$ a unique real number $f(x_1, x_2, \dots, x_n) \in \mathbb{R}$. We often write $z = f(x,y)$ for two variables, or $w = f(x,y,z)$ for three variables.

**What Could Go Wrong:** When first encountering multivariable functions, it's tempting to try and graph them as easily as single-variable functions. A function of two variables $z=f(x,y)$ requires 3D space for its graph, which is a surface. A function of three variables $w=f(x,y,z)$ requires 4D space, which is impossible to visualize directly.

### Step 3: The "Hold Others Constant" Insight

**Plain-English Statement:** Since we can't easily change *all* inputs at once and understand the effect, let's simplify. To understand how one specific input affects the output, we'll imagine all other inputs are completely frozen—they don't change at all.

**Small Concrete Example:** For our temperature function $T(x,y) = x^2 + y^2$, let's say we want to know how temperature changes as we move horizontally (changing $x$) while keeping our vertical position ($y$) fixed at, say, $y=2$. If $y=2$, then the function becomes $T(x, 2) = x^2 + 2^2 = x^2 + 4$. This is now a simple single-variable function of $x$! We can differentiate it with respect to $x$ using our old rules.

**Formal/Mathematical Version:**
To find the partial derivative of $f(x, y)$ with respect to $x$, we treat $y$ as a constant. This effectively reduces $f(x, y)$ to a single-variable function of $x$, say $g(x) = f(x, c)$ for some constant $c$. Similarly, to find the partial derivative with respect to $y$, we treat $x$ as a constant, forming $h(y) = f(c, y)$.

**What Could Go Wrong:** The biggest trap here is *not* treating the other variables as true constants. Remember, if you treat $y$ as a constant, then its derivative with respect to $x$ is 0, not $\frac{dy}{dx}$ (because $y$ isn't changing with $x$ in this context).

### Step 4: Calculating the Partial Derivative

**Plain-English Statement:** Now that we know to hold other variables constant, calculating a partial derivative is exactly like calculating a regular derivative from single-variable calculus. You just apply all your familiar differentiation rules, but with the understanding that anything not the "variable of differentiation" is a constant.

**Small Concrete Example:** Let's use $f(x, y) = x^2 y^3 + 5x - y$.
*   **To find the partial derivative with respect to $x$ (denoted $\frac{\partial f}{\partial x}$ or $f_x$):**
    Treat $y$ as a constant.
    $f(x,y) = x^2 \cdot (\text{constant})^3 + 5x - (\text{constant})$
    $\frac{\partial f}{\partial x} = \frac{\partial}{\partial x}(x^2 y^3) + \frac{\partial}{\partial x}(5x) - \frac{\partial}{\partial x}(y)$
    $= y^3 \frac{\partial}{\partial x}(x^2) + 5 \frac{\partial}{\partial x}(x) - 0$ (since $y$ is a constant, $y^3$ is a constant, and its derivative is 0)
    $= y^3 (2x) + 5(1) - 0 = 2xy^3 + 5$.

*   **To find the partial derivative with respect to $y$ (denoted $\frac{\partial f}{\partial y}$ or $f_y$):**
    Treat $x$ as a constant.
    $f(x,y) = (\text{constant})^2 y^3 + 5(\text{constant}) - y$
    $\frac{\partial f}{\partial y} = \frac{\partial}{\partial y}(x^2 y^3) + \frac{\partial}{\partial y}(5x) - \frac{\partial}{\partial y}(y)$
    $= x^2 \frac{\partial}{\partial y}(y^3) + 0 - 1$ (since $x$ is a constant, $x^2$ is a constant, and $5x$ is a constant)
    $= x^2 (3y^2) + 0 - 1 = 3x^2 y^2 - 1$.

**Formal/Mathematical Version:**
The partial derivative of $f(x, y)$ with respect to $x$ is defined as:
$$\frac{\partial f}{\partial x}(x, y) = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$
The partial derivative of $f(x, y)$ with respect to $y$ is defined as:
$$\frac{\partial f}{\partial y}(x, y) = \lim_{k \to 0} \frac{f(x, y+k) - f(x, y)}{k}$$
Notice how only *one* variable is incremented in the limit definition, while the other is held fixed.

**What Could Go Wrong:** Forgetting the chain rule. If you have $f(x,y) = \sin(xy)$, and you need $\frac{\partial f}{\partial x}$, then $y$ is a constant. So, $\frac{\partial}{\partial x} \sin(xy) = \cos(xy) \cdot \frac{\partial}{\partial x}(xy) = \cos(xy) \cdot y$. Don't forget that constant factors *inside* a function's argument still participate in the chain rule.

### Step 5: Notation

**Plain-English Statement:** There are several ways to write "the partial derivative of a function with respect to a specific variable." They all mean the same thing.

**Small Concrete Example:** For a function $f(x, y)$ or $z = f(x, y)$:
*   The partial derivative with respect to $x$: $\frac{\partial f}{\partial x}$, $f_x(x, y)$, $\frac{\partial z}{\partial x}$, $\partial_x f$.
*   The partial derivative with respect to $y$: $\frac{\partial f}{\partial y}$, $f_y(x, y)$, $\frac{\partial z}{\partial y}$, $\partial_y f$.
If we need to evaluate it at a specific point $(a, b)$, we write $f_x(a, b)$ or $\frac{\partial f}{\partial x}(a, b)$.

**Formal/Mathematical Version:**
The symbol $\partial$ (a stylized lowercase 'd') is used specifically for partial derivatives to distinguish them from ordinary derivatives ($d$).
For $z=f(x,y)$:
*   $\frac{\partial f}{\partial x}$ or $\frac{\partial z}{\partial x}$ (Leibniz notation)
*   $f_x$ or $z_x$ (subscript notation)
*   $\partial_x f$ (operator notation)
All these notations are equivalent. When dealing with functions of three or more variables, the pattern extends naturally: $f_x, f_y, f_z$ or $\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z}$.

**What Could Go Wrong:** Getting bogged down by the different notations. Just pick one you're comfortable with for calculation, but be able to recognize all of them. The Leibniz notation ($\frac{\partial f}{\partial x}$) is often clearer about which variable is being held constant.

### Step 6: Geometric Meaning

**Plain-English Statement:** A partial derivative is still a slope! But it's not the slope of the entire surface. Instead, it's the slope of a specific "slice" of the surface. Imagine taking a knife and cutting the surface parallel to one of the coordinate axes. The partial derivative is the slope of the tangent line to that cut curve.

**Small Concrete Example:** Consider the surface $z = f(x, y) = x^2 + y^2$ (a paraboloid).
*   **$\frac{\partial f}{\partial x}(1, 2)$:** This represents the slope of the tangent line at the point $(1, 2, f(1,2)=5)$ on the surface. But it's not just *any* slope. It's the slope if you were walking on the surface directly parallel to the $x$-axis (meaning $y$ is held constant at $y=2$).
    If $y=2$, the surface becomes $z = x^2 + 2^2 = x^2 + 4$. This is a parabola in the plane $y=2$.
    The derivative of this parabola with respect to $x$ is $\frac{d}{dx}(x^2+4) = 2x$.
    At $x=1$, this slope is $2(1)=2$. So, $\frac{\partial f}{\partial x}(1, 2) = 2$. This is the slope of the tangent line to the curve $z=x^2+4$ (in the plane $y=2$) at the point $(1,2,5)$.

*   **$\frac{\partial f}{\partial y}(1, 2)$:** Similarly, this is the slope of the tangent line at $(1, 2, 5)$ if you were walking directly parallel to the $y$-axis (meaning $x$ is held constant at $x=1$).
    If $x=1$, the surface becomes $z = 1^2 + y^2 = 1 + y^2$. This is a parabola in the plane $x=1$.
    The derivative of this parabola with respect to $y$ is $\frac{d}{dy}(1+y^2) = 2y$.
    At $y=2$, this slope is $2(2)=4$. So, $\frac{\partial f}{\partial y}(1, 2) = 4$. This is the slope of the tangent line to the curve $z=1+y^2$ (in the plane $x=1$) at the point $(1,2,5)$.

**Formal/Mathematical Version:**
For a function $z = f(x, y)$, the partial derivative $\frac{\partial f}{\partial x}(a, b)$ is the slope of the tangent line to the curve formed by the intersection of the surface $z=f(x,y)$ and the plane $y=b$, at the point $(a, b, f(a,b))$.
Similarly, $\frac{\partial f}{\partial y}(a, b)$ is the slope of the tangent line to the curve formed by the intersection of the surface $z=f(x,y)$ and the plane $x=a$, at the point $(a, b, f(a,b))$.
These two tangent lines lie in the tangent plane to the surface at $(a,b,f(a,b))$.

**What Could Go Wrong:** Thinking that the partial derivative gives you the slope of the surface in *any* direction. It only gives the slope in directions parallel to the coordinate axes (e.g., purely in the $x$ direction or purely in the $y$ direction). To find the slope in an arbitrary direction, you need the concept of a **directional derivative**.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify the calculation process.

### Example 1: Basic Polynomial Function

**Problem:** Find the partial derivatives $f_x$ and $f_y$ for the function $f(x,y) = x^3 y^2 + 5x - 7y$.

**Given:** The function $f(x,y) = x^3 y^2 + 5x - 7y$.
**Want:** $f_x$ and $f_y$.

---

**Step-by-step for $f_x$:**

1.  **Identify the goal:** We want to find $f_x$, which means we differentiate $f(x,y)$ with respect to $x$.
2.  **Rule:** Treat $y$ as a constant.
3.  **Differentiate term by term:**
    $$f_x = \frac{\partial}{\partial x}(x^3 y^2 + 5x - 7y)$$
    This means we'll apply the derivative operator to each term separately, due to the sum/difference rule for derivatives.
4.  **First term: $\frac{\partial}{\partial x}(x^3 y^2)$**
    Since $y$ is treated as a constant, $y^2$ is also a constant.
    We can pull the constant $y^2$ out:
    $$ = y^2 \frac{\partial}{\partial x}(x^3) $$
    Now differentiate $x^3$ with respect to $x$ using the power rule ($\frac{d}{dx}x^n = nx^{n-1}$):
    $$ = y^2 (3x^{3-1}) = 3x^2 y^2 $$
5.  **Second term: $\frac{\partial}{\partial x}(5x)$**
    This is a standard derivative of a constant times $x$:
    $$ = 5 \frac{\partial}{\partial x}(x) = 5(1) = 5 $$
6.  **Third term: $\frac{\partial}{\partial x}(-7y)$**
    Since $y$ is treated as a constant, $-7y$ is also a constant.
    The derivative of any constant with respect to $x$ is zero:
    $$ = 0 $$
7.  **Combine the terms:**
    Add the results from steps 4, 5, and 6:
    $$ f_x = 3x^2 y^2 + 5 + 0 $$
    $$ \boxed{f_x = 3x^2 y^2 + 5} $$

---

**Step-by-step for $f_y$:**

1.  **Identify the goal:** We want to find $f_y$, which means we differentiate $f(x,y)$ with respect to $y$.
2.  **Rule:** Treat $x$ as a constant.
3.  **Differentiate term by term:**
    $$f_y = \frac{\partial}{\partial y}(x^3 y^2 + 5x - 7y)$$
    Apply the derivative operator to each term separately.
4.  **First term: $\frac{\partial}{\partial y}(x^3 y^2)$**
    Since $x$ is treated as a constant, $x^3$ is also a constant.
    Pull the constant $x^3$ out:
    $$ = x^3 \frac{\partial}{\partial y}(y^2) $$
    Now differentiate $y^2$ with respect to $y$ using the power rule:
    $$ = x^3 (2y^{2-1}) = 2x^3 y $$
5.  **Second term: $\frac{\partial}{\partial y}(5x)$**
    Since $x$ is treated as a constant, $5x$ is a constant.
    The derivative of any constant with respect to $y$ is zero:
    $$ = 0 $$
6.  **Third term: $\frac{\partial}{\partial y}(-7y)$**
    This is a standard derivative of a constant times $y$:
    $$ = -7 \frac{\partial}{\partial y}(y) = -7(1) = -7 $$
7.  **Combine the terms:**
    Add the results from steps 4, 5, and 6:
    $$ f_y = 2x^3 y + 0 - 7 $$
    $$ \boxed{f_y = 2x^3 y - 7} $$

**Reflection:** This example was straightforward, primarily testing the ability to correctly identify constants and apply the power rule. The main "trick" is ensuring terms involving only the "other" variable become zero.

---

### Example 2: Function with Three Variables and Trigonometric/Exponential Terms

**Problem:** Find $g_x, g_y,$ and $g_z$ for the function $g(x,y,z) = x \sin(yz) + e^{x^2} - \frac{z}{y}$.

**Given:** The function $g(x,y,z) = x \sin(yz) + e^{x^2} - \frac{z}{y}$.
**Want:** $g_x, g_y, g_z$.

---

**Step-by-step for $g_x$:**

1.  **Identify the goal:** Differentiate $g(x,y,z)$ with respect to $x$.
2.  **Rule:** Treat $y$ and $z$ as constants.
3.  **Differentiate term by term:**
    $$g_x = \frac{\partial}{\partial x}(x \sin(yz) + e^{x^2} - \frac{z}{y})$$
4.  **First term: $\frac{\partial}{\partial x}(x \sin(yz))$**
    Since $y$ and $z$ are constants, $\sin(yz)$ is a constant.
    $$ = \sin(yz) \frac{\partial}{\partial x}(x) = \sin(yz)(1) = \sin(yz) $$
5.  **Second term: $\frac{\partial}{\partial x}(e^{x^2})$**
    This requires the chain rule: $\frac{d}{dx}e^{u} = e^u \frac{du}{dx}$. Here $u=x^2$.
    $$ = e^{x^2} \frac{\partial}{\partial x}(x^2) = e^{x^2}(2x) = 2xe^{x^2} $$
6.  **Third term: $\frac{\partial}{\partial x}(-\frac{z}{y})$**
    Since $z$ and $y$ are constants, $-\frac{z}{y}$ is a constant.
    The derivative of a constant with respect to $x$ is zero:
    $$ = 0 $$
7.  **Combine the terms:**
    $$ \boxed{g_x = \sin(yz) + 2xe^{x^2}} $$

---

**Step-by-step for $g_y$:**

1.  **Identify the goal:** Differentiate $g(x,y,z)$ with respect to $y$.
2.  **Rule:** Treat $x$ and $z$ as constants.
3.  **Differentiate term by term:**
    $$g_y = \frac{\partial}{\partial y}(x \sin(yz) + e^{x^2} - \frac{z}{y})$$
4.  **First term: $\frac{\partial}{\partial y}(x \sin(yz))$**
    Since $x$ is a constant, pull it out. This term also requires the chain rule for $\sin(yz)$. Let $u=yz$.
    $$ = x \frac{\partial}{\partial y}(\sin(yz)) = x \cos(yz) \frac{\partial}{\partial y}(yz) $$
    Since $z$ is a constant, $\frac{\partial}{\partial y}(yz) = z \frac{\partial}{\partial y}(y) = z(1) = z$.
    $$ = x \cos(yz) (z) = xz \cos(yz) $$
5.  **Second term: $\frac{\partial}{\partial y}(e^{x^2})$**
    Since $x$ is a constant, $x^2$ is a constant, so $e^{x^2}$ is a constant.
    The derivative of a constant with respect to $y$ is zero:
    $$ = 0 $$
6.  **Third term: $\frac{\partial}{\partial y}(-\frac{z}{y})$**
    Since $z$ is a constant, we can write this as $-z y^{-1}$.
    $$ = -z \frac{\partial}{\partial y}(y^{-1}) = -z (-1 y^{-2}) = z y^{-2} = \frac{z}{y^2} $$
7.  **Combine the terms:**
    $$ \boxed{g_y = xz \cos(yz) + \frac{z}{y^2}} $$

---

**Step-by-step for $g_z$:**

1.  **Identify the goal:** Differentiate $g(x,y,z)$ with respect to $z$.
2.  **Rule:** Treat $x$ and $y$ as constants.
3.  **Differentiate term by term:**
    $$g_z = \frac{\partial}{\partial z}(x \sin(yz) + e^{x^2} - \frac{z}{y})$$
4.  **First term: $\frac{\partial}{\partial z}(x \sin(yz))$**
    Since $x$ is a constant, pull it out. This term also requires the chain rule for $\sin(yz)$. Let $u=yz$.
    $$ = x \frac{\partial}{\partial z}(\sin(yz)) = x \cos(yz) \frac{\partial}{\partial z}(yz) $$
    Since $y$ is a constant, $\frac{\partial}{\partial z}(yz) = y \frac{\partial}{\partial z}(z) = y(1) = y$.
    $$ = x \cos(yz) (y) = xy \cos(yz) $$
5.  **Second term: $\frac{\partial}{\partial z}(e^{x^2})$**
    Since $x$ is a constant, $e^{x^2}$ is a constant.
    The derivative of a constant with respect to $z$ is zero:
    $$ = 0 $$
6.  **Third term: $\frac{\partial}{\partial z}(-\frac{z}{y})$**
    Since $y$ is a constant, we can write this as $-\frac{1}{y} z$.
    $$ = -\frac{1}{y} \frac{\partial}{\partial z}(z) = -\frac{1}{y}(1) = -\frac{1}{y} $$
7.  **Combine the terms:**
    $$ \boxed{g_z = xy \cos(yz) - \frac{1}{y}} $$

**Reflection:** This example introduced the chain rule and more complex functions. The key is to be meticulous about which variables are constants and to apply the chain rule correctly when a constant is *inside* a function's argument (e.g., $yz$ in $\sin(yz)$).

---

### Example 3: Function with Logarithm and Chain Rule

**Problem:** Find $\frac{\partial h}{\partial x}$ and $\frac{\partial h}{\partial y}$ for $h(x,y) = \ln(x^2 + y^2)$.

**Given:** The function $h(x,y) = \ln(x^2 + y^2)$.
**Want:** $\frac{\partial h}{\partial x}$ and $\frac{\partial h}{\partial y}$.

---

**Step-by-step for $\frac{\partial h}{\partial x}$:**

1.  **Identify the goal:** Differentiate $h(x,y)$ with respect to $x$.
2.  **Rule:** Treat $y$ as a constant.
3.  **Apply chain rule:** The derivative of $\ln(u)$ is $\frac{1}{u} \frac{du}{dx}$. Here, $u = x^2 + y^2$.
    $$\frac{\partial h}{\partial x} = \frac{1}{x^2 + y^2} \cdot \frac{\partial}{\partial x}(x^2 + y^2)$$
4.  **Differentiate the inner function $\frac{\partial}{\partial x}(x^2 + y^2)$:**
    Treat $y$ as a constant.
    $$ = \frac{\partial}{\partial x}(x^2) + \frac{\partial}{\partial x}(y^2) $$
    $$ = 2x + 0 $$
    $$ = 2x $$
5.  **Combine the parts:**
    Substitute the result from step 4 back into step 3:
    $$\frac{\partial h}{\partial x} = \frac{1}{x^2 + y^2} \cdot (2x)$$
    $$ \boxed{\frac{\partial h}{\partial x} = \frac{2x}{x^2 + y^2}} $$

---

**Step-by-step for $\frac{\partial h}{\partial y}$:**

1.  **Identify the goal:** Differentiate $h(x,y)$ with respect to $y$.
2.  **Rule:** Treat $x$ as a constant.
3.  **Apply chain rule:** The derivative of $\ln(u)$ is $\frac{1}{u} \frac{du}{dy}$. Here, $u = x^2 + y^2$.
    $$\frac{\partial h}{\partial y} = \frac{1}{x^2 + y^2} \cdot \frac{\partial}{\partial y}(x^2 + y^2)$$
4.  **Differentiate the inner function $\frac{\partial}{\partial y}(x^2 + y^2)$:**
    Treat $x$ as a constant.
    $$ = \frac{\partial}{\partial y}(x^2) + \frac{\partial}{\partial y}(y^2) $$
    $$ = 0 + 2y $$
    $$ = 2y $$
5.  **Combine the parts:**
    Substitute the result from step 4 back into step 3:
    $$\frac{\partial h}{\partial y} = \frac{1}{x^2 + y^2} \cdot (2y)$$
    $$ \boxed{\frac{\partial h}{\partial y} = \frac{2y}{x^2 + y^2}} $$

**Reflection:** This example highlights the importance of the chain rule. Even though $y^2$ is treated as a constant when differentiating with respect to $x$, it's still part of the argument of the $\ln$ function, so it must be included in the $u$ of $\ln(u)$. Its derivative with respect to $x$ *within* the chain rule calculation is simply zero.

---

### Example 4: Implicit Differentiation for Partial Derivatives

**Problem:** Given the equation $x^2 y + y^2 z + z^2 x = 10$, find $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$. Assume $z$ is an implicit function of $x$ and $y$, i.e., $z=z(x,y)$.

**Given:** The implicit equation $F(x,y,z) = x^2 y + y^2 z + z^2 x = 10$.
**Want:** $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$.

---

**Step-by-step for $\frac{\partial z}{\partial x}$:**

1.  **Identify the goal:** We want to find $\frac{\partial z}{\partial x}$. This means we differentiate the entire equation with respect to $x$, treating $y$ as a constant and $z$ as a function of $x$ (and $y$).
2.  **Differentiate both sides with respect to $x$:**
    $$ \frac{\partial}{\partial x}(x^2 y + y^2 z + z^2 x) = \frac{\partial}{\partial x}(10) $$
3.  **Differentiate the left side term by term:**
    *   **Term 1: $\frac{\partial}{\partial x}(x^2 y)$**
        Since $y$ is a constant:
        $$ = y \frac{\partial}{\partial x}(x^2) = y(2x) = 2xy $$
    *   **Term 2: $\frac{\partial}{\partial x}(y^2 z)$**
        Since $y$ is a constant, $y^2$ is a constant. But $z$ is a function of $x$, so we must use the chain rule for $z$: $\frac{\partial}{\partial x}(y^2 z) = y^2 \frac{\partial z}{\partial x}$.
        $$ = y^2 \frac{\partial z}{\partial x} $$
    *   **Term 3: $\frac{\partial}{\partial x}(z^2 x)$**
        This is a product of two functions of $x$ ($z^2$ and $x$), so we use the product rule: $\frac{\partial}{\partial x}(uv) = u'v + uv'$. Here $u=z^2$ and $v=x$.
        $\frac{\partial}{\partial x}(z^2) = 2z \frac{\partial z}{\partial x}$ (by chain rule, since $z$ is a function of $x$).
        $\frac{\partial}{\partial x}(x) = 1$.
        So, $\frac{\partial}{\partial x}(z^2 x) = \left(2z \frac{\partial z}{\partial x}\right)x + z^2(1) = 2xz \frac{\partial z}{\partial x} + z^2$.
4.  **Differentiate the right side:**
    $$ \frac{\partial}{\partial x}(10) = 0 $$
5.  **Assemble the differentiated equation:**
    $$ 2xy + y^2 \frac{\partial z}{\partial x} + 2xz \frac{\partial z}{\partial x} + z^2 = 0 $$
6.  **Isolate $\frac{\partial z}{\partial x}$:**
    Move terms without $\frac{\partial z}{\partial x}$ to the right side:
    $$ y^2 \frac{\partial z}{\partial x} + 2xz \frac{\partial z}{\partial x} = -2xy - z^2 $$
    Factor out $\frac{\partial z}{\partial x}$:
    $$ \frac{\partial z}{\partial x}(y^2 + 2xz) = -2xy - z^2 $$
    Divide to solve for $\frac{\partial z}{\partial x}$:
    $$ \boxed{\frac{\partial z}{\partial x} = \frac{-2xy - z^2}{y^2 + 2xz}} $$

---

**Step-by-step for $\frac{\partial z}{\partial y}$:**

1.  **Identify the goal:** We want to find $\frac{\partial z}{\partial y}$. This means we differentiate the entire equation with respect to $y$, treating $x$ as a constant and $z$ as a function of $y$ (and $x$).
2.  **Differentiate both sides with respect to $y$:**
    $$ \frac{\partial}{\partial y}(x^2 y + y^2 z + z^2 x) = \frac{\partial}{\partial y}(10) $$
3.  **Differentiate the left side term by term:**
    *   **Term 1: $\frac{\partial}{\partial y}(x^2 y)$**
        Since $x$ is a constant, $x^2$ is a constant:
        $$ = x^2 \frac{\partial}{\partial y}(y) = x^2(1) = x^2 $$
    *   **Term 2: $\frac{\partial}{\partial y}(y^2 z)$**
        This is a product of two functions of $y$ ($y^2$ and $z$), so use the product rule. Here $u=y^2$ and $v=z$.
        $\frac{\partial}{\partial y}(y^2) = 2y$.
        $\frac{\partial}{\partial y}(z) = \frac{\partial z}{\partial y}$ (by chain rule, since $z$ is a function of $y$).
        So, $\frac{\partial}{\partial y}(y^2 z) = (2y)z + y^2 \left(\frac{\partial z}{\partial y}\right) = 2yz + y^2 \frac{\partial z}{\partial y}$.
    *   **Term 3: $\frac{\partial}{\partial y}(z^2 x)$**
        Since $x$ is a constant, pull it out. $z^2$ is a function of $y$.
        $$ = x \frac{\partial}{\partial y}(z^2) = x \left(2z \frac{\partial z}{\partial y}\right) = 2xz \frac{\partial z}{\partial y} $$
4.  **Differentiate the right side:**
    $$ \frac{\partial}{\partial y}(10) = 0 $$
5.  **Assemble the differentiated equation:**
    $$ x^2 + 2yz + y^2 \frac{\partial z}{\partial y} + 2xz \frac{\partial z}{\partial y} = 0 $$
6.  **Isolate $\frac{\partial z}{\partial y}$:**
    Move terms without $\frac{\partial z}{\partial y}$ to the right side:
    $$ y^2 \frac{\partial z}{\partial y} + 2xz \frac{\partial z}{\partial y} = -x^2 - 2yz $$
    Factor out $\frac{\partial z}{\partial y}$:
    $$ \frac{\partial z}{\partial y}(y^2 + 2xz) = -x^2 - 2yz $$
    Divide to solve for $\frac{\partial z}{\partial y}$:
    $$ \boxed{\frac{\partial z}{\partial y} = \frac{-x^2 - 2yz}{y^2 + 2xz}} $$

**Reflection:** This example demonstrates implicit differentiation in a multivariable context. The key challenge is remembering that $z$ is a function of $x$ and $y$, so whenever you differentiate a term involving $z$, you must apply the chain rule, resulting in a $\frac{\partial z}{\partial x}$ or $\frac{\partial z}{\partial y}$ factor. This is analogous to how $\frac{dy}{dx}$ appears in single-variable implicit differentiation.

## 6. Common mistakes and traps

1.  **Forgetting to treat other variables as constants:** This is the most fundamental error. Forgetting that $y$ is a constant when finding $\frac{\partial f}{\partial x}$ (e.g., trying to apply the product rule to $x^2y$ and getting $2xy + x^2\frac{dy}{dx}$ instead of just $2xy$).
2.  **Misapplying the chain rule:** When differentiating with respect to $x$, a term like $f(g(y))$ (where $g(y)$ is a function of $y$ only) is a constant, so its partial derivative with respect to $x$ is $0$. However, a term like $f(g(x,y))$ requires the chain rule, and the inner derivative $\frac{\partial g}{\partial x}$ must be correctly calculated (e.g., $\frac{\partial}{\partial x}(\sin(xy)) = \cos(xy) \cdot y$, not just $\cos(xy)$).
3.  **Confusing $\partial$ with $d$:** While the calculation rules are the same, the notation $\partial$ specifically indicates that other variables are being held constant. Using $d$ for a multivariable function implies a total derivative, which is a different concept.
4.  **Incorrectly applying product/quotient rule:** If you have a term like $x^2 \sin(y)$, when differentiating with respect to $x$, $\sin(y)$ is a constant, so it's just $2x \sin(y)$, not a product rule. The product rule applies when *both* factors are functions of the variable you are differentiating with respect to (e.g., $x \sin(xy)$ when differentiating wrt $x$).
5.  **Not understanding the geometric meaning:** Thinking that $\frac{\partial f}{\partial x}$ is the "steepness" of the surface in general. It's only the steepness along a specific path (parallel to the $x$-axis, or $y$-axis, etc.).
6.  **Issues with implicit differentiation:** When $z$ is an implicit function of $x$ and $y$, remember to apply the chain rule whenever differentiating a term involving $z$ with respect to $x$ or $y$. For example, $\frac{\partial}{\partial x}(z^2) = 2z \frac{\partial z}{\partial x}$.

## 7. Textbook-precise explanation

Let $f$ be a function of two variables $x$ and $y$.

The **partial derivative of $f$ with respect to $x$** at a point $(a,b)$ is defined as:
$$\frac{\partial f}{\partial x}(a,b) = \lim_{h \to 0} \frac{f(a+h, b) - f(a, b)}{h}$$
provided this limit exists.
This definition implies that we are holding $y$ constant at $b$ and finding the derivative of the single-variable function $g(x) = f(x,b)$ at $x=a$.

Similarly, the **partial derivative of $f$ with respect to $y$** at a point $(a,b)$ is defined as:
$$\frac{\partial f}{\partial y}(a,b) = \lim_{k \to 0} \frac{f(a, b+k) - f(a, b)}{k}$$
provided this limit exists.
This definition implies that we are holding $x$ constant at $a$ and finding the derivative of the single-variable function $h(y) = f(a,y)$ at $y=b$.

For a general point $(x,y)$ in the domain of $f$, these definitions yield new functions:
$$\frac{\partial f}{\partial x}(x, y) = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$
$$\frac{\partial f}{\partial y}(x, y) = \lim_{k \to 0} \frac{f(x, y+k) - f(x, y)}{k}$$

**Notation:**
If $z = f(x,y)$, we use the following notations for the partial derivatives:
*   With respect to $x$: $\frac{\partial f}{\partial x}$, $f_x$, $\frac{\partial z}{\partial x}$, $\partial_x f$.
*   With respect to $y$: $\frac{\partial f}{\partial y}$, $f_y$, $\frac{\partial z}{\partial y}$, $\partial_y f$.

**Geometric Interpretation:**
The value of $\frac{\partial f}{\partial x}(a,b)$ represents the slope of the tangent line to the curve formed by the intersection of the surface $z=f(x,y)$ with the plane $y=b$, at the point $(a,b,f(a,b))$. This tangent line is parallel to the $xz$-plane.
The value of $\frac{\partial f}{\partial y}(a,b)$ represents the slope of the tangent line to the curve formed by the intersection of the surface $z=f(x,y)$ with the plane $x=a$, at the point $(a,b,f(a,b))$. This tangent line is parallel to the $yz$-plane.

**Existence of Partial Derivatives:**
The existence of partial derivatives does not guarantee continuity or differentiability of the function $f(x,y)$. A function can have partial derivatives at a point but still be discontinuous at that point. For a function to be differentiable in the multivariable sense, a stronger condition involving the total differential is required.

**Generalization to $n$ variables:**
If $w = f(x_1, x_2, \dots, x_n)$, the partial derivative with respect to $x_i$ is found by treating all other $n-1$ variables as constants and differentiating $f$ as a function of $x_i$ alone.
$$\frac{\partial f}{\partial x_i}(x_1, \dots, x_n) = \lim_{h \to 0} \frac{f(x_1, \dots, x_i+h, \dots, x_n) - f(x_1, \dots, x_i, \dots, x_n)}{h}$$

*Reference: Stewart, Calculus: Early Transcendentals, 9th Edition, Chapter 14.3, "Partial Derivatives".*

## 8. ASCII diagrams

Visualizing partial derivatives requires understanding how a 3D surface is "sliced."

Let's consider a surface $z = f(x,y)$ and a point $P(a,b,f(a,b))$ on it.

```text
       Z
       ^
       |
       |             . P(a,b,f(a,b))
       |            /|
       |           / |  (Tangent line L_x)
       |          /  |
       |         /   |
       |________/____|______ Y (y-axis)
      /|        /
     / |       / (Curve C_x, intersection of z=f(x,y) and plane y=b)
    /  |      /
   X   |     /
       |    /
       |   /
       |  /
       | /
       +---------------------> X (x-axis)
```

**Description for $\frac{\partial f}{\partial x}(a,b)$:**
1.  Imagine a 3D coordinate system (X, Y, Z).
2.  Visualize a surface $z=f(x,y)$ floating in this space.
3.  Pick a point $P=(a,b,f(a,b))$ on this surface.
4.  Now, imagine a plane parallel to the $xz$-plane, passing through $y=b$. This plane is defined by the equation $y=b$.
5.  This plane $y=b$ slices through the surface $z=f(x,y)$, creating a curve on the surface. Let's call this curve $C_x$. All points on $C_x$ have their $y$-coordinate fixed at $b$.
6.  The partial derivative $\frac{\partial f}{\partial x}(a,b)$ represents the slope of the tangent line to this curve $C_x$ at the point $P$. This tangent line lies entirely within the plane $y=b$.

```text
       Z
       ^
       |
       |             . P(a,b,f(a,b))
       |            /|
       |           / |
       |          /  |
       |         /   |
       |________/____|______ Y (y-axis)
      /|        /    |
     / |       /     |
    /  |      /      | (Curve C_y, intersection of z=f(x,y) and plane x=a)
   X   |     /       |
       |    /        |
       |   /         |  (Tangent line L_y)
       |  /          |
       | /           |
       +---------------------> X (x-axis)
```

**Description for $\frac{\partial f}{\partial y}(a,b)$:**
1.  Again, consider the surface $z=f(x,y)$ and the point $P(a,b,f(a,b))$.
2.  Now, imagine a plane parallel to the $yz$-plane, passing through $x=a$. This plane is defined by the equation $x=a$.
3.  This plane $x=a$ slices through the surface $z=f(x,y)$, creating another curve on the surface. Let's call this curve $C_y$. All points on $C_y$ have their $x$-coordinate fixed at $a$.
4.  The partial derivative $\frac{\partial f}{\partial y}(a,b)$ represents the slope of the tangent line to this curve $C_y$ at the point $P$. This tangent line lies entirely within the plane $x=a$.

These two tangent lines ($L_x$ and $L_y$) lie in the tangent plane to the surface at point $P$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of a **"Partial Freeze"**. When you take a *partial* derivative, you *freeze* all variables except the one you're differentiating with respect to. Imagine turning off the "change" button for all other variables.
    Visually, picture a 3D surface. To find $\frac{\partial f}{\partial x}$, imagine a giant laser cutting a slice through the surface *parallel to the x-axis*. The partial derivative is the slope of the cut edge.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **The Core Rule:** To compute $\frac{\partial f}{\partial x}$, treat all variables other than $x$ as constants and differentiate normally with respect to $x$. (And similarly for $\frac{\partial f}{\partial y}$, etc.)
    *   **Limit Definition:** $\frac{\partial f}{\partial x}(x, y) = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$ (and its counterpart for $y$). This grounds the concept.
    *   **Geometric Meaning:** $\frac{\partial f}{\partial x}(a,b)$ is the slope of the tangent line to the curve $f(x,b)$ at $x=a$.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day.
    *   **Review 2:** After 3 days.
    *   **Review 3:** After 7 days.
    *   **Review 4:** After 16 days.
    *   **Review 5:** After 35 days.
    (Actively recall the definition, calculation steps, and geometric meaning for a few examples each time.)

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget how partial derivatives work, start here:
    *   **Recall the single-variable derivative definition:** $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$. This measures how $f$ changes when *only* $x$ changes.
    *   **Extend to multivariable:** Now, if $f$ has multiple variables, say $f(x,y)$, and you want to know how it changes with $x$, you must ensure *only* $x$ changes. So, you keep $y$ fixed at some value (let's call it $y_0$).
    *   **Substitute:** Replace $f(x)$ with $f(x, y_0)$ in the single-variable definition.
    *   **Result:** You get $\lim_{h \to 0} \frac{f(x+h, y_0) - f(x, y_0)}{h}$. This is precisely the definition of the partial derivative with respect to $x$ at $y=y_0$. Generalize $y_0$ back to $y$ to get the function $\frac{\partial f}{\partial x}(x,y)$. This pathway reinforces the "hold others constant" rule.

## 10. Connections — what this leads to

Partial derivatives are the bedrock of multivariable calculus. Mastering them unlocks a vast array of advanced topics:

1.  **Higher-Order Partial Derivatives:** Differentiating partial derivatives multiple times (e.g., $f_{xx}, f_{yy}, f_{xy}, f_{yx}$). This leads to concepts like the Hessian matrix, crucial for multivariable optimization.
2.  **Clairaut's Theorem (Equality of Mixed Partials):** The surprising result that for most "nice" functions, the order of differentiation doesn't matter (i.e., $f_{xy} = f_{yx}$).
3.  **The Gradient Vector:** A vector composed of all first partial derivatives ($\nabla f = \langle f_x, f_y, f_z \rangle$). It points in the direction of the steepest ascent of a function and is fundamental in optimization, physics, and machine learning.
4.  **Directional Derivatives:** Generalizing partial derivatives to find the rate of change of a function in *any* arbitrary direction, not just parallel to the coordinate axes. The gradient vector is used to calculate these.
5.  **Tangent Planes to Surfaces:** Using partial derivatives to define the equation of the plane tangent to a surface $z=f(x,y)$ at a given point. This extends the idea of a tangent line from single-variable calculus.
6.  **The Multivariable Chain Rule:** A powerful generalization of the single-variable chain rule, allowing us to differentiate composite functions where the inner functions are themselves multivariable (e.g., $z=f(x,y)$ where $x=g(s,t)$ and $y=h(s,t)$).
7.  **Optimization of Multivariable Functions:** Finding local maxima, minima, and saddle points of functions of several variables, using critical points (where all partial derivatives are zero or undefined) and the Second Derivative Test (involving the Hessian matrix).
8.  **Lagrange Multipliers:** A technique for finding the extrema of a function subject to one or more constraint equations, which heavily relies on gradients and partial derivatives.
9.  **Vector Calculus:** Partial derivatives are essential components of vector calculus operators like divergence ($\nabla \cdot \mathbf{F}$) and curl ($\nabla \times \mathbf{F}$), which describe fluid flow, electromagnetic fields, and other physical phenomena.
10. **Partial Differential Equations (PDEs):** Equations involving unknown functions of multiple variables and their partial derivatives. These are ubiquitous in modeling physical processes like heat conduction, wave propagation, fluid dynamics, and quantum mechanics.

## 11. Self-check questions

1.  Let $f(x,y) = x^2 \cos(y) - y e^x$. Find $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.
2.  Consider the function $g(x,y,z) = \frac{x+y}{z}$. Calculate $g_x, g_y,$ and $g_z$.
3.  Given $T(p,v) = p \ln(pv)$, where $p$ is pressure and $v$ is volume. Find $\frac{\partial T}{\partial p}$ and $\frac{\partial T}{\partial v}$.
4.  The equation $xy^2 + yz^2 + zx^2 = 3$ defines $z$ implicitly as a function of $x$ and $y$. Find $\frac{\partial z}{\partial x}$.
5.  A company's profit $P$ (in thousands of dollars) is given by $P(L, K) = 1.2 L^{0.6} K^{0.4}$, where $L$ is labor (in person-hours) and $K$ is capital (in thousands of dollars). Calculate $\frac{\partial P}{\partial L}$ and $\frac{\partial P}{\partial K}$ and interpret their meaning in plain English if $L=1000$ and $K=500$.