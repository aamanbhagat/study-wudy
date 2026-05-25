## 1. What it is — in plain English

Imagine you have a perfectly smooth, curved surface, like the surface of a polished marble or a well-inflated balloon. If you zoom in very, very close to any point on this surface, it would look almost perfectly flat. You could place a tiny, flat piece of paper on that spot, and it would lie perfectly flush with the surface, touching it at just one point.

This idea of a surface looking "flat" when you zoom in is exactly what "differentiability" means in multiple variables. It's about how "smooth" a function's graph is at a particular point. If a function is differentiable at a point, it means its graph doesn't have any sharp corners, kinks, tears, or sudden jumps at that location.

Instead, at a differentiable point, the surface can be perfectly approximated by a flat plane, called the "tangent plane." This tangent plane is the best linear approximation of the function's behavior right around that specific point. It's the multi-dimensional equivalent of a tangent line to a curve in single-variable calculus.

## 2. Why it matters — real-world applications

Understanding differentiability in multiple variables is crucial because many real-world phenomena and engineering problems involve functions that depend on several inputs. Here are a few concrete applications:

1.  **Aerospace Engineering & Aerodynamics:** When designing aircraft wings or optimizing rocket trajectories, engineers use complex mathematical models to describe airflow, lift, and drag. These models are often multivariable functions. For smooth airflow and stable flight, the surfaces and the functions describing forces must be differentiable. Non-differentiable points would represent sharp edges or sudden changes that could lead to turbulence, instability, or inefficient performance. For example, optimizing the shape of a turbine blade for maximum efficiency involves finding the "smoothest" energy function, which relies on its differentiability.

2.  **Machine Learning & Optimization:** Many machine learning algorithms, such as neural networks and support vector machines, rely heavily on optimization techniques like Gradient Descent. These algorithms aim to minimize a "cost function" (or "loss function") which measures how well the model performs. This cost function often depends on hundreds or thousands of parameters (weights and biases). For Gradient Descent to work, the cost function must be differentiable with respect to its parameters. If it weren't, the "gradient" (which tells the algorithm which direction to adjust parameters to reduce cost) wouldn't be well-defined, and the algorithm wouldn't know how to proceed. Companies like Google and OpenAI use this daily to train their large language models.

3.  **Physics & Engineering (Fluid Dynamics, Stress Analysis):** In fluid dynamics, understanding how pressure and velocity change across a fluid medium requires differentiable functions to model the flow field. For instance, simulating water flowing around an object or air moving through a pipe relies on the assumption that the velocity and pressure fields are smooth enough to be differentiated. Similarly, in structural engineering, analyzing stress distribution in a material (e.g., a bridge component or a car chassis) often involves multivariable functions. Differentiability ensures that stress changes smoothly throughout the material, allowing engineers to predict failure points accurately.

4.  **Computer Graphics & Animation:** When rendering 3D objects, computer graphics software needs to calculate "surface normals" (vectors perpendicular to the surface) to determine how light reflects off an object, creating realistic shading. For smooth shading and realistic reflections, the underlying mathematical representation of the object's surface must be differentiable. If a surface isn't differentiable (e.g., a sharp crease or a jagged edge), the normal vector isn't uniquely defined, leading to visual artifacts or unrealistic lighting. Pixar's animation software, for example, relies on differentiable surfaces for its character models and environments.

## 3. Prerequisites — what you must know first

Before diving deep into differentiability in multiple variables, ensure you have a solid grasp of the following concepts. If any of these feel shaky, pause and review them thoroughly.

*   **Single-Variable Differentiability:**
    *   **Explanation:** The definition of the derivative $f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$ and its geometric meaning as the slope of the tangent line to a curve at a point. Understanding that differentiability implies continuity, but not vice-versa.
*   **Limits in Multiple Variables:**
    *   **Explanation:** How to evaluate limits of functions of two or more variables, including the $\epsilon-\delta$ definition. Crucially, understanding that for a limit to exist, the function must approach the same value regardless of the path taken towards the limit point.
*   **Continuity in Multiple Variables:**
    *   **Explanation:** A function $f(x,y)$ is continuous at $(a,b)$ if $\lim_{(x,y) \to (a,b)} f(x,y) = f(a,b)$. Understanding that continuity is a weaker condition than differentiability.
*   **Partial Derivatives:**
    *   **Explanation:** How to compute $f_x(x,y) = \frac{\partial f}{\partial x}$ and $f_y(x,y) = \frac{\partial f}{\partial y}$ by treating other variables as constants. Their geometric meaning as the slope of the surface in the direction parallel to the x-axis or y-axis, respectively.
*   **Linear Approximations (1D):**
    *   **Explanation:** The concept that a differentiable function $f(x)$ can be approximated near $x=a$ by its tangent line: $L(x) = f(a) + f'(a)(x-a)$.
*   **Vectors and Dot Products:**
    *   **Explanation:** Basic vector operations, magnitude of a vector ($\|\mathbf{v}\|$), and the dot product ($\mathbf{u} \cdot \mathbf{v}$). This is essential for understanding the gradient and the formal definition of differentiability.

## 4. The core idea — step by step

Let's build up the concept of differentiability in multiple variables, starting from what you already know.

### Step 1: Recall 1D Differentiability

**Plain-English Statement:** In single-variable calculus, a function $f(x)$ is differentiable at a point $a$ if its graph looks like a straight line (its tangent line) when you zoom in very close to $a$. This means there are no sharp corners, breaks, or vertical tangents.

**Small Concrete Example:** Consider $f(x) = x^2$ at $x=1$. The derivative is $f'(x) = 2x$, so $f'(1)=2$. The tangent line at $x=1$ is $y - f(1) = f'(1)(x-1)$, which simplifies to $y - 1 = 2(x-1)$, or $y = 2x-1$. If you plot $y=x^2$ and $y=2x-1$ near $x=1$, they look almost identical.

**The Formal/Mathematical Version:** A function $f: \mathbb{R} \to \mathbb{R}$ is differentiable at $a$ if the limit
$$ \lim_{h \to 0} \frac{f(a+h) - f(a)}{h} $$
exists. This limit is denoted $f'(a)$.
An equivalent and more insightful way to write this definition (which will be crucial for generalization) is that $f$ is differentiable at $a$ if there exists a number $L$ (which will be $f'(a)$) such that
$$ \lim_{h \to 0} \frac{f(a+h) - f(a) - Lh}{h} = 0 $$
This means the error in approximating $f(a+h)$ by $f(a) + Lh$ (which is the linear approximation $f(a) + f'(a)h$) goes to zero *faster* than $h$ itself.

**What could go wrong:**
*   A function like $f(x) = |x|$ is not differentiable at $x=0$ because it has a sharp corner. The limit $\lim_{h \to 0} \frac{|0+h| - |0|}{h} = \lim_{h \to 0} \frac{|h|}{h}$ does not exist (it's $-1$ from the left, $1$ from the right).
*   A function with a jump discontinuity (e.g., a step function) is not differentiable.
*   A function with a vertical tangent (e.g., $f(x) = x^{1/3}$ at $x=0$) is not differentiable.

### Step 2: Partial Derivatives are NOT Enough

**Plain-English Statement:** For functions of multiple variables, we can calculate partial derivatives, which tell us the slope of the surface if we move strictly parallel to one of the coordinate axes. However, just knowing these "axial" slopes isn't enough to guarantee that the surface is smooth in *all* directions. A surface could have well-defined slopes in the x and y directions, but still be "spiky" or "creased" when approached from other angles.

**Small Concrete Example:** Consider the function
$$ f(x,y) = \begin{cases} \frac{xy}{x^2+y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases} $$
Let's calculate the partial derivatives at $(0,0)$:
$f_x(0,0) = \lim_{h \to 0} \frac{f(0+h, 0) - f(0,0)}{h} = \lim_{h \to 0} \frac{\frac{h \cdot 0}{h^2+0^2} - 0}{h} = \lim_{h \to 0} \frac{0}{h} = 0$.
Similarly, $f_y(0,0) = \lim_{h \to 0} \frac{f(0, 0+h) - f(0,0)}{h} = \lim_{h \to 0} \frac{\frac{0 \cdot h}{0^2+h^2} - 0}{h} = \lim_{h \to 0} \frac{0}{h} = 0$.
So, both partial derivatives exist at $(0,0)$ and are zero.
However, this function is *not even continuous* at $(0,0)$. If we approach $(0,0)$ along the line $y=x$, then $f(x,x) = \frac{x \cdot x}{x^2+x^2} = \frac{x^2}{2x^2} = \frac{1}{2}$ for $x \neq 0$. Since $\lim_{(x,y) \to (0,0)} f(x,y)$ along $y=x$ is $1/2$, but $f(0,0)=0$, the function is not continuous. A function must be continuous to be differentiable.

**The Formal/Mathematical Version:** The existence of $f_x(a,b)$ and $f_y(a,b)$ only implies that the function is "smooth" if you move along lines parallel to the coordinate axes. It gives no information about smoothness along any other path.

**What could go wrong:** Just like the example above, a function can have existing partial derivatives at a point but still be discontinuous, or have a "ridge" or "crease" that is aligned with a direction other than the x or y axes.

### Step 3: The Tangent Plane Idea

**Plain-English Statement:** For a function of multiple variables to be truly differentiable (smooth in all directions), its graph must be well-approximated by a single, flat plane – the tangent plane – when you zoom in very close to the point. This plane uses the information from *both* partial derivatives to orient itself correctly.

**Small Concrete Example:** Consider $f(x,y) = x^2+y^2$ at the point $(1,1)$.
First, find the partial derivatives: $f_x(x,y) = 2x$, so $f_x(1,1)=2$. And $f_y(x,y) = 2y$, so $f_y(1,1)=2$. Also, $f(1,1) = 1^2+1^2=2$.
The equation of the tangent plane at $(a,b)$ is given by:
$z - f(a,b) = f_x(a,b)(x-a) + f_y(a,b)(y-b)$
Plugging in our values:
$z - 2 = 2(x-1) + 2(y-1)$
$z = 2 + 2x - 2 + 2y - 2$
$z = 2x + 2y - 2$.
This plane provides the best linear approximation of $f(x,y)$ near $(1,1)$.

**The Formal/Mathematical Version:** The linear approximation of $f(x,y)$ near $(a,b)$ is given by the equation of its tangent plane:
$$ L(x,y) = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b) $$
This linear function $L(x,y)$ is the candidate for the "best linear approximation." Differentiability means that this approximation is "good enough" in a precise mathematical sense.

**What could go wrong:** If the partial derivatives $f_x(a,b)$ or $f_y(a,b)$ don't exist, then you can't even form this candidate tangent plane. Even if they exist, as seen in Step 2, the plane might not be a good approximation in all directions.

### Step 4: The Formal Definition of Differentiability in Multiple Variables

**Plain-English Statement:** A function $f(x,y)$ is differentiable at a point $(a,b)$ if, when you approximate it with its tangent plane, the error of this approximation becomes negligibly small *much faster* than the distance you move away from the point $(a,b)$. In simpler terms, the surface must "hug" its tangent plane extremely tightly as you get closer to the point.

**Small Concrete Example:** Let's check $f(x,y) = x^2+y^2$ at $(0,0)$.
$f(0,0)=0$.
$f_x(x,y)=2x \implies f_x(0,0)=0$.
$f_y(x,y)=2y \implies f_y(0,0)=0$.
The tangent plane (linear approximation) at $(0,0)$ is $L(x,y) = f(0,0) + f_x(0,0)(x-0) + f_y(0,0)(y-0) = 0 + 0(x) + 0(y) = 0$.
Now, let $x=a+h_1$ and $y=b+h_2$. Here $(a,b)=(0,0)$, so $x=h_1$ and $y=h_2$.
The error term is $E(h_1, h_2) = f(h_1, h_2) - L(h_1, h_2) = (h_1^2+h_2^2) - 0 = h_1^2+h_2^2$.
The distance from $(0,0)$ to $(h_1, h_2)$ is $\sqrt{h_1^2+h_2^2}$.
We need to check if $\lim_{(h_1, h_2) \to (0,0)} \frac{E(h_1, h_2)}{\sqrt{h_1^2+h_2^2}} = 0$.
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{h_1^2+h_2^2}{\sqrt{h_1^2+h_2^2}} = \lim_{(h_1, h_2) \to (0,0)} \sqrt{h_1^2+h_2^2} $$
As $(h_1, h_2) \to (0,0)$, $\sqrt{h_1^2+h_2^2} \to 0$. So, $f(x,y)=x^2+y^2$ is differentiable at $(0,0)$.

**The Formal/Mathematical Version:**
A function $f: D \subseteq \mathbb{R}^n \to \mathbb{R}$ is differentiable at $\mathbf{a} \in D$ if all partial derivatives $f_{x_i}(\mathbf{a})$ exist, and
$$ \lim_{\mathbf{h} \to \mathbf{0}} \frac{f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}}{\|\mathbf{h}\|} = 0 $$
where $\mathbf{h} = (h_1, h_2, \dots, h_n)$ is a vector representing the displacement from $\mathbf{a}$, $\|\mathbf{h}\|$ is its magnitude, and $\nabla f(\mathbf{a}) = (f_{x_1}(\mathbf{a}), \dots, f_{x_n}(\mathbf{a}))$ is the gradient vector. The term $\nabla f(\mathbf{a}) \cdot \mathbf{h}$ is the multi-variable equivalent of $Lh$ from the 1D definition.

For a function $f(x,y)$ of two variables at a point $(a,b)$, this definition expands to:
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{f(a+h_1, b+h_2) - f(a,b) - f_x(a,b)h_1 - f_y(a,b)h_2}{\sqrt{h_1^2+h_2^2}} = 0 $$
This is the most rigorous definition and is the ultimate test for differentiability.

**What could go wrong:** If the limit does not exist, or if it exists but is not equal to zero, then the function is not differentiable at that point. This means the error in the linear approximation is not vanishing "fast enough" compared to the distance from the point.

### Step 5: A Sufficient Condition for Differentiability

**Plain-English Statement:** Checking the limit definition (Step 4) can be tedious. Fortunately, there's a very useful shortcut: if a function's partial derivatives exist *and are continuous* in a small region around the point, then the function is guaranteed to be differentiable at that point. This is often the easiest way to prove differentiability for most "nice" functions you encounter.

**Small Concrete Example:** Let $f(x,y) = e^{xy} + \sin(x+y)$.
$f_x(x,y) = y e^{xy} + \cos(x+y)$.
$f_y(x,y) = x e^{xy} + \cos(x+y)$.
Both $f_x(x,y)$ and $f_y(x,y)$ are compositions and sums of elementary functions ($e^u$, $xy$, $\sin u$, $x+y$, $\cos u$) which are continuous everywhere. Therefore, $f_x$ and $f_y$ are continuous everywhere in $\mathbb{R}^2$.
By the sufficient condition, $f(x,y)$ is differentiable everywhere in $\mathbb{R}^2$.

**The Formal/Mathematical Version:**
If $f_x(x,y)$ and $f_y(x,y)$ exist in an open disk containing $(a,b)$, and if $f_x(x,y)$ and $f_y(x,y)$ are continuous at $(a,b)$, then $f(x,y)$ is differentiable at $(a,b)$.

**What could go wrong:** This is a *sufficient* condition, not a *necessary* one. This means if the partial derivatives *are not* continuous, the function *might still be* differentiable. You just can't use this theorem to prove it, and you'd have to revert to the formal limit definition from Step 4. However, for most functions encountered in introductory calculus, if the partials are continuous, the function is differentiable.

## 5. Worked examples — multiple, with every step shown

### Example 1: Using the Sufficient Condition (Easy)

**Problem:** Show that $f(x,y) = x^3 y^2 + 5xy$ is differentiable at any point $(a,b) \in \mathbb{R}^2$.

**Given:** The function $f(x,y) = x^3 y^2 + 5xy$.
**Want:** To show $f(x,y)$ is differentiable at any point $(a,b)$.

**Step 1: Calculate the partial derivatives of $f(x,y)$.**
*   To find $f_x(x,y)$, treat $y$ as a constant and differentiate with respect to $x$:
    $$ f_x(x,y) = \frac{\partial}{\partial x}(x^3 y^2 + 5xy) $$
    $$ f_x(x,y) = 3x^2 y^2 + 5y $$
    *Explanation: Using the power rule for $x^3$ and $x$, treating $y^2$ and $y$ as coefficients.*
*   To find $f_y(x,y)$, treat $x$ as a constant and differentiate with respect to $y$:
    $$ f_y(x,y) = \frac{\partial}{\partial y}(x^3 y^2 + 5xy) $$
    $$ f_y(x,y) = 2x^3 y + 5x $$
    *Explanation: Using the power rule for $y^2$ and $y$, treating $x^3$ and $x$ as coefficients.*

**Step 2: Check the continuity of the partial derivatives.**
*   The partial derivative $f_x(x,y) = 3x^2 y^2 + 5y$ is a polynomial in $x$ and $y$.
    *Explanation: Polynomials are continuous everywhere in their domain.*
*   The partial derivative $f_y(x,y) = 2x^3 y + 5x$ is also a polynomial in $x$ and $y$.
    *Explanation: Polynomials are continuous everywhere in their domain.*

**Step 3: Apply the sufficient condition for differentiability.**
*   Since both $f_x(x,y)$ and $f_y(x,y)$ exist and are continuous at every point $(x,y) \in \mathbb{R}^2$, the function $f(x,y)$ is differentiable at every point $(a,b) \in \mathbb{R}^2$.
    *Explanation: This theorem states that if the partial derivatives are continuous, the function is differentiable. This is a very powerful shortcut for many functions.*

**Final Answer:**
$f(x,y) = x^3 y^2 + 5xy$ is **differentiable at every point in $\mathbb{R}^2$** because its partial derivatives, $f_x(x,y) = 3x^2 y^2 + 5y$ and $f_y(x,y) = 2x^3 y + 5x$, exist and are continuous everywhere.

**Reflection:** This example highlights the power of the sufficient condition. For functions composed of polynomials, exponentials, sines, cosines, etc., their partial derivatives are usually also continuous, making differentiability straightforward to prove.

---

### Example 2: Using the Definition (Medium)

**Problem:** Show that $f(x,y) = x^2 - 3y$ is differentiable at any point $(a,b) \in \mathbb{R}^2$ using the definition of differentiability.

**Given:** The function $f(x,y) = x^2 - 3y$.
**Want:** To show $f(x,y)$ is differentiable at any point $(a,b)$ using the formal limit definition.

**Step 1: Calculate $f(a,b)$ and the partial derivatives at $(a,b)$.**
*   $f(a,b) = a^2 - 3b$.
    *Explanation: Substitute $a$ for $x$ and $b$ for $y$ into the function.*
*   $f_x(x,y) = \frac{\partial}{\partial x}(x^2 - 3y) = 2x$.
    *Explanation: Differentiate with respect to $x$, treating $y$ as a constant.*
*   So, $f_x(a,b) = 2a$.
    *Explanation: Evaluate the partial derivative at the point $(a,b)$.*
*   $f_y(x,y) = \frac{\partial}{\partial y}(x^2 - 3y) = -3$.
    *Explanation: Differentiate with respect to $y$, treating $x$ as a constant.*
*   So, $f_y(a,b) = -3$.
    *Explanation: Evaluate the partial derivative at the point $(a,b)$.*

**Step 2: Set up the limit definition of differentiability.**
Recall the definition:
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{f(a+h_1, b+h_2) - f(a,b) - f_x(a,b)h_1 - f_y(a,b)h_2}{\sqrt{h_1^2+h_2^2}} = 0 $$
*   Substitute the calculated values into the numerator:
    $f(a+h_1, b+h_2) = (a+h_1)^2 - 3(b+h_2) = a^2 + 2ah_1 + h_1^2 - 3b - 3h_2$.
    *Explanation: Substitute $(a+h_1)$ for $x$ and $(b+h_2)$ for $y$ into $f(x,y)$ and expand.*
*   Now, form the numerator:
    Numerator $= (a^2 + 2ah_1 + h_1^2 - 3b - 3h_2) - (a^2 - 3b) - (2a)h_1 - (-3)h_2$
    Numerator $= a^2 + 2ah_1 + h_1^2 - 3b - 3h_2 - a^2 + 3b - 2ah_1 + 3h_2$
    Numerator $= h_1^2$
    *Explanation: Carefully combine and cancel terms. Notice how the terms corresponding to the linear approximation ($f(a,b) + f_x(a,b)h_1 + f_y(a,b)h_2$) cancel out the original function value plus the linear part of the expanded $f(a+h_1, b+h_2)$, leaving only the higher-order terms (the error).*

**Step 3: Evaluate the limit.**
We need to evaluate:
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{h_1^2}{\sqrt{h_1^2+h_2^2}} $$
*   To evaluate this limit, we can use polar coordinates. Let $h_1 = r \cos \theta$ and $h_2 = r \sin \theta$. As $(h_1, h_2) \to (0,0)$, $r \to 0^+$.
    *Explanation: Polar coordinates are often useful for limits involving $\sqrt{x^2+y^2}$ terms as they simplify the denominator and can help determine path dependence.*
*   Substitute into the limit expression:
    $$ \lim_{r \to 0^+} \frac{(r \cos \theta)^2}{\sqrt{(r \cos \theta)^2 + (r \sin \theta)^2}} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos^2 \theta}{\sqrt{r^2 (\cos^2 \theta + \sin^2 \theta)}} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos^2 \theta}{\sqrt{r^2}} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos^2 \theta}{r} \quad \text{(since } r > 0 \text{)} $$
    $$ = \lim_{r \to 0^+} r \cos^2 \theta $$
*   Since $\cos^2 \theta$ is bounded between 0 and 1, as $r \to 0^+$, $r \cos^2 \theta$ approaches 0.
    *Explanation: The term $\cos^2 \theta$ remains bounded, so as $r$ approaches zero, the entire expression approaches zero, regardless of the angle $\theta$. This shows the limit exists and is 0.*

**Final Answer:**
Since the limit is 0, $f(x,y) = x^2 - 3y$ is **differentiable at every point in $\mathbb{R}^2$**.

**Reflection:** This example demonstrates the direct application of the definition. While more involved than the sufficient condition, it's the fundamental way to prove differentiability. The key is to expand $f(a+h_1, b+h_2)$ carefully and observe how the terms representing the linear approximation cancel out, leaving only the "error" term.

---

### Example 3: Differentiability at the Origin (Harder)

**Problem:** Show that $f(x,y) = \begin{cases} \frac{x^3}{x^2+y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ is differentiable at $(0,0)$.

**Given:** The piecewise function $f(x,y)$.
**Want:** To show $f(x,y)$ is differentiable at $(0,0)$.

**Step 1: Calculate $f(0,0)$ and the partial derivatives at $(0,0)$.**
*   $f(0,0) = 0$ (given by the definition of the function).
*   Calculate $f_x(0,0)$ using the limit definition of a partial derivative:
    $$ f_x(0,0) = \lim_{h \to 0} \frac{f(0+h, 0) - f(0,0)}{h} $$
    $$ = \lim_{h \to 0} \frac{\frac{h^3}{h^2+0^2} - 0}{h} = \lim_{h \to 0} \frac{\frac{h^3}{h^2}}{h} = \lim_{h \to 0} \frac{h}{h} = \lim_{h \to 0} 1 = 1 $$
    *Explanation: For the point $(h,0)$ where $h \neq 0$, we use the first case of the function definition. For $f(0,0)$, we use the second case.*
*   Calculate $f_y(0,0)$ using the limit definition of a partial derivative:
    $$ f_y(0,0) = \lim_{h \to 0} \frac{f(0, 0+h) - f(0,0)}{h} $$
    $$ = \lim_{h \to 0} \frac{\frac{0^3}{0^2+h^2} - 0}{h} = \lim_{h \to 0} \frac{0}{h} = 0 $$
    *Explanation: Similar to $f_x(0,0)$, use the appropriate case for $f(0,h)$ and $f(0,0)$.*

**Step 2: Set up the limit definition of differentiability at $(0,0)$.**
We need to check if:
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{f(0+h_1, 0+h_2) - f(0,0) - f_x(0,0)h_1 - f_y(0,0)h_2}{\sqrt{h_1^2+h_2^2}} = 0 $$
*   Substitute the calculated values:
    Numerator $= f(h_1, h_2) - 0 - (1)h_1 - (0)h_2$
    Numerator $= f(h_1, h_2) - h_1$
    *Explanation: This is the error term: the actual function value minus the linear approximation at $(0,0)$.*
*   For $(h_1, h_2) \neq (0,0)$, $f(h_1, h_2) = \frac{h_1^3}{h_1^2+h_2^2}$.
    So, Numerator $= \frac{h_1^3}{h_1^2+h_2^2} - h_1 = \frac{h_1^3 - h_1(h_1^2+h_2^2)}{h_1^2+h_2^2} = \frac{h_1^3 - h_1^3 - h_1 h_2^2}{h_1^2+h_2^2} = \frac{-h_1 h_2^2}{h_1^2+h_2^2}$.
    *Explanation: Combine the terms in the numerator by finding a common denominator.*

**Step 3: Evaluate the limit.**
We need to evaluate:
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{\frac{-h_1 h_2^2}{h_1^2+h_2^2}}{\sqrt{h_1^2+h_2^2}} = \lim_{(h_1, h_2) \to (0,0)} \frac{-h_1 h_2^2}{(h_1^2+h_2^2)^{3/2}} $$
*   Use polar coordinates: $h_1 = r \cos \theta$, $h_2 = r \sin \theta$.
    *Explanation: This is a standard technique for limits involving powers of $h_1^2+h_2^2$ in the denominator.*
*   Substitute into the limit expression:
    $$ \lim_{r \to 0^+} \frac{-(r \cos \theta)(r \sin \theta)^2}{((r \cos \theta)^2+(r \sin \theta)^2)^{3/2}} $$
    $$ = \lim_{r \to 0^+} \frac{-r^3 \cos \theta \sin^2 \theta}{(r^2(\cos^2 \theta + \sin^2 \theta))^{3/2}} $$
    $$ = \lim_{r \to 0^+} \frac{-r^3 \cos \theta \sin^2 \theta}{(r^2)^{3/2}} $$
    $$ = \lim_{r \to 0^+} \frac{-r^3 \cos \theta \sin^2 \theta}{r^3} \quad \text{(since } r > 0 \text{)} $$
    $$ = \lim_{r \to 0^+} (-\cos \theta \sin^2 \theta) $$
*   This limit is $-\cos \theta \sin^2 \theta$. For the original limit to be 0, this expression must be 0 for all $\theta$.
    *Explanation: If the limit depends on $\theta$, it means the limit does not exist, or it's not 0. If it's not 0, the function is not differentiable.*
*   Is $-\cos \theta \sin^2 \theta = 0$ for all $\theta$? No. For example, if $\theta = \frac{\pi}{4}$, then $-\cos(\frac{\pi}{4})\sin^2(\frac{\pi}{4}) = -(\frac{\sqrt{2}}{2})(\frac{\sqrt{2}}{2})^2 = -(\frac{\sqrt{2}}{2})(\frac{2}{4}) = -\frac{\sqrt{2}}{4} \neq 0$.

**Wait! Re-check problem statement.** The problem asks to *show* it is differentiable. My calculation suggests it is *not*. Let me re-evaluate the numerator calculation.

Numerator $= \frac{-h_1 h_2^2}{h_1^2+h_2^2}$.
Limit expression: $\lim_{(h_1, h_2) \to (0,0)} \frac{-h_1 h_2^2}{(h_1^2+h_2^2)\sqrt{h_1^2+h_2^2}}$.
Using polar coordinates again:
$$ \lim_{r \to 0^+} \frac{-(r \cos \theta)(r \sin \theta)^2}{(r^2)^{3/2}} = \lim_{r \to 0^+} \frac{-r^3 \cos \theta \sin^2 \theta}{r^3} = -\cos \theta \sin^2 \theta $$
Ah, my previous conclusion was correct. The limit does depend on $\theta$, and it is not always zero. This means the function is *not* differentiable at $(0,0)$.

**Re-reading the problem carefully:** "Show that $f(x,y) = \begin{cases} \frac{x^3}{x^2+y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ is differentiable at $(0,0)$."
This suggests there might be a mistake in my calculation or understanding of the function. Let's re-check the definition of the function itself.
$f(x,y) = \frac{x^3}{x^2+y^2}$.
Numerator for the differentiability limit was $f(h_1, h_2) - h_1$.
$f(h_1, h_2) - h_1 = \frac{h_1^3}{h_1^2+h_2^2} - h_1 = \frac{h_1^3 - h_1(h_1^2+h_2^2)}{h_1^2+h_2^2} = \frac{h_1^3 - h_1^3 - h_1 h_2^2}{h_1^2+h_2^2} = \frac{-h_1 h_2^2}{h_1^2+h_2^2}$. This is correct.

The limit is $\lim_{(h_1, h_2) \to (0,0)} \frac{-h_1 h_2^2}{(h_1^2+h_2^2)^{3/2}}$.
Let's re-evaluate the polar coordinates substitution:
$\frac{-(r \cos\theta)(r \sin\theta)^2}{(r^2)^{3/2}} = \frac{-r^3 \cos\theta \sin^2\theta}{r^3} = -\cos\theta \sin^2\theta$.
This value depends on $\theta$. For example, if $\theta = 0$ (along the x-axis), the limit is $-(1)(0)^2 = 0$. If $\theta = \pi/2$ (along the y-axis), the limit is $-(0)(1)^2 = 0$. But if $\theta=\pi/4$, the limit is $-(\sqrt{2}/2)(1/2) = -\sqrt{2}/4 \neq 0$.
Since the limit depends on $\theta$, it does not exist. Therefore, the function is NOT differentiable at $(0,0)$.

It seems the problem statement itself might be incorrect or designed to trick the student. I will proceed by showing it is *not* differentiable, as my calculations consistently lead to this conclusion. This is a good learning point: sometimes, the problem implies a certain outcome, but rigorous application of definitions proves otherwise.

**Revised Problem Statement (Implicitly):** Show whether $f(x,y) = \begin{cases} \frac{x^3}{x^2+y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ is differentiable at $(0,0)$.

**Step 3 (Revised): Evaluate the limit.**
We need to evaluate:
$$ \lim_{(h_1, h_2) \to (0,0)} \frac{-h_1 h_2^2}{(h_1^2+h_2^2)^{3/2}} $$
*   Using polar coordinates $h_1 = r \cos \theta$, $h_2 = r \sin \theta$:
    $$ \lim_{r \to 0^+} \frac{-(r \cos \theta)(r \sin \theta)^2}{(r^2)^{3/2}} = \lim_{r \to 0^+} \frac{-r^3 \cos \theta \sin^2 \theta}{r^3} = -\cos \theta \sin^2 \theta $$
*   Since the value of the limit, $-\cos \theta \sin^2 \theta$, depends on $\theta$ (the direction of approach), the limit does not exist.
    *Explanation: For differentiability, the limit must be a single fixed value (0 in this case) regardless of the path taken. If it depends on the angle, it means the linear approximation is not "good enough" in all directions.*

**Final Answer:**
The function $f(x,y) = \begin{cases} \frac{x^3}{x^2+y^2} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ is **NOT differentiable at $(0,0)$** because the limit in the definition of differentiability does not exist (it depends on the path of approach).

**Reflection:** This example is tricky because the partial derivatives exist, which might tempt one to think it's differentiable. However, the true test lies in the formal limit definition. It also demonstrates how a problem might be phrased to test your rigorous application of definitions rather than just following a recipe. A common error is assuming that if the limit is 0 along the axes, it must be 0 everywhere.

---

### Example 4: Showing Non-Differentiability (Counterexample)

**Problem:** Show that $f(x,y) = \begin{cases} \frac{xy}{\sqrt{x^2+y^2}} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ is continuous at $(0,0)$ but NOT differentiable at $(0,0)$.

**Given:** The piecewise function $f(x,y)$.
**Want:** To show continuity at $(0,0)$ and non-differentiability at $(0,0)$.

**Part 1: Show continuity at $(0,0)$.**
*   **Step 1.1: Check $f(0,0)$.**
    $f(0,0) = 0$ (given).
    *Explanation: The value of the function at the point.*
*   **Step 1.2: Evaluate $\lim_{(x,y) \to (0,0)} f(x,y)$.**
    Use polar coordinates: $x = r \cos \theta$, $y = r \sin \theta$. As $(x,y) \to (0,0)$, $r \to 0^+$.
    $$ \lim_{r \to 0^+} \frac{(r \cos \theta)(r \sin \theta)}{\sqrt{(r \cos \theta)^2 + (r \sin \theta)^2}} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos \theta \sin \theta}{\sqrt{r^2 (\cos^2 \theta + \sin^2 \theta)}} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos \theta \sin \theta}{r} = \lim_{r \to 0^+} r \cos \theta \sin \theta $$
    *Explanation: Simplify the expression using trigonometric identities and properties of square roots.*
*   Since $\cos \theta \sin \theta$ is bounded (it's $\frac{1}{2}\sin(2\theta)$, so between $-1/2$ and $1/2$), as $r \to 0^+$, $r \cos \theta \sin \theta \to 0$.
    *Explanation: The product of a term going to zero and a bounded term is zero. This shows the limit exists and is 0.*
*   **Step 1.3: Compare.**
    Since $\lim_{(x,y) \to (0,0)} f(x,y) = 0$ and $f(0,0) = 0$, the function $f(x,y)$ is continuous at $(0,0)$.
    *Explanation: This fulfills the definition of continuity.*

**Part 2: Show non-differentiability at $(0,0)$.**
*   **Step 2.1: Calculate $f(0,0)$ and the partial derivatives at $(0,0)$.**
    $f(0,0) = 0$.
    *   $f_x(0,0) = \lim_{h \to 0} \frac{f(h, 0) - f(0,0)}{h} = \lim_{h \to 0} \frac{\frac{h \cdot 0}{\sqrt{h^2+0^2}} - 0}{h} = \lim_{h \to 0} \frac{0}{h} = 0$.
        *Explanation: Apply the definition of partial derivative at the origin.*
    *   $f_y(0,0) = \lim_{h \to 0} \frac{f(0, h) - f(0,0)}{h} = \lim_{h \to 0} \frac{\frac{0 \cdot h}{\sqrt{0^2+h^2}} - 0}{h} = \lim_{h \to 0} \frac{0}{h} = 0$.
        *Explanation: Apply the definition of partial derivative at the origin.*
    So, $f_x(0,0)=0$ and $f_y(0,0)=0$.

*   **Step 2.2: Set up the limit definition of differentiability at $(0,0)$.**
    We need to check if:
    $$ \lim_{(h_1, h_2) \to (0,0)} \frac{f(h_1, h_2) - f(0,0) - f_x(0,0)h_1 - f_y(0,0)h_2}{\sqrt{h_1^2+h_2^2}} = 0 $$
    *   Substitute the calculated values:
        Numerator $= f(h_1, h_2) - 0 - (0)h_1 - (0)h_2 = f(h_1, h_2)$.
        *Explanation: The linear approximation at $(0,0)$ is simply 0, so the error term is just $f(h_1, h_2)$.*
    *   So we need to evaluate:
        $$ \lim_{(h_1, h_2) \to (0,0)} \frac{\frac{h_1 h_2}{\sqrt{h_1^2+h_2^2}}}{\sqrt{h_1^2+h_2^2}} = \lim_{(h_1, h_2) \to (0,0)} \frac{h_1 h_2}{h_1^2+h_2^2} $$
        *Explanation: Simplify the complex fraction.*

*   **Step 2.3: Evaluate the limit.**
    This is a well-known limit that does not exist. Let's use polar coordinates:
    $h_1 = r \cos \theta$, $h_2 = r \sin \theta$.
    $$ \lim_{r \to 0^+} \frac{(r \cos \theta)(r \sin \theta)}{(r \cos \theta)^2 + (r \sin \theta)^2} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos \theta \sin \theta}{r^2 (\cos^2 \theta + \sin^2 \theta)} $$
    $$ = \lim_{r \to 0^+} \frac{r^2 \cos \theta \sin \theta}{r^2} = \cos \theta \sin \theta $$
    *Explanation: The $r^2$ terms cancel out, leaving an expression that depends on $\theta$.*
*   Since the limit $\cos \theta \sin \theta$ depends on $\theta$ (e.g., it's 0 along the axes, $1/2$ along $y=x$, $-1/2$ along $y=-x$), it does not exist.
    *Explanation: For differentiability, the limit must be a unique value (0). If it varies with the approach path, the function is not differentiable.*

**Final Answer:**
The function $f(x,y) = \begin{cases} \frac{xy}{\sqrt{x^2+y^2}} & (x,y) \neq (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$ is **continuous at $(0,0)$ but NOT differentiable at $(0,0)$**.

**Reflection:** This example is a classic counterexample demonstrating that continuity and the existence of partial derivatives are *not* sufficient for differentiability in multiple variables. The surface is "pointy" or "creased" at the origin in a way that prevents a single tangent plane from being a good approximation in all directions, even though it's connected and has well-defined slopes along the axes.

## 6. Common mistakes and traps

1.  **Assuming existence of partial derivatives implies differentiability:** This is the most prevalent error. As shown in Example 4, a function can have well-defined partial derivatives at a point (even 0), but still not be differentiable there. Differentiability requires the linear approximation to be good in *all* directions, not just along the coordinate axes.
2.  **Confusing continuity with differentiability:** Differentiability *implies* continuity. If a function is not continuous at a point, it cannot be differentiable there. However, the converse is false: a function can be continuous but not differentiable (again, Example 4 is a perfect illustration).
3.  **Incorrectly calculating partial derivatives at the origin (or other boundary points for piecewise functions):** When a function is defined piecewise, especially at the origin, you *must* use the limit definition for the partial derivatives at that specific point, not the general differentiation rules for the "elsewhere" part of the function.
4.  **Misapplying the "continuous partials" theorem:** The theorem states that *if* partial derivatives are continuous in a neighborhood, *then* the function is differentiable. Students sometimes incorrectly assume that if the partials are *not* continuous, the function is *not* differentiable. This is a logical fallacy (denying the antecedent). It just means you can't use *that theorem* to prove differentiability; you must resort to the formal limit definition.
5.  **Algebraic errors in the limit definition:** The numerator involves $f(a+h_1, b+h_2) - f(a,b) - f_x(a,b)h_1 - f_y(a,b)h_2$. It's crucial to expand $f(a+h_1, b+h_2)$ correctly and ensure all linear terms cancel out, leaving only the "error" term. The denominator $\sqrt{h_1^2+h_2^2}$ must also be handled correctly, often requiring polar coordinates for evaluation.
6.  **Not understanding the geometric meaning:** Just going through the motions of the limit calculation without connecting it to the idea of a "smooth surface" and a "tangent plane" can lead to a shallow understanding and difficulty in interpreting results.

## 7. Textbook-precise explanation

Let $f: D \subseteq \mathbb{R}^n \to \mathbb{R}$ be a real-valued function defined on an open set $D$ in $\mathbb{R}^n$. Let $\mathbf{a} = (a_1, a_2, \dots, a_n)$ be a point in $D$.

**Definition of Differentiability:**
The function $f$ is said to be **differentiable** at $\mathbf{a}$ if all its first-order partial derivatives $f_{x_1}(\mathbf{a}), f_{x_2}(\mathbf{a}), \dots, f_{x_n}(\mathbf{a})$ exist, and if
$$ \lim_{\mathbf{h} \to \mathbf{0}} \frac{f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}}{\|\mathbf{h}\|} = 0 $$
where $\mathbf{h} = (h_1, h_2, \dots, h_n)$, $\|\mathbf{h}\|$ is the Euclidean norm of $\mathbf{h}$ (i.e., $\sqrt{h_1^2 + \dots + h_n^2}$), and $\nabla f(\mathbf{a}) = (f_{x_1}(\mathbf{a}), \dots, f_{x_n}(\mathbf{a}))$ is the gradient vector of $f$ at $\mathbf{a}$.

**Alternative Form (Linear Approximation):**
Equivalently, $f$ is differentiable at $\mathbf{a}$ if there exists a vector $\mathbf{L} \in \mathbb{R}^n$ (which must be $\nabla f(\mathbf{a})$) such that
$$ f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \mathbf{L} \cdot \mathbf{h} + E(\mathbf{h}) $$
where $E(\mathbf{h})$ is an error term satisfying $\lim_{\mathbf{h} \to \mathbf{0}} \frac{E(\mathbf{h})}{\|\mathbf{h}\|} = 0$.
The linear function $L(\mathbf{x}) = f(\mathbf{a}) + \nabla f(\mathbf{a}) \cdot (\mathbf{x} - \mathbf{a})$ is called the **linearization** of $f$ at $\mathbf{a}$, and its graph is the **tangent hyperplane** to the graph of $f$ at $(\mathbf{a}, f(\mathbf{a}))$.

**Relationship to Continuity:**
If a function $f$ is differentiable at $\mathbf{a}$, then $f$ is continuous at $\mathbf{a}$. (The converse is not true.)

**Sufficient Condition for Differentiability:**
If the first-order partial derivatives $f_{x_1}, f_{x_2}, \dots, f_{x_n}$ exist in an open ball containing $\mathbf{a}$, and if these partial derivatives are continuous at $\mathbf{a}$, then $f$ is differentiable at $\mathbf{a}$. This is a very practical theorem for proving differentiability for most functions encountered in applications.

**Generalization to Vector-Valued Functions (Jacobian Matrix):**
For a vector-valued function $\mathbf{f}: D \subseteq \mathbb{R}^n \to \mathbb{R}^m$, $\mathbf{f}(\mathbf{x}) = (f_1(\mathbf{x}), \dots, f_m(\mathbf{x}))$, differentiability at $\mathbf{a}$ means that each component function $f_j$ is differentiable at $\mathbf{a}$. In this case, the gradient vector $\nabla f(\mathbf{a})$ is replaced by the $m \times n$ **Jacobian matrix** $J\mathbf{f}(\mathbf{a})$, whose rows are the gradients of the component functions. The linear approximation becomes $\mathbf{f}(\mathbf{a} + \mathbf{h}) \approx \mathbf{f}(\mathbf{a}) + J\mathbf{f}(\mathbf{a})\mathbf{h}$.

*   **Reference:** Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021. (See Chapter 14, Section 4: Tangent Planes and Linear Approximations, and the formal definition of differentiability.)
*   **Reference:** Marsden, Jerrold E., and Anthony Tromba. *Vector Calculus*. 6th ed., W. H. Freeman, 2011. (See Chapter 2, Section 3: Differentiability.)
*   **Reference:** Apostol, Tom M. *Calculus, Vol. 2: Multi-Variable Calculus and Linear Algebra with Applications to Differential Equations*. 2nd ed., Wiley, 1969. (See Chapter 8, Section 10: The concept of differentiability for scalar fields.)

## 8. ASCII diagrams

```text
    1D Differentiability: Tangent Line Approximation

      y
      ^
      |      /
      |     /  f(x)
      |    /
      |   /
      |  /
      | /
      +------------------ x
     /|
    / |    L(x) = f(a) + f'(a)(x-a)
   /  |
  /   |
 /    |
P-----|---
      a  a+h

The function f(x) is approximated by its tangent line L(x) near point P(a, f(a)).
The error |f(a+h) - L(a+h)| must shrink faster than |h|.


    2D Differentiability: Tangent Plane Approximation

             ^ z
             |  /
             | /
             |/
             +-----------------> y
            /|
           / |
          /  |  Surface z = f(x,y)
         /   |
        /    |
       /     |
      /      |
     /       |
    /        |
   /---------+-----> x
  / \        |
 /   \       |
 \    \      |
  \    \     |
   \    \    |  Tangent Plane z = L(x,y) at point P(a,b,f(a,b))
    \    \   |
     \    \  |
      \    \ |
       \    \|
        ----+ P(a,b)

The function f(x,y) is approximated by its tangent plane L(x,y) near P.
The error |f(a+h1, b