## 1. What it is — in plain English

Imagine you have a flat, thin metal plate, like a baking sheet, and you're holding its edges at specific, constant temperatures. For example, three sides are kept at freezing point, and one side is kept at a warm temperature. If you wait long enough, the temperature inside the plate will settle down and stop changing. This final, stable temperature distribution is what we're trying to find.

The mathematical rule that describes this steady, unchanging temperature is called **Laplace's equation**. It's a type of "partial differential equation" because the temperature can change in different directions (left-right and up-down), and we need to consider how it changes with respect to both horizontal position ($x$) and vertical position ($y$) simultaneously.

Now, how do we solve this? The "separation of variables" technique is like a clever trick to break down a complicated problem into simpler ones. Instead of trying to find the temperature $u(x,y)$ all at once, we assume that the solution can be written as a product of two simpler functions: one that depends *only* on $x$ (let's call it $X(x)$) and another that depends *only* on $y$ (let's call it $Y(y)$). So, we guess that $u(x,y) = X(x)Y(y)$.

By making this guess and plugging it into Laplace's equation, we can transform one big, messy partial differential equation into two much simpler, ordinary differential equations — one for $X(x)$ and one for $Y(y)$. We solve these simpler equations, combine their solutions, and then use the temperature conditions at the edges of our metal plate to find the exact answer. It's a powerful way to tackle problems on simple shapes like rectangles.

## 2. Why it matters — real-world applications

Laplace's equation and its solution via separation of variables on a rectangle are fundamental in many fields, describing steady-state phenomena where there are no sources or sinks.

1.  **Heat Transfer and Thermal Management (Aerospace & Electronics):** This is the classic application.
    *   **Phenomenon:** Determining the steady-state temperature distribution on a rectangular component, like a circuit board in a satellite or an aircraft wing panel. If certain edges are heated (e.g., by electronics) and others are cooled (e.g., radiative cooling to space), Laplace's equation predicts the temperature at every point on the component once equilibrium is reached.
    *   **Specifics:** Engineers at companies like **Boeing** or **SpaceX** use this to design cooling systems, ensure components don't overheat, and predict thermal expansion, which is critical for structural integrity and performance in extreme environments.
2.  **Electrostatics (Physics & Electrical Engineering):**
    *   **Phenomenon:** Calculating the electric potential in a region free of charge, given the potential on its boundaries. For instance, inside a rectangular capacitor or a waveguide. The electric potential $\Phi(x,y)$ in a charge-free region satisfies Laplace's equation ($\nabla^2 \Phi = 0$).
    *   **Specifics:** This is crucial for designing microelectronic devices, integrated circuits, and sensors. Companies like **Intel** or **Qualcomm** rely on these principles to predict voltage distributions within their chips, ensuring proper signal propagation and preventing breakdown.
3.  **Fluid Dynamics (Aerodynamics & Civil Engineering):**
    *   **Phenomenon:** Modeling the steady, incompressible, irrotational flow of an ideal fluid. In such cases, the velocity potential $\phi(x,y)$ satisfies Laplace's equation.
    *   **Specifics:** This can be used for simplified analysis of airflow over a flat plate (a basic wing cross-section in 2D) or water flow through a rectangular channel. While real-world fluid dynamics is often more complex (Navier-Stokes), Laplace's equation provides a valuable first approximation and foundation for understanding potential flow theory, used in early design stages by companies like **Airbus** for aerodynamic analysis.
4.  **Gravitational Fields (Astrophysics & Geophysics):**
    *   **Phenomenon:** In regions free of mass, the gravitational potential also satisfies Laplace's equation.
    *   **Specifics:** While often applied to spherical bodies, the principles extend to simpler geometries. For instance, understanding the gravitational potential near a rectangular mass distribution (a simplified model for a geological feature or a component of a spacecraft) can be approached with these methods, aiding in mission planning or resource exploration.
5.  **Machine Learning (Image Processing & Computer Vision):**
    *   **Phenomenon:** Laplace's equation appears in image processing, particularly in tasks like image blending, inpainting, and object segmentation. The "Laplacian operator" is a fundamental edge detection filter.
    *   **Specifics:** Algorithms for seamlessly combining parts of different images (e.g., "Poisson image editing") often involve solving Laplace-like equations where boundary conditions are set by the pixel values of the source and target images. Researchers at **Google AI** or **Meta AI** use these mathematical underpinnings to develop advanced image manipulation and computer vision techniques.

## 3. Prerequisites — what you must know first

Before diving into solving Laplace's equation on a rectangle using separation of variables, you should have a solid grasp of the following mathematical concepts:

*   **Partial Derivatives:** How to differentiate a function with respect to one variable while treating others as constants. (e.g., $\frac{\partial}{\partial x} (x^2y) = 2xy$)
*   **Ordinary Differential Equations (ODEs):**
    *   **Second-Order Linear Homogeneous ODEs with Constant Coefficients:** How to solve equations of the form $ay'' + by' + cy = 0$ using the characteristic equation. (e.g., $y'' + \lambda y = 0$)
    *   **Boundary Value Problems (BVPs):** How to find specific solutions to ODEs that satisfy conditions at two different points (boundaries), leading to eigenvalues and eigenfunctions. (e.g., $y'' + \lambda y = 0$, $y(0)=0$, $y(L)=0$)
*   **Eigenvalues and Eigenfunctions:** The concept that certain boundary value problems only have non-trivial solutions (eigenfunctions) for specific values of a parameter (eigenvalues).
*   **Orthogonal Functions:** Understanding that certain sets of functions (like sines and cosines) are "orthogonal" over an interval, meaning their integral product over that interval is zero, which is crucial for Fourier series.
*   **Fourier Series:** How to represent a periodic function (or a function defined on an interval) as an infinite sum of sines and cosines.
    *   **Fourier Sine Series:** Specifically, how to represent an odd function or a function on $[0, L]$ that is zero at the endpoints.
    *   **Fourier Cosine Series:** How to represent an even function or a function on $[0, L]$ whose derivative is zero at the endpoints.
    *   **Calculating Fourier Coefficients:** How to use the orthogonality property to find the coefficients ($A_n$ or $B_n$) in a Fourier series.
*   **Superposition Principle:** For linear homogeneous differential equations, if $u_1, u_2, \dots$ are solutions, then any linear combination $c_1 u_1 + c_2 u_2 + \dots$ is also a solution.
*   **Calculus Fundamentals:** Integration (especially definite integrals) and differentiation.

If any of these concepts feel unfamiliar, it's highly recommended to pause and review them first. They are the building blocks for this method.

## 4. The core idea — step by step

The core idea is to break down a complex 2D PDE problem into two simpler 1D ODE problems, solve them, and then combine the solutions using the principle of superposition and Fourier series. We'll focus on the Dirichlet problem, where the function $u(x,y)$ is specified on all boundaries of the rectangle.

Let's consider Laplace's equation on a rectangle $0 < x < L$, $0 < y < H$:
$$ \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0 $$
with boundary conditions (BCs):
$$ u(0,y) = 0 $$
$$ u(L,y) = 0 $$
$$ u(x,0) = 0 $$
$$ u(x,H) = f(x) $$
This setup represents, for example, a metal plate where three sides are held at zero temperature, and the top side is held at a temperature distribution $f(x)$.

### Step 1: Assume a Separable Solution and Substitute

*   **Plain English:** We make an educated guess that the solution $u(x,y)$ can be written as a product of two functions, one depending only on $x$ and the other only on $y$. Then we plug this guess into Laplace's equation.
*   **Concrete Example:** If $u(x,y) = x^2 \sin(y)$, then $X(x) = x^2$ and $Y(y) = \sin(y)$. We assume this form is general enough.
*   **Formal/Mathematical Version:**
    Assume a solution of the form:
    $$ u(x,y) = X(x)Y(y) $$
    Substitute this into Laplace's equation $\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$:
    $$ \frac{\partial^2}{\partial x^2}(X(x)Y(y)) + \frac{\partial^2}{\partial y^2}(X(x)Y(y)) = 0 $$
    Since $X(x)$ doesn't depend on $y$ and $Y(y)$ doesn't depend on $x$:
    $$ X''(x)Y(y) + X(x)Y''(y) = 0 $$
    (Here, $X''$ denotes $\frac{d^2X}{dx^2}$ and $Y''$ denotes $\frac{d^2Y}{dy^2}$.)
*   **What could go wrong:** Forgetting that $X(x)$ and $Y(y)$ are *ordinary* functions, so their derivatives are total derivatives, not partial. Also, assuming this form *always* works for *any* PDE (it doesn't, only for certain types of linear homogeneous PDEs and BCs).

### Step 2: Separate the Variables

*   **Plain English:** We rearrange the equation so that all terms involving $x$ are on one side, and all terms involving $y$ are on the other side. Since $x$ and $y$ are independent variables, the only way for these two sides to be equal for all $x$ and $y$ is if both sides are equal to a constant. This constant is called the "separation constant" or "eigenvalue parameter."
*   **Concrete Example:** If we have $x^2 Y = 3 Y'$, we can't separate. But if $X''Y = -XY''$, we can divide by $XY$ to get $X''/X = -Y''/Y$.
*   **Formal/Mathematical Version:**
    Divide the equation $X''(x)Y(y) + X(x)Y''(y) = 0$ by $X(x)Y(y)$:
    $$ \frac{X''(x)}{X(x)} + \frac{Y''(y)}{Y(y)} = 0 $$
    Rearrange:
    $$ \frac{X''(x)}{X(x)} = -\frac{Y''(y)}{Y(y)} $$
    Since the left side depends only on $x$ and the right side depends only on $y$, and they are equal, they must both be equal to a constant, say $\lambda$.
    $$ \frac{X''(x)}{X(x)} = \lambda \quad \text{and} \quad -\frac{Y''(y)}{Y(y)} = \lambda $$
    This gives us two ordinary differential equations:
    $$ X''(x) - \lambda X(x) = 0 $$
    $$ Y''(y) + \lambda Y(y) = 0 $$
*   **What could go wrong:** Incorrectly choosing the sign of $\lambda$. The choice of sign (e.g., $\lambda$ vs. $-\lambda$) is critical for getting oscillatory solutions (sines/cosines) in the dimension with homogeneous boundary conditions, and exponential solutions in the other. We usually set it up so the homogeneous BC dimension gets the oscillatory solutions.

### Step 3: Apply Homogeneous Boundary Conditions to Determine $\lambda$ and $X(x)$ (or $Y(y)$)

*   **Plain English:** We use the boundary conditions that are equal to zero. These conditions simplify one of our ODEs into a "Sturm-Liouville problem," which only has non-trivial solutions for specific values of the separation constant $\lambda$. These specific values are called eigenvalues, and their corresponding solutions are eigenfunctions.
*   **Concrete Example:** For our problem, $u(0,y)=0$ and $u(L,y)=0$. Since $u(x,y)=X(x)Y(y)$, these imply $X(0)Y(y)=0$ and $X(L)Y(y)=0$. Assuming $Y(y)$ is not identically zero, we must have $X(0)=0$ and $X(L)=0$. This BVP for $X(x)$ will determine $\lambda$.
*   **Formal/Mathematical Version:**
    From $u(0,y) = X(0)Y(y) = 0$ and $u(L,y) = X(L)Y(y) = 0$, we get (assuming $Y(y) \not\equiv 0$):
    $$ X(0) = 0 \quad \text{and} \quad X(L) = 0 $$
    Now we solve the ODE $X''(x) - \lambda X(x) = 0$ with these boundary conditions. We consider three cases for $\lambda$:
    1.  **Case 1: $\lambda = 0$**
        $X''(x) = 0 \implies X(x) = c_1 x + c_2$.
        $X(0) = 0 \implies c_2 = 0$.
        $X(L) = 0 \implies c_1 L = 0 \implies c_1 = 0$.
        So, $X(x) = 0$, which gives $u(x,y)=0$ (the trivial solution). This is not useful.
    2.  **Case 2: $\lambda > 0$** Let $\lambda = \mu^2$ for $\mu > 0$.
        $X''(x) - \mu^2 X(x) = 0$. The characteristic equation is $r^2 - \mu^2 = 0 \implies r = \pm \mu$.
        $X(x) = c_1 e^{\mu x} + c_2 e^{-\mu x}$.
        $X(0) = 0 \implies c_1 + c_2 = 0 \implies c_2 = -c_1$.
        $X(L) = 0 \implies c_1 e^{\mu L} - c_1 e^{-\mu L} = 0 \implies c_1 (e^{\mu L} - e^{-\mu L}) = 0$.
        Since $\mu > 0$ and $L > 0$, $e^{\mu L} - e^{-\mu L} \neq 0$. Thus, $c_1 = 0$, which implies $c_2 = 0$.
        Again, $X(x) = 0$, the trivial solution.
    3.  **Case 3: $\lambda < 0$** Let $\lambda = -\mu^2$ for $\mu > 0$.
        $X''(x) + \mu^2 X(x) = 0$. The characteristic equation is $r^2 + \mu^2 = 0 \implies r = \pm i\mu$.
        $X(x) = c_1 \cos(\mu x) + c_2 \sin(\mu x)$.
        $X(0) = 0 \implies c_1 \cos(0) + c_2 \sin(0) = 0 \implies c_1 = 0$.
        So, $X(x) = c_2 \sin(\mu x)$.
        $X(L) = 0 \implies c_2 \sin(\mu L) = 0$.
        For a non-trivial solution ($c_2 \neq 0$), we must have $\sin(\mu L) = 0$.
        This means $\mu L = n\pi$ for $n = 1, 2, 3, \dots$ (we exclude $n=0$ because it leads to $\mu=0$ and $X(x)=0$).
        So, $\mu_n = \frac{n\pi}{L}$.
        And the eigenvalues are $\lambda_n = -\mu_n^2 = -\left(\frac{n\pi}{L}\right)^2$.
        The corresponding eigenfunctions are $X_n(x) = \sin\left(\frac{n\pi x}{L}\right)$ (we absorb $c_2$ into a later constant).
*   **What could go wrong:** Incorrectly solving the ODEs for different $\lambda$ cases. Forgetting to apply *all* homogeneous boundary conditions. Not realizing that only $\lambda < 0$ yields non-trivial solutions for this type of BVP.

### Step 4: Solve the Remaining ODE for $Y(y)$ (or $X(x)$)

*   **Plain English:** Now that we have the specific values of $\lambda$ (eigenvalues) from Step 3, we plug them into the second ODE and solve it. This will give us a family of solutions for $Y(y)$ corresponding to each $\lambda_n$.
*   **Concrete Example:** We found $\lambda_n = -(n\pi/L)^2$. So, the $Y$ equation $Y'' + \lambda Y = 0$ becomes $Y'' - (n\pi/L)^2 Y = 0$.
*   **Formal/Mathematical Version:**
    The ODE for $Y(y)$ is $Y''(y) + \lambda Y(y) = 0$.
    Substitute $\lambda_n = -\left(\frac{n\pi}{L}\right)^2$:
    $$ Y''(y) - \left(\frac{n\pi}{L}\right)^2 Y(y) = 0 $$
    The characteristic equation is $r^2 - \left(\frac{n\pi}{L}\right)^2 = 0 \implies r = \pm \frac{n\pi}{L}$.
    So, the general solution for $Y_n(y)$ is:
    $$ Y_n(y) = A_n e^{\frac{n\pi y}{L}} + B_n e^{-\frac{n\pi y}{L}} $$
    Now apply the homogeneous BC for $Y(y)$: $u(x,0)=0 \implies X(x)Y(0)=0 \implies Y(0)=0$.
    $$ Y_n(0) = A_n e^0 + B_n e^0 = A_n + B_n = 0 \implies B_n = -A_n $$
    So, $Y_n(y) = A_n e^{\frac{n\pi y}{L}} - A_n e^{-\frac{n\pi y}{L}} = A_n \left(e^{\frac{n\pi y}{L}} - e^{-\frac{n\pi y}{L}}\right)$.
    We can rewrite this using the definition of the hyperbolic sine function, $\sinh(z) = \frac{e^z - e^{-z}}{2}$:
    $$ Y_n(y) = 2A_n \sinh\left(\frac{n\pi y}{L}\right) $$
    Let's absorb $2A_n$ into a new constant, say $C_n$.
    $$ Y_n(y) = C_n \sinh\left(\frac{n\pi y}{L}\right) $$
*   **What could go wrong:** Making algebraic errors when solving the ODE. Forgetting to apply the homogeneous boundary condition for $Y(y)$ at $y=0$. Confusing hyperbolic functions with trigonometric functions.

### Step 5: Form the General Solution using Superposition

*   **Plain English:** Since Laplace's equation is linear and homogeneous, if we have many individual solutions, their sum is also a solution. We combine all the $X_n(x)$ and $Y_n(y)$ solutions we found for each $n$ into an infinite sum. This sum is the most general solution that satisfies the homogeneous boundary conditions.
*   **Concrete Example:** If $u_1(x,y) = \sin(\pi x/L) \sinh(\pi y/L)$ and $u_2(x,y) = \sin(2\pi x/L) \sinh(2\pi y/L)$ are solutions, then $u(x,y) = c_1 u_1 + c_2 u_2$ is also a solution. We sum over all possible $n$.
*   **Formal/Mathematical Version:**
    For each $n$, we have a product solution $u_n(x,y) = X_n(x)Y_n(y)$:
    $$ u_n(x,y) = \sin\left(\frac{n\pi x}{L}\right) C_n \sinh\left(\frac{n\pi y}{L}\right) $$
    By the superposition principle, the general solution is an infinite sum of these particular solutions:
    $$ u(x,y) = \sum_{n=1}^{\infty} C_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi y}{L}\right) $$
*   **What could go wrong:** Forgetting to sum over all $n$. Incorrectly writing the product solution.

### Step 6: Apply the Non-Homogeneous Boundary Condition using Fourier Series

*   **Plain English:** We have one last boundary condition to satisfy, the one that is not zero. We plug this condition into our general solution. This will give us an equation where the non-zero boundary function is equal to a Fourier series. We then use the formulas for Fourier coefficients to find the values of $C_n$.
*   **Concrete Example:** Our last BC is $u(x,H) = f(x)$. So, we set $f(x) = \sum_{n=1}^{\infty} C_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi H}{L}\right)$. This is a Fourier sine series for $f(x)$.
*   **Formal/Mathematical Version:**
    Apply the non-homogeneous boundary condition $u(x,H) = f(x)$:
    $$ f(x) = \sum_{n=1}^{\infty} C_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi H}{L}\right) $$
    This is a Fourier sine series for $f(x)$ on the interval $[0, L]$. The coefficients of a Fourier sine series for $f(x)$ are given by:
    $$ b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
    Comparing this to our series, we have $b_n = C_n \sinh\left(\frac{n\pi H}{L}\right)$.
    Therefore, we can solve for $C_n$:
    $$ C_n \sinh\left(\frac{n\pi H}{L}\right) = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
    $$ C_n = \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
    Once $C_n$ are determined, substitute them back into the general solution from Step 5 to get the final solution.
*   **What could go wrong:** Errors in calculating the Fourier coefficients, especially the integral. Forgetting the denominator term $\sinh(n\pi H/L)$. Using the wrong type of Fourier series (sine vs. cosine).

### Step 7: The Final Solution

*   **Plain English:** Once we have all the pieces, we combine them into the complete solution, which is an infinite series.
*   **Formal/Mathematical Version:**
    The solution is:
    $$ u(x,y) = \sum_{n=1}^{\infty} \left( \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx \right) \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi y}{L}\right) $$
    This is often written more compactly as:
    $$ u(x,y) = \sum_{n=1}^{\infty} C_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi y}{L}\right) $$
    where $C_n$ is given by the integral formula above.

## 5. Worked examples — multiple, with every step shown

We will solve Laplace's equation $u_{xx} + u_{yy} = 0$ on a rectangle $0 < x < L$, $0 < y < H$.

### Example 1: One non-zero boundary condition (Easy)

**Problem Statement:**
Find the steady-state temperature $u(x,y)$ in a rectangular plate $0 < x < \pi$, $0 < y < 1$ if three sides are held at $0^\circ C$ and the top side is held at $100^\circ C$.

**Given:**
*   PDE: $u_{xx} + u_{yy} = 0$
*   Domain: $0 < x < \pi$, $0 < y < 1$ (so $L=\pi$, $H=1$)
*   Boundary Conditions:
    1.  $u(0,y) = 0$
    2.  $u(\pi,y) = 0$
    3.  $u(x,0) = 0$
    4.  $u(x,1) = 100$

**What we want:** The function $u(x,y)$.

**Step 1: Assume a separable solution and substitute.**
We assume $u(x,y) = X(x)Y(y)$.
Substituting into the PDE:
$$ X''(x)Y(y) + X(x)Y''(y) = 0 $$
*Explanation:* We're looking for solutions that can be broken into independent parts for $x$ and $y$. This simplifies the partial derivatives into ordinary derivatives.

**Step 2: Separate the variables.**
Divide by $X(x)Y(y)$:
$$ \frac{X''(x)}{X(x)} + \frac{Y''(y)}{Y(y)} = 0 $$
Rearrange:
$$ \frac{X''(x)}{X(x)} = -\frac{Y''(y)}{Y(y)} = \lambda $$
This gives two ODEs:
$$ X''(x) - \lambda X(x) = 0 $$
$$ Y''(y) + \lambda Y(y) = 0 $$
*Explanation:* Since the left side depends only on $x$ and the right side only on $y$, and they are equal, they must both be equal to a constant, $\lambda$.

**Step 3: Apply homogeneous boundary conditions to determine $\lambda$ and $X(x)$.**
The homogeneous BCs are $u(0,y)=0$ and $u(\pi,y)=0$.
From $u(0,y) = X(0)Y(y) = 0 \implies X(0) = 0$.
From $u(\pi,y) = X(\pi)Y(y) = 0 \implies X(\pi) = 0$.
Now solve $X''(x) - \lambda X(x) = 0$ with $X(0)=0$, $X(\pi)=0$.

*   **Case $\lambda = 0$:** $X''(x) = 0 \implies X(x) = c_1 x + c_2$.
    $X(0)=0 \implies c_2 = 0$.
    $X(\pi)=0 \implies c_1 \pi = 0 \implies c_1 = 0$.
    Thus $X(x)=0$ (trivial solution).
*   **Case $\lambda > 0$ (let $\lambda = \mu^2$):** $X''(x) - \mu^2 X(x) = 0 \implies X(x) = c_1 e^{\mu x} + c_2 e^{-\mu x}$.
    $X(0)=0 \implies c_1 + c_2 = 0 \implies c_2 = -c_1$.
    $X(\pi)=0 \implies c_1 e^{\mu \pi} - c_1 e^{-\mu \pi} = 0 \implies c_1 (e^{\mu \pi} - e^{-\mu \pi}) = 0$.
    Since $\mu > 0$, $e^{\mu \pi} - e^{-\mu \pi} \neq 0$, so $c_1 = 0$, which means $c_2 = 0$.
    Thus $X(x)=0$ (trivial solution).
*   **Case $\lambda < 0$ (let $\lambda = -\mu^2$):** $X''(x) + \mu^2 X(x) = 0 \implies X(x) = c_1 \cos(\mu x) + c_2 \sin(\mu x)$.
    $X(0)=0 \implies c_1 = 0$.
    So $X(x) = c_2 \sin(\mu x)$.
    $X(\pi)=0 \implies c_2 \sin(\mu \pi) = 0$. For non-trivial solution ($c_2 \neq 0$), we need $\sin(\mu \pi) = 0$.
    This implies $\mu \pi = n\pi$ for $n=1, 2, 3, \dots$.
    So, $\mu_n = n$.
    The eigenvalues are $\lambda_n = -\mu_n^2 = -n^2$.
    The eigenfunctions are $X_n(x) = \sin(nx)$. (We absorb $c_2$ into a later constant).
*Explanation:* This step is crucial for finding the specific values of the separation constant $\lambda$ that allow non-trivial solutions. The homogeneous boundary conditions turn the ODE into an eigenvalue problem. Only negative values of $\lambda$ yield oscillatory (sine/cosine) solutions that can satisfy zero conditions at two points.

**Step 4: Solve the remaining ODE for $Y(y)$.**
Now we solve $Y''(y) + \lambda Y(y) = 0$ using $\lambda_n = -n^2$:
$$ Y''(y) - n^2 Y(y) = 0 $$
The characteristic equation is $r^2 - n^2 = 0 \implies r = \pm n$.
The general solution is $Y_n(y) = A_n e^{ny} + B_n e^{-ny}$.
Now apply the homogeneous BC $u(x,0)=0 \implies X(x)Y(0)=0 \implies Y(0)=0$.
$$ Y_n(0) = A_n e^0 + B_n e^0 = A_n + B_n = 0 \implies B_n = -A_n $$
So, $Y_n(y) = A_n e^{ny} - A_n e^{-ny} = A_n (e^{ny} - e^{-ny}) = 2A_n \sinh(ny)$.
Let $C_n = 2A_n$.
$$ Y_n(y) = C_n \sinh(ny) $$
*Explanation:* With the determined $\lambda_n$, we solve the second ODE. The homogeneous boundary condition for $Y(y)$ helps simplify the form of the solution, often leading to hyperbolic sine or cosine functions.

**Step 5: Form the general solution using superposition.**
The product solutions are $u_n(x,y) = X_n(x)Y_n(y) = C_n \sin(nx) \sinh(ny)$.
By superposition, the general solution is:
$$ u(x,y) = \sum_{n=1}^{\infty} C_n \sin(nx) \sinh(ny) $$
*Explanation:* Since the PDE is linear and homogeneous, any linear combination (including an infinite sum) of individual solutions is also a solution. This sum is the most general form that satisfies the homogeneous BCs.

**Step 6: Apply the non-homogeneous boundary condition using Fourier series.**
The last BC is $u(x,1) = 100$.
Substitute $y=1$ into the general solution:
$$ u(x,1) = \sum_{n=1}^{\infty} C_n \sin(nx) \sinh(n \cdot 1) = 100 $$
$$ 100 = \sum_{n=1}^{\infty} (C_n \sinh(n)) \sin(nx) $$
This is a Fourier sine series for $f(x)=100$ on the interval $[0, \pi]$.
The Fourier sine coefficients $b_n$ for $f(x)$ on $[0, L]$ are given by:
$$ b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
Here $L=\pi$ and $f(x)=100$:
$$ C_n \sinh(n) = \frac{2}{\pi} \int_0^\pi 100 \sin(nx) dx $$
$$ C_n \sinh(n) = \frac{200}{\pi} \left[ -\frac{\cos(nx)}{n} \right]_0^\pi $$
$$ C_n \sinh(n) = \frac{200}{\pi n} (-\cos(n\pi) - (-\cos(0))) $$
$$ C_n \sinh(n) = \frac{200}{\pi n} (-(-1)^n - (-1)) $$
$$ C_n \sinh(n) = \frac{200}{\pi n} (1 - (-1)^n) $$
If $n$ is even, $1 - (-1)^n = 1 - 1 = 0$.
If $n$ is odd, $1 - (-1)^n = 1 - (-1) = 2$.
So, $C_n \sinh(n) = \begin{cases} \frac{400}{\pi n} & \text{if } n \text{ is odd} \\ 0 & \text{if } n \text{ is even} \end{cases}$.
Thus,
$$ C_n = \frac{400}{\pi n \sinh(n)} \quad \text{for odd } n $$
*Explanation:* The final, non-homogeneous boundary condition provides the specific function that the general solution must match at that boundary. This matching is achieved using Fourier series, where we equate the boundary function to the series and solve for the unknown coefficients using the orthogonality of sine (or cosine) functions.

**Step 7: The Final Solution.**
Substitute $C_n$ back into the general solution, considering only odd $n$:
$$ u(x,y) = \sum_{k=1}^{\infty} \frac{400}{\pi (2k-1) \sinh(2k-1)} \sin((2k-1)x) \sinh((2k-1)y) $$
(Here, we replaced $n$ with $2k-1$ to represent odd numbers).

$$ \boxed{u(x,y) = \frac{400}{\pi} \sum_{n \text{ odd}} \frac{1}{n \sinh(n)} \sin(nx) \sinh(ny)} $$

**Reflection:** This example was straightforward because only one boundary condition was non-zero, and it was a constant, making the Fourier integral relatively simple. The choice of $L=\pi$ also simplified $\mu_n = n$.

---

### Example 2: Non-zero boundary condition on a different side (Medium)

**Problem Statement:**
Find $u(x,y)$ for the rectangular plate $0 < x < L$, $0 < y < H$ with the following boundary conditions:
1.  $u(0,y) = 0$
2.  $u(L,y) = g(y)$
3.  $u(x,0) = 0$
4.  $u(x,H) = 0$

**Given:**
*   PDE: $u_{xx} + u_{yy} = 0$
*   Domain: $0 < x < L$, $0 < y < H$
*   Boundary Conditions:
    1.  $u(0,y) = 0$
    2.  $u(L,y) = g(y)$
    3.  $u(x,0) = 0$
    4.  $u(x,H) = 0$

**What we want:** The function $u(x,y)$.

*Explanation of strategy:* Notice that the homogeneous BCs are now $u(x,0)=0$, $u(x,H)=0$, and $u(0,y)=0$. The non-homogeneous BC is $u(L,y)=g(y)$. This means we should choose $\lambda$ such that the $Y$ equation has oscillatory solutions (sines/cosines) to satisfy $Y(0)=0$ and $Y(H)=0$.

**Step 1: Assume a separable solution and substitute.**
$u(x,y) = X(x)Y(y)$
$$ X''(x)Y(y) + X(x)Y''(y) = 0 $$

**Step 2: Separate the variables.**
$$ \frac{X''(x)}{X(x)} = -\frac{Y''(y)}{Y(y)} = \lambda $$
This gives two ODEs:
$$ X''(x) - \lambda X(x) = 0 $$
$$ Y''(y) + \lambda Y(y) = 0 $$
*Explanation:* The choice of $\lambda$ here is the same as before. However, which ODE gets the oscillatory solution depends on which dimension has the two homogeneous boundary conditions.

**Step 3: Apply homogeneous boundary conditions to determine $\lambda$ and $Y(y)$.**
The homogeneous BCs for $Y(y)$ are $u(x,0)=0$ and $u(x,H)=0$.
From $u(x,0) = X(x)Y(0) = 0 \implies Y(0) = 0$.
From $u(x,H) = X(x)Y(H) = 0 \implies Y(H) = 0$.
Now solve $Y''(y) + \lambda Y(y) = 0$ with $Y(0)=0$, $Y(H)=0$.

*   **Case $\lambda = 0$:** $Y''(y) = 0 \implies Y(y) = c_1 y + c_2$.
    $Y(0)=0 \implies c_2 = 0$.
    $Y(H)=0 \implies c_1 H = 0 \implies c_1 = 0$.
    Thus $Y(y)=0$ (trivial solution).
*   **Case $\lambda > 0$ (let $\lambda = \mu^2$):** $Y''(y) + \mu^2 Y(y) = 0 \implies Y(y) = c_1 \cos(\mu y) + c_2 \sin(\mu y)$.
    $Y(0)=0 \implies c_1 = 0$.
    So $Y(y) = c_2 \sin(\mu y)$.
    $Y(H)=0 \implies c_2 \sin(\mu H) = 0$. For non-trivial solution ($c_2 \neq 0$), we need $\sin(\mu H) = 0$.
    This implies $\mu H = n\pi$ for $n=1, 2, 3, \dots$.
    So, $\mu_n = \frac{n\pi}{H}$.
    The eigenvalues are $\lambda_n = \mu_n^2 = \left(\frac{n\pi}{H}\right)^2$.
    The eigenfunctions are $Y_n(y) = \sin\left(\frac{n\pi y}{H}\right)$.
*   **Case $\lambda < 0$:** Leads to trivial solutions (exponentials cannot satisfy two zero BCs unless coefficients are zero).
*Explanation:* This time, the $Y$ equation is the one yielding eigenvalues and eigenfunctions because it has the two homogeneous boundary conditions. Note that $\lambda$ is positive in this case, meaning $X(x)$ will involve hyperbolic functions.

**Step 4: Solve the remaining ODE for $X(x)$.**
Now we solve $X''(x) - \lambda X(x) = 0$ using $\lambda_n = \left(\frac{n\pi}{H}\right)^2$:
$$ X''(x) - \left(\frac{n\pi}{H}\right)^2 X(x) = 0 $$
The characteristic equation is $r^2 - \left(\frac{n\pi}{H}\right)^2 = 0 \implies r = \pm \frac{n\pi}{H}$.
The general solution is $X_n(x) = A_n e^{\frac{n\pi x}{H}} + B_n e^{-\frac{n\pi x}{H}}$.
Now apply the homogeneous BC $u(0,y)=0 \implies X(0)Y(y)=0 \implies X(0)=0$.
$$ X_n(0) = A_n e^0 + B_n e^0 = A_n + B_n = 0 \implies B_n = -A_n $$
So, $X_n(x) = A_n e^{\frac{n\pi x}{H}} - A_n e^{-\frac{n\pi x}{H}} = A_n \left(e^{\frac{n\pi x}{H}} - e^{-\frac{n\pi x}{H}}\right) = 2A_n \sinh\left(\frac{n\pi x}{H}\right)$.
Let $D_n = 2A_n$.
$$ X_n(x) = D_n \sinh\left(\frac{n\pi x}{H}\right) $$
*Explanation:* The $X$ equation now yields hyperbolic functions, and we use the remaining homogeneous boundary condition to simplify its form.

**Step 5: Form the general solution using superposition.**
The product solutions are $u_n(x,y) = X_n(x)Y_n(y) = D_n \sinh\left(\frac{n\pi x}{H}\right) \sin\left(\frac{n\pi y}{H}\right)$.
By superposition, the general solution is:
$$ u(x,y) = \sum_{n=1}^{\infty} D_n \sinh\left(\frac{n\pi x}{H}\right) \sin\left(\frac{n\pi y}{H}\right) $$

**Step 6: Apply the non-homogeneous boundary condition using Fourier series.**
The last BC is $u(L,y) = g(y)$.
Substitute $x=L$ into the general solution:
$$ u(L,y) = \sum_{n=1}^{\infty} D_n \sinh\left(\frac{n\pi L}{H}\right) \sin\left(\frac{n\pi y}{H}\right) = g(y) $$
$$ g(y) = \sum_{n=1}^{\infty} \left(D_n \sinh\left(\frac{n\pi L}{H}\right)\right) \sin\left(\frac{n\pi y}{H}\right) $$
This is a Fourier sine series for $g(y)$ on the interval $[0, H]$.
The Fourier sine coefficients $b_n$ for $g(y)$ on $[0, H]$ are:
$$ b_n = \frac{2}{H} \int_0^H g(y) \sin\left(\frac{n\pi y}{H}\right) dy $$
So, $D_n \sinh\left(\frac{n\pi L}{H}\right) = \frac{2}{H} \int_0^H g(y) \sin\left(\frac{n\pi y}{H}\right) dy$.
Thus,
$$ D_n = \frac{2}{H \sinh\left(\frac{n\pi L}{H}\right)} \int_0^H g(y) \sin\left(\frac{n\pi y}{H}\right) dy $$

**Step 7: The Final Solution.**
Substitute $D_n$ back into the general solution:
$$ \boxed{u(x,y) = \sum_{n=1}^{\infty} \left( \frac{2}{H \sinh\left(\frac{n\pi L}{H}\right)} \int_0^H g(y) \sin\left(\frac{n\pi y}{H}\right) dy \right) \sinh\left(\frac{n\pi x}{H}\right) \sin\left(\frac{n\pi y}{H}\right)} $$

**Reflection:** This example demonstrates the flexibility of the method. The key is to identify which dimension has the two homogeneous boundary conditions, as that determines which variable's ODE will yield the eigenvalues and eigenfunctions (trigonometric functions) and which will yield hyperbolic functions. The non-homogeneous condition then dictates the Fourier series expansion.

---

### Example 3: Multiple non-zero boundary conditions (Harder - requires superposition of solutions)

**Problem Statement:**
Find $u(x,y)$ for the rectangular plate $0 < x < L$, $0 < y < H$ with the following boundary conditions:
1.  $u(0,y) = 0$
2.  $u(L,y) = 0$
3.  $u(x,0) = f_1(x)$
4.  $u(x,H) = f_2(x)$

**Given:**
*   PDE: $u_{xx} + u_{yy} = 0$
*   Domain: $0 < x < L$, $0 < y < H$
*   Boundary Conditions:
    1.  $u(0,y) = 0$
    2.  $u(L,y) = 0$
    3.  $u(x,0) = f_1(x)$
    4.  $u(x,H) = f_2(x)$

**What we want:** The function $u(x,y)$.

*Explanation of strategy:* When more than one boundary condition is non-zero, we cannot directly apply the method as in Examples 1 and 2. The superposition principle for linear PDEs allows us to break this problem into simpler sub-problems, each with only one non-zero boundary condition.

Let $u(x,y) = u_1(x,y) + u_2(x,y)$.
$u_1(x,y)$ will solve Laplace's equation with BCs:
1.  $u_1(0,y) = 0$
2.  $u_1(L,y) = 0$
3.  $u_1(x,0) = f_1(x)$
4.  $u_1(x,H) = 0$ (homogeneous)

$u_2(x,y)$ will solve Laplace's equation with BCs:
1.  $u_2(0,y) = 0$
2.  $u_2(L,y) = 0$
3.  $u_2(x,0) = 0$ (homogeneous)
4.  $u_2(x,H) = f_2(x)$

Notice that the sum $u_1+u_2$ will satisfy the original boundary conditions. We already solved a problem like $u_2$ in Example 1. We will solve $u_1$ similarly.

**Solution for $u_2(x,y)$ (similar to Example 1):**
*   Homogeneous BCs in $x$: $u_2(0,y)=0$, $u_2(L,y)=0$.
*   Homogeneous BCs in $y$: $u_2(x,0)=0$.
*   Non-homogeneous BC in $y$: $u_2(x,H)=f_2(x)$.

Following Steps 1-5 from Example 1 (but with general $L$ and $H$):
$X_n(x) = \sin\left(\frac{n\pi x}{L}\right)$ with $\lambda_n = -\left(\frac{n\pi}{L}\right)^2$.
$Y_n(y) = C_n \sinh\left(\frac{n\pi y}{L}\right)$.
General solution: $u_2(x,y) = \sum_{n=1}^{\infty} C_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi y}{L}\right)$.
Apply $u_2(x,H)=f_2(x)$:
$f_2(x) = \sum_{n=1}^{\infty} C_n \sinh\left(\frac{n\pi H}{L}\right) \sin\left(\frac{n\pi x}{L}\right)$.
So, $C_n \sinh\left(\frac{n\pi H}{L}\right) = \frac{2}{L} \int_0^L f_2(x) \sin\left(\frac{n\pi x}{L}\right) dx$.
$$ C_n = \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f_2(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
Thus,
$$ u_2(x,y) = \sum_{n=1}^{\infty} C_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi y}{L}\right) $$

**Solution for $u_1(x,y)$ (similar to Example 1, but with $y$ direction reversed):**
*   Homogeneous BCs in $x$: $u_1(0,y)=0$, $u_1(L,y)=0$.
*   Homogeneous BCs in $y$: $u_1(x,H)=0$.
*   Non-homogeneous BC in $y$: $u_1(x,0)=f_1(x)$.

Steps 1-3 are identical to the $u_2$ case (and Example 1):
$X_n(x) = \sin\left(\frac{n\pi x}{L}\right)$ with $\lambda_n = -\left(\frac{n\pi}{L}\right)^2$.
Now, for $Y_n(y)$, we solve $Y''(y) - \left(\frac{n\pi}{L}\right)^2 Y(y) = 0$.
The general solution is $Y_n(y) = A_n e^{\frac{n\pi y}{L}} + B_n e^{-\frac{n\pi y}{L}}$.
Apply the homogeneous BC $u_1(x,H)=0 \implies Y_n(H)=0$.
$$ Y_n(H) = A_n e^{\frac{n\pi H}{L}} + B_n e^{-\frac{n\pi H}{L}} = 0 $$
This means $B_n = -A_n e^{\frac{2n\pi H}{L}}$.
So, $Y_n(y) = A_n e^{\frac{n\pi y}{L}} - A_n e^{\frac{2n\pi H}{L}} e^{-\frac{n\pi y}{L}} = A_n \left(e^{\frac{n\pi y}{L}} - e^{\frac{n\pi (2H-y)}{L}}\right)$.
This form is not standard. A better way to handle the $Y(H)=0$ boundary condition is to use a shifted hyperbolic sine: $\sinh(z)$ is zero at $z=0$, so $\sinh(z-z_0)$ is zero at $z=z_0$.
Let's try $Y_n(y) = A_n \sinh\left(\frac{n\pi (H-y)}{L}\right) + B_n \cosh\left(\frac{n\pi (H-y)}{L}\right)$.
Applying $Y_n(H)=0$:
$A_n \sinh(0) + B_n \cosh(0) = 0 \implies B_n = 0$.
So, $Y_n(y) = A_n \sinh\left(\frac{n\pi (H-y)}{L}\right)$.
*Explanation:* When the homogeneous boundary condition is at $y=H$ instead of $y=0$, using $\sinh(k(H-y))$ is more convenient than $\sinh(ky)$ because $\sinh(k(H-H)) = \sinh(0) = 0$.

General solution for $u_1(x,y)$:
$$ u_1(x,y) = \sum_{n=1}^{\infty} D_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi (H-y)}{L}\right) $$
Apply $u_1(x,0)=f_1(x)$:
$$ f_1(x) = \sum_{n=1}^{\infty} D_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi H}{L}\right) $$
So, $D_n \sinh\left(\frac{n\pi H}{L}\right) = \frac{2}{L} \int_0^L f_1(x) \sin\left(\frac{n\pi x}{L}\right) dx$.
$$ D_n = \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f_1(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
Thus,
$$ u_1(x,y) = \sum_{n=1}^{\infty} D_n \sin\left(\frac{n\pi x}{L}\right) \sinh\left(\frac{n\pi (H-y)}{L}\right) $$

**Step 7: The Final Solution.**
The total solution is $u(x,y) = u_1(x,y) + u_2(x,y)$.
$$ \boxed{u(x,y) = \sum_{n=1}^{\infty} \left[ \left( \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f_1(x) \sin\left(\frac{n\pi x}{L}\right) dx \right) \sinh\left(\frac{n\pi (H-y)}{L}\right) + \left( \frac{2}{L \sinh\left(\frac{n\pi H}{L}\right)} \int_0^L f_2(x) \sin\left(\frac{n\pi x}{L}\right) dx \right) \sinh\left(\frac{n\pi y}{L}\right) \right] \sin\left(\frac{n\pi x}{L}\right)} $$

**Reflection:** This problem highlights the power of the superposition principle. By breaking a problem with multiple non-homogeneous boundary conditions into sub-problems, each with only one non-homogeneous condition, we can apply the standard separation of variables technique. The main trick was recognizing how to adapt the hyperbolic function when the homogeneous BC was at $y=H$ instead of $y=0$.

---

### Example 4: Mixed boundary conditions (Harder - requires Fourier cosine series)

**Problem Statement:**
Find $u(x,y)$ for the rectangular plate $0 < x < L$, $0 < y < H$ with the following boundary conditions:
1.  $u_x(0,y) = 0$ (Neumann BC)
2.  $u_x(L,y) = 0$ (Neumann BC)
3.  $u(x,0) = 0$
4.  $u(x,H) = f(x)$

**Given:**
*   PDE: $u_{xx} + u_{yy} = 0$
*   Domain: $0 < x < L$, $0 < y < H$
*   Boundary Conditions:
    1.  $u_x(0,y) = 0$
    2.  $u_x(L,y) = 0$
    3.  $u(x,0) = 0$
    4.  $u(x,H) = f(x)$

**What we want:** The function $u(x,y)$.

*Explanation of strategy:* The homogeneous BCs are now $u_x(0,y)=0$ and $u_x(L,y)=0$. These are Neumann boundary conditions (specifying the derivative, or flux, at the boundary). This will lead to Fourier cosine series instead of sine series for the $X(x)$ part.

**Step 1: Assume a separable solution and substitute.**
$u(x,y) = X(x)Y(y)$.
$$ X''(x)Y(y) + X(x)Y''(y) = 0 $$

**Step 2: Separate the variables.**
$$ \frac{X''(x)}{X(x)} = -\frac{Y''(y)}{Y(y)} = \lambda $$
This gives two ODEs:
$$ X''(x) - \lambda X(x) = 0 $$
$$ Y''(y) + \lambda Y(y) = 0 $$

**Step 3: Apply homogeneous boundary conditions to determine $\lambda$ and $X(x)$.**
The homogeneous BCs are $u_x(0,y)=0$ and $u_x(L,y)=0$.
From $u_x(0,y) = X'(0)Y(y) = 0 \implies X'(0) = 0$.
From $u_x(L,y) = X'(L)Y(y) = 0 \implies X'(L) = 0$.
Now solve $X''(x) - \lambda X(x) = 0$ with $X'(0)=0$, $X'(L)=0$.

*   **Case $\lambda = 0$:** $X''(x) = 0 \implies X(x) = c_1 x + c_2$.
    $X'(x) = c_1$.
    $X'(0)=0 \implies c_1 = 0$.
    So $X(x) = c_2$. This is a non-trivial solution (a constant). Let $X_0(x) = 1$ (absorb $c_2$ later).
*   **Case $\lambda > 0$ (let $\lambda = \mu^2$):** $X''(x) - \mu^2 X(x) = 0 \implies X(x) = c_1 e^{\mu x} + c_2 e^{-\mu x}$.
    $X'(x) = c_1 \mu e^{\mu x} - c_2 \mu e^{-\mu x}$.
    $X'(0)=0 \implies c_1 \mu - c_2 \mu = 0 \implies c_1 = c_2$.
    So $X(x) = c_1 (e^{\mu x} + e^{-\mu x}) = 2c_1 \cosh(\mu x)$.
    $X'(L)=0 \implies 2c_1 \mu \sinh(\mu L) = 0$.
    Since $\mu > 0$ and $L > 0$, $\sinh(\mu L) \neq 0$. So $c_1 = 0$.
    Thus $X(x)=0$ (trivial solution).
*   **Case $\lambda < 0$ (let $\lambda = -\mu^2$):** $X''(x) + \mu^2 X(x) = 0 \implies X(x) = c_1 \cos(\mu x) + c_2 \sin(\mu x)$.
    $X'(x) = -c_1 \mu \sin(\mu x) + c_2 \mu \cos(\mu x)$.
    $X'(0)=0 \implies c_2 \mu = 0 \implies c_2 = 0$.
    So $X(x) = c_1 \cos(\mu x)$.
    $X'(L)=0 \implies -c_1 \mu \sin(\mu L) = 0$. For non-trivial solution ($c_1 \neq 0$), we need $\sin(\mu L) = 0$.
    This implies $\mu L = n\pi$ for $n=1, 2, 3, \dots$. (Note: $n=0$ corresponds to $\mu=0$, which is the $\lambda=0$ case we already found).
    So, $\mu_n = \frac{n\pi}{L}$.
    The eigenvalues are $\lambda_n = -\mu_n^2 = -\left(\frac{n\pi}{L}\right)^2$.
    The eigenfunctions are $X_n(x) = \cos\left(\frac{n\pi x}{L}\right)$. (We absorb $c_1$ into a later constant).
*Explanation:* Neumann BCs (derivatives are zero) lead to cosine eigenfunctions and also permit a $\lambda=0$ case that yields a constant solution. This is typical for Fourier cosine series.

**Step 4: Solve the remaining ODE for $Y(y)$.**
We have two cases for $\lambda$: $\lambda_0 = 0$ and $\lambda_n = -\left(\frac{n\pi}{L}\right)^2$ for $n=1,2,3,\dots$.

*   **For $\lambda_0 = 0$:** $Y''(y) + 0 \cdot Y(y) = 0 \implies Y''(y) = 0$.
    $Y_0(y) = A_0 y + B_0$.
    Apply homogeneous BC $u(x,0)=0 \implies Y_0(0)=0$.
    $Y_0(0) = A_0(0) + B_0 = 0 \implies B_0 = 0$.
    So, $Y_0(y) = A_0 y$.
*   **For $\lambda_n = -\left(\frac{n\pi}{L}\right)^2$ (for $n \ge 1$):** $Y''(y) - \left(\frac{n\pi}{L}\right)^2 Y(y) = 0$.
    The general solution is $Y_n(y) = A_n e^{\frac{n\pi y}{L}} + B_n e^{-\frac{n\pi y}{L}}$.
    Apply homogeneous BC $u(x,0)=0 \implies Y_n(0)=0$.
    $Y_n(0) = A_n + B_n = 0 \implies B_n = -A_n$.
    So, $Y_n(y) = A_n \left(e^{\frac{n\pi y}{L}} - e^{-\frac{n\pi y}{L}}\right) = 2A_n \sinh\left(\frac{n\pi y}{L}\right)$.
    Let $C_n = 2A_n$.
    $Y_n(y) = C