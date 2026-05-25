## 1. What it is — in plain English

Imagine you want to find the shortest path between two points on a map. You could draw many curvy lines, but your intuition tells you the straight line is the shortest. The "Calculus of Variations" is a fancy mathematical toolkit that helps us *prove* and *find* such "best" paths or shapes when the "thing we're measuring" depends on the *entire shape or path*, not just a single number.

Think of it like this: regular calculus helps you find the highest point on a hill by checking the slope at different points. You're looking for a single number (the $x$-coordinate) that maximizes a function $f(x)$. But what if you're trying to find the *shape* of a hanging chain that sags the least, or the *path* a light ray takes between two points? In these cases, you're not looking for a number, but an *entire function* (the shape of the chain, the path of light) that minimizes or maximizes some overall quantity.

This "overall quantity" is what we call a "functional." It's like a super-function that takes an entire function as its input and spits out a single number. For example, the "length" of a path is a functional – you give it a path (a function), and it gives you a number (its length). The Calculus of Variations provides the rules for differentiating and optimizing these functionals, much like regular calculus provides rules for functions.

So, in essence, it's about finding the "best function" out of an infinite number of possibilities, where "best" means it makes some total quantity (the functional) as small or as large as possible. It's optimization, but on a grander scale, where the variables you're optimizing are functions themselves.

## 2. Why it matters — real-world applications

The Calculus of Variations is not just an abstract mathematical curiosity; it's a foundational tool across many scientific and engineering disciplines.

1.  **Physics — Principle of Least Action**: In classical mechanics, objects don't just move randomly; they follow paths that minimize a quantity called "action." This is Hamilton's Principle, and it's formulated directly using the Calculus of Variations. For example, if you throw a ball, its parabolic trajectory is the one that minimizes the action functional between its starting and ending points. This principle is so fundamental that it extends to quantum mechanics (path integrals in Quantum Field Theory, used by companies like Intel for chip design simulations) and General Relativity (geodesics, describing how planets orbit stars, critical for GPS satellite trajectories).
2.  **Aerospace Engineering — Optimal Trajectory Design**: When NASA launches a rocket or plans a probe's journey to Mars, they need to find the most fuel-efficient trajectory, or the one that minimizes travel time, or the one that maximizes payload. These are all optimization problems where the "variable" is the entire flight path (a function of time). Calculus of Variations, particularly through Optimal Control Theory (a direct descendant), is used to design these trajectories, ensuring maximum efficiency and mission success for entities like SpaceX or Boeing.
3.  **Materials Science — Minimal Surfaces**: Why do soap bubbles form perfect spheres, and soap films stretch into specific, often beautiful, shapes? Because they naturally minimize their surface area for a given boundary. The mathematical problem of finding a surface with minimal area given a boundary curve is a classic problem in the Calculus of Variations, leading to shapes like catenoids (the shape a soap film takes between two rings). This understanding is crucial for designing lightweight structures, understanding biological membranes, and even in architectural design.
4.  **Machine Learning — Variational Inference**: In advanced machine learning, especially in Bayesian statistics and probabilistic modeling, we often deal with intractable probability distributions. Variational inference is a technique that approximates these complex distributions with simpler ones by minimizing a "distance" functional (like the Kullback-Leibler divergence) between the true and approximate distributions. This is a core technique used in developing sophisticated AI models by companies like Google (DeepMind) and Facebook (Meta AI) for tasks like image recognition, natural language processing, and recommendation systems.

## 3. Prerequisites — what you must know first

Before diving deep into the Calculus of Variations, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Single-Variable Calculus**:
    *   **Derivatives**: Understanding how to calculate derivatives of elementary functions and using rules like the product, quotient, and chain rule. This is fundamental for the variations.
    *   **Integrals**: Definite and indefinite integrals, integration techniques (substitution, integration by parts). Integration by parts is absolutely critical in deriving the Euler-Lagrange equation.
    *   **Optimization**: Finding local maxima and minima of functions by setting the first derivative to zero. This is the conceptual parallel we're extending.
*   **Multi-Variable Calculus**:
    *   **Partial Derivatives**: How to differentiate a function with respect to one variable while holding others constant. Our integrands will often depend on multiple variables ($x, y, y'$).
    *   **Gradient**: Understanding the concept of the gradient vector and its role in multivariable optimization.
    *   **Chain Rule for Multiple Variables**: Essential for differentiating composite functions where variables depend on other variables (e.g., $L(x, y(x), y'(x))$).
*   **Differential Equations**:
    *   **Basic ODEs**: Ability to solve simple first-order and second-order ordinary differential equations. The Euler-Lagrange equation is a differential equation.
    *   **Boundary Value Problems**: Understanding how boundary conditions affect the solutions of ODEs.
*   **Linear Algebra (Conceptual)**:
    *   **Vector Spaces**: The idea that functions can form vector spaces, and that we can "add" functions and "scale" them. This underpins the concept of varying a function.
    *   **Linear Operators**: Understanding how operators act on functions.
*   **Real Analysis (Conceptual)**:
    *   **Limits and Continuity**: A rigorous understanding of these concepts is helpful for appreciating the formal definitions of variations.
    *   **Differentiability**: A precise understanding of what it means for a function to be differentiable.
*   **Lagrange Multipliers (Optional but Highly Recommended)**: The technique for optimizing a function subject to constraints. While not directly used in the *derivation* of the basic Euler-Lagrange equation, it shares a similar spirit of finding extrema under conditions and is a useful conceptual bridge.

## 4. The core idea — step by step

The core idea of the Calculus of Variations is to extend the familiar concept of finding maxima or minima of a function to finding maxima or minima of a *functional*. Let's break this down.

### Step 1: Functions vs. Functionals

**Plain-English Statement:** You know what a regular function is: it takes a number and gives you another number. A *functional* is like a super-function; it takes an entire *function* as its input and gives you a single number as its output.

**Small Concrete Example:**
*   **Function:** $f(x) = x^2$. If you input $x=3$, you get $f(3)=9$.
*   **Functional:** Imagine a path $y(x)$ from $x=0$ to $x=1$. We want to find its length. The functional for the length of a curve $y(x)$ between $x_1$ and $x_2$ is $J[y] = \int_{x_1}^{x_2} \sqrt{1 + (y'(x))^2} dx$.
    *   If you input the function $y(x) = x$ (a straight line from $(0,0)$ to $(1,1)$), then $y'(x)=1$, and $J[x] = \int_0^1 \sqrt{1+1^2} dx = \int_0^1 \sqrt{2} dx = \sqrt{2}$. The functional gives you the length $\sqrt{2}$.
    *   If you input $y(x) = x^2$ (a curve from $(0,0)$ to $(1,1)$), then $y'(x)=2x$, and $J[x^2] = \int_0^1 \sqrt{1+(2x)^2} dx$. This will be a different number, likely larger than $\sqrt{2}$.
    The key is that the input to $J$ is the *entire function* $y(x)$, not just a single value $x$.

**Formal/Mathematical Version:**
*   A function $f: \mathbb{R} \to \mathbb{R}$ maps a real number to a real number.
*   A functional $J: V \to \mathbb{R}$ maps a function from a vector space of functions $V$ (e.g., $C^1[a,b]$, the space of continuously differentiable functions on $[a,b]$) to a real number.
    A common form for functionals in the Calculus of Variations is:
    $$ J[y] = \int_a^b L(x, y(x), y'(x)) dx $$
    Here, $L$ is called the Lagrangian or integrand, and it's a function of $x$, $y(x)$, and $y'(x)$.

**What Could Go Wrong:** Confusing the independent variable $x$ with the function $y(x)$ itself. Remember, we are trying to find the *function* $y(x)$ that makes $J[y]$ an extremum, not a specific value of $x$.

### Step 2: Optimization in Regular Calculus

**Plain-English Statement:** In basic calculus, to find where a function $f(x)$ has a maximum or minimum, we find the point where its slope (derivative) is zero.

**Small Concrete Example:**
*   Consider $f(x) = x^2 - 4x + 5$.
*   To find its minimum, we take the derivative: $f'(x) = 2x - 4$.
*   Set the derivative to zero: $2x - 4 = 0 \implies x = 2$.
*   At $x=2$, $f(2) = 2^2 - 4(2) + 5 = 4 - 8 + 5 = 1$. This is the minimum value.

**Formal/Mathematical Version:**
For a differentiable function $f(x)$, a necessary condition for $x_0$ to be a local extremum (maximum or minimum) is that $f'(x_0) = 0$. This is equivalent to saying that the *first variation* or *differential* of $f$ is zero: $df = f'(x)dx = 0$.

**What Could Go Wrong:** Forgetting that $f'(x)=0$ is a *necessary* condition for a local extremum, but not always *sufficient* (e.g., inflection points like $x^3$ at $x=0$). We often need to check second derivatives or analyze the function's behavior. In Calculus of Variations, checking for sufficiency is even more complex.

### Step 3: The Challenge for Functionals

**Plain-English Statement:** How do we apply the "derivative equals zero" idea when our input is an entire *function*? We can't just take $d/dx$ of $J[y]$, because $J[y]$ doesn't depend on $x$ directly, it depends on the *shape* of $y(x)$. We need a new kind of "derivative."

**Small Concrete Example:**
*   If $J[y] = \int_a^b (y'(x))^2 dx$, how do we differentiate this with respect to $y(x)$? It's not like taking $\frac{\partial}{\partial y}$ because $y$ is a function, not a variable. We need a way to measure how $J[y]$ changes when we slightly change the function $y(x)$.

**Formal/Mathematical Version:**
The concept of a "derivative" for a functional is called a "functional derivative" or "first variation." It's not a simple partial derivative. We need a method to quantify how $J[y]$ changes when $y(x)$ is perturbed.

**What Could Go Wrong:** Trying to treat $y(x)$ as a simple variable and apply standard partial differentiation rules. This is a common beginner's trap. The functional derivative is a different beast.

### Step 4: Introducing Variations (Perturbations)

**Plain-English Statement:** To see how a functional changes, we imagine wiggling our input function $y(x)$ just a tiny, tiny bit. We add a small "perturbation" or "variation" to it. Think of taking a straight string and nudging it slightly with your finger.

**Small Concrete Example:**
*   If our original path is $y(x)$, we consider a new path $y(x) + \epsilon \eta(x)$.
    *   Here, $\epsilon$ is a very small number (like $0.001$).
    *   $\eta(x)$ is an arbitrary, but "well-behaved" (e.g., continuously differentiable) function that represents the "wiggle." It must also satisfy the boundary conditions; if $y(a)$ and $y(b)$ are fixed, then $\eta(a)=0$ and $\eta(b)=0$ so that the varied path still starts and ends at the same points.
*   So, instead of $J[y]$, we now evaluate $J[y + \epsilon \eta]$.

**Formal/Mathematical Version:**
Let $y(x)$ be a function that potentially extremizes the functional $J[y]$. We consider a varied path $y_\epsilon(x) = y(x) + \epsilon \eta(x)$, where $\epsilon$ is a small real parameter, and $\eta(x)$ is an arbitrary, continuously differentiable function with $\eta(a) = \eta(b) = 0$ (for fixed boundary conditions).
Then the functional becomes $J[y_\epsilon] = J[y + \epsilon \eta]$.

**What Could Go Wrong:** Forgetting that $\eta(x)$ must satisfy the boundary conditions. If the endpoints of the path are fixed, then the perturbation $\eta(x)$ must be zero at those endpoints. Otherwise, you're comparing paths that don't start and end at the same place, which is usually not what the problem intends.

### Step 5: The First Variation of a Functional

**Plain-English Statement:** Just like the derivative $f'(x)$ tells us the linear change in $f(x)$ when $x$ changes slightly, the "first variation" $\delta J$ tells us the linear change in the functional $J[y]$ when the function $y(x)$ changes slightly by $\epsilon \eta(x)$. We calculate this by taking the derivative of $J[y + \epsilon \eta]$ with respect to $\epsilon$ and then setting $\epsilon=0$.

**Small Concrete Example:**
*   Let $J[y] = \int_a^b (y'(x))^2 dx$.
*   Consider $J[y + \epsilon \eta] = \int_a^b ((y(x) + \epsilon \eta(x))')^2 dx = \int_a^b (y'(x) + \epsilon \eta'(x))^2 dx$.
*   Expand the integrand: $\int_a^b ( (y'(x))^2 + 2\epsilon y'(x)\eta'(x) + \epsilon^2 (\eta'(x))^2 ) dx$.
*   Now, take the derivative with respect to $\epsilon$:
    $$ \frac{d}{d\epsilon} J[y + \epsilon \eta] = \int_a^b ( 2 y'(x)\eta'(x) + 2\epsilon (\eta'(x))^2 ) dx $$
*   Set $\epsilon=0$:
    $$ \frac{d}{d\epsilon} J[y + \epsilon \eta] \Big|_{\epsilon=0} = \int_a^b 2 y'(x)\eta'(x) dx $$
    This is the first variation $\delta J$.

**Formal/Mathematical Version:**
The first variation of the functional $J[y]$ is defined as:
$$ \delta J = \frac{d}{d\epsilon} J[y + \epsilon \eta] \Big|_{\epsilon=0} $$
For $J[y] = \int_a^b L(x, y(x), y'(x)) dx$, using the chain rule:
$$ \frac{d}{d\epsilon} J[y + \epsilon \eta] = \int_a^b \left( \frac{\partial L}{\partial y} \frac{\partial (y + \epsilon \eta)}{\partial \epsilon} + \frac{\partial L}{\partial y'} \frac{\partial (y' + \epsilon \eta')}{\partial \epsilon} \right) dx $$
$$ = \int_a^b \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) dx $$
Setting $\epsilon=0$ (which doesn't change anything here, as $\epsilon$ is no longer present in the integrand after differentiation w.r.t. $\epsilon$):
$$ \delta J = \int_a^b \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) dx $$

**What Could Go Wrong:** Mistakes in applying the chain rule when differentiating $L(x, y(x)+\epsilon\eta(x), y'(x)+\epsilon\eta'(x))$ with respect to $\epsilon$. Remember that $y$ and $y'$ are functions of $x$, but when taking $\frac{d}{d\epsilon}$, they are treated as intermediate variables whose $\epsilon$-dependence comes from $\epsilon\eta(x)$ and $\epsilon\eta'(x)$.

### Step 6: The Euler-Lagrange Equation

**Plain-English Statement:** For a functional $J[y]$ to have an extremum (like a minimum length or maximum area), its first variation $\delta J$ must be zero for *any* possible small wiggle $\eta(x)$. This condition, $\delta J = 0$, leads directly to a differential equation that the optimal function $y(x)$ must satisfy. This differential equation is called the Euler-Lagrange equation.

**Small Concrete Example (Continued from Step 5):**
*   We found $\delta J = \int_a^b 2 y'(x)\eta'(x) dx$.
*   To set this to zero, we use integration by parts on the second term: $\int u dv = uv - \int v du$.
    *   Let $u = 2y'(x)$, $dv = \eta'(x) dx$.
    *   Then $du = 2y''(x) dx$, $v = \eta(x)$.
*   So, $\int_a^b 2 y'(x)\eta'(x) dx = [2y'(x)\eta(x)]_a^b - \int_a^b 2y''(x)\eta(x) dx$.
*   Since $\eta(a)=\eta(b)=0$ (fixed boundary conditions), the boundary term $[2y'(x)\eta(x)]_a^b$ is zero.
*   Thus, $\delta J = -\int_a^b 2y''(x)\eta(x) dx$.
*   For $\delta J = 0$ for *any* $\eta(x)$, the integrand must be zero (by the Fundamental Lemma of Calculus of Variations).
    *   So, $-2y''(x) = 0 \implies y''(x) = 0$.
*   Integrating twice gives $y(x) = C_1 x + C_2$. This is the equation of a straight line, which is indeed the shortest path between two points.

**Formal/Mathematical Version:**
Setting the first variation to zero:
$$ \delta J = \int_a^b \left( \frac{\partial L}{\partial y} \eta(x) + \frac{\partial L}{\partial y'} \eta'(x) \right) dx = 0 $$
We use integration by parts on the second term: $\int_a^b \frac{\partial L}{\partial y'} \eta'(x) dx$.
Let $u = \frac{\partial L}{\partial y'}$ and $dv = \eta'(x) dx$. Then $du = \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) dx$ and $v = \eta(x)$.
$$ \int_a^b \frac{\partial L}{\partial y'} \eta'(x) dx = \left[ \eta(x) \frac{\partial L}{\partial y'} \right]_a^b - \int_a^b \eta(x) \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) dx $$
Since $\eta(a) = \eta(b) = 0$ (for fixed boundary conditions), the boundary term $\left[ \eta(x) \frac{\partial L}{\partial y'} \right]_a^b$ vanishes.
Substituting this back into the expression for $\delta J$:
$$ \delta J = \int_a^b \left( \frac{\partial L}{\partial y} \eta(x) - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \eta(x) \right) dx = 0 $$
$$ \delta J = \int_a^b \left( \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \right) \eta(x) dx = 0 $$
For this integral to be zero for *any* arbitrary $\eta(x)$ (that satisfies the boundary conditions), the term in the parentheses must be zero. This is a crucial result known as the **Fundamental Lemma of Calculus of Variations**.
Therefore, the function $y(x)$ that extremizes $J[y]$ must satisfy the **Euler-Lagrange Equation**:
$$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$

**What Could Go Wrong:**
1.  Incorrectly applying integration by parts. This is the most common algebraic error.
2.  Forgetting the Fundamental Lemma of Calculus of Variations. It's what allows us to go from the integral being zero to the integrand being zero.
3.  Mistakes in calculating the total derivative $\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)$. Remember that $\frac{\partial L}{\partial y'}$ itself can depend on $x$, $y$, and $y'$, so its total derivative with respect to $x$ requires the chain rule:
    $$ \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = \frac{\partial}{\partial x}\left(\frac{\partial L}{\partial y'}\right) + \frac{\partial}{\partial y}\left(\frac{\partial L}{\partial y'}\right) y' + \frac{\partial}{\partial y'}\left(\frac{\partial L}{\partial y'}\right) y'' $$

### Step 7: The Functional Derivative

**Plain-English Statement:** The functional derivative is a way to formally write down the "slope" of the functional at a particular function. It's the part of the integrand of $\delta J$ that's multiplied by $\eta(x)$ after all the integration by parts. It's the direct analogue of $f'(x)$ in regular calculus.

**Small Concrete Example (Continued from Step 6):**
*   We had $\delta J = \int_a^b \left( \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \right) \eta(x) dx$.
*   If we write $\delta J = \int_a^b K(x) \eta(x) dx$, then $K(x)$ is defined as the functional derivative.
*   So, for our general functional $J[y] = \int_a^b L(x, y(x), y'(x)) dx$, the functional derivative is:
    $$ \frac{\delta J}{\delta y(x)} = \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) $$
*   The Euler-Lagrange equation is simply the condition that the functional derivative is zero: $\frac{\delta J}{\delta y(x)} = 0$.

**Formal/Mathematical Version:**
If the first variation of a functional $J[y]$ can be written in the form:
$$ \delta J = \int_a^b K(x) \eta(x) dx $$
then $K(x)$ is defined as the functional derivative of $J$ with respect to $y(x)$, denoted $\frac{\delta J}{\delta y(x)}$.
From our derivation in Step 6, for $J[y] = \int_a^b L(x, y(x), y'(x)) dx$, the functional derivative is:
$$ \frac{\delta J}{\delta y(x)} = \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) $$
The condition for an extremum of $J[y]$ is $\frac{\delta J}{\delta y(x)} = 0$.

**What Could Go Wrong:** Not understanding that the functional derivative is a *function* of $x$, not a single number. It tells you how sensitive the functional is to a small change in $y$ at each specific point $x$. Also, confusing it with a partial derivative. The notation $\frac{\delta}{\delta y(x)}$ is distinct from $\frac{\partial}{\partial y}$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Shortest distance between two points (Brachistochrone for $L=\sqrt{1+(y')^2}$)

**Problem Statement:** Find the curve $y(x)$ connecting two points $(x_1, y_1)$ and $(x_2, y_2)$ that has the shortest possible length.

**Given:** Two points $(x_1, y_1)$ and $(x_2, y_2)$.
**Wanted:** The function $y(x)$ that minimizes the arc length.

**Solution:**
1.  **Formulate the functional:** The arc length $s$ of a curve $y(x)$ from $x_1$ to $x_2$ is given by:
    $$ J[y] = \int_{x_1}^{x_2} \sqrt{1 + (y'(x))^2} dx $$
    This is our functional.
    *This is the quantity we want to minimize. The integrand $L$ is $\sqrt{1+(y')^2}$.*

2.  **Identify the Lagrangian $L$**:
    $$ L(x, y, y') = \sqrt{1 + (y')^2} $$
    *Here, $L$ does not explicitly depend on $x$ or $y$, only on $y'$.*

3.  **Calculate partial derivatives of $L$**:
    *   $\frac{\partial L}{\partial y} = \frac{\partial}{\partial y} \left( \sqrt{1 + (y')^2} \right) = 0$
        *Since $L$ does not contain $y$, its partial derivative with respect to $y$ is zero.*
    *   $\frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} \left( (1 + (y')^2)^{1/2} \right)$
        *Apply the chain rule: $\frac{d}{du} u^{1/2} = \frac{1}{2} u^{-1/2}$ and $\frac{d}{dy'} (1+(y')^2) = 2y'$.*
        $$ = \frac{1}{2} (1 + (y')^2)^{-1/2} \cdot (2y') $$
        $$ = \frac{y'}{\sqrt{1 + (y')^2}} $$
        *This is the partial derivative of $L$ with respect to $y'$.*

4.  **Apply the Euler-Lagrange equation**:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Substitute the partial derivatives we found:
    $$ 0 - \frac{d}{dx}\left( \frac{y'}{\sqrt{1 + (y')^2}} \right) = 0 $$
    *Since $\frac{\partial L}{\partial y}$ is zero, the equation simplifies.*

5.  **Solve the resulting differential equation**:
    $$ \frac{d}{dx}\left( \frac{y'}{\sqrt{1 + (y')^2}} \right) = 0 $$
    *This means the term inside the parenthesis must be a constant.*
    $$ \frac{y'}{\sqrt{1 + (y')^2}} = C_1 $$
    *Now, we need to solve for $y'$. Square both sides.*
    $$ (y')^2 = C_1^2 (1 + (y')^2) $$
    $$ (y')^2 = C_1^2 + C_1^2 (y')^2 $$
    $$ (y')^2 (1 - C_1^2) = C_1^2 $$
    $$ (y')^2 = \frac{C_1^2}{1 - C_1^2} $$
    *Let $C_2^2 = \frac{C_1^2}{1 - C_1^2}$. This implies $C_1^2 < 1$ for $C_2$ to be real. $C_2$ is just another constant.*
    $$ y' = \pm C_2 $$
    *Integrate with respect to $x$.*
    $$ y(x) = \pm C_2 x + C_3 $$
    *This is the equation of a straight line.*

6.  **Apply boundary conditions**: The constants $C_2$ and $C_3$ are determined by the specific points $(x_1, y_1)$ and $(x_2, y_2)$. For example, if $(0,0)$ and $(1,1)$ are the points:
    *   $y(0) = 0 \implies C_3 = 0$.
    *   $y(1) = 1 \implies C_2 = 1$.
    *   So, $y(x) = x$.

**Final Answer:** The curve of shortest length between two points is a **straight line**.

**Reflection:** This example is "easy" because the Lagrangian does not depend on $x$ or $y$, leading to a relatively simple differential equation. The key steps are setting up the functional, correctly calculating the partial derivatives, and applying integration by parts (implicitly, by solving the ODE). The fact that $y''=0$ implies a straight line is a fundamental result.

---

### Example 2: Minimal Surface of Revolution (Catenoid)

**Problem Statement:** Find the curve $y(x)$ connecting two points $(x_1, y_1)$ and $(x_2, y_2)$ that, when rotated around the $x$-axis, generates a surface of minimum area. (Assume $y(x) > 0$).

**Given:** Two points $(x_1, y_1)$ and $(x_2, y_2)$ with $y_1, y_2 > 0$.
**Wanted:** The function $y(x)$ that minimizes the surface area of revolution.

**Solution:**
1.  **Formulate the functional:** The surface area $A$ generated by rotating a curve $y(x)$ around the $x$-axis from $x_1$ to $x_2$ is given by:
    $$ J[y] = \int_{x_1}^{x_2} 2\pi y(x) \sqrt{1 + (y'(x))^2} dx $$
    *We can ignore the constant $2\pi$ for minimization purposes, as it doesn't change the location of the minimum.*
    $$ J[y] = \int_{x_1}^{x_2} y \sqrt{1 + (y')^2} dx $$
    *This is our functional. The integrand $L$ is $y\sqrt{1+(y')^2}$.*

2.  **Identify the Lagrangian $L$**:
    $$ L(x, y, y') = y \sqrt{1 + (y')^2} $$
    *Here, $L$ depends on $y$ and $y'$, but not explicitly on $x$.*

3.  **Calculate partial derivatives of $L$**:
    *   $\frac{\partial L}{\partial y} = \frac{\partial}{\partial y} \left( y \sqrt{1 + (y')^2} \right) = \sqrt{1 + (y')^2}$
        *Treating $y'$ as a constant with respect to $y$.*
    *   $\frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} \left( y (1 + (y')^2)^{1/2} \right)$
        *Apply the chain rule for $y'$: $y \cdot \frac{1}{2} (1 + (y')^2)^{-1/2} \cdot (2y')$*
        $$ = \frac{y y'}{\sqrt{1 + (y')^2}} $$

4.  **Apply the Euler-Lagrange equation**:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Substitute the partial derivatives:
    $$ \sqrt{1 + (y')^2} - \frac{d}{dx}\left( \frac{y y'}{\sqrt{1 + (y')^2}} \right) = 0 $$
    *This looks complicated. Since $L$ does not explicitly depend on $x$, we can use a special form of the Euler-Lagrange equation (a first integral):*
    *If $\frac{\partial L}{\partial x} = 0$, then $L - y' \frac{\partial L}{\partial y'} = C_1$ (Beltrami identity).*
    *Let's use the Beltrami identity to simplify the ODE. This is a common trick when $L$ is independent of $x$.*

5.  **Apply Beltrami Identity (Special Case of E-L Eq. when $\partial L / \partial x = 0$)**:
    $$ L - y' \frac{\partial L}{\partial y'} = C_1 $$
    Substitute $L$ and $\frac{\partial L}{\partial y'}$:
    $$ y \sqrt{1 + (y')^2} - y' \left( \frac{y y'}{\sqrt{1 + (y')^2}} \right) = C_1 $$
    *Simplify the expression.*
    $$ y \sqrt{1 + (y')^2} - \frac{y (y')^2}{\sqrt{1 + (y')^2}} = C_1 $$
    *Combine the terms by finding a common denominator.*
    $$ \frac{y (1 + (y')^2) - y (y')^2}{\sqrt{1 + (y')^2}} = C_1 $$
    $$ \frac{y + y(y')^2 - y(y')^2}{\sqrt{1 + (y')^2}} = C_1 $$
    $$ \frac{y}{\sqrt{1 + (y')^2}} = C_1 $$
    *This is a first-order differential equation. Now, solve for $y'$.*
    $$ y = C_1 \sqrt{1 + (y')^2} $$
    $$ y^2 = C_1^2 (1 + (y')^2) $$
    $$ y^2 = C_1^2 + C_1^2 (y')^2 $$
    $$ y^2 - C_1^2 = C_1^2 (y')^2 $$
    $$ (y')^2 = \frac{y^2 - C_1^2}{C_1^2} $$
    $$ y' = \frac{dy}{dx} = \pm \frac{\sqrt{y^2 - C_1^2}}{C_1} $$
    *Separate variables to integrate.*
    $$ \frac{C_1}{\sqrt{y^2 - C_1^2}} dy = \pm dx $$
    *Integrate both sides.*
    $$ \int \frac{C_1}{\sqrt{y^2 - C_1^2}} dy = \pm \int dx $$
    *The integral on the left is a standard integral: $\int \frac{du}{\sqrt{u^2-a^2}} = \cosh^{-1}\left(\frac{u}{a}\right) + C$.*
    $$ C_1 \cosh^{-1}\left(\frac{y}{C_1}\right) = \pm x + C_2 $$
    $$ \cosh^{-1}\left(\frac{y}{C_1}\right) = \pm \frac{x}{C_1} + \frac{C_2}{C_1} $$
    *Let $A = \frac{1}{C_1}$ and $B = \frac{C_2}{C_1}$.*
    $$ \frac{y}{C_1} = \cosh\left( \pm \frac{x}{C_1} + \frac{C_2}{C_1} \right) $$
    $$ y(x) = C_1 \cosh\left( \frac{x - C_2}{C_1} \right) $$
    *This is the equation of a catenary curve.*

6.  **Apply boundary conditions**: The constants $C_1$ and $C_2$ are determined by the specific points $(x_1, y_1)$ and $(x_2, y_2)$. This often requires numerical methods to solve for $C_1$ and $C_2$.

**Final Answer:** The curve that generates a minimal surface of revolution is a **catenary**, described by the equation $y(x) = C_1 \cosh\left( \frac{x - C_2}{C_1} \right)$. When rotated, this forms a **catenoid**.

**Reflection:** This example is "medium-hard" because the Lagrangian depends on $y$ and $y'$, and the direct application of Euler-Lagrange leads to a complex second-order ODE. Recognizing and applying the Beltrami identity (a first integral) significantly simplifies the problem, reducing it to a first-order separable ODE. The resulting integral is also a standard form that must be recognized.

---

### Example 3: Functional with higher derivatives

**Problem Statement:** Find the function $y(x)$ that extremizes the functional $J[y] = \int_0^1 \left( (y''(x))^2 - (y(x))^2 \right) dx$, with boundary conditions $y(0)=0$, $y'(0)=0$, $y(1)=0$, $y'(1)=0$.

**Given:** Functional $J[y] = \int_0^1 \left( (y'')^2 - y^2 \right) dx$ and boundary conditions.
**Wanted:** The function $y(x)$ that extremizes $J[y]$.

**Solution:**
1.  **Formulate the functional and identify the Lagrangian $L$**:
    $$ J[y] = \int_0^1 L(x, y, y', y'') dx $$
    $$ L(x, y, y', y'') = (y'')^2 - y^2 $$
    *This functional depends on the second derivative $y''$.*

2.  **Generalize the Euler-Lagrange equation for higher derivatives**:
    For a functional $J[y] = \int_a^b L(x, y, y', y'', \dots, y^{(n)}) dx$, the generalized Euler-Lagrange equation is:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) + \frac{d^2}{dx^2}\left(\frac{\partial L}{\partial y''}\right) - \dots + (-1)^n \frac{d^n}{dx^n}\left(\frac{\partial L}{\partial y^{(n)}}\right) = 0 $$
    *In our case, $n=2$, so we need terms up to $y''$.*
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) + \frac{d^2}{dx^2}\left(\frac{\partial L}{\partial y''}\right) = 0 $$

3.  **Calculate partial derivatives of $L$**:
    *   $\frac{\partial L}{\partial y} = \frac{\partial}{\partial y} ( (y'')^2 - y^2 ) = -2y$
    *   $\frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} ( (y'')^2 - y^2 ) = 0$
        *Since $L$ does not depend on $y'$, this term is zero.*
    *   $\frac{\partial L}{\partial y''} = \frac{\partial}{\partial y''} ( (y'')^2 - y^2 ) = 2y''$

4.  **Substitute into the generalized Euler-Lagrange equation**:
    $$ (-2y) - \frac{d}{dx}(0) + \frac{d^2}{dx^2}(2y'') = 0 $$
    $$ -2y + 2\frac{d^2}{dx^2}(y'') = 0 $$
    $$ -y + y^{(4)} = 0 $$
    $$ y^{(4)} - y = 0 $$
    *This is a fourth-order linear homogeneous ordinary differential equation.*

5.  **Solve the resulting differential equation**:
    *   The characteristic equation is $r^4 - 1 = 0$.
    *   $(r^2 - 1)(r^2 + 1) = 0$
    *   $(r - 1)(r + 1)(r - i)(r + i) = 0$
    *   The roots are $r_1 = 1$, $r_2 = -1$, $r_3 = i$, $r_4 = -i$.
    *   The general solution is:
        $$ y(x) = C_1 e^x + C_2 e^{-x} + C_3 \cos x + C_4 \sin x $$
        *Alternatively, using hyperbolic functions for the real roots:*
        $$ y(x) = A \cosh x + B \sinh x + C \cos x + D \sin x $$

6.  **Apply boundary conditions**:
    We have four boundary conditions: $y(0)=0$, $y'(0)=0$, $y(1)=0$, $y'(1)=0$.
    First, find $y'(x)$:
    $$ y'(x) = A \sinh x + B \cosh x - C \sin x + D \cos x $$

    *   $y(0) = 0$:
        $A \cosh(0) + B \sinh(0) + C \cos(0) + D \sin(0) = 0$
        $A(1) + B(0) + C(1) + D(0) = 0 \implies A + C = 0 \implies C = -A$

    *   $y'(0) = 0$:
        $A \sinh(0) + B \cosh(0) - C \sin(0) + D \cos(0) = 0$
        $A(0) + B(1) - C(0) + D(1) = 0 \implies B + D = 0 \implies D = -B$

    Now, substitute $C=-A$ and $D=-B$ into $y(x)$:
    $$ y(x) = A \cosh x + B \sinh x - A \cos x - B \sin x $$
    $$ y(x) = A(\cosh x - \cos x) + B(\sinh x - \sin x) $$

    *   $y(1) = 0$:
        $A(\cosh 1 - \cos 1) + B(\sinh 1 - \sin 1) = 0$

    *   $y'(1) = 0$:
        $y'(x) = A(\sinh x + \sin x) + B(\cosh x + \cos x)$
        $A(\sinh 1 + \sin 1) + B(\cosh 1 + \cos 1) = 0$

    We now have a system of two linear equations for $A$ and $B$:
    1.  $(\cosh 1 - \cos 1) A + (\sinh 1 - \sin 1) B = 0$
    2.  $(\sinh 1 + \sin 1) A + (\cosh 1 + \cos 1) B = 0$

    Let $k_1 = \cosh 1 - \cos 1 \approx 1.543 - 0.540 = 1.003$
    Let $k_2 = \sinh 1 - \sin 1 \approx 1.175 - 0.841 = 0.334$
    Let $k_3 = \sinh 1 + \sin 1 \approx 1.175 + 0.841 = 2.016$
    Let $k_4 = \cosh 1 + \cos 1 \approx 1.543 + 0.540 = 2.083$

    The system is:
    1.  $k_1 A + k_2 B = 0$
    2.  $k_3 A + k_4 B = 0$

    For a non-trivial solution ($A \neq 0, B \neq 0$), the determinant of the coefficient matrix must be zero:
    $k_1 k_4 - k_2 k_3 = 0$
    $(\cosh 1 - \cos 1)(\cosh 1 + \cos 1) - (\sinh 1 - \sin 1)(\sinh 1 + \sin 1) = 0$
    $(\cosh^2 1 - \cos^2 1) - (\sinh^2 1 - \sin^2 1) = 0$
    $\cosh^2 1 - \sinh^2 1 - \cos^2 1 + \sin^2 1 = 0$
    Using identities $\cosh^2 x - \sinh^2 x = 1$ and $\cos^2 x - \sin^2 x = \cos(2x)$:
    $1 - (\cos^2 1 - \sin^2 1) = 0$
    $1 - \cos(2) = 0$
    $\cos(2) = 1$
    This is false, as $\cos(2 \text{ radians}) \approx -0.416$.
    Since the determinant is not zero, the only solution to the system is $A=0$ and $B=0$.

7.  **Conclusion**:
    If $A=0$ and $B=0$, then $C=0$ and $D=0$.
    This implies $y(x) = 0$ for all $x$.

**Final Answer:** The function that extremizes the functional under the given boundary conditions is $y(x) = \mathbf{0}$.

**Reflection:** This example is "hard" due to:
1.  The need to generalize the Euler-Lagrange equation for higher derivatives.
2.  Solving a fourth-order linear ODE.
3.  Carefully applying four boundary conditions, which led to a system of linear equations.
4.  The surprising result that the trivial solution $y(x)=0$ is the extremum. This often happens when the functional (like this one) is positive definite, and the boundary conditions force it to zero. Here, $y(x)=0$ means $(y'')^2=0$ and $y^2=0$, so the integral is 0, which is the minimum possible value for this functional (since $(y'')^2 \ge 0$ and $y^2 \ge 0$, the functional can be negative if $y$ is large).

---

### Example 4: A Functional with an explicit $x$ dependence

**Problem Statement:** Find the curve $y(x)$ that extremizes the functional $J[y] = \int_0^1 (x y'(x) + y(x)^2) dx$, with boundary conditions $y(0)=1$ and $y(1)=2$.

**Given:** Functional $J[y] = \int_0^1 (x y' + y^2) dx$ and boundary conditions $y(0)=1$, $y(1)=2$.
**Wanted:** The function $y(x)$ that extremizes $J[y]$.

**Solution:**
1.  **Formulate the functional and identify the Lagrangian $L$**:
    $$ J[y] = \int_0^1 L(x, y, y') dx $$
    $$ L(x, y, y') = x y' + y^2 $$
    *Here, $L$ explicitly depends on $x$, $y$, and $y'$. This means we cannot use the Beltrami identity.*

2.  **Calculate partial derivatives of $L$**:
    *   $\frac{\partial L}{\partial y} = \frac{\partial}{\partial y} (x y' + y^2) = 2y$
    *   $\frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} (x y' + y^2) = x$

3.  **Apply the Euler-Lagrange equation**:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Substitute the partial derivatives:
    $$ 2y - \frac{d}{dx}(x) = 0 $$
    *Calculate the total derivative $\frac{d}{dx}(x)$.*
    $$ 2y - 1 = 0 $$
    *This is a very simple differential equation!*

4.  **Solve the resulting differential equation**:
    $$ 2y = 1 $$
    $$ y(x) = \frac{1}{2} $$
    *This implies that the extremizing function is a constant function.*

5.  **Apply boundary conditions**:
    *   $y(0)=1$: Our solution $y(x)=1/2$ gives $y(0)=1/2$. This does not match the boundary condition $y(0)=1$.
    *   $y(1)=2$: Our solution $y(x)=1/2$ gives $y(1)=1/2$. This does not match the boundary condition $y(1)=2$.

    *What went wrong?* The Euler-Lagrange equation gives a curve that *could* be an extremum. However, if the solution obtained (in this case $y(x)=1/2$) cannot satisfy the given boundary conditions, then there is no function of that form that extremizes the functional for *those specific boundary conditions*.

    In such cases, it means that the extremum might not exist in the space of functions considered (e.g., continuously differentiable functions that satisfy *these specific fixed* boundary conditions). Sometimes, it means the minimum is at the boundary of the function space, or the problem is ill-posed for fixed boundary conditions. However, the question asks for "the curve $y(x)$ that extremizes the functional". If the Euler-Lagrange solution cannot satisfy the boundary conditions, then no such extremizing curve exists *within the class of smooth functions with fixed endpoints*.

    Therefore, for the given boundary conditions, there is **no solution** of the form $y(x) = \frac{1}{2}$. This means the problem as stated with these fixed boundary conditions does not have a smooth solution that satisfies the Euler-Lagrange equation.

**Final Answer:** The Euler-Lagrange equation yields $y(x) = \frac{1}{2}$. However, this solution **cannot satisfy the given boundary conditions** $y(0)=1$ and $y(1)=2$. Therefore, there is no smooth function $y(x)$ satisfying these boundary conditions that extremizes the functional according to the Euler-Lagrange equation.

**Reflection:** This example is "medium" because the Euler-Lagrange equation itself is very simple, but the explicit dependence on $x$ means the Beltrami identity cannot be used. The trickiness lies in the interpretation of the result: sometimes, the Euler-Lagrange equation provides a solution that simply cannot be reconciled with the given boundary conditions. This implies that the extremum might not exist under those specific constraints, or it might be a "degenerate" case. This highlights the importance of always checking boundary conditions.

## 6. Common mistakes and traps

1.  **Confusing functions and functionals**: A functional takes a *function* as input and outputs a *number*. A common mistake is to try to differentiate $J[y]$ with respect to $x$ or $y$ as if $y$ were an independent variable, rather than a function of $x$.
2.  **Incorrect application of the chain rule during variation**: When calculating $\frac{d}{d\epsilon} J[y + \epsilon \eta]$, remember that $L$ is a function of $x, y, y'$. So, $\frac{d}{d\epsilon} L(x, y+\epsilon\eta, y'+\epsilon\eta')$ requires careful application of the chain rule: $\frac{\partial L}{\partial y} \eta + \frac{\partial L}{\partial y'} \eta'$.
3.  **Forgetting boundary conditions during integration by parts**: When performing integration by parts on the $\int \frac{\partial L}{\partial y'} \eta' dx$ term, the boundary term $\left[ \eta(x) \frac{\partial L}{\partial y'} \right]_a^b$ must be evaluated. If the problem specifies fixed boundary conditions for $y(x)$, then $\eta(a)=\eta(b)=0$, and this term vanishes. If boundary conditions are not fixed (e.g., natural boundary conditions), this term must be included and set to zero separately, leading to additional equations.
4.  **Errors in calculating the total derivative $\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)$**: Remember that $\frac{\partial L}{\partial y'}$ can depend on $x$, $y(x)$, and $y'(x)$. Thus, its total derivative with respect to $x$ requires the full chain rule: $\frac{d}{dx} F(x, y(x), y'(x)) = \frac{\partial F}{\partial x} + \frac{\partial F}{\partial y} y' + \frac{\partial F}{\partial y'} y''$. Many students forget the terms involving $y'$ and $y''$.
5.  **Not recognizing special cases of the Euler-Lagrange equation**: If $L$ does not depend explicitly on $x$ (i.e., $\frac{\partial L}{\partial x} = 0$), then the Beltrami identity $L - y' \frac{\partial L}{\partial y'} = C$ can be used as a first integral, often simplifying the solution of the ODE significantly. Failing to use this can lead to much more complex algebra.
6.  **Assuming the solution from Euler-Lagrange always satisfies boundary conditions**: As seen in Example 4, the ODE solution must be checked against the given boundary conditions. If it cannot satisfy them, then an extremum does not exist within the class of functions considered.

## 7. Textbook-precise explanation

Let $V$ be a space of admissible functions $y(x)$, typically $C^2[a,b]$ (twice continuously differentiable functions on the interval $[a,b]$) which satisfy certain boundary conditions.

A **functional** $J$ is a mapping $J: V \to \mathbb{R}$, which assigns a real number to each function $y \in V$. In the calculus of variations, we are typically concerned with integral functionals of the form:
$$ J[y] = \int_a^b L(x, y(x), y'(x)) dx $$
where $L$ is the **Lagrangian** or **integrand**, a function $L: \mathbb{R}^3 \to \mathbb{R}$ that is continuously differentiable with respect to all its arguments ($x, y, y'$).

Let $y_0(x)$ be a function in $V$ that extremizes the functional $J[y]$. Consider a variation of $y_0(x)$ given by $y_\epsilon(x) = y_0(x) + \epsilon \eta(x)$, where $\epsilon$ is a small real parameter, and $\eta(x)$ is an arbitrary, continuously differentiable function (often called the **variation function** or **test function**) such that $\eta(a) = \eta(b) = 0$ (for fixed boundary conditions). This ensures that $y_\epsilon(x)$ also satisfies the boundary conditions.

The **first variation** of $J$ at $y_0$ in the direction of $\eta$ is defined as the directional derivative of $J$ with respect to $\epsilon$ at $\epsilon=0$:
$$ \delta J[y_0; \eta] = \frac{d}{d\epsilon} J[y_0 + \epsilon \eta] \Big|_{\epsilon=0} $$
For an extremum to exist at $y_0(x)$, it is a necessary condition that the first variation is zero for all admissible variations $\eta(x)$:
$$ \delta J[y_0; \eta] = 0 \quad \text{for all } \eta(x) $$
Using the chain rule for differentiation under the integral sign:
$$ \frac{d}{d\epsilon} J[y_0 + \epsilon \eta] = \int_a^b \left( \frac{\partial L}{\partial y} \frac{\partial (y_0 + \epsilon \eta)}{\partial \epsilon} + \frac{\partial L}{\partial y'} \frac{\partial (y_0' + \epsilon \eta')}{\partial \epsilon} \right) dx $$
$$ = \int_a^b \left( \frac{\partial L}{\partial y}(x, y_0, y_0') \eta(x) + \frac{\partial L}{\partial y'}(x, y_0, y_0') \eta'(x) \right) dx $$
Applying integration by parts to the second term:
$$ \int_a^b \frac{\partial L}{\partial y'} \eta'(x) dx = \left[ \eta(x) \frac{\partial L}{\partial y'} \right]_a^b - \int_a^b \eta(x) \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) dx $$
Since $\eta(a)=\eta(b)=0$, the boundary term vanishes. Thus,
$$ \delta J[y_0; \eta] = \int_a^b \left( \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) \right) \eta(x) dx = 0 $$
By the **Fundamental Lemma of Calculus of Variations**, if $\int_a^b K(x) \eta(x) dx = 0$ for all admissible $\eta(x)$, then $K(x)$ must be identically zero on $[a,b]$. Therefore, the function $y_0(x)$ that extremizes $J[y]$ must satisfy the **Euler-Lagrange Equation**:
$$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
This is a second-order ordinary differential equation whose solution, along with the given boundary conditions, determines the extremizing function $y(x)$.

The **functional derivative** of $J[y]$ with respect to $y(x)$, denoted $\frac{\delta J}{\delta y(x)}$, is defined by the relation:
$$ \delta J = \int_a^b \frac{\delta J}{\delta y(x)} \eta(x) dx $$
Comparing this to the derived expression for $\delta J$, we find:
$$ \frac{\delta J}{\delta y(x)} = \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) $$
Thus, the Euler-Lagrange equation is equivalent to setting the functional derivative to zero: $\frac{\delta J}{\delta y(x)} = 0$.

**For higher-order derivatives**: If the functional depends on derivatives up to order $n$, $J[y] = \int_a^b L(x, y, y', \dots, y^{(n)}) dx$, the generalized Euler-Lagrange equation is:
$$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) + \frac{d^2}{dx^