## 1. What it is — in plain English

Imagine you're driving from city A to city B. There are many possible roads you could take. Some are short and direct, others are long and winding. Some are smooth highways, others are bumpy dirt tracks. Your goal isn't just to get from A to B, but to do so in a way that minimizes something – maybe the total distance, or the travel time, or the fuel consumption, or even the number of potholes you hit.

The Euler-Lagrange equation is a mathematical tool that helps you find the *best possible path* or *best possible shape* for a given goal. Instead of finding a single number (like the minimum of a function), it finds an entire *function* (like a path or a curve) that makes some overall quantity as small (or as large) as possible.

Think of a string hanging between two posts. What shape does it take? It naturally finds the shape that minimizes its potential energy. The Euler-Lagrange equation helps us mathematically derive that specific shape. It's like a universal "optimizer" for continuous systems.

## 2. Why it matters — real-world applications

The Euler-Lagrange equation is a cornerstone of advanced physics, engineering, and even modern computing, because many natural phenomena and optimal designs are governed by principles of "least action" or "minimal energy."

1.  **Physics — Classical Mechanics and Field Theory:** This is where the Euler-Lagrange equation truly shines.
    *   **Trajectory Optimization:** When NASA launches a rocket or plans a probe's journey to Mars, engineers use the Euler-Lagrange equation (often in its Hamiltonian formulation) to calculate the most fuel-efficient trajectory. It's used to find the path that minimizes the "action" of the system, which directly relates to the energy and momentum over time.
    *   **Particle Physics:** In quantum field theory, the dynamics of fundamental particles (like electrons or quarks) are derived from a Lagrangian density using the Euler-Lagrange equations, leading to Maxwell's equations for electromagnetism or the Dirac equation for relativistic electrons.
    *   **General Relativity:** The paths of objects in curved spacetime (geodesics) are found by minimizing the proper time, which is another application of the Euler-Lagrange equation.

2.  **Engineering — Optimal Control and Robotics:**
    *   **Robotics:** For a robot arm to move from point A to point B, it needs to follow a path that minimizes energy consumption or completion time while avoiding obstacles. Optimal control theory, which heavily relies on the Euler-Lagrange equation (specifically Pontryagin's Maximum Principle, a generalization), is used to design these optimal movement strategies.
    *   **Aerospace Design:** The shape of an airplane wing or the hull of a ship can be optimized using variational principles to minimize drag or maximize lift, which often involves solving Euler-Lagrange type problems.

3.  **Computer Graphics and Machine Learning:**
    *   **Image Processing:** In computer vision, techniques like "snakes" or active contours for image segmentation use variational methods to find object boundaries by minimizing an energy functional, which can be solved using Euler-Lagrange equations.
    *   **Optimal Transport:** This field, gaining importance in machine learning for tasks like generative modeling (e.g., Wasserstein GANs), often involves minimizing a "cost" functional for moving probability distributions, leading to Euler-Lagrange type problems.

## 3. Prerequisites — what you must know first

To fully grasp the derivation and application of the Euler-Lagrange equation, you should be comfortable with the following mathematical concepts:

*   **Calculus I (Single Variable):**
    *   **Derivatives:** Understanding rates of change, power rule, product rule, quotient rule, chain rule.
    *   **Integrals:** Understanding accumulation, definite and indefinite integrals, fundamental theorem of calculus.
    *   **Limits and Continuity:** Basic understanding of these foundational concepts.
*   **Calculus II (Multivariable):**
    *   **Partial Derivatives:** How to differentiate a function with respect to one variable while holding others constant.
    *   **Gradient:** The vector of all first-order partial derivatives.
    *   **Chain Rule for Multivariable Functions:** Differentiating composite functions with multiple variables. For example, if $f(x, y(x))$ and you need $df/dx$.
    *   **Differentiation Under the Integral Sign (Leibniz Integral Rule):** How to differentiate an integral with respect to a parameter that appears in the integrand.
*   **Integration by Parts:** A technique for integrating products of functions, crucial for the derivation.
*   **Differential Equations (Basic):** Familiarity with what a differential equation is and what it means to solve one. The Euler-Lagrange equation itself is a differential equation.
*   **Lagrange Multipliers (Conceptual):** Understanding how Lagrange multipliers are used to find extrema of functions subject to constraints. The Euler-Lagrange equation is a conceptual extension of this idea from finite-dimensional spaces to function spaces.
*   **Calculus of Variations (Basic Idea):** The core notion that we are optimizing *functions* (or paths) rather than just numbers. This concept forms the entire context.

## 4. The core idea — step by step

The Euler-Lagrange equation arises from the Calculus of Variations, which is concerned with finding functions that optimize certain integrals (called "functionals"). The derivation involves a clever trick: assume you have the optimal function, then slightly "wiggle" it, and demand that this wiggle doesn't change the value of the integral to first order.

Let's consider a functional $J[y]$ of the form:
$$ J[y] = \int_{x_1}^{x_2} L(x, y(x), y'(x)) \, dx $$
Here, $y(x)$ is the function we want to find, $y'(x) = dy/dx$, and $L$ is called the **Lagrangian density** or simply the **Lagrangian**. It's a function of $x$, $y(x)$, and $y'(x)$. The integration limits $x_1$ and $x_2$ are fixed, and we assume the endpoints of the function $y(x)$ are also fixed: $y(x_1) = y_1$ and $y(x_2) = y_2$.

### Step 1: Define the Problem — The Functional

*   **Plain English:** We're looking for a specific path, a function $y(x)$, that connects two fixed points $(x_1, y_1)$ and $(x_2, y_2)$. Among all possible paths, we want the one that makes a certain "total quantity" (represented by the integral) as small (or large) as possible. This "total quantity" is called a functional because it takes a function as input and returns a single number.
*   **Small Concrete Example:** Imagine you want to find the shortest path between two points $(0,0)$ and $(1,1)$ in a 2D plane. The "total quantity" you want to minimize is the arc length. The formula for arc length is $\int \sqrt{1 + (y'(x))^2} dx$. So, our Lagrangian would be $L(x, y, y') = \sqrt{1 + (y')^2}$. We need to find the function $y(x)$ that minimizes this integral.
*   **Formal/Mathematical Version:**
    Let $y(x)$ be a differentiable function on $[x_1, x_2]$ such that $y(x_1) = y_1$ and $y(x_2) = y_2$. We want to find the function $y(x)$ that extremizes the functional:
    $$ J[y] = \int_{x_1}^{x_2} L(x, y(x), y'(x)) \, dx $$
    where $L$ is a given function with continuous second partial derivatives with respect to its arguments.
*   **What Could Go Wrong:** Not understanding the difference between a function $f(x)$ and a functional $J[y]$. A function maps numbers to numbers; a functional maps functions to numbers.

### Step 2: Introduce a Variation of the Path

*   **Plain English:** Let's assume we've found the "best" path, $y(x)$. Now, let's imagine making a tiny, tiny change to this path. We'll call this tiny change a "variation." If $y(x)$ is truly the optimal path, then this tiny wiggle shouldn't change the total "cost" (the value of the functional) much, or more precisely, the rate of change of the cost with respect to the wiggle amount should be zero.
*   **Small Concrete Example:** If the shortest path between two points is a straight line, then slightly curving that line will always increase its length. The "rate of change" of length with respect to how much you curve it, at the point where it's perfectly straight, should be zero.
*   **Formal/Mathematical Version:**
    Let $y(x)$ be the function that extremizes $J[y]$. Consider a "varied" path $y_\epsilon(x)$ defined as:
    $$ y_\epsilon(x) = y(x) + \epsilon \eta(x) $$
    Here:
    *   $y(x)$ is the hypothesized extremal path.
    *   $\epsilon$ is a small, real parameter.
    *   $\eta(x)$ is an arbitrary, continuously differentiable function (often called the "variation function" or "test function").
    *   Crucially, $\eta(x)$ must satisfy the fixed endpoint conditions: $\eta(x_1) = 0$ and $\eta(x_2) = 0$. This ensures that all varied paths $y_\epsilon(x)$ still connect the same two fixed endpoints $(x_1, y_1)$ and $(x_2, y_2)$.
    The derivative of the varied path is $y'_\epsilon(x) = y'(x) + \epsilon \eta'(x)$.
*   **What Could Go Wrong:** Forgetting the fixed endpoint conditions for $\eta(x)$. This condition is vital for the integration by parts step later.

### Step 3: Formulate the Varied Functional

*   **Plain English:** Now we substitute our "wiggled" path $y_\epsilon(x)$ into the original functional $J[y]$. This turns the functional, which originally depended on a function $y(x)$, into a regular function of the small parameter $\epsilon$, let's call it $J(\epsilon)$.
*   **Small Concrete Example:** If our functional was $J[y] = \int (y'(x))^2 dx$, then the varied functional becomes $J(\epsilon) = \int (y'(x) + \epsilon \eta'(x))^2 dx$.
*   **Formal/Mathematical Version:**
    Substitute $y_\epsilon(x)$ and $y'_\epsilon(x)$ into the functional:
    $$ J(\epsilon) = \int_{x_1}^{x_2} L(x, y(x) + \epsilon \eta(x), y'(x) + \epsilon \eta'(x)) \, dx $$
    Now, $J(\epsilon)$ is an ordinary function of the single variable $\epsilon$.
*   **What Could Go Wrong:** Algebraic errors during substitution, or confusing $y_\epsilon(x)$ with $y(x)$.

### Step 4: Set the First Variation to Zero

*   **Plain English:** If $y(x)$ is indeed the path that minimizes (or maximizes) the functional, then when $\epsilon = 0$ (meaning we are exactly on the optimal path, with no wiggle), the function $J(\epsilon)$ must be at an extremum. For a smooth function, an extremum occurs when its derivative is zero. So, we differentiate $J(\epsilon)$ with respect to $\epsilon$ and set the result to zero at $\epsilon=0$. This derivative is often called the "first variation" of the functional, denoted $\delta J$.
*   **Small Concrete Example:** For a regular function $f(x)$, to find its minimum, we calculate $f'(x)$ and set it to zero. Here, $J(\epsilon)$ is our function, and we're looking for its minimum (or maximum) at $\epsilon=0$.
*   **Formal/Mathematical Version:**
    We need to calculate $\frac{dJ}{d\epsilon}\Big|_{\epsilon=0}$ and set it to zero.
    Using Leibniz integral rule (differentiation under the integral sign) and the multivariable chain rule:
    $$ \frac{dJ}{d\epsilon} = \frac{d}{d\epsilon} \int_{x_1}^{x_2} L(x, y + \epsilon \eta, y' + \epsilon \eta') \, dx $$
    $$ = \int_{x_1}^{x_2} \frac{\partial}{\partial \epsilon} L(x, y + \epsilon \eta, y' + \epsilon \eta') \, dx $$
    Applying the chain rule: $\frac{\partial L}{\partial \epsilon} = \frac{\partial L}{\partial y} \frac{\partial (y + \epsilon \eta)}{\partial \epsilon} + \frac{\partial L}{\partial y'} \frac{\partial (y' + \epsilon \eta')}{\partial \epsilon}$
    $$ = \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) $$
    So,
    $$ \frac{dJ}{d\epsilon} = \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) \, dx $$
    Now, we evaluate this at $\epsilon=0$. At $\epsilon=0$, $y_\epsilon(x) = y(x)$ and $y'_\epsilon(x) = y'(x)$. So, the partial derivatives $\partial L / \partial y$ and $\partial L / \partial y'$ are evaluated along the extremal path $y(x)$.
    The condition for extremum is:
    $$ \frac{dJ}{d\epsilon}\Big|_{\epsilon=0} = \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) \, dx = 0 $$
*   **What Could Go Wrong:** Forgetting the chain rule terms or making errors in applying the Leibniz integral rule.

### Step 5: Apply Integration by Parts

*   **Plain English:** In the integral from Step 4, we have a term with $\eta(x)$ and another with $\eta'(x)$. To simplify, we want to get rid of $\eta'(x)$ and express everything in terms of $\eta(x)$. Integration by parts is the perfect tool for this. We'll apply it to the second term: $\int (\partial L / \partial y') \eta'(x) dx$.
*   **Small Concrete Example:** If you have $\int f(x) g'(x) dx$, integration by parts lets you rewrite it as $f(x)g(x) - \int f'(x)g(x) dx$. Here, we'll let $u = \partial L / \partial y'$ and $dv = \eta'(x) dx$.
*   **Formal/Mathematical Version:**
    Consider the second term: $\int_{x_1}^{x_2} \frac{\partial L}{\partial y'} \eta'(x) \, dx$.
    Let $u = \frac{\partial L}{\partial y'}$ and $dv = \eta'(x) \, dx$.
    Then $du = \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \, dx$ and $v = \eta(x)$.
    Applying integration by parts ($\int u \, dv = uv \Big|_{x_1}^{x_2} - \int v \, du$):
    $$ \int_{x_1}^{x_2} \frac{\partial L}{\partial y'} \eta'(x) \, dx = \left[ \frac{\partial L}{\partial y'} \eta(x) \right]_{x_1}^{x_2} - \int_{x_1}^{x_2} \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \eta(x) \, dx $$
    Recall that $\eta(x_1) = 0$ and $\eta(x_2) = 0$ due to the fixed endpoint conditions. Therefore, the boundary term vanishes:
    $$ \left[ \frac{\partial L}{\partial y'} \eta(x) \right]_{x_1}^{x_2} = \frac{\partial L}{\partial y'}\Big|_{x=x_2} \eta(x_2) - \frac{\partial L}{\partial y'}\Big|_{x=x_1} \eta(x_1) = 0 - 0 = 0 $$
    So, the second term simplifies to:
    $$ \int_{x_1}^{x_2} \frac{\partial L}{\partial y'} \eta'(x) \, dx = - \int_{x_1}^{x_2} \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \eta(x) \, dx $$
*   **What Could Go Wrong:** Sign errors during integration by parts, or forgetting that the boundary terms vanish because of $\eta(x_1)=\eta(x_2)=0$.

### Step 6: Apply the Fundamental Lemma of Calculus of Variations

*   **Plain English:** Now we substitute the result from Step 5 back into the equation from Step 4. We'll end up with a single integral where $\eta(x)$ is multiplied by some expression. The crucial insight is that this integral must be zero *for any arbitrary choice* of the wiggle function $\eta(x)$. The only way an integral of a product $A(x) \eta(x)$ can be zero for *any* $\eta(x)$ (that satisfies the endpoint conditions) is if $A(x)$ itself is zero everywhere.
*   **Small Concrete Example:** If you have $\int_a^b f(x) g(x) dx = 0$ for all possible functions $g(x)$ that are zero at $a$ and $b$, then $f(x)$ must be zero. Imagine $f(x)$ was positive somewhere; you could choose a $g(x)$ that is also positive in that region, making the integral positive, which contradicts the condition.
*   **Formal/Mathematical Version:**
    Substitute the result of integration by parts into the extremum condition:
    $$ \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \eta(x) - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \eta(x) \right) \, dx = 0 $$
    Factor out $\eta(x)$:
    $$ \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \right) \eta(x) \, dx = 0 $$
    This equation must hold for *any* arbitrary differentiable function $\eta(x)$ that vanishes at $x_1$ and $x_2$.
    The **Fundamental Lemma of Calculus of Variations** states that if $\int_{x_1}^{x_2} M(x) \eta(x) \, dx = 0$ for all admissible $\eta(x)$, then $M(x)$ must be identically zero on the interval $[x_1, x_2]$.
    Therefore, the expression in the parenthesis must be zero:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
*   **What Could Go Wrong:** Not fully appreciating the power of the Fundamental Lemma. It's the step that allows us to go from an integral equation to a differential equation.

### Step 7: The Euler-Lagrange Equation

*   **Plain English:** This is it! The differential equation derived in Step 6 is the Euler-Lagrange equation. Any function $y(x)$ that minimizes (or maximizes) the original functional must satisfy this equation. Solving this differential equation will give us the optimal path.
*   **Small Concrete Example:** For the shortest path problem $L = \sqrt{1 + (y')^2}$, applying the Euler-Lagrange equation will lead to $y''(x) = 0$, which integrates to $y(x) = mx + c$, a straight line. This confirms our intuition!
*   **Formal/Mathematical Version:**
    The Euler-Lagrange equation is:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    It is a second-order ordinary differential equation (ODE) for $y(x)$. Note that $\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)$ involves differentiating $\frac{\partial L}{\partial y'}$ with respect to $x$. Since $\frac{\partial L}{\partial y'}$ is generally a function of $x$, $y(x)$, and $y'(x)$, this total derivative requires the chain rule:
    $$ \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = \frac{\partial}{\partial x}\left(\frac{\partial L}{\partial y'}\right) + \frac{\partial}{\partial y}\left(\frac{\partial L}{\partial y'}\right) \frac{dy}{dx} + \frac{\partial}{\partial y'}\left(\frac{\partial L}{\partial y'}\right) \frac{dy'}{dx} $$
    $$ = \frac{\partial^2 L}{\partial x \partial y'} + \frac{\partial^2 L}{\partial y \partial y'} y' + \frac{\partial^2 L}{\partial (y')^2} y'' $$
    So, the Euler-Lagrange equation can be expanded as:
    $$ \frac{\partial L}{\partial y} - \left( \frac{\partial^2 L}{\partial x \partial y'} + \frac{\partial^2 L}{\partial y \partial y'} y' + \frac{\partial^2 L}{\partial (y')^2} y'' \right) = 0 $$
    This is a second-order ODE for $y(x)$.
*   **What Could Go Wrong:** Forgetting the total derivative $d/dx$ operator, or incorrectly applying the chain rule when expanding it. It's common to miss the $y'$ and $y''$ terms.

## 5. Worked examples — multiple, with every step shown

### Example 1: Shortest Distance Between Two Points (Straight Line)

**Problem Statement:** Find the curve $y(x)$ connecting two points $(x_1, y_1)$ and $(x_2, y_2)$ that has the minimum arc length.

**Identify what's given and what we want:**
*   **Given:** Two fixed points $(x_1, y_1)$ and $(x_2, y_2)$.
*   **Want:** The function $y(x)$ that minimizes the arc length.

**Step-by-step solution:**

1.  **Formulate the functional:**
    The arc length $S$ of a curve $y(x)$ from $x_1$ to $x_2$ is given by:
    $$ S[y] = \int_{x_1}^{x_2} \sqrt{1 + (y'(x))^2} \, dx $$
    Here, our Lagrangian is $L(x, y, y') = \sqrt{1 + (y')^2}$.
    *Explanation:* We identify the quantity to be minimized (arc length) and write it as an integral. The integrand is our Lagrangian.

2.  **Calculate the partial derivatives of $L$:**
    $$ L = (1 + (y')^2)^{1/2} $$
    First, $\frac{\partial L}{\partial y}$:
    $$ \frac{\partial L}{\partial y} = \frac{\partial}{\partial y} (1 + (y')^2)^{1/2} = 0 $$
    *Explanation:* The Lagrangian $L$ does not explicitly depend on $y$. So, its partial derivative with respect to $y$ is zero.

    Next, $\frac{\partial L}{\partial y'}$:
    $$ \frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} (1 + (y')^2)^{1/2} $$
    $$ = \frac{1}{2} (1 + (y')^2)^{-1/2} \cdot (2y') $$
    $$ = \frac{y'}{\sqrt{1 + (y')^2}} $$
    *Explanation:* We apply the chain rule. The derivative of $\sqrt{u}$ is $\frac{1}{2\sqrt{u}} \frac{du}{dy'}$. Here $u = 1+(y')^2$, so $\frac{du}{dy'} = 2y'$.

3.  **Apply the Euler-Lagrange equation:**
    The Euler-Lagrange equation is:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Substitute the calculated partial derivatives:
    $$ 0 - \frac{d}{dx}\left(\frac{y'}{\sqrt{1 + (y')^2}}\right) = 0 $$
    $$ \frac{d}{dx}\left(\frac{y'}{\sqrt{1 + (y')^2}}\right) = 0 $$
    *Explanation:* We plug the results from step 2 into the Euler-Lagrange equation.

4.  **Solve the resulting differential equation:**
    Since the derivative of the expression with respect to $x$ is zero, the expression itself must be a constant:
    $$ \frac{y'}{\sqrt{1 + (y')^2}} = C_1 $$
    where $C_1$ is an arbitrary constant.
    *Explanation:* If a function's derivative is zero, the function must be a constant.

    Now, we need to solve for $y'$. Square both sides:
    $$ (y')^2 = C_1^2 (1 + (y')^2) $$
    $$ (y')^2 = C_1^2 + C_1^2 (y')^2 $$
    Rearrange to isolate $(y')^2$:
    $$ (y')^2 - C_1^2 (y')^2 = C_1^2 $$
    $$ (y')^2 (1 - C_1^2) = C_1^2 $$
    $$ (y')^2 = \frac{C_1^2}{1 - C_1^2} $$
    Let $m^2 = \frac{C_1^2}{1 - C_1^2}$. Then $y'^2 = m^2$, so:
    $$ y' = \pm m $$
    Since $m$ is a constant, $y'$ is a constant. Let's call this constant $m$.
    *Explanation:* We perform algebraic manipulations to solve for $y'$. The fact that $y'$ is a constant is the key result.

    Integrate $y' = m$ with respect to $x$:
    $$ \int y' \, dx = \int m \, dx $$
    $$ y(x) = mx + C_2 $$
    where $C_2$ is another arbitrary constant.
    *Explanation:* Integrating a constant derivative gives a linear function.

5.  **Apply boundary conditions (if needed for specific constants):**
    The constants $m$ and $C_2$ would be determined by the specific fixed points $(x_1, y_1)$ and $(x_2, y_2)$.
    For example, if $(x_1, y_1) = (0,0)$ and $(x_2, y_2) = (1,1)$:
    $y(0) = m(0) + C_2 = 0 \Rightarrow C_2 = 0$.
    $y(1) = m(1) + 0 = 1 \Rightarrow m = 1$.
    So, $y(x) = x$.

**Final Answer:**
The curve that minimizes the arc length between two points is a **straight line**:
$$ \boxed{y(x) = mx + C_2} $$

**Reflection:** This example was relatively easy because the Lagrangian did not explicitly depend on $x$ or $y$, leading to a simple differential equation. It confirms our geometric intuition that the shortest distance between two points is a straight line.

---

### Example 2: Minimal Surface of Revolution (Catenoid)

**Problem Statement:** Find the curve $y(x)$ joining $(x_1, y_1)$ and $(x_2, y_2)$ such that when rotated around the x-axis, it generates a surface of minimum area. Assume $y(x) > 0$.

**Identify what's given and what we want:**
*   **Given:** Two fixed points $(x_1, y_1)$ and $(x_2, y_2)$, with $y_1, y_2 > 0$.
*   **Want:** The function $y(x)$ that minimizes the surface area of revolution.

**Step-by-step solution:**

1.  **Formulate the functional:**
    The surface area $A$ generated by rotating a curve $y(x)$ around the x-axis is given by:
    $$ A[y] = \int_{x_1}^{x_2} 2\pi y(x) \sqrt{1 + (y'(x))^2} \, dx $$
    Since $2\pi$ is a constant, we can minimize $J[y] = \int_{x_1}^{x_2} y(x) \sqrt{1 + (y'(x))^2} \, dx$.
    Here, our Lagrangian is $L(x, y, y') = y \sqrt{1 + (y')^2}$.
    *Explanation:* We identify the surface area formula as the functional to minimize and extract the Lagrangian.

2.  **Calculate the partial derivatives of $L$:**
    $$ L = y (1 + (y')^2)^{1/2} $$
    First, $\frac{\partial L}{\partial y}$:
    $$ \frac{\partial L}{\partial y} = \frac{\partial}{\partial y} [y (1 + (y')^2)^{1/2}] = (1 + (y')^2)^{1/2} $$
    *Explanation:* $y$ is treated as an independent variable here. The term $(1+(y')^2)^{1/2}$ is a constant with respect to $y$.

    Next, $\frac{\partial L}{\partial y'}$:
    $$ \frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} [y (1 + (y')^2)^{1/2}] $$
    $$ = y \cdot \frac{1}{2} (1 + (y')^2)^{-1/2} \cdot (2y') $$
    $$ = \frac{y y'}{\sqrt{1 + (y')^2}} $$
    *Explanation:* $y$ is treated as a constant here. We apply the chain rule to the $\sqrt{1+(y')^2}$ term.

3.  **Apply the Euler-Lagrange equation:**
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Substitute the calculated partial derivatives:
    $$ \sqrt{1 + (y')^2} - \frac{d}{dx}\left(\frac{y y'}{\sqrt{1 + (y')^2}}\right) = 0 $$
    *Explanation:* Plug in the partial derivatives into the EL equation.

4.  **Solve the resulting differential equation:**
    This looks complicated. Notice that $L$ does not explicitly depend on $x$. When $L$ is independent of $x$, there is a useful first integral of the Euler-Lagrange equation, known as the **Beltrami Identity**:
    $$ L - y' \frac{\partial L}{\partial y'} = C_1 $$
    Let's use this shortcut.
    *Explanation:* Recognizing that $L$ is independent of $x$ allows us to use a special conserved quantity (the Beltrami Identity), which simplifies the solution process significantly. If we didn't use this, we'd have to perform the total derivative $\frac{d}{dx}(\dots)$ explicitly, which would be much more involved.

    Substitute $L$ and $\frac{\partial L}{\partial y'}$ into the Beltrami Identity:
    $$ y \sqrt{1 + (y')^2} - y' \left( \frac{y y'}{\sqrt{1 + (y')^2}} \right) = C_1 $$
    $$ y \sqrt{1 + (y')^2} - \frac{y (y')^2}{\sqrt{1 + (y')^2}} = C_1 $$
    Combine the terms on the left by finding a common denominator:
    $$ \frac{y (1 + (y')^2) - y (y')^2}{\sqrt{1 + (y')^2}} = C_1 $$
    $$ \frac{y + y (y')^2 - y (y')^2}{\sqrt{1 + (y')^2}} = C_1 $$
    $$ \frac{y}{\sqrt{1 + (y')^2}} = C_1 $$
    *Explanation:* Algebraic simplification of the Beltrami Identity.

    Now, solve for $y'$:
    $$ y = C_1 \sqrt{1 + (y')^2} $$
    Square both sides:
    $$ y^2 = C_1^2 (1 + (y')^2) $$
    $$ y^2 = C_1^2 + C_1^2 (y')^2 $$
    $$ y^2 - C_1^2 = C_1^2 (y')^2 $$
    $$ (y')^2 = \frac{y^2 - C_1^2}{C_1^2} $$
    $$ y' = \pm \frac{\sqrt{y^2 - C_1^2}}{C_1} $$
    This is a separable first-order differential equation:
    $$ \frac{dy}{dx} = \pm \frac{\sqrt{y^2 - C_1^2}}{C_1} $$
    $$ \frac{C_1}{\sqrt{y^2 - C_1^2}} dy = \pm dx $$
    Integrate both sides:
    $$ \int \frac{C_1}{\sqrt{y^2 - C_1^2}} dy = \int \pm dx $$
    The integral on the left is a standard integral: $\int \frac{a}{\sqrt{y^2 - a^2}} dy = a \cosh^{-1}\left(\frac{y}{a}\right)$. Here $a=C_1$.
    $$ C_1 \cosh^{-1}\left(\frac{y}{C_1}\right) = \pm x + C_2 $$
    Let's absorb the $\pm$ into $C_2$ for simplicity, assuming we choose the appropriate branch.
    $$ \cosh^{-1}\left(\frac{y}{C_1}\right) = \frac{x + C_2}{C_1} $$
    Solve for $y$:
    $$ \frac{y}{C_1} = \cosh\left(\frac{x + C_2}{C_1}\right) $$
    $$ y(x) = C_1 \cosh\left(\frac{x + C_2}{C_1}\right) $$
    *Explanation:* We separate variables and integrate. Recognizing the standard integral form for $\cosh^{-1}$ is crucial. The constants $C_1$ and $C_2$ are determined by the boundary conditions $(x_1, y_1)$ and $(x_2, y_2)$.

**Final Answer:**
The curve that generates a minimal surface of revolution is a **catenary**:
$$ \boxed{y(x) = C_1 \cosh\left(\frac{x + C_2}{C_1}\right)} $$
When rotated about the x-axis, this generates a shape called a **catenoid**.

**Reflection:** This example was harder due to the more complex Lagrangian and the resulting differential equation. The use of the Beltrami Identity (a first integral for Lagrangians not explicitly dependent on $x$) was a key shortcut. Without it, the total derivative would have involved many terms and complex algebra. The solution, a catenary, is also the shape a hanging chain takes, which is another famous variational problem.

---

### Example 3: Brachistochrone Problem (Cycloid)

**Problem Statement:** Find the curve $y(x)$ connecting two points $(0,0)$ and $(x_f, y_f)$ (where $x_f > 0, y_f < 0$) along which a bead, under the influence of gravity, slides without friction in the shortest possible time.

**Identify what's given and what we want:**
*   **Given:** Two fixed points $(0,0)$ and $(x_f, y_f)$ with gravity acting downwards.
*   **Want:** The function $y(x)$ that minimizes the travel time.

**Step-by-step solution:**

1.  **Formulate the functional:**
    The time $T$ taken for a particle to slide along a curve $y(x)$ is given by:
    $$ T[y] = \int_{(0,0)}^{(x_f, y_f)} \frac{ds}{v} $$
    where $ds = \sqrt{dx^2 + dy^2} = \sqrt{1 + (y')^2} dx$ is the arc length element, and $v$ is the speed.
    From conservation of energy (assuming the particle starts from rest at $(0,0)$), $mgh = \frac{1}{2}mv^2$. Since $h = -y$ (gravity acts downwards, and $y$ is measured positive upwards), we have $mg(-y) = \frac{1}{2}mv^2$, so $v = \sqrt{-2gy}$.
    Substituting $ds$ and $v$ into the integral:
    $$ T[y] = \int_0^{x_f} \frac{\sqrt{1 + (y')^2}}{\sqrt{-2gy}} \, dx $$
    We can pull out the constant $\frac{1}{\sqrt{-2g}}$ and minimize the remaining integral.
    Our Lagrangian is $L(x, y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{-y}}$. (Note: We assume $y<0$ for the square root to be real, consistent with the problem statement).
    *Explanation:* This step requires physics knowledge (conservation of energy) to relate speed to position and calculus to express arc length. The constant factor $\frac{1}{\sqrt{-2g}}$ doesn't affect the minimization, so we omit it from the Lagrangian.

2.  **Calculate the partial derivatives of $L$:**
    $$ L = (-y)^{-1/2} (1 + (y')^2)^{1/2} $$
    First, $\frac{\partial L}{\partial y}$:
    $$ \frac{\partial L}{\partial y} = \frac{\partial}{\partial y} [(-y)^{-1/2} (1 + (y')^2)^{1/2}] $$
    $$ = -\frac{1}{2} (-y)^{-3/2} (-1) (1 + (y')^2)^{1/2} $$
    $$ = \frac{1}{2} (-y)^{-3/2} (1 + (y')^2)^{1/2} = \frac{\sqrt{1 + (y')^2}}{2(-y)^{3/2}} $$
    *Explanation:* Apply the power rule and chain rule for $(-y)^{-1/2}$.

    Next, $\frac{\partial L}{\partial y'}$:
    $$ \frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} [(-y)^{-1/2} (1 + (y')^2)^{1/2}] $$
    $$ = (-y)^{-1/2} \cdot \frac{1}{2} (1 + (y')^2)^{-1/2} \cdot (2y') $$
    $$ = \frac{y'}{\sqrt{-y}\sqrt{1 + (y')^2}} $$
    *Explanation:* Treat $(-y)^{-1/2}$ as a constant and apply the chain rule to $(1+(y')^2)^{1/2}$.

3.  **Apply the Euler-Lagrange equation:**
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    $$ \frac{\sqrt{1 + (y')^2}}{2(-y)^{3/2}} - \frac{d}{dx}\left(\frac{y'}{\sqrt{-y}\sqrt{1 + (y')^2}}\right) = 0 $$
    *Explanation:* Plug in the calculated partial derivatives.

4.  **Solve the resulting differential equation:**
    Again, $L$ does not explicitly depend on $x$. Use the Beltrami Identity:
    $$ L - y' \frac{\partial L}{\partial y'} = C_1 $$
    Substitute $L$ and $\frac{\partial L}{\partial y'}$:
    $$ \frac{\sqrt{1 + (y')^2}}{\sqrt{-y}} - y' \left( \frac{y'}{\sqrt{-y}\sqrt{1 + (y')^2}} \right) = C_1 $$
    $$ \frac{1 + (y')^2 - (y')^2}{\sqrt{-y}\sqrt{1 + (y')^2}} = C_1 $$
    $$ \frac{1}{\sqrt{-y}\sqrt{1 + (y')^2}} = C_1 $$
    *Explanation:* Algebraic simplification using the Beltrami Identity.

    Now, solve for $y'$:
    $$ 1 = C_1 \sqrt{-y} \sqrt{1 + (y')^2} $$
    $$ \frac{1}{C_1 \sqrt{-y}} = \sqrt{1 + (y')^2} $$
    Square both sides:
    $$ \frac{1}{C_1^2 (-y)} = 1 + (y')^2 $$
    $$ (y')^2 = \frac{1}{-C_1^2 y} - 1 $$
    $$ (y')^2 = \frac{1 + C_1^2 y}{-C_1^2 y} $$
    Let $a = \frac{1}{2C_1^2}$ (a new constant for simplification later). Then $C_1^2 = \frac{1}{2a}$.
    $$ (y')^2 = \frac{1 + \frac{1}{2a} y}{-\frac{1}{2a} y} = \frac{2a+y}{-y} $$
    $$ y' = \frac{dy}{dx} = \pm \sqrt{\frac{2a+y}{-y}} $$
    This is a separable differential equation. We assume $y'$ is negative (the curve descends), so we take the negative root:
    $$ \frac{dy}{dx} = -\sqrt{\frac{2a+y}{-y}} $$
    $$ dx = -\sqrt{\frac{-y}{2a+y}} \, dy $$
    This integral is best solved using a substitution. Let $y = -a(1 - \cos\theta)$. Then $dy = -a \sin\theta \, d\theta$.
    And $-y = a(1 - \cos\theta)$, $2a+y = 2a - a(1-\cos\theta) = a(1+\cos\theta)$.
    $$ \sqrt{\frac{-y}{2a+y}} = \sqrt{\frac{a(1-\cos\theta)}{a(1+\cos\theta)}} = \sqrt{\frac{1-\cos\theta}{1+\cos\theta}} $$
    Using half-angle identities ($1-\cos\theta = 2\sin^2(\theta/2)$ and $1+\cos\theta = 2\cos^2(\theta/2)$):
    $$ = \sqrt{\frac{2\sin^2(\theta/2)}{2\cos^2(\theta/2)}} = \sqrt{\tan^2(\theta/2)} = \tan(\theta/2) $$
    So, $dx = - \tan(\theta/2) (-a \sin\theta) \, d\theta = a \tan(\theta/2) \sin\theta \, d\theta$.
    We know $\sin\theta = 2\sin(\theta/2)\cos(\theta/2)$ and $\tan(\theta/2) = \sin(\theta/2)/\cos(\theta/2)$.
    $$ dx = a \frac{\sin(\theta/2)}{\cos(\theta/2)} (2\sin(\theta/2)\cos(\theta/2)) \, d\theta = 2a \sin^2(\theta/2) \, d\theta $$
    Using $\sin^2(\theta/2) = \frac{1-\cos\theta}{2}$:
    $$ dx = 2a \left(\frac{1-\cos\theta}{2}\right) \, d\theta = a(1-\cos\theta) \, d\theta $$
    Integrate $dx$:
    $$ \int dx = \int a(1-\cos\theta) \, d\theta $$
    $$ x(\theta) = a(\theta - \sin\theta) + C_2 $$
    Since the curve starts at $(0,0)$, when $x=0$, $y=0$.
    If $y=0$, then $0 = -a(1-\cos\theta)$, which implies $\cos\theta = 1$, so $\theta = 0$.
    Substitute $x=0, \theta=0$ into $x(\theta)$ equation: $0 = a(0 - \sin 0) + C_2 \Rightarrow C_2 = 0$.
    So, the solution is given parametrically:
    $$ x(\theta) = a(\theta - \sin\theta) $$
    $$ y(\theta) = -a(1 - \cos\theta) $$
    *Explanation:* This is a very involved integration. The substitution $y = -a(1-\cos\theta)$ is standard for this type of integral and transforms the problem into a parametric form. The half-angle identities are crucial for simplification. The integration constant $C_2$ is determined by the starting point $(0,0)$.

**Final Answer:**
The curve of fastest descent (brachistochrone) is a **cycloid**, given parametrically by:
$$ \boxed{\begin{aligned} x(\theta) &= a(\theta - \sin\theta) \\ y(\theta) &= -a(1 - \cos\theta) \end{aligned}} $$
where $a$ is a constant determined by the endpoint $(x_f, y_f)$.

**Reflection:** This is a classic and notoriously difficult problem in the calculus of variations. The derivation of the Lagrangian requires physics. The solution of the resulting differential equation is very challenging and typically requires a clever trigonometric substitution to arrive at the parametric form of a cycloid. It highlights that while the Euler-Lagrange equation provides the framework, solving the resulting ODE can be highly non-trivial.

---

### Example 4: Euler-Lagrange for a Simple Quadratic Lagrangian

**Problem Statement:** Find the function $y(x)$ that extremizes the functional $J[y] = \int_0^1 ((y')^2 + y^2) \, dx$, with boundary conditions $y(0)=0$ and $y(1)=1$.

**Identify what's given and what we want:**
*   **Given:** Functional $J[y] = \int_0^1 ((y')^2 + y^2) \, dx$, and boundary conditions $y(0)=0$, $y(1)=1$.
*   **Want:** The function $y(x)$ that extremizes $J[y]$.

**Step-by-step solution:**

1.  **Formulate the functional:**
    The Lagrangian is $L(x, y, y') = (y')^2 + y^2$.
    *Explanation:* The integrand of the given functional is directly our Lagrangian.

2.  **Calculate the partial derivatives of $L$:**
    First, $\frac{\partial L}{\partial y}$:
    $$ \frac{\partial L}{\partial y} = \frac{\partial}{\partial y} ((y')^2 + y^2) = 2y $$
    *Explanation:* Treat $y'$ as a constant when differentiating with respect to $y$.

    Next, $\frac{\partial L}{\partial y'}$:
    $$ \frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} ((y')^2 + y^2) = 2y' $$
    *Explanation:* Treat $y$ as a constant when differentiating with respect to $y'$.

3.  **Apply the Euler-Lagrange equation:**
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Substitute the calculated partial derivatives:
    $$ 2y - \frac{d}{dx}(2y') = 0 $$
    *Explanation:* Plug in the partial derivatives into the EL equation.

4.  **Solve the resulting differential equation:**
    $$ 2y - 2y'' = 0 $$
    $$ y'' - y = 0 $$
    This is a second-order linear homogeneous ordinary differential equation with constant coefficients.
    The characteristic equation is $r^2 - 1 = 0$, which gives $r = \pm 1$.
    The general solution is:
    $$ y(x) = C_1 e^x + C_2 e^{-x} $$
    *Explanation:* We simplify the ODE and solve it using standard methods for linear ODEs.

5.  **Apply boundary conditions:**
    Using $y(0)=0$:
    $$ y(0) = C_1 e^0 + C_2 e^{-0} = C_1 + C_2 = 0 \Rightarrow C_2 = -C_1 $$
    Using $y(1)=1$:
    $$ y(1) = C_1 e^1 + C_2 e^{-1} = C_1 e + C_2 e^{-1} = 1 $$
    Substitute $C_2 = -C_1$:
    $$ C_1 e - C_1 e^{-1} = 1 $$
    $$ C_1 (e - e^{-1}) = 1 $$
    $$ C_1 = \frac{1}{e - e^{-1}} = \frac{1}{2 \sinh(1)} $$
    And $C_2 = -C_1 = -\frac{1}{2 \sinh(1)}$.
    So, the particular solution is:
    $$ y(x) = \frac{1}{2 \sinh(1)} e^x - \frac{1}{2 \sinh(1)} e^{-x} $$
    $$ y(x) = \frac{1}{2 \sinh(1)} (e^x - e^{-x}) $$
    $$ y(x) = \frac{\sinh(x)}{\sinh(1)} $$
    *Explanation:* We use the given boundary conditions to solve for the arbitrary constants $C_1$ and $C_2$. The hyperbolic sine function $\sinh(x) = (e^x - e^{-x})/2$ is a convenient way to express the solution.

**Final Answer:**
The function $y(x)$ that extremizes the functional is:
$$ \boxed{y(x) = \frac{\sinh(x)}{\sinh(1)}} $$

**Reflection:** This example was of medium difficulty. The Lagrangian was simple enough that the Euler-Lagrange equation led to a straightforward second-order linear ODE. The main challenge was solving the ODE and applying the boundary conditions correctly. This type of problem is common in introductory calculus of variations courses.

## 6. Common mistakes and traps

1.  **Confusing Partial and Total Derivatives:** When calculating $\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)$, students often forget that $\frac{\partial L}{\partial y'}$ is generally a function of $x$, $y(x)$, and $y'(x)$. Thus, the total derivative requires the chain rule: $\frac{d}{dx} F(x, y(x), y'(x)) = \frac{\partial F}{\partial x} + \frac{\partial F}{\partial y} y' + \frac{\partial F}{\partial y'} y''$. A common mistake is to only take the partial derivative with respect to $x$ or to miss the $y'$ and $y''$ terms.
2.  **Errors in Integration by Parts:** Sign errors, incorrect identification of $u$ and $dv$, or forgetting the boundary terms are frequent. Crucially, remember that the boundary terms vanish due to $\eta(x_1) = \eta(x_2) = 0$.
3.  **Forgetting Fixed Endpoint Conditions for $\eta(x)$:** The condition $\eta(x_1) = \eta(x_2) = 0$ is fundamental. Without it, the boundary terms in integration by parts do not vanish, and the derivation of the Euler-Lagrange equation as a differential equation for $y(x)$ is not possible (instead, you'd get natural boundary conditions).
4.  **Algebraic Mistakes in Simplifying:** The expressions for $L$, $\partial L / \partial y$, and $\partial L / \partial y'$ can become quite complex, especially with square roots. Careful and step-by-step algebra is essential to avoid errors.
5.  **Misapplying the Fundamental Lemma of Calculus of Variations:** While the lemma itself is simple, students might not fully grasp *why* it allows us to set the integrand to zero. It's because $\eta(x)$ is *arbitrary*, meaning it can be chosen to highlight any non-zero part of the coefficient function.
6.  **Incorrectly Solving the Resulting ODE:** The Euler-Lagrange equation is a differential equation. Solving it can range from trivial to extremely difficult, requiring various ODE techniques (separation of variables, integrating factors, characteristic equations, special functions, etc.). Familiarity with these methods is assumed.

## 7. Textbook-precise explanation

Let $y(x)$ be a continuously differentiable function on the interval $[x_1, x_2]$, with fixed boundary conditions $y(x_1) = y_1$ and $y(x_2) = y_2$. Consider a functional $J[y]$ defined by:
$$ J[y] = \int_{x_1}^{x_2} L(x, y(x), y'(x)) \, dx $$
where $L(x, y, y')$ is a given function (the Lagrangian) that is continuously differentiable with respect to its arguments $x$, $y$, and $y'$. We seek the function $y(x)$ that extremizes (minimizes or maximizes) this functional.

Let $y_0(x)$ be such an extremal function. Consider a family of varied paths $y_\epsilon(x)$ given by:
$$ y_\epsilon(x) = y_0(x) + \epsilon \eta(x) $$
where $\epsilon$ is a small real parameter and $\eta(x)$ is an arbitrary continuously differentiable function satisfying the fixed boundary conditions: $\eta(x_1) = 0$ and $\eta(x_2) = 0$. This ensures that $y_\epsilon(x)$ also passes through the fixed endpoints. The derivative of the varied path is $y'_\epsilon(x) = y'_0(x) + \epsilon \eta'(x)$.

Substituting $y_\epsilon(x)$ into the functional yields a function of $\epsilon$:
$$ J(\epsilon) = \int_{x_1}^{x_2} L(x, y_0(x) + \epsilon \eta(x), y'_0(x) + \epsilon \eta'(x)) \, dx $$
For $y_0(x)$ to be an extremum, $J(\epsilon)$ must have an extremum at $\epsilon=0$. This implies that the first derivative of $J(\epsilon)$ with respect to $\epsilon$, evaluated at $\epsilon=0$, must be zero:
$$ \frac{dJ}{d\epsilon}\Big|_{\epsilon=0} = 0 $$
Using the Leibniz integral rule for differentiation under the integral sign and the chain rule for partial derivatives:
$$ \frac{dJ}{d\epsilon} = \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \frac{\partial (y_0 + \epsilon \eta)}{\partial \epsilon} + \frac{\partial L}{\partial y'} \frac{\partial (y'_0 + \epsilon \eta')}{\partial \epsilon} \right) \, dx $$
$$ = \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) \, dx $$
Evaluating at $\epsilon=0$ (where $y_0$ and $y'_0$ are used for $y$ and $y'$ in $L$'s partial derivatives), the condition becomes:
$$ \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) \, dx = 0 $$
Now, we apply integration by parts to the second term:
$$ \int_{x_1}^{x_2} \frac{\partial L}{\partial y'} \eta'(x) \, dx = \left[ \frac{\partial L}{\partial y'} \eta(x) \right]_{x_1}^{x_2} - \int_{x_1}^{x_2} \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \eta(x) \, dx $$
Due to the fixed boundary conditions, $\eta(x_1) = 0$ and $\eta(x_2) = 0$, so the boundary term vanishes: $\left[ \frac{\partial L}{\partial y'} \eta(x) \right]_{x_1}^{x_2} = 0$.
Substituting this back into the extremum condition:
$$ \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} \eta(x) - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \eta(x) \right) \, dx = 0 $$
Factoring out $\eta(x)$:
$$ \int_{x_1}^{x_2} \left( \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \right) \eta(x) \, dx = 0 $$
By the **Fundamental Lemma of Calculus of Variations**, if $\int_{x_1}^{x_2} M(x) \eta(x) \, dx = 0$ for all admissible $\eta(x)$, then $M(x)$ must be identically zero on $[x_1, x_2]$. Therefore, the term in the parenthesis must be zero for all $x \in [x_1, x_2]$:
$$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
This is the **Euler-Lagrange equation**. It is a second-order ordinary differential equation that any function $y(x)$ must satisfy to extremize the functional $J[y]$.

**References:**
*   Gelfand, I. M., & Fomin, S. V. (2000). *Calculus of Variations*. Dover Publications. (Chapter 1, Section 1.3)
*   Goldstein, H., Poole, C. P., & Safko, J. L. (2002). *Classical Mechanics* (3rd ed.). Addison Wesley. (Chapter 2, Section 2.1)
*   Arfken, G. B., Weber, H. J., & Harris, F. E. (2013). *Mathematical Methods for Physicists* (7th ed.). Academic Press. (Chapter 17, Section 17.2)

## 8. ASCII diagrams

Here's a simple ASCII diagram illustrating the optimal path $y(x)$ and a varied path $y_\epsilon(x)$.

```text
       ^ y
       |
       |                   * (x_2, y_2)
       |                 /
       |                /  Optimal path y(x)
       |               /
       |              /
       |             /
       |            /
       |           /   Varied path y_epsilon(x) = y(x) + epsilon * eta(x)
       |          /|\
       |         / | \
       |        /  |  \
       |       /   |   \
       * (x_1, y_1)
       +-----------------------------------> x
       x_1               x_2

       Key:
       --- : Optimal path y(x)
       --- : Varied path y_epsilon(x)
       |   : The variation eta(x) at a specific x, scaled by epsilon.
             Note that eta(x_1) = 0 and eta(x_2) = 0, so the varied path
             starts and ends at the same points as the optimal path.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of the Euler-Lagrange equation as a "balance equation."
    *   The first term, $\frac{\partial L}{\partial y}$, represents the "local force" or "tendency" of the system to change $y$.
    *   The second term, $\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)$, represents the "dynamic response" or "momentum-like" effect. It's the total rate of change of the "generalized momentum" ($\partial L / \partial y'$).
    *   The equation states that for an optimal path, these two tendencies must perfectly balance: **local tendency = dynamic response**.
    *   **"LoYd - DoLY"