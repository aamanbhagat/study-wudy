## 1. What it is — in plain English

Imagine you're tracking something that changes over time, but its change isn't directly caused by time itself. Instead, it changes because of something else, which *then* changes because of time. Think of it like a chain reaction.

For example, let's say the temperature in a room depends on how many people are in it. And the number of people in the room changes throughout the day. If you want to know how fast the temperature is changing at a specific moment, you can't just look at the temperature's direct relationship with time. You need to consider the "chain": how temperature changes with people, and how people change with time.

The multivariable chain rule is a mathematical tool that helps us figure out these "indirect" rates of change. It tells us how to combine the individual rates of change along a chain of dependencies to get the overall rate of change. It's like multiplying the "magnification factors" at each link in the chain.

In essence, if quantity A depends on quantities B and C, and B and C themselves depend on quantity D, the chain rule helps us find how A changes when D changes. It's a fundamental concept for understanding how interconnected systems evolve.

## 2. Why it matters — real-world applications

The multivariable chain rule is indispensable across science, engineering, and economics because most real-world systems involve layers of interconnected dependencies.

1.  **Aerospace Engineering & Rocket Trajectories:** Consider a rocket's fuel consumption rate ($R$). This rate might depend on its current speed ($v$) and altitude ($h$). Both speed and altitude, in turn, depend on time ($t$) since launch. To optimize the trajectory or predict fuel remaining, engineers need to know how $R$ changes with respect to $t$. The chain rule allows them to compute $\frac{dR}{dt}$ by combining $\frac{\partial R}{\partial v}$, $\frac{\partial R}{\partial h}$, $\frac{dv}{dt}$, and $\frac{dh}{dt}$. This is critical for companies like SpaceX designing efficient launches.

2.  **Machine Learning & Neural Networks (Backpropagation):** In deep learning, a neural network's output is a complex function of its input data and millions of internal parameters (weights and biases). To train the network, we need to adjust these parameters to minimize an error function (loss function). The loss function depends on the network's output, which depends on the parameters. To update the parameters, we need to calculate the gradient of the loss function with respect to each parameter. This calculation, known as backpropagation, is an iterative application of the multivariable chain rule across many layers of the network. Without the chain rule, training complex neural networks used by companies like Google (for search, image recognition) or OpenAI (for large language models) would be computationally intractable.

3.  **Physics & Fluid Dynamics (Material Derivative):** When studying fluids, we often want to know how a property like temperature ($T$) or pressure ($P$) changes for a specific parcel of fluid as it moves. This is called the material derivative. The temperature $T$ at a point in space depends on its coordinates $(x,y,z)$ and time $t$, so $T(x,y,z,t)$. But if a fluid parcel moves, its coordinates $(x(t), y(t), z(t))$ are also functions of time. The material derivative $\frac{DT}{Dt}$ is computed using the chain rule: $\frac{DT}{Dt} = \frac{\partial T}{\partial t} + \frac{\partial T}{\partial x}\frac{dx}{dt} + \frac{\partial T}{\partial y}\frac{dy}{dt} + \frac{\partial T}{\partial z}\frac{dz}{dt}$. This is crucial for understanding weather patterns, ocean currents, and the design of aircraft wings.

4.  **Economics & Financial Modeling:** A company's profit ($P$) might depend on its production volume ($V$) and advertising expenditure ($A$). Both $V$ and $A$ could, in turn, depend on economic indicators like interest rates ($r$) or consumer confidence ($c$). To understand how profit reacts to changes in interest rates, economists would use the chain rule to calculate $\frac{\partial P}{\partial r}$, considering the paths through $V$ and $A$. This informs strategic business decisions and financial forecasting.

## 3. Prerequisites — what you must know first

Before diving into the multivariable chain rule, ensure you have a solid grasp of these foundational concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Functions (single and multivariable):** Understanding what a function is, its domain and range, and the difference between $f(x)$ and $f(x,y,z)$.
*   **Limits:** The concept of a limit, particularly as it applies to the definition of a derivative, is fundamental to understanding rates of change.
*   **Derivatives (single variable):** How to compute derivatives like $\frac{dy}{dx}$ for common functions (polynomials, exponentials, trigonometric functions) and the rules of differentiation (product rule, quotient rule, single-variable chain rule).
*   **Partial Derivatives:** How to compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ by treating other variables as constants. This is the building block for multivariable chain rule.
*   **Gradient Vector:** The vector of all first-order partial derivatives, $\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \right\rangle$. It points in the direction of the greatest rate of increase of a function.
*   **Vector-Valued Functions:** Functions whose output is a vector, like $\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle$, and their derivatives.
*   **Matrix Multiplication:** For the most general form of the chain rule (involving Jacobian matrices), you'll need to know how to multiply matrices.

## 4. The core idea — step by step

Let's build up the multivariable chain rule from the simplest case to the most general, focusing on intuition and formal notation.

### Step 1: Single independent variable, single intermediate variable (The familiar 1D Chain Rule)

**Plain-English Statement:** If a quantity $y$ depends on another quantity $x$, and $x$ itself depends on a third quantity $t$, then the rate at which $y$ changes with respect to $t$ is the product of how $y$ changes with $x$ and how $x$ changes with $t$.

**Small Concrete Example:**
Suppose the area of a circle $A$ depends on its radius $r$, so $A = \pi r^2$.
And the radius $r$ is growing over time $t$, say $r = 2t$.
How fast is the area changing with respect to time?
We know $\frac{dA}{dr} = 2\pi r$ and $\frac{dr}{dt} = 2$.
The chain rule says $\frac{dA}{dt} = \frac{dA}{dr} \frac{dr}{dt}$.

**Formal/Mathematical Version:**
Let $y = f(x)$ be a differentiable function of $x$, and let $x = g(t)$ be a differentiable function of $t$. Then the composite function $y = f(g(t))$ is a differentiable function of $t$, and
$$ \frac{dy}{dt} = \frac{dy}{dx} \frac{dx}{dt} $$
Using functional notation, if $F(t) = f(g(t))$, then $F'(t) = f'(g(t))g'(t)$.

**What could go wrong:** Forgetting that $f'(g(t))$ means evaluating the derivative of $f$ *at* $g(t)$, not $f'(t)$. Forgetting to multiply the derivatives.

### Step 2: Single independent variable, multiple intermediate variables

**Plain-English Statement:** Imagine a final quantity $z$ that depends on several intermediate quantities, say $x$ and $y$. Both $x$ and $y$ then depend on a single independent variable, $t$. To find how $z$ changes with respect to $t$, you follow each "path" from $z$ down to $t$, multiplying the rates along that path, and then you *sum* the contributions from all such paths.

**Small Concrete Example:**
Suppose the temperature $T$ on a metal plate is given by $T(x,y) = x^2 + y^2$.
An ant walks on the plate, and its position at time $t$ is given by $x(t) = \cos t$ and $y(t) = \sin t$.
How fast is the temperature changing for the ant as it moves?
The temperature $T$ depends on $x$ and $y$. $x$ and $y$ both depend on $t$.
Path 1: $T \rightarrow x \rightarrow t$. Rate: $\frac{\partial T}{\partial x} \frac{dx}{dt}$.
Path 2: $T \rightarrow y \rightarrow t$. Rate: $\frac{\partial T}{\partial y} \frac{dy}{dt}$.
Total rate: Sum of these two paths.

**Formal/Mathematical Version:**
Let $z = f(x,y)$ be a differentiable function of $x$ and $y$, where $x = g(t)$ and $y = h(t)$ are differentiable functions of $t$. Then $z$ is a differentiable function of $t$, and
$$ \frac{dz}{dt} = \frac{\partial z}{\partial x} \frac{dx}{dt} + \frac{\partial z}{\partial y} \frac{dy}{dt} $$
This can be extended to any number of intermediate variables: if $z = f(x_1, x_2, \dots, x_n)$ and each $x_i = g_i(t)$, then
$$ \frac{dz}{dt} = \frac{\partial z}{\partial x_1} \frac{dx_1}{dt} + \frac{\partial z}{\partial x_2} \frac{dx_2}{dt} + \dots + \frac{\partial z}{\partial x_n} \frac{dx_n}{dt} $$
This can also be written using the dot product of the gradient vector and the velocity vector:
$$ \frac{dz}{dt} = \nabla z \cdot \mathbf{r}'(t) = \left\langle \frac{\partial z}{\partial x}, \frac{\partial z}{\partial y} \right\rangle \cdot \left\langle \frac{dx}{dt}, \frac{dy}{dt} \right\rangle $$

**What could go wrong:** Forgetting to sum the contributions from all paths. Using $\frac{dz}{dx}$ instead of $\frac{\partial z}{\partial x}$ (the notation is important here because $z$ depends on more than one variable).

### Step 3: Multiple independent variables, multiple intermediate variables

**Plain-English Statement:** Now, let's say our final quantity $w$ depends on intermediate quantities $x$ and $y$. But $x$ and $y$ don't just depend on a single variable $t$; they depend on *multiple* independent variables, say $r$ and $s$. If we want to find how $w$ changes with respect to $r$ (while holding $s$ constant), we again sum the contributions from all paths leading from $w$ to $r$. The same logic applies if we want to find how $w$ changes with respect to $s$.

**Small Concrete Example:**
Suppose the volume of a cylinder $V$ is given by $V = \pi r^2 h$.
The radius $r$ and height $h$ are not constant; they depend on temperature $T$ and pressure $P$. So $r(T,P)$ and $h(T,P)$.
How does the volume change with respect to temperature ($\frac{\partial V}{\partial T}$)?
Path 1: $V \rightarrow r \rightarrow T$. Rate: $\frac{\partial V}{\partial r} \frac{\partial r}{\partial T}$.
Path 2: $V \rightarrow h \rightarrow T$. Rate: $\frac{\partial V}{\partial h} \frac{\partial h}{\partial T}$.
Total rate: Sum of these two paths.

**Formal/Mathematical Version:**
Let $w = f(x,y)$ be a differentiable function of $x$ and $y$, where $x = g(r,s)$ and $y = h(r,s)$ are differentiable functions of $r$ and $s$. Then $w$ is a differentiable function of $r$ and $s$, and
$$ \frac{\partial w}{\partial r} = \frac{\partial w}{\partial x} \frac{\partial x}{\partial r} + \frac{\partial w}{\partial y} \frac{\partial y}{\partial r} $$
$$ \frac{\partial w}{\partial s} = \frac{\partial w}{\partial x} \frac{\partial x}{\partial s} + \frac{\partial w}{\partial y} \frac{\partial y}{\partial s} $$
This is arguably the most common and important form of the multivariable chain rule encountered in applications. It extends similarly to more intermediate variables and more independent variables.

**What could go wrong:** Mixing up the independent variables. For example, when finding $\frac{\partial w}{\partial r}$, accidentally using $\frac{\partial x}{\partial s}$ instead of $\frac{\partial x}{\partial r}$. Always trace the path to the specific final independent variable.

### Step 4: Vector-valued functions and the Jacobian Matrix (The most general form)

**Plain-English Statement:** When dealing with functions that map vectors to vectors, the chain rule becomes a multiplication of matrices. Each matrix (called a Jacobian matrix) represents all the partial derivatives of one vector function with respect to its input vector. If you have a function $\mathbf{f}$ that takes an input vector $\mathbf{x}$ and produces an output vector $\mathbf{y}$, and $\mathbf{x}$ itself is the output of another function $\mathbf{g}$ which takes an input vector $\mathbf{t}$, then the derivative of the composite function $\mathbf{f}(\mathbf{g}(\mathbf{t}))$ is found by multiplying the Jacobian matrix of $\mathbf{f}$ (evaluated at $\mathbf{g}(\mathbf{t})$) by the Jacobian matrix of $\mathbf{g}$.

**Small Concrete Example:**
Imagine a transformation $T_1$ that takes a point $(u,v)$ in a 2D plane and maps it to a point $(x,y)$ in another 2D plane: $\mathbf{x} = T_1(\mathbf{u})$, where $\mathbf{x} = \langle x(u,v), y(u,v) \rangle$.
Now imagine another transformation $T_2$ that takes a point $(r,s)$ in a third 2D plane and maps it to $(u,v)$: $\mathbf{u} = T_2(\mathbf{r})$, where $\mathbf{u} = \langle u(r,s), v(r,s) \rangle$.
We want to find how $(x,y)$ changes with $(r,s)$. This means finding the partial derivatives $\frac{\partial x}{\partial r}, \frac{\partial x}{\partial s}, \frac{\partial y}{\partial r}, \frac{\partial y}{\partial s}$. These can be collected into a single matrix, the Jacobian matrix of the composite transformation.

**Formal/Mathematical Version:**
Let $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$ be a differentiable vector-valued function, so $\mathbf{y} = \mathbf{f}(\mathbf{x})$ where $\mathbf{x} \in \mathbb{R}^n$ and $\mathbf{y} \in \mathbb{R}^m$.
Let $\mathbf{g}: \mathbb{R}^p \to \mathbb{R}^n$ be a differentiable vector-valued function, so $\mathbf{x} = \mathbf{g}(\mathbf{t})$ where $\mathbf{t} \in \mathbb{R}^p$.
The composite function is $\mathbf{y} = (\mathbf{f} \circ \mathbf{g})(\mathbf{t}) = \mathbf{f}(\mathbf{g}(\mathbf{t}))$.
The derivative of $\mathbf{f}$ is its Jacobian matrix $D\mathbf{f}(\mathbf{x})$, an $m \times n$ matrix whose $(i,j)$-th entry is $\frac{\partial y_i}{\partial x_j}$.
The derivative of $\mathbf{g}$ is its Jacobian matrix $D\mathbf{g}(\mathbf{t})$, an $n \times p$ matrix whose $(i,j)$-th entry is $\frac{\partial x_i}{\partial t_j}$.
The chain rule states that the Jacobian matrix of the composite function is the product of the individual Jacobian matrices:
$$ D(\mathbf{f} \circ \mathbf{g})(\mathbf{t}) = D\mathbf{f}(\mathbf{g}(\mathbf{t})) \cdot D\mathbf{g}(\mathbf{t}) $$
The resulting matrix $D(\mathbf{f} \circ \mathbf{g})(\mathbf{t})$ will be an $m \times p$ matrix.
For example, if $\mathbf{f}(x_1, x_2) = \langle y_1, y_2 \rangle$ and $\mathbf{g}(t_1, t_2) = \langle x_1, x_2 \rangle$, then:
$$ D\mathbf{f} = \begin{pmatrix} \frac{\partial y_1}{\partial x_1} & \frac{\partial y_1}{\partial x_2} \\ \frac{\partial y_2}{\partial x_1} & \frac{\partial y_2}{\partial x_2} \end{pmatrix} \quad \text{and} \quad D\mathbf{g} = \begin{pmatrix} \frac{\partial x_1}{\partial t_1} & \frac{\partial x_1}{\partial t_2} \\ \frac{\partial x_2}{\partial t_1} & \frac{\partial x_2}{\partial t_2} \end{pmatrix} $$
And their product would yield the Jacobian matrix for $\mathbf{y}$ with respect to $\mathbf{t}$.
Each entry in the product matrix corresponds to one of the summed partial derivative expressions from Step 3. For example, the $(1,1)$ entry of the product (which is $\frac{\partial y_1}{\partial t_1}$) would be $\frac{\partial y_1}{\partial x_1}\frac{\partial x_1}{\partial t_1} + \frac{\partial y_1}{\partial x_2}\frac{\partial x_2}{\partial t_1}$.

**What could go wrong:** Incorrectly setting up the dimensions of the Jacobian matrices, leading to non-conformable matrix multiplication. Forgetting to evaluate $D\mathbf{f}$ at the intermediate point $\mathbf{g}(\mathbf{t})$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Single independent variable, multiple intermediate variables

**Problem:** Let $z = x \sin(y)$, where $x = t^2$ and $y = \pi t$. Find $\frac{dz}{dt}$.

**Given:**
*   $z = f(x,y) = x \sin(y)$
*   $x = g(t) = t^2$
*   $y = h(t) = \pi t$

**We want:** $\frac{dz}{dt}$

**Show every step:**
1.  **Identify the dependencies:** $z$ depends on $x$ and $y$. Both $x$ and $y$ depend on $t$. This is the case from Step 2.
    *   The formula is: $\frac{dz}{dt} = \frac{\partial z}{\partial x} \frac{dx}{dt} + \frac{\partial z}{\partial y} \frac{dy}{dt}$

2.  **Calculate the partial derivatives of $z$ with respect to $x$ and $y$:**
    *   $\frac{\partial z}{\partial x} = \frac{\partial}{\partial x}(x \sin(y))$
        *   Here, we treat $y$ (and thus $\sin(y)$) as a constant.
        *   $$ \frac{\partial z}{\partial x} = \sin(y) $$
    *   $\frac{\partial z}{\partial y} = \frac{\partial}{\partial y}(x \sin(y))$
        *   Here, we treat $x$ as a constant.
        *   $$ \frac{\partial z}{\partial y} = x \cos(y) $$

3.  **Calculate the derivatives of $x$ and $y$ with respect to $t$:**
    *   $\frac{dx}{dt} = \frac{d}{dt}(t^2)$
        *   This is a standard single-variable derivative.
        *   $$ \frac{dx}{dt} = 2t $$
    *   $\frac{dy}{dt} = \frac{d}{dt}(\pi t)$
        *   This is a standard single-variable derivative.
        *   $$ \frac{dy}{dt} = \pi $$

4.  **Substitute these derivatives into the chain rule formula:**
    *   $$ \frac{dz}{dt} = (\sin(y))(2t) + (x \cos(y))(\pi) $$

5.  **Express the result purely in terms of $t$ by substituting $x=t^2$ and $y=\pi t$ back into the expression:**
    *   $$ \frac{dz}{dt} = (\sin(\pi t))(2t) + (t^2 \cos(\pi t))(\pi) $$
    *   $$ \frac{dz}{dt} = 2t \sin(\pi t) + \pi t^2 \cos(\pi t) $$

**Final Answer:**
$$ \boxed{\frac{dz}{dt} = 2t \sin(\pi t) + \pi t^2 \cos(\pi t)} $$

**Reflection:** This example was straightforward because the dependencies were clear. The key was to correctly identify the intermediate variables ($x,y$) and the single independent variable ($t$), then apply the summing of path contributions. The most common mistake here is forgetting to substitute back the expressions for $x$ and $y$ in terms of $t$ at the end.

---

### Example 2: Multiple independent variables, multiple intermediate variables

**Problem:** Let $w = e^{xy} + \ln(z)$, where $x = r^2+s^2$, $y = r/s$, and $z = r+s$. Find $\frac{\partial w}{\partial r}$ and $\frac{\partial w}{\partial s}$.

**Given:**
*   $w = f(x,y,z) = e^{xy} + \ln(z)$
*   $x = g_1(r,s) = r^2+s^2$
*   $y = g_2(r,s) = r/s$
*   $z = g_3(r,s) = r+s$

**We want:** $\frac{\partial w}{\partial r}$ and $\frac{\partial w}{\partial s}$

**Show every step for $\frac{\partial w}{\partial r}$:**
1.  **Identify dependencies:** $w$ depends on $x, y, z$. Each of $x, y, z$ depends on $r$ and $s$. This is the case from Step 3.
    *   The formula for $\frac{\partial w}{\partial r}$ is: $\frac{\partial w}{\partial r} = \frac{\partial w}{\partial x} \frac{\partial x}{\partial r} + \frac{\partial w}{\partial y} \frac{\partial y}{\partial r} + \frac{\partial w}{\partial z} \frac{\partial z}{\partial r}$

2.  **Calculate the partial derivatives of $w$ with respect to $x, y, z$:**
    *   $\frac{\partial w}{\partial x} = \frac{\partial}{\partial x}(e^{xy} + \ln(z))$
        *   Treat $y$ and $z$ as constants.
        *   $$ \frac{\partial w}{\partial x} = y e^{xy} $$
    *   $\frac{\partial w}{\partial y} = \frac{\partial}{\partial y}(e^{xy} + \ln(z))$
        *   Treat $x$ and $z$ as constants.
        *   $$ \frac{\partial w}{\partial y} = x e^{xy} $$
    *   $\frac{\partial w}{\partial z} = \frac{\partial}{\partial z}(e^{xy} + \ln(z))$
        *   Treat $x$ and $y$ as constants.
        *   $$ \frac{\partial w}{\partial z} = \frac{1}{z} $$

3.  **Calculate the partial derivatives of $x, y, z$ with respect to $r$:**
    *   $\frac{\partial x}{\partial r} = \frac{\partial}{\partial r}(r^2+s^2)$
        *   Treat $s$ as a constant.
        *   $$ \frac{\partial x}{\partial r} = 2r $$
    *   $\frac{\partial y}{\partial r} = \frac{\partial}{\partial r}(r/s)$
        *   Treat $s$ as a constant.
        *   $$ \frac{\partial y}{\partial r} = 1/s $$
    *   $\frac{\partial z}{\partial r} = \frac{\partial}{\partial r}(r+s)$
        *   Treat $s$ as a constant.
        *   $$ \frac{\partial z}{\partial r} = 1 $$

4.  **Substitute these derivatives into the chain rule formula for $\frac{\partial w}{\partial r}$:**
    *   $$ \frac{\partial w}{\partial r} = (y e^{xy})(2r) + (x e^{xy})(1/s) + \left(\frac{1}{z}\right)(1) $$

5.  **Express the result purely in terms of $r$ and $s$:** Substitute $x = r^2+s^2$, $y = r/s$, and $z = r+s$.
    *   $$ \frac{\partial w}{\partial r} = \left(\frac{r}{s} e^{(r^2+s^2)(r/s)}\right)(2r) + \left((r^2+s^2) e^{(r^2+s^2)(r/s)}\right)\left(\frac{1}{s}\right) + \left(\frac{1}{r+s}\right)(1) $$
    *   $$ \frac{\partial w}{\partial r} = \frac{2r^2}{s} e^{(r^3/s + rs)} + \frac{r^2+s^2}{s} e^{(r^3/s + rs)} + \frac{1}{r+s} $$
    *   $$ \frac{\partial w}{\partial r} = \frac{3r^2+s^2}{s} e^{(r^3/s + rs)} + \frac{1}{r+s} $$

**Final Answer for $\frac{\partial w}{\partial r}$:**
$$ \boxed{\frac{\partial w}{\partial r} = \frac{3r^2+s^2}{s} e^{r(r^2+s^2)/s} + \frac{1}{r+s}} $$

**Show every step for $\frac{\partial w}{\partial s}$:**
1.  **Identify dependencies (same as above):**
    *   The formula for $\frac{\partial w}{\partial s}$ is: $\frac{\partial w}{\partial s} = \frac{\partial w}{\partial x} \frac{\partial x}{\partial s} + \frac{\partial w}{\partial y} \frac{\partial y}{\partial s} + \frac{\partial w}{\partial z} \frac{\partial z}{\partial s}$

2.  **Calculate the partial derivatives of $w$ with respect to $x, y, z$ (these are the same as before):**
    *   $\frac{\partial w}{\partial x} = y e^{xy}$
    *   $\frac{\partial w}{\partial y} = x e^{xy}$
    *   $\frac{\partial w}{\partial z} = \frac{1}{z}$

3.  **Calculate the partial derivatives of $x, y, z$ with respect to $s$:**
    *   $\frac{\partial x}{\partial s} = \frac{\partial}{\partial s}(r^2+s^2)$
        *   Treat $r$ as a constant.
        *   $$ \frac{\partial x}{\partial s} = 2s $$
    *   $\frac{\partial y}{\partial s} = \frac{\partial}{\partial s}(r/s)$
        *   Treat $r$ as a constant.
        *   $$ \frac{\partial y}{\partial s} = -r/s^2 $$
    *   $\frac{\partial z}{\partial s} = \frac{\partial}{\partial s}(r+s)$
        *   Treat $r$ as a constant.
        *   $$ \frac{\partial z}{\partial s} = 1 $$

4.  **Substitute these derivatives into the chain rule formula for $\frac{\partial w}{\partial s}$:**
    *   $$ \frac{\partial w}{\partial s} = (y e^{xy})(2s) + (x e^{xy})(-r/s^2) + \left(\frac{1}{z}\right)(1) $$

5.  **Express the result purely in terms of $r$ and $s$:** Substitute $x = r^2+s^2$, $y = r/s$, and $z = r+s$.
    *   $$ \frac{\partial w}{\partial s} = \left(\frac{r}{s} e^{(r^2+s^2)(r/s)}\right)(2s) + \left((r^2+s^2) e^{(r^2+s^2)(r/s)}\right)\left(-\frac{r}{s^2}\right) + \left(\frac{1}{r+s}\right)(1) $$
    *   $$ \frac{\partial w}{\partial s} = 2r e^{(r^3/s + rs)} - \frac{r(r^2+s^2)}{s^2} e^{(r^3/s + rs)} + \frac{1}{r+s} $$
    *   $$ \frac{\partial w}{\partial s} = \left(2r - \frac{r^3+rs^2}{s^2}\right) e^{(r^3/s + rs)} + \frac{1}{r+s} $$
    *   $$ \frac{\partial w}{\partial s} = \left(\frac{2rs^2 - r^3 - rs^2}{s^2}\right) e^{(r^3/s + rs)} + \frac{1}{r+s} $$
    *   $$ \frac{\partial w}{\partial s} = \frac{rs^2 - r^3}{s^2} e^{(r^3/s + rs)} + \frac{1}{r+s} $$

**Final Answer for $\frac{\partial w}{\partial s}$:**
$$ \boxed{\frac{\partial w}{\partial s} = \frac{r(s^2 - r^2)}{s^2} e^{r(r^2+s^2)/s} + \frac{1}{r+s}} $$

**Reflection:** This example was more involved due to three intermediate variables and two independent variables. The trickiest part is carefully managing the partial derivatives with respect to $r$ versus $s$ and ensuring all substitutions are done correctly. It's easy to make algebraic errors or mix up which variable is being held constant.

---

### Example 3: Implicit Differentiation using the Chain Rule

**Problem:** Find $\frac{dy}{dx}$ if $x^3 + y^3 = 6xy$.

**Given:** An implicit equation $F(x,y) = x^3 + y^3 - 6xy = 0$.

**We want:** $\frac{dy}{dx}$

**Show every step:**
1.  **Recognize this as an implicit function:** $y$ is implicitly defined as a function of $x$. We can think of the equation as $F(x, y(x)) = 0$.
2.  **Apply the chain rule to differentiate $F(x, y(x))$ with respect to $x$:**
    *   Let $F(x,y) = x^3 + y^3 - 6xy$. We are essentially asking for $\frac{dF}{dx}$.
    *   Using the chain rule for $F(x, y(x))$:
        *   $$ \frac{dF}{dx} = \frac{\partial F}{\partial x} \frac{dx}{dx} + \frac{\partial F}{\partial y} \frac{dy}{dx} $$
    *   Since $\frac{dx}{dx} = 1$, this simplifies to:
        *   $$ \frac{dF}{dx} = \frac{\partial F}{\partial x} + \frac{\partial F}{\partial y} \frac{dy}{dx} $$
    *   Since $F(x, y(x)) = 0$ for all $x$, its derivative with respect to $x$ must also be 0.
        *   $$ 0 = \frac{\partial F}{\partial x} + \frac{\partial F}{\partial y} \frac{dy}{dx} $$

3.  **Calculate the partial derivatives of $F$ with respect to $x$ and $y$:**
    *   $$ \frac{\partial F}{\partial x} = \frac{\partial}{\partial x}(x^3 + y^3 - 6xy) $$
        *   Treat $y$ as a constant.
        *   $$ \frac{\partial F}{\partial x} = 3x^2 - 6y $$
    *   $$ \frac{\partial F}{\partial y} = \frac{\partial}{\partial y}(x^3 + y^3 - 6xy) $$
        *   Treat $x$ as a constant.
        *   $$ \frac{\partial F}{\partial y} = 3y^2 - 6x $$

4.  **Substitute these partial derivatives back into the chain rule equation:**
    *   $$ 0 = (3x^2 - 6y) + (3y^2 - 6x) \frac{dy}{dx} $$

5.  **Solve for $\frac{dy}{dx}$:**
    *   $$ -(3x^2 - 6y) = (3y^2 - 6x) \frac{dy}{dx} $$
    *   $$ \frac{dy}{dx} = \frac{-(3x^2 - 6y)}{3y^2 - 6x} $$
    *   We can factor out a 3 from the numerator and denominator:
    *   $$ \frac{dy}{dx} = \frac{-(x^2 - 2y)}{y^2 - 2x} $$
    *   $$ \frac{dy}{dx} = \frac{2y - x^2}{y^2 - 2x} $$

**Final Answer:**
$$ \boxed{\frac{dy}{dx} = \frac{2y - x^2}{y^2 - 2x}} $$

**Reflection:** This example demonstrates how the multivariable chain rule underpins implicit differentiation. The key is to recognize that the variable being implicitly defined (e.g., $y$) is actually an intermediate function of the independent variable (e.g., $x$). The "trick" is setting the total derivative of $F(x,y(x))$ to zero because the function is always zero on the curve.

---

### Example 4: Vector-valued functions (Jacobian Matrix approach)

**Problem:** Let $\mathbf{f}(u,v) = \langle u^2-v^2, 2uv \rangle$ and $\mathbf{g}(x,y) = \langle e^x \cos y, e^x \sin y \rangle$. Find the Jacobian matrix of the composite function $\mathbf{h}(x,y) = (\mathbf{f} \circ \mathbf{g})(x,y)$.

**Given:**
*   $\mathbf{f}: \mathbb{R}^2 \to \mathbb{R}^2$, where $\mathbf{f}(u,v) = \langle y_1, y_2 \rangle = \langle u^2-v^2, 2uv \rangle$.
*   $\mathbf{g}: \mathbb{R}^2 \to \mathbb{R}^2$, where $\mathbf{g}(x,y) = \langle u, v \rangle = \langle e^x \cos y, e^x \sin y \rangle$.

**We want:** $D\mathbf{h}(x,y)$ where $\mathbf{h}(x,y) = \mathbf{f}(\mathbf{g}(x,y))$.

**Show every step:**
1.  **Identify the functions and their components:**
    *   $\mathbf{y} = \mathbf{f}(\mathbf{u})$ where $y_1 = u^2-v^2$ and $y_2 = 2uv$.
    *   $\mathbf{u} = \mathbf{g}(\mathbf{x})$ where $u = e^x \cos y$ and $v = e^x \sin y$.

2.  **Calculate the Jacobian matrix for $\mathbf{f}$ ($D\mathbf{f}$):**
    *   $D\mathbf{f}(u,v) = \begin{pmatrix} \frac{\partial y_1}{\partial u} & \frac{\partial y_1}{\partial v} \\ \frac{\partial y_2}{\partial u} & \frac{\partial y_2}{\partial v} \end{pmatrix}$
    *   $\frac{\partial y_1}{\partial u} = \frac{\partial}{\partial u}(u^2-v^2) = 2u$
    *   $\frac{\partial y_1}{\partial v} = \frac{\partial}{\partial v}(u^2-v^2) = -2v$
    *   $\frac{\partial y_2}{\partial u} = \frac{\partial}{\partial u}(2uv) = 2v$
    *   $\frac{\partial y_2}{\partial v} = \frac{\partial}{\partial v}(2uv) = 2u$
    *   $$ D\mathbf{f}(u,v) = \begin{pmatrix} 2u & -2v \\ 2v & 2u \end{pmatrix} $$

3.  **Calculate the Jacobian matrix for $\mathbf{g}$ ($D\mathbf{g}$):**
    *   $D\mathbf{g}(x,y) = \begin{pmatrix} \frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} \\ \frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} \end{pmatrix}$
    *   $\frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(e^x \cos y) = e^x \cos y$
    *   $\frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(e^x \cos y) = -e^x \sin y$
    *   $\frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(e^x \sin y) = e^x \sin y$
    *   $\frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(e^x \sin y) = e^x \cos y$
    *   $$ D\mathbf{g}(x,y) = \begin{pmatrix} e^x \cos y & -e^x \sin y \\ e^x \sin y & e^x \cos y \end{pmatrix} $$

4.  **Apply the chain rule formula: $D\mathbf{h}(x,y) = D\mathbf{f}(\mathbf{g}(x,y)) \cdot D\mathbf{g}(x,y)$**
    *   First, we need to evaluate $D\mathbf{f}$ at $\mathbf{g}(x,y)$, which means substituting $u = e^x \cos y$ and $v = e^x \sin y$ into $D\mathbf{f}(u,v)$:
        *   $$ D\mathbf{f}(\mathbf{g}(x,y)) = \begin{pmatrix} 2(e^x \cos y) & -2(e^x \sin y) \\ 2(e^x \sin y) & 2(e^x \cos y) \end{pmatrix} = \begin{pmatrix} 2e^x \cos y & -2e^x \sin y \\ 2e^x \sin y & 2e^x \cos y \end{pmatrix} $$
    *   Now, perform the matrix multiplication:
        *   $$ D\mathbf{h}(x,y) = \begin{pmatrix} 2e^x \cos y & -2e^x \sin y \\ 2e^x \sin y & 2e^x \cos y \end{pmatrix} \begin{pmatrix} e^x \cos y & -e^x \sin y \\ e^x \sin y & e^x \cos y \end{pmatrix} $$
        *   Entry $(1,1)$: $(2e^x \cos y)(e^x \cos y) + (-2e^x \sin y)(e^x \sin y) = 2e^{2x} \cos^2 y - 2e^{2x} \sin^2 y = 2e^{2x}(\cos^2 y - \sin^2 y) = 2e^{2x} \cos(2y)$
        *   Entry $(1,2)$: $(2e^x \cos y)(-e^x \sin y) + (-2e^x \sin y)(e^x \cos y) = -2e^{2x} \cos y \sin y - 2e^{2x} \sin y \cos y = -4e^{2x} \sin y \cos y = -2e^{2x} \sin(2y)$
        *   Entry $(2,1)$: $(2e^x \sin y)(e^x \cos y) + (2e^x \cos y)(e^x \sin y) = 2e^{2x} \sin y \cos y + 2e^{2x} \cos y \sin y = 4e^{2x} \sin y \cos y = 2e^{2x} \sin(2y)$
        *   Entry $(2,2)$: $(2e^x \sin y)(-e^x \sin y) + (2e^x \cos y)(e^x \cos y) = -2e^{2x} \sin^2 y + 2e^{2x} \cos^2 y = 2e^{2x}(\cos^2 y - \sin^2 y) = 2e^{2x} \cos(2y)$
    *   $$ D\mathbf{h}(x,y) = \begin{pmatrix} 2e^{2x} \cos(2y) & -2e^{2x} \sin(2y) \\ 2e^{2x} \sin(2y) & 2e^{2x} \cos(2y) \end{pmatrix} $$

**Final Answer:**
$$ \boxed{D\mathbf{h}(x,y) = \begin{pmatrix} 2e^{2x} \cos(2y) & -2e^{2x} \sin(2y) \\ 2e^{2x} \sin(2y) & 2e^{2x} \cos(2y) \end{pmatrix}} $$

**Reflection:** This example highlights the power and generality of the Jacobian matrix formulation. While the matrix multiplication can be tedious, it systematically combines all the partial derivatives. Notice that the $\mathbf{f}$ function is related to squaring complex numbers ($ (u+iv)^2 = u^2-v^2 + i(2uv) $) and $\mathbf{g}$ is related to $e^{x+iy} = e^x(\cos y + i \sin y)$. The composite function $\mathbf{h}$ effectively computes $(e^{x+iy})^2 = e^{2x+i2y} = e^{2x}(\cos(2y) + i\sin(2y))$, and its Jacobian matrix matches the result. This connection to complex analysis offers a deeper insight into the structure of the solution.

## 6. Common mistakes and traps

1.  **Forgetting to sum path contributions:** When a dependent variable has multiple intermediate variables, and each intermediate variable depends on the same independent variable, the total derivative is the *sum* of the derivatives along each path. Students often forget to add these terms, especially when transitioning from the single-variable chain rule.
2.  **Confusing total derivatives with partial derivatives:** Using $\frac{dz}{dx}$ when $\frac{\partial z}{\partial x}$ is required (i.e., when $z$ depends on other variables besides $x$). The "curly d" ($\partial$) is crucial for indicating that other variables are held constant.
3.  **Incorrectly identifying independent/intermediate variables:** A common error is mislabeling which variables are truly independent (the 'bottom' of the chain) and which are intermediate (the 'middle' of the chain). Drawing a dependency tree diagram (see Section 8) can help clarify this.
4.  **Not evaluating derivatives at the correct points:** When applying $D\mathbf{f}(\mathbf{g}(\mathbf{t}))$, it means evaluating the Jacobian of $\mathbf{f}$ *after* substituting the expressions for the intermediate variables from $\mathbf{g}(\mathbf{t})$. Forgetting this substitution is a frequent error.
5.  **Algebraic errors in partial derivatives:** The chain rule itself is a structural formula. The most common source of numerical errors comes from miscalculating the individual partial derivatives, especially when functions are complex or involve product/quotient rules.
6.  **Incorrect matrix dimensions or multiplication order:** In the Jacobian matrix formulation, the order of multiplication matters ($D\mathbf{f} \cdot D\mathbf{g}$ vs. $D\mathbf{g} \cdot D\mathbf{f}$), and the dimensions must be compatible. A $D\mathbf{f}$ matrix of size $m \times n$ multiplied by a $D\mathbf{g}$ matrix of size $n \times p$ yields an $m \times p$ matrix.

## 7. Textbook-precise explanation

The multivariable chain rule is a fundamental theorem in differential calculus, generalizing the single-variable chain rule to functions of multiple variables, including vector-valued functions.

**Theorem (Multivariable Chain Rule):**
Let $E \subseteq \mathbb{R}^p$ and $U \subseteq \mathbb{R}^n$ be open sets.
Let $\mathbf{g}: E \to U$ be a function such that $\mathbf{g}(\mathbf{t}) = \langle g_1(\mathbf{t}), \dots, g_n(\mathbf{t}) \rangle$ for $\mathbf{t} = \langle t_1, \dots, t_p \rangle \in E$.
Let $\mathbf{f}: U \to \mathbb{R}^m$ be a function such that $\mathbf{f}(\mathbf{x}) = \langle f_1(\mathbf{x}), \dots, f_m(\mathbf{x}) \rangle$ for $\mathbf{x} = \langle x_1, \dots, x_n \rangle \in U$.

If $\mathbf{g}$ is differentiable at $\mathbf{t}_0 \in E$ and $\mathbf{f}$ is differentiable at $\mathbf{x}_0 = \mathbf{g}(\mathbf{t}_0) \in U$, then the composite function $\mathbf{h} = \mathbf{f} \circ \mathbf{g}: E \to \mathbb{R}^m$, defined by $\mathbf{h}(\mathbf{t}) = \mathbf{f}(\mathbf{g}(\mathbf{t}))$, is differentiable at $\mathbf{t}_0$.

Furthermore, the Jacobian matrix of $\mathbf{h}$ at $\mathbf{t}_0$ is the product of the Jacobian matrices of $\mathbf{f}$ at $\mathbf{g}(\mathbf{t}_0)$ and $\mathbf{g}$ at $\mathbf{t}_0$:
$$ D\mathbf{h}(\mathbf{t}_0) = D\mathbf{f}(\mathbf{g}(\mathbf{t}_0)) \cdot D\mathbf{g}(\mathbf{t}_0) $$
In terms of components, the $(i,j)$-th entry of $D\mathbf{h}(\mathbf{t}_0)$, which is $\frac{\partial h_i}{\partial t_j}(\mathbf{t}_0)$, is given by:
$$ \frac{\partial h_i}{\partial t_j}(\mathbf{t}_0) = \sum_{k=1}^{n} \frac{\partial f_i}{\partial x_k}(\mathbf{g}(\mathbf{t}_0)) \frac{\partial g_k}{\partial t_j}(\mathbf{t}_0) $$
for $i = 1, \dots, m$ and $j = 1, \dots, p$.

**Special Cases:**

1.  **Scalar function, single independent variable:** If $m=1, p=1$, and $n$ intermediate variables, $z = f(x_1, \dots, x_n)$ and $x_k = g_k(t)$, then $\frac{dz}{dt} = \sum_{k=1}^{n} \frac{\partial f}{\partial x_k} \frac{dx_k}{dt}$. This is often written as $\frac{dz}{dt} = \nabla f \cdot \frac{d\mathbf{x}}{dt}$.

2.  **Scalar function, multiple independent variables:** If $m=1$, $z = f(x_1, \dots, x_n)$ and $x_k = g_k(t_1, \dots, t_p)$, then for each $j \in \{1, \dots, p\}$:
    $$ \frac{\partial z}{\partial t_j} = \sum_{k=1}^{n} \frac{\partial f}{\partial x_k} \frac{\partial x_k}{\partial t_j} $$

**Conditions for Differentiability:** The theorem requires that the functions $\mathbf{f}$ and $\mathbf{g}$ be differentiable at the specified points. A function is differentiable at a point if all its partial derivatives exist and are continuous in a neighborhood of that point (this is a sufficient, but not necessary, condition for differentiability).

**Reference:** This formulation can be found in most advanced calculus textbooks. For example, see:
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2020. (Chapter 14, Section 14.5 for scalar functions, and Appendix F for vector functions).
*   Marsden, Jerrold E., and Anthony J. Tromba. *Vector Calculus*. 6th ed., W. H. Freeman, 2012. (Chapter 3, Section 3.2).
*   Apostol, Tom M. *Calculus, Vol. 2: Multi-Variable Calculus and Linear Algebra with Applications to Differential Equations and Probability*. 2nd ed., John Wiley & Sons, 1969. (Chapter 5, Section 5.10).

## 8. ASCII diagrams

Here are two ASCII diagrams to illustrate dependencies for the multivariable chain rule.

### Diagram 1: Scalar function with multiple intermediate variables, single independent variable

This diagram illustrates $z = f(x,y)$, where $x=g(t)$ and $y=h(t)$.
The branches show the paths for differentiation.

```text
       z
      / \
     /   \
    x     y
   /       \
  /         \
 t           t
```
*   To find $\frac{dz}{dt}$, you "travel" from $z$ down to $t$ through each intermediate variable.
*   Path 1: $z \rightarrow x \rightarrow t$. The contribution is $\frac{\partial z}{\partial x} \frac{dx}{dt}$.
*   Path 2: $z \rightarrow y \rightarrow t$. The contribution is $\frac{\partial z}{\partial y} \frac{dy}{dt}$.
*   The total derivative $\frac{dz}{dt}$ is the sum of these contributions: $\frac{\partial z}{\partial x} \frac{dx}{dt} + \frac{\partial z}{\partial y} \frac{dy}{dt}$.

### Diagram 2: Scalar function with multiple intermediate variables, multiple independent variables

This diagram illustrates $w = f(x,y,z)$, where $x=g_1(r,s)$, $y=g_2(r,s)$, and $z=g_3(r,s)$.
We want to find $\frac{\partial w}{\partial r}$ (or $\frac{\partial w}{\partial s}$).

```text
           w
        /  |  \
       /   |   \
      x    y    z
     / \  / \  / \
    r   s r   s r   s
```
*   To find $\frac{\partial w}{\partial r}$:
    *   Path 1: $w \rightarrow x \rightarrow r$. Contribution: $\frac{\partial w}{\partial x} \frac{\partial x}{\partial r}$.
    *   Path 2: $w \rightarrow y \rightarrow r$. Contribution: $\frac{\partial w}{\partial y} \frac{\partial y}{\partial r}$.
    *   Path 3: $w \rightarrow z \rightarrow r$. Contribution: $\frac{\partial w}{\partial z} \frac{\partial z}{\partial r}$.
*   The total partial derivative $\frac{\partial w}{\partial r}$ is the sum of these contributions: $\frac{\partial w}{\partial x} \frac{\partial x}{\partial r} + \frac{\partial w}{\partial y} \frac{\partial y}{\partial r} + \frac{\partial w}{\partial z} \frac{\partial z}{\partial r}$.
*   A similar sum applies for $\frac{\partial w}{\partial s}$, following the paths to $s$.

These "tree diagrams" are excellent visual aids for remembering the chain rule structure, especially for scalar functions.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook: "Follow the Paths and Sum the Products"**
    *   **Visual:** Imagine a river flowing from a source (your final dependent variable, e.g., $z$) through several tributaries (intermediate variables, e.g., $x, y$) down to the sea (your independent variable, e.g., $t$).
    *   Each tributary represents a "path" of dependency.
    *   Along each path, you "multiply" the rates of change (derivatives/partial derivatives).
    *   When the paths converge at the final destination (the independent variable), you "sum" all the products from each path.
    *   For partial derivatives, remember to only follow paths to the *specific* independent variable you're differentiating with respect to.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Core Scalar Rule:** If $z = f(x,y)$ and $x=g(t), y=h(t)$, then:
        $$ \frac{dz}{dt} = \frac{\partial z}{\partial x} \frac{dx}{dt} + \frac{\partial z}{\partial y} \frac{dy}{dt} $$
    *   **Core Partial Rule:** If $w = f(x,y)$ and $x=g(r,s), y=h(r,s)$, then for $r$:
        $$ \frac{\partial w}{\partial r} = \frac{\partial w}{\partial x} \frac{\partial x}{\partial r} + \frac{\partial w}{\partial y} \frac{\partial y}{\partial r} $$
    *   **General Jacobian Form:** For vector-valued functions $\mathbf{y} = \mathbf{f}(\mathbf{x})$ and $\mathbf{x} = \mathbf{g}(\mathbf{t})$, the Jacobian matrix of the composite is:
        $$ D(\mathbf{f} \circ \mathbf{g})(\mathbf{t}) = D\mathbf{f}(\mathbf{g}(\mathbf{t})) \cdot D\mathbf{g}(\mathbf{t}) $$
        Remember the evaluation point for $D\mathbf{f}$ is $\mathbf{g}(\mathbf{t})$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson, review the core formulas and worked examples. Try to re-derive the simplest cases.
    *   **Day 3:** Review the formulas. Try one easy and one medium self-check question.
    *   **Day 7:** Review the formulas. Attempt a hard self-check question or re-do a complex worked example without looking at the solution.
    *   **Day 16:** Review the formulas and the "what could go wrong" section. Try to explain the chain rule to an imaginary peer.
    *   **Day 35:** Review the Jacobian matrix form. Think about its connection to linear transformations and how it generalizes the scalar cases.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the chain rule, you can always rebuild it from the definition of differentiability.
    Consider the simplest multivariable case: $z = f(x,y)$, where $x=g(t)$ and $y=h(t)$.
    We want to find $\frac{dz}{dt}$. By definition:
    $$ \frac{dz}{dt} = \lim_{\Delta t \to 0} \frac{\Delta z}{\Delta t} $$
    For a small change $\Delta t$, $x$ changes by $\Delta x = g(t+\Delta t) - g(t)$ and $y$ changes by $\Delta y = h(t+\Delta t) - h(t)$.
    For a differentiable function $f(x,y)$, the change $\Delta z$ can be approximated by:
    $$ \Delta z \approx \frac{\partial z}{\partial x} \Delta x + \frac{\partial z}{\partial y} \Delta y $$
    (This approximation becomes exact in the limit as $\Delta x, \Delta y \to 0$).
    Now, divide by $\Delta t$:
    $$ \frac{\Delta z}{\Delta t} \approx \frac{\partial z}{\partial x} \frac{\Delta x}{\Delta t} + \frac{\partial z}{\partial y} \frac{\Delta y}{\Delta t} $$
    Taking the limit as $\Delta t \to 0$:
    $$ \lim_{\Delta t \to 0} \frac{\Delta z}{\Delta t} = \frac{\partial z}{\partial x} \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} + \frac{\partial z}{\partial y} \lim_{\Delta t \to 0} \frac{\Delta y}{\Delta t} $$
    Which gives:
    $$ \frac{dz}{dt} = \frac{\partial z}{\partial x} \frac{dx}{dt} + \frac{\partial z}{\partial y} \frac{dy}{dt} $$
    This derivation path relies on the definition of partial derivatives and the idea that for small changes, the total change in $z$ is the sum of changes due to each variable independently.

## 10. Connections — what this leads to

The multivariable chain rule is a cornerstone of multivariable calculus and analysis, connecting to and enabling a vast array of advanced topics.

1.  **Implicit Differentiation:** As seen in Example 3, the chain rule provides the formal justification and method for finding derivatives of implicitly defined functions. This extends to implicit function theorems in higher dimensions.
2.  **Related Rates Problems:** These classic calculus problems, where you find the rate of change of one quantity in terms of the rates of change of other related quantities, are direct applications of the chain rule.
3.  **Directional Derivatives:** The directional derivative of a scalar function $f(\mathbf{x})$ in the direction of a unit vector $\mathbf{u}$ can be derived using the chain rule, as it represents the rate of change of $f$ along a path $\mathbf{x}(t) = \mathbf{x}_0 + t\mathbf{u}$. It's given by $\nabla f \cdot \mathbf{u}$.
4.  **Gradient Descent and Optimization:** In machine learning and numerical optimization, the chain rule is fundamental for computing gradients of complex objective functions. Backpropagation in neural networks is a highly optimized, recursive application of the chain rule.
5.  **Change of Variables in Multiple Integrals:** When performing a change of variables in double or triple integrals (e.g., converting to polar, cylindrical, or spherical coordinates), the Jacobian determinant (which is the determinant of the Jacobian matrix) arises from the chain rule. It tells us how the "area element" or "volume element" transforms.
6.  **Thermodynamics (Maxwell Relations):** In physics and engineering, especially thermodynamics, state variables (like pressure, volume, temperature, entropy) are often related implicitly. The chain rule, particularly in its partial derivative form, is used to derive Maxwell relations and other fundamental thermodynamic identities.
7.  **Fluid Mechanics (Material Derivative):** As mentioned in applications, the material (or substantial) derivative, which describes the rate of change of a property of a fluid particle as it moves through space, is a direct application of the chain rule.
8.  **Differential Geometry:** The chain rule is essential for understanding how derivatives transform under coordinate changes, which is a core concept in differential geometry and tensor calculus.
9.  **Inverse Function Theorem and Implicit Function Theorem:** These advanced theorems in real analysis, which deal with the existence and differentiability of inverse and implicitly defined functions, rely heavily on the Jacobian matrix formulation of the chain rule.

## 11. Self-check questions

1.  Let $w = x^2 y + y z^2$, where $x = \cos(t)$, $y = \sin(t)$, and $z = t$. Find $\frac{dw}{dt}$.
2.  Suppose $u = f(x,y) = x^2 - y^2$, and $x = s \cosh(t)$, $y = s \sinh(t)$. Find $\frac{\partial u}{\partial s}$ and $\frac{\partial u}{\partial t}$. Simplify your answers.
3.  The temperature $T$ at a point $(x,y,z)$ is given by $T(x,y,z) = x^2+y^2+z^2$. A particle moves along a curve $\mathbf{r}(t) = \langle e^t, \sin t, t^3 \rangle$. Find the rate of change of temperature with respect to time, $\frac{dT}{dt}$, along the particle's path.
4.  Use implicit differentiation and the chain rule to find $\frac{\partial z}{\partial x}$ if $y z + x \ln y = z^2$.
5.  Let $\mathbf{F}(x,y) = \langle x^2y, xy^2 \rangle$ and $\mathbf{G}(s,t) = \langle s+t, st \rangle$. Find the Jacobian matrix of the composite function $\mathbf{H}(s,t) = (\mathbf{F} \circ \mathbf{G})(s,t)$.