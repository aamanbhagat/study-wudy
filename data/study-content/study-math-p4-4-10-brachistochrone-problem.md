## 1. What it is — in plain English

Imagine you have a marble and you want to roll it from one point to another, say from the edge of a table down to a spot on the floor. You can choose any path for it to follow – a straight line, a gentle curve, or even a crazy loop-de-loop. The "Brachistochrone problem" asks: what shape should the path be so that the marble gets from the starting point to the end point in the *absolute shortest amount of time*?

It's a common misconception that the shortest distance (a straight line) would also be the fastest path. But think about a ski jump: you don't just slide down a straight ramp. You curve downwards significantly at the start to build up speed quickly, even if it means traveling a slightly longer distance overall. That initial burst of speed can make a huge difference.

The Brachistochrone problem is about finding that optimal curve. It's like designing the perfect slide for a playground, not for maximum fun, but for the quickest possible ride from top to bottom. It turns out the fastest path isn't a straight line, nor is it a simple arc. It's a very specific curve called a "cycloid," which is the path a point on the rim of a rolling wheel traces out.

So, in essence, it's a race: find the path that lets gravity do its work most efficiently to accelerate the object, allowing it to cover the distance in the least possible time. This problem was a major driving force in the development of a whole branch of mathematics called the Calculus of Variations.

## 2. Why it matters — real-world applications

The Brachistochrone problem, and the field of mathematics it helped spawn (Calculus of Variations), has profound implications across many scientific and engineering disciplines.

1.  **Aerospace Engineering & Optimal Trajectories:** When designing trajectories for spacecraft, rockets, or even aircraft, engineers often need to find paths that minimize fuel consumption, minimize time to reach a destination, or maximize payload. For instance, a spacecraft re-entering Earth's atmosphere might follow a path that minimizes heating or G-forces, which are variations of optimal path problems. The principles developed for the Brachistochrone problem are directly applicable to solving these "optimal control" problems, which are crucial for companies like SpaceX or NASA in mission planning.

2.  **Optics and Light Propagation (Fermat's Principle):** Light, when traveling through different media (like air and water), doesn't always take the shortest path. Instead, it takes the path that requires the *least time*. This is known as Fermat's Principle. The Brachistochrone problem is a mechanical analogue of this optical principle. Understanding this helps in designing lenses, fiber optics, and other optical instruments by predicting how light will bend and travel. Companies like Zeiss or Canon rely on these fundamental principles for their advanced camera lenses and optical systems.

3.  **Roller Coaster Design and Amusement Parks:** While not always strictly minimizing time, roller coaster designers use principles from optimal path problems to create thrilling and safe rides. The initial drop of many roller coasters often resembles a cycloid or a similar curve to maximize acceleration and speed buildup quickly, providing an exhilarating experience while managing forces on the riders. This ensures a smooth and fast ride, connecting directly to the goal of the Brachistochrone problem.

4.  **Robotics and Automation:** In robotics, especially for tasks requiring precision and speed (e.g., robotic arms on an assembly line, surgical robots), finding the fastest path for a robot's end-effector to move from one point to another is critical. This involves optimizing the robot's joint movements and velocities to achieve a minimum-time trajectory, often subject to constraints like motor torque limits or obstacle avoidance. Companies like Boston Dynamics or ABB Robotics extensively use optimal control algorithms, which are rooted in variational principles, to make their robots perform efficiently.

## 3. Prerequisites — what you must know first

To fully grasp the Brachistochrone problem and its solution, you need a solid foundation in several areas of university mathematics and physics. If any of these concepts are unfamiliar, it's essential to pause and review them.

*   **Differential Calculus:**
    *   **Derivatives:** Understanding rates of change, slopes of tangents ($dy/dx$ or $y'$).
    *   **Chain Rule:** Differentiating composite functions.
    *   **Partial Derivatives:** Differentiating functions of multiple variables with respect to one variable, treating others as constants.
*   **Integral Calculus:**
    *   **Definite Integrals:** Calculating areas under curves, accumulation.
    *   **Integration Techniques:** Substitution, integration by parts, trigonometric substitution.
    *   **Fundamental Theorem of Calculus:** The relationship between differentiation and integration.
*   **Physics (Classical Mechanics):**
    *   **Kinematics:** Equations of motion, velocity, acceleration.
    *   **Conservation of Energy:** The principle that total mechanical energy (potential + kinetic) remains constant in an isolated system without non-conservative forces (like friction).
    *   **Potential Energy (Gravitational):** $PE = mgh$.
    *   **Kinetic Energy:** $KE = \frac{1}{2}mv^2$.
*   **Differential Equations:**
    *   **First-Order ODEs:** Techniques for solving separable, linear, and exact differential equations.
    *   **Second-Order ODEs:** Understanding general solutions and initial/boundary value problems.
*   **Parametric Equations:**
    *   Describing curves using a parameter (e.g., $x(t)$, $y(t)$).
    *   Understanding how to differentiate and integrate functions defined parametrically.
*   **Trigonometry:**
    *   Basic identities (e.g., $\sin^2\theta + \cos^2\theta = 1$).
    *   Inverse trigonometric functions.
    *   Parametric forms of standard curves (like circles).
*   **Calculus of Variations (Introduction):** This is the most direct prerequisite.
    *   **Functionals:** Understanding that a functional is a "function of a function" – it takes a function as input and returns a real number (e.g., the length of a curve, the area of a surface, the time taken for a path).
    *   **Euler-Lagrange Equation:** The fundamental equation used to find the function that extremizes (minimizes or maximizes) a functional. You don't need to know its full derivation beforehand, but you must be familiar with its form and how to apply it.

## 4. The core idea — step by step

The core idea of solving the Brachistochrone problem is to frame it as a minimization problem within the Calculus of Variations. We want to find a function $y(x)$ (the path) that minimizes the *time* taken for a particle to travel between two points.

### Step 1: Define the problem mathematically

*   **Plain English:** We want to find a path $y(x)$ between two points $(x_1, y_1)$ and $(x_2, y_2)$ such that a particle, starting from rest at $(x_1, y_1)$ and sliding without friction under gravity, reaches $(x_2, y_2)$ in the shortest possible time. Let's assume $(x_1, y_1) = (0, 0)$ for simplicity, meaning the particle starts at the origin and moves downwards, so $y$ will be negative or we can define $y$ as the vertical distance *fallen*. For consistency with standard physics, let's assume the starting point is at $(0, h)$ and the end point is $(x_f, y_f)$, where $y_f < h$. Or, more commonly, define the starting point at $(0,0)$ and let $y$ be the vertical *descent* distance, so $y$ increases downwards. Let's stick to the latter: start at $(0,0)$, and $y$ increases downwards.
*   **Small concrete example:** Imagine a particle starting at $(0,0)$ and ending at $(10, 5)$ (where $y=5$ means 5 units below the starting height). We need to find the curve $y(x)$ that connects these two points and minimizes the travel time.
*   **Formal/Mathematical Version:** The time taken to travel an infinitesimal distance $ds$ is $dt = \frac{ds}{v}$, where $v$ is the instantaneous speed. To find the total time $T$, we integrate this along the path:
    $$T = \int_{path} \frac{ds}{v}$$
    The infinitesimal arc length $ds$ for a curve $y(x)$ is given by:
    $$ds = \sqrt{(dx)^2 + (dy)^2} = \sqrt{1 + \left(\frac{dy}{dx}\right)^2} dx = \sqrt{1 + (y')^2} dx$$
    So the integral becomes:
    $$T = \int_{x_1}^{x_2} \frac{\sqrt{1 + (y')^2}}{v} dx$$
*   **What could go wrong:** Confusing $ds$ with $dx$ or $dy$. Forgetting that $v$ is not constant and depends on the position.

### Step 2: Relate speed to position using conservation of energy

*   **Plain English:** As the particle slides down the curve, its gravitational potential energy is converted into kinetic energy. We can use this principle to find its speed at any point on the path, assuming it starts from rest.
*   **Small concrete example:** If a marble starts from rest at height $H$ and rolls down to height $h$, its speed will be determined by the difference in height, $H-h$. The lower it goes, the faster it gets.
*   **Formal/Mathematical Version:** Let the particle start from rest at $(x_1, y_1) = (0,0)$. We define $y$ as increasing downwards, so the initial height is $y=0$. At any point $(x,y)$ on the path, the particle has fallen a vertical distance $y$.
    By conservation of mechanical energy (initial potential energy + initial kinetic energy = final potential energy + final kinetic energy):
    $$PE_{initial} + KE_{initial} = PE_{final} + KE_{final}$$
    Assuming $PE = mgy$ (where $y$ is depth below start) and $KE = \frac{1}{2}mv^2$:
    $$mg(0) + \frac{1}{2}m(0)^2 = mg(-y) + \frac{1}{2}mv^2$$
    Wait, this is confusing. Let's redefine $y$ as height *above* a reference, so initial height is $y_0$ and current height is $y$. Then $PE = mgy$.
    $$mgy_0 + 0 = mgy + \frac{1}{2}mv^2$$
    $$mg(y_0 - y) = \frac{1}{2}mv^2$$
    $$v^2 = 2g(y_0 - y)$$
    $$v = \sqrt{2g(y_0 - y)}$$
    For the Brachistochrone problem, it's common to set the starting point at the origin $(0,0)$ and define $y$ as the vertical distance *fallen*, so $y$ is positive and increases downwards. In this convention, the initial height is $0$, and the height at a point is $-y$. The vertical distance fallen is $y$.
    So, $PE_{initial} = 0$. $PE_{final} = -mgy$. The change in potential energy is $0 - (-mgy) = mgy$.
    This change in potential energy is converted into kinetic energy:
    $$mgy = \frac{1}{2}mv^2$$
    $$v^2 = 2gy$$
    $$v = \sqrt{2gy}$$
    This is valid for a particle starting from rest at $y=0$ and falling to depth $y$.
*   **What could go wrong:** Incorrectly applying conservation of energy, using the wrong reference point for potential energy, or forgetting the initial condition (starts from rest).

### Step 3: Substitute speed into the time functional

*   **Plain English:** Now we have an expression for speed $v$ that depends on the vertical position $y$. We can plug this into our total time integral, so the integral now only depends on the path $y(x)$ and its derivative $y'(x)$.
*   **Small concrete example:** We found $v = \sqrt{2gy}$ and $ds = \sqrt{1+(y')^2} dx$. Combining them gives the full expression for time.
*   **Formal/Mathematical Version:** Substitute $v = \sqrt{2gy}$ into the time integral:
    $$T = \int_{x_1}^{x_2} \frac{\sqrt{1 + (y')^2}}{\sqrt{2gy}} dx$$
    We can pull out the constant $\frac{1}{\sqrt{2g}}$:
    $$T = \frac{1}{\sqrt{2g}} \int_{x_1}^{x_2} \frac{\sqrt{1 + (y')^2}}{\sqrt{y}} dx$$
    This is a functional of the form $T[y(x)] = \int_{x_1}^{x_2} F(y, y') dx$, where $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y}}$.
*   **What could go wrong:** Algebraic errors during substitution, or misidentifying the function $F(y, y')$.

### Step 4: Apply the Euler-Lagrange equation

*   **Plain English:** The Euler-Lagrange equation is the fundamental tool from the Calculus of Variations that tells us how to find the function $y(x)$ that minimizes (or maximizes) a functional of the form $\int F(x, y, y') dx$. It's like finding where the derivative is zero in ordinary calculus, but for functions of functions.
*   **Small concrete example:** If you want to find the minimum of $f(x) = x^2$, you set $f'(x)=0$. Here, we want to find the "minimum" of $T[y(x)]$, so we apply the Euler-Lagrange equation to $F(y, y')$.
*   **Formal/Mathematical Version:** The Euler-Lagrange equation is:
    $$\frac{\partial F}{\partial y} - \frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right) = 0$$
    Our function is $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y}}$.
    First, calculate the partial derivatives:
    $$\frac{\partial F}{\partial y} = \frac{\partial}{\partial y} \left( (1 + (y')^2)^{1/2} y^{-1/2} \right) = (1 + (y')^2)^{1/2} \left(-\frac{1}{2} y^{-3/2}\right) = -\frac{\sqrt{1 + (y')^2}}{2y^{3/2}}$$
    $$\frac{\partial F}{\partial y'} = \frac{\partial}{\partial y'} \left( (1 + (y')^2)^{1/2} y^{-1/2} \right) = y^{-1/2} \left(\frac{1}{2} (1 + (y')^2)^{-1/2} (2y')\right) = \frac{y'}{\sqrt{y}\sqrt{1 + (y')^2}}$$
    Now, substitute these into the Euler-Lagrange equation. This will result in a second-order ordinary differential equation (ODE).
*   **What could go wrong:** Errors in partial differentiation, especially with chain rule, or incorrect substitution into the E-L equation.

### Step 5: Solve the resulting differential equation (using a trick)

*   **Plain English:** The ODE from Step 4 is usually very difficult to solve directly. However, we notice that our $F$ function, $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y}}$, does *not* explicitly depend on $x$. When $F$ does not depend on $x$, there's a special first integral of the Euler-Lagrange equation, often called the Beltrami identity. This simplifies the problem significantly.
*   **Small concrete example:** If you had an ODE like $y'' = f(y)$, you could multiply by $y'$ and integrate to reduce its order. The Beltrami identity is a more general version of such a trick for variational problems.
*   **Formal/Mathematical Version:** The Beltrami identity states that if $F$ does not explicitly depend on $x$ (i.e., $\frac{\partial F}{\partial x} = 0$), then the Euler-Lagrange equation simplifies to:
    $$F - y'\frac{\partial F}{\partial y'} = C$$
    where $C$ is a constant.
    Let's substitute our $F$ and $\frac{\partial F}{\partial y'}$:
    $$\frac{\sqrt{1 + (y')^2}}{\sqrt{y}} - y' \left( \frac{y'}{\sqrt{y}\sqrt{1 + (y')^2}} \right) = C$$
    $$\frac{\sqrt{1 + (y')^2}}{\sqrt{y}} - \frac{(y')^2}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
    To combine these terms, find a common denominator:
    $$\frac{(1 + (y')^2) - (y')^2}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
    $$\frac{1}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
    Let's rearrange this. Squaring both sides might be helpful later, or isolate $y'$.
    $$\sqrt{y}\sqrt{1 + (y')^2} = \frac{1}{C}$$
    Let $\frac{1}{C} = \sqrt{2a}$ (a common substitution in this problem, where $a$ is a constant related to the radius of the cycloid).
    $$\sqrt{y}\sqrt{1 + (y')^2} = \sqrt{2a}$$
    $$y(1 + (y')^2) = 2a$$
    $$1 + (y')^2 = \frac{2a}{y}$$
    $$(y')^2 = \frac{2a}{y} - 1 = \frac{2a - y}{y}$$
    $$y' = \frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$$
*   **What could go wrong:** Algebraic errors in applying the Beltrami identity, or forgetting to use the identity when $F$ doesn't depend on $x$. Incorrectly handling the square root (e.g., forgetting the $\pm$ sign, though physical intuition often dictates the direction).

### Step 6: Solve the first-order differential equation

*   **Plain English:** We now have a first-order separable ODE: $\frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$. This can be solved by separating variables and integrating. This is the trickiest part algebraically and often requires a clever trigonometric substitution.
*   **Small concrete example:** If you had $\frac{dy}{dx} = \frac{x}{y}$, you'd separate to $y dy = x dx$ and integrate. Here, it's more complex due to the square root and $y$ in the denominator.
*   **Formal/Mathematical Version:**
    $$\frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$$
    $$\frac{dx}{dy} = \sqrt{\frac{y}{2a - y}}$$
    $$dx = \sqrt{\frac{y}{2a - y}} dy$$
    Now, integrate both sides. This integral is notoriously difficult without a specific substitution. A common substitution is to let $y = a(1 - \cos\theta)$. This substitution is inspired by the parametric form of a cycloid.
    If $y = a(1 - \cos\theta)$:
    $$dy = a\sin\theta d\theta$$
    Also, $2a - y = 2a - a(1 - \cos\theta) = a(2 - 1 + \cos\theta) = a(1 + \cos\theta)$.
    Substitute these into the integral for $dx$:
    $$dx = \sqrt{\frac{a(1 - \cos\theta)}{a(1 + \cos\theta)}} (a\sin\theta d\theta)$$
    $$dx = \sqrt{\frac{1 - \cos\theta}{1 + \cos\theta}} (a\sin\theta d\theta)$$
    Using half-angle identities: $1 - \cos\theta = 2\sin^2(\theta/2)$ and $1 + \cos\theta = 2\cos^2(\theta/2)$.
    $$dx = \sqrt{\frac{2\sin^2(\theta/2)}{2\cos^2(\theta/2)}} (a\sin\theta d\theta)$$
    $$dx = \sqrt{\tan^2(\theta/2)} (a\sin\theta d\theta)$$
    $$dx = \tan(\theta/2) (a\sin\theta d\theta)$$
    Now, use $\tan(\theta/2) = \frac{\sin(\theta/2)}{\cos(\theta/2)}$ and $\sin\theta = 2\sin(\theta/2)\cos(\theta/2)$:
    $$dx = \frac{\sin(\theta/2)}{\cos(\theta/2)} (a \cdot 2\sin(\theta/2)\cos(\theta/2) d\theta)$$
    $$dx = 2a \sin^2(\theta/2) d\theta$$
    Again, use a half-angle identity: $\sin^2(\theta/2) = \frac{1 - \cos\theta}{2}$.
    $$dx = 2a \left(\frac{1 - \cos\theta}{2}\right) d\theta$$
    $$dx = a(1 - \cos\theta) d\theta$$
    Now, integrate $dx$ to find $x$:
    $$\int dx = \int a(1 - \cos\theta) d\theta$$
    $$x = a(\theta - \sin\theta) + K$$
    If we assume the particle starts at $(0,0)$, then when $y=0$, $\theta=0$ (from $y = a(1 - \cos\theta)$). This implies $x=0$ when $\theta=0$, so $K=0$.
    Thus, we have the parametric equations for the path:
    $$x(\theta) = a(\theta - \sin\theta)$$
    $$y(\theta) = a(1 - \cos\theta)$$
*   **What could go wrong:** Forgetting the appropriate trigonometric substitution, making algebraic errors during the substitution, or incorrect integration. Not handling the integration constant correctly based on initial conditions.

### Step 7: Recognize the cycloid

*   **Plain English:** The parametric equations we just derived, $x(\theta) = a(\theta - \sin\theta)$ and $y(\theta) = a(1 - \cos\theta)$, are precisely the parametric equations for a cycloid. This is the curve traced by a point on the circumference of a circle of radius $a$ as it rolls along a straight line.
*   **Small concrete example:** Imagine a bicycle wheel rolling along the ground. A reflector on its rim traces out a cycloid. Our solution says this is the fastest path.
*   **Formal/Mathematical Version:** The derived equations:
    $$x(\theta) = a(\theta - \sin\theta)$$
    $$y(\theta) = a(1 - \cos\theta)$$
    These are the standard parametric equations for a cycloid generated by a circle of radius $a$, where $\theta$ is the angle through which the generating circle has rolled. The constant $a$ is related to the constant $C$ from the Beltrami identity. The value of $a$ is determined by the boundary conditions (the start and end points of the path).
*   **What could go wrong:** Not recognizing the standard form of a cycloid, or misinterpreting the parameter $\theta$ or the constant $a$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Setting up the functional for a general Brachistochrone problem

**Problem:** A particle starts from rest at point $P_1(x_1, y_1)$ and slides without friction under gravity to point $P_2(x_2, y_2)$. Assume $y$ increases upwards, so $P_1$ is at a higher elevation than $P_2$. Set up the integral functional that represents the total time taken for the particle to travel along an arbitrary path $y(x)$ between $P_1$ and $P_2$.

**Given:**
*   Start point: $P_1(x_1, y_1)$
*   End point: $P_2(x_2, y_2)$
*   Particle starts from rest.
*   No friction.
*   Gravity acts downwards.
*   $y$ increases upwards.

**What we want:** The functional $T[y(x)] = \int_{x_1}^{x_2} F(x, y, y') dx$.

**Step-by-step solution:**

1.  **Define infinitesimal time $dt$:**
    The time taken to travel an infinitesimal arc length $ds$ is $dt = \frac{ds}{v}$.
    *This is the fundamental definition of time as distance over speed.*

2.  **Express $ds$ in terms of $dx$ and $dy$:**
    For a curve $y(x)$, the infinitesimal arc length $ds$ is given by:
    $$ds = \sqrt{(dx)^2 + (dy)^2}$$
    We can factor out $dx^2$ from the square root:
    $$ds = \sqrt{dx^2 \left(1 + \left(\frac{dy}{dx}\right)^2\right)} = \sqrt{1 + \left(\frac{dy}{dx}\right)^2} dx$$
    Let $y' = \frac{dy}{dx}$.
    $$ds = \sqrt{1 + (y')^2} dx$$
    *This converts the path length into a form dependent on the function $y(x)$ and its derivative.*

3.  **Determine the speed $v$ using conservation of energy:**
    The particle starts from rest at height $y_1$. At any point $(x,y)$ on the path, its height is $y$. The vertical distance fallen is $y_1 - y$.
    By conservation of energy:
    $KE_{initial} + PE_{initial} = KE_{final} + PE_{final}$
    $0 + mgy_1 = \frac{1}{2}mv^2 + mgy$
    *The initial kinetic energy is zero because the particle starts from rest. The initial potential energy is $mgy_1$. The final kinetic energy is $\frac{1}{2}mv^2$ and final potential energy is $mgy$.*

    Rearrange to solve for $v$:
    $mgy_1 - mgy = \frac{1}{2}mv^2$
    $mg(y_1 - y) = \frac{1}{2}mv^2$
    Divide by $m$:
    $g(y_1 - y) = \frac{1}{2}v^2$
    $v^2 = 2g(y_1 - y)$
    $v = \sqrt{2g(y_1 - y)}$
    *We take the positive square root because speed is always positive. This shows that speed depends on the current height relative to the starting height.*

4.  **Substitute $ds$ and $v$ into the total time integral:**
    $$T = \int_{x_1}^{x_2} \frac{ds}{v} = \int_{x_1}^{x_2} \frac{\sqrt{1 + (y')^2} dx}{\sqrt{2g(y_1 - y)}}$$
    Pull out the constant $\frac{1}{\sqrt{2g}}$:
    $$T = \frac{1}{\sqrt{2g}} \int_{x_1}^{x_2} \frac{\sqrt{1 + (y')^2}}{\sqrt{y_1 - y}} dx$$
    *This is the functional we need to minimize. The function inside the integral is $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y_1 - y}}$.*

**Final Answer:**
$$ \boxed{T[y(x)] = \frac{1}{\sqrt{2g}} \int_{x_1}^{x_2} \frac{\sqrt{1 + (y'(x))^2}}{\sqrt{y_1 - y(x)}} dx} $$

**Reflection:** This example highlights the crucial first step: correctly setting up the functional. Any error here would propagate through the entire solution. The key is to remember the definition of arc length and apply conservation of energy carefully, paying attention to the coordinate system (whether $y$ increases up or down).

---

### Example 2: Applying Euler-Lagrange for a simpler functional (Shortest Path)

**Problem:** Find the curve $y(x)$ that connects two points $(x_1, y_1)$ and $(x_2, y_2)$ and has the shortest length. This is a simpler variational problem, often called the "Brachistochrone of light" or the geodesic problem in a flat plane. Apply the Euler-Lagrange equation to the functional $L[y(x)] = \int_{x_1}^{x_2} \sqrt{1 + (y')^2} dx$ to find the curve.

**Given:**
*   Functional: $L[y(x)] = \int_{x_1}^{x_2} \sqrt{1 + (y')^2} dx$
*   Boundary conditions: $y(x_1) = y_1$, $y(x_2) = y_2$.

**What we want:** The function $y(x)$ that minimizes $L$.

**Step-by-step solution:**

1.  **Identify the integrand $F$:**
    From the given functional, $F(x, y, y') = \sqrt{1 + (y')^2}$.
    *This is the function we will use in the Euler-Lagrange equation.*

2.  **Notice the independence of $F$ on $x$ and $y$:**
    The function $F$ depends only on $y'$. It does not explicitly depend on $x$ or $y$.
    *This observation allows for simplification of the Euler-Lagrange equation.*

3.  **Apply the Euler-Lagrange equation:**
    The general Euler-Lagrange equation is:
    $$\frac{\partial F}{\partial y} - \frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right) = 0$$
    *This is the fundamental equation from Calculus of Variations.*

4.  **Calculate the partial derivatives:**
    Since $F = \sqrt{1 + (y')^2}$:
    $$\frac{\partial F}{\partial y} = \frac{\partial}{\partial y} \left( \sqrt{1 + (y')^2} \right) = 0$$
    *Because $F$ does not contain $y$, its partial derivative with respect to $y$ is zero.*

    $$\frac{\partial F}{\partial y'} = \frac{\partial}{\partial y'} \left( (1 + (y')^2)^{1/2} \right) = \frac{1}{2} (1 + (y')^2)^{-1/2} (2y') = \frac{y'}{\sqrt{1 + (y')^2}}$$
    *This is the derivative of $F$ with respect to $y'$, treating $y$ and $x$ as constants.*

5.  **Substitute into the Euler-Lagrange equation:**
    $$0 - \frac{d}{dx}\left(\frac{y'}{\sqrt{1 + (y')^2}}\right) = 0$$
    This implies:
    $$\frac{d}{dx}\left(\frac{y'}{\sqrt{1 + (y')^2}}\right) = 0$$
    *Since the derivative of the expression with respect to $x$ is zero, the expression itself must be a constant.*

6.  **Integrate the resulting equation:**
    $$\frac{y'}{\sqrt{1 + (y')^2}} = C_1$$
    where $C_1$ is an arbitrary constant.
    *This is a first-order ODE. We need to solve for $y'$.*

7.  **Solve for $y'$:**
    Square both sides:
    $$(y')^2 = C_1^2 (1 + (y')^2)$$
    $$(y')^2 = C_1^2 + C_1^2 (y')^2$$
    $$(y')^2 - C_1^2 (y')^2 = C_1^2$$
    $$(y')^2 (1 - C_1^2) = C_1^2$$
    $$(y')^2 = \frac{C_1^2}{1 - C_1^2}$$
    $$y' = \pm \sqrt{\frac{C_1^2}{1 - C_1^2}}$$
    Since $C_1$ is an arbitrary constant, $\sqrt{\frac{C_1^2}{1 - C_1^2}}$ is also just a constant. Let's call it $m$.
    $$y' = m$$
    *This means the slope of the curve is constant.*

8.  **Integrate $y'$ to find $y(x)$:**
    $$\frac{dy}{dx} = m$$
    $$\int dy = \int m dx$$
    $$y(x) = mx + C_2$$
    *This is the equation of a straight line.*

**Final Answer:**
$$ \boxed{y(x) = mx + C_2} $$

**Reflection:** This example demonstrates the power of the Euler-Lagrange equation. Even without knowing the answer beforehand, the mathematical machinery leads directly to the intuitive result that the shortest path between two points in a plane is a straight line. The independence of $F$ on $y$ (and $x$) simplifies the E-L equation significantly.

---

### Example 3: Deriving the first integral for the Brachistochrone problem

**Problem:** For the Brachistochrone problem, we derived the functional $T = \frac{1}{\sqrt{2g}} \int_{x_1}^{x_2} \frac{\sqrt{1 + (y')^2}}{\sqrt{y}} dx$. Using the Euler-Lagrange equation and the special case where $F$ does not depend on $x$, derive the first-order differential equation for $y'$. Assume the particle starts at $(0,0)$ and $y$ increases downwards.

**Given:**
*   Functional: $T[y(x)] = \frac{1}{\sqrt{2g}} \int_{x_1}^{x_2} F(y, y') dx$, where $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y}}$.
*   Start point: $(0,0)$ with $y$ increasing downwards.

**What we want:** The first-order ODE for $y'$.

**Step-by-step solution:**

1.  **Identify the integrand $F$:**
    The integrand is $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y}}$. We can ignore the constant factor $\frac{1}{\sqrt{2g}}$ during minimization, as it doesn't affect the shape of the curve.
    *This is the function we need to apply the Euler-Lagrange equation to.*

2.  **Notice the independence of $F$ on $x$:**
    The function $F$ does not explicitly depend on $x$. This means $\frac{\partial F}{\partial x} = 0$.
    *This is a key observation that allows us to use the Beltrami identity (first integral of E-L).*

3.  **Apply the Beltrami Identity (First Integral of Euler-Lagrange):**
    Since $F$ does not depend on $x$, the Euler-Lagrange equation $\frac{\partial F}{\partial y} - \frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right) = 0$ has a first integral:
    $$F - y'\frac{\partial F}{\partial y'} = C$$
    where $C$ is a constant.
    *This identity significantly simplifies solving the E-L equation by reducing it to a first-order ODE.*

4.  **Calculate $\frac{\partial F}{\partial y'}$:**
    $$F = (1 + (y')^2)^{1/2} y^{-1/2}$$
    $$\frac{\partial F}{\partial y'} = \frac{\partial}{\partial y'} \left( (1 + (y')^2)^{1/2} y^{-1/2} \right)$$
    $$ = y^{-1/2} \cdot \frac{1}{2} (1 + (y')^2)^{-1/2} \cdot (2y')$$
    $$ = \frac{y'}{\sqrt{y}\sqrt{1 + (y')^2}}$$
    *Careful application of the chain rule and power rule for differentiation.*

5.  **Substitute $F$ and $\frac{\partial F}{\partial y'}$ into the Beltrami Identity:**
    $$\frac{\sqrt{1 + (y')^2}}{\sqrt{y}} - y' \left( \frac{y'}{\sqrt{y}\sqrt{1 + (y')^2}} \right) = C$$
    *This is the direct substitution into the identity.*

6.  **Simplify the expression:**
    $$\frac{\sqrt{1 + (y')^2}}{\sqrt{y}} - \frac{(y')^2}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
    To combine the terms, find a common denominator:
    $$\frac{(1 + (y')^2) - (y')^2}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
    $$\frac{1}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
    *The numerator simplifies nicely, leading to a much cleaner expression.*

7.  **Rearrange to isolate $y'$:**
    $$\sqrt{y}\sqrt{1 + (y')^2} = \frac{1}{C}$$
    Let $\frac{1}{C} = \sqrt{2a}$ (this is a common substitution to simplify the final parametric form, where $a$ is a positive constant).
    $$\sqrt{y}\sqrt{1 + (y')^2} = \sqrt{2a}$$
    Square both sides:
    $$y(1 + (y')^2) = 2a$$
    Divide by $y$:
    $$1 + (y')^2 = \frac{2a}{y}$$
    Subtract 1:
    $$(y')^2 = \frac{2a}{y} - 1$$
    $$(y')^2 = \frac{2a - y}{y}$$
    Take the square root:
    $$y' = \frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$$
    *This is the first-order differential equation we sought. We take the positive root because $y$ is increasing (particle is moving downwards, $dy/dx > 0$ for positive $x$).*

**Final Answer:**
$$ \boxed{\frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}} $$

**Reflection:** This example demonstrates the power of the Beltrami identity. Without it, solving the full second-order Euler-Lagrange equation would be significantly more complex. The choice of constant $\sqrt{2a}$ is a foresightful step that simplifies the subsequent integration to yield the standard cycloid form.

---

### Example 4: Solving the first-order ODE to obtain the cycloid parametric form

**Problem:** Given the first-order differential equation from the Brachistochrone problem: $\frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$, solve it to find the parametric equations for $x$ and $y$ in terms of a new parameter $\theta$. Assume the starting point is $(0,0)$ and $y$ increases downwards.

**Given:**
*   Differential equation: $\frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$
*   Boundary condition: $y(0) = 0$.

**What we want:** Parametric equations $x(\theta)$ and $y(\theta)$.

**Step-by-step solution:**

1.  **Separate variables:**
    Rewrite the ODE to separate $dx$ and $dy$:
    $$dx = \frac{dy}{\sqrt{\frac{2a - y}{y}}} = \sqrt{\frac{y}{2a - y}} dy$$
    *This prepares the equation for integration.*

2.  **Introduce a trigonometric substitution:**
    The form $\sqrt{\frac{y}{2a - y}}$ suggests a trigonometric substitution related to circles or half-angles. A standard substitution for this type of integral is $y = a(1 - \cos\theta)$.
    *This substitution is key and often requires prior knowledge or a flash of insight. It's motivated by the anticipated cycloid solution.*

3.  **Calculate $dy$ in terms of $\theta$ and $d\theta$:**
    If $y = a(1 - \cos\theta)$, then:
    $$dy = a\frac{d}{d\theta}(1 - \cos\theta) d\theta = a(0 - (-\sin\theta)) d\theta = a\sin\theta d\theta$$
    *Differentiating the substitution to replace $dy$.*

4.  **Calculate $2a - y$ in terms of $\theta$:**
    $$2a - y = 2a - a(1 - \cos\theta) = a(2 - (1 - \cos\theta)) = a(1 + \cos\theta)$$
    *Simplifying the term under the square root.*

5.  **Substitute $y$, $dy$, and $2a-y$ into the separated $dx$ equation:**
    $$dx = \sqrt{\frac{a(1 - \cos\theta)}{a(1 + \cos\theta)}} (a\sin\theta d\theta)$$
    $$dx = \sqrt{\frac{1 - \cos\theta}{1 + \cos\theta}} (a\sin\theta d\theta)$$
    *All terms are now in terms of $\theta$.*

6.  **Simplify the square root using half-angle identities:**
    Recall the half-angle identities:
    $1 - \cos\theta = 2\sin^2(\theta/2)$
    $1 + \cos\theta = 2\cos^2(\theta/2)$
    Substitute these into the square root:
    $$\sqrt{\frac{1 - \cos\theta}{1 + \cos\theta}} = \sqrt{\frac{2\sin^2(\theta/2)}{2\cos^2(\theta/2)}} = \sqrt{\tan^2(\theta/2)} = |\tan(\theta/2)|$$
    For the Brachistochrone problem, we typically consider the first quadrant of the cycloid where $\theta \in [0, \pi]$, so $\tan(\theta/2) \ge 0$. Thus, $|\tan(\theta/2)| = \tan(\theta/2)$.
    So, $dx = \tan(\theta/2) (a\sin\theta d\theta)$.
    *This is a common trigonometric simplification step.*

7.  **Further simplify using more trigonometric identities:**
    Recall $\tan(\theta/2) = \frac{\sin(\theta/2)}{\cos(\theta/2)}$ and $\sin\theta = 2\sin(\theta/2)\cos(\theta/2)$.
    $$dx = \frac{\sin(\theta/2)}{\cos(\theta/2)} (a \cdot 2\sin(\theta/2)\cos(\theta/2) d\theta)$$
    $$dx = 2a \sin^2(\theta/2) d\theta$$
    Now, use the identity $\sin^2(\theta/2) = \frac{1 - \cos\theta}{2}$:
    $$dx = 2a \left(\frac{1 - \cos\theta}{2}\right) d\theta$$
    $$dx = a(1 - \cos\theta) d\theta$$
    *These steps transform the integrand into a form that is easy to integrate.*

8.  **Integrate $dx$ to find $x(\theta)$:**
    $$\int dx = \int a(1 - \cos\theta) d\theta$$
    $$x(\theta) = a(\theta - \sin\theta) + K$$
    *Standard integration of $1$ and $\cos\theta$.*

9.  **Apply boundary conditions to find the integration constant $K$:**
    The particle starts at $(0,0)$. From our substitution $y = a(1 - \cos\theta)$, if $y=0$, then $a(1 - \cos\theta) = 0$, which implies $1 - \cos\theta = 0$, so $\cos\theta = 1$. The smallest positive $\theta$ for this is $\theta = 0$.
    At the start point $(x,y) = (0,0)$, we have $\theta = 0$.
    Substitute $x=0$ and $\theta=0$ into the equation for $x(\theta)$:
    $$0 = a(0 - \sin(0)) + K$$
    $$0 = a(0 - 0) + K$$
    $$K = 0$$
    *The constant of integration is zero, meaning the cycloid starts at the origin.*

10. **State the parametric equations:**
    With $K=0$, we have:
    $$x(\theta) = a(\theta - \sin\theta)$$
    And from our substitution:
    $$y(\theta) = a(1 - \cos\theta)$$
    *These are the standard parametric equations for a cycloid.*

**Final Answer:**
$$ \boxed{x(\theta) = a(\theta - \sin\theta)} $$
$$ \boxed{y(\theta) = a(1 - \cos\theta)} $$

**Reflection:** This example is the culmination of the Brachistochrone problem's solution. It showcases a challenging integral that requires a specific trigonometric substitution and careful application of identities. The constant $a$ (which came from $1/C$) determines the "size" of the cycloid, and its value would be fixed by the second boundary condition (the end point $(x_2, y_2)$). This is a beautiful result, demonstrating how abstract mathematical tools lead to a concrete, elegant physical solution.

## 6. Common mistakes and traps

1.  **Confusing shortest distance with shortest time:** This is the most fundamental conceptual error. Students often intuitively think a straight line is the fastest path. The Brachistochrone problem explicitly shows this is incorrect due to the varying speed of the particle.
2.  **Incorrect application of conservation of energy:**
    *   Forgetting the particle starts from rest ($KE_{initial}=0$).
    *   Using the wrong reference for potential energy (e.g., if $y$ increases upwards, the height fallen is $y_1 - y$; if $y$ increases downwards from $y=0$, the height fallen is $y$).
    *   Forgetting the factor of $1/2$ in kinetic energy or $g$ in potential energy.
3.  **Algebraic errors in the Euler-Lagrange equation:**
    *   Incorrectly calculating partial derivatives $\frac{\partial F}{\partial y}$ or $\frac{\partial F}{\partial y'}$. These often involve chain rule and negative exponents.
    *   Errors in taking the total derivative $\frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right)$, especially if $\frac{\partial F}{\partial y'}$ still contains $y$ or $y'$.
4.  **Forgetting to use the Beltrami Identity:** When $F$ does not explicitly depend on $x$, the Euler-Lagrange equation simplifies to $F - y'\frac{\partial F}{\partial y'} = C$. Forgetting this shortcut leads to a much more complex second-order ODE that is harder to solve.
5.  **Errors in trigonometric substitutions and identities:** The final integration step to solve the first-order ODE for $y'$ (i.e., $\frac{dy}{dx} = \sqrt{\frac{2a-y}{y}}$) heavily relies on the substitution $y = a(1 - \cos\theta)$ and subsequent trigonometric identities (half-angle, double-angle). Mistakes here are very common.
6.  **Incorrectly handling integration constants:** Forgetting to include integration constants or incorrectly determining their values from boundary conditions can lead to incorrect or incomplete solutions.

## 7. Textbook-precise explanation

The **Brachistochrone problem** (from Greek *brachistos*, "shortest," and *chronos*, "time") is a classic problem in the **Calculus of Variations**. It seeks to determine the path between two points, $P_1(x_1, y_1)$ and $P_2(x_2, y_2)$, that a frictionless particle, starting from rest at $P_1$ and moving under the influence of uniform gravity, will traverse in the shortest possible time.

Let the particle start at $P_1 = (0,0)$ and let the $y$-axis point downwards, so $y \ge 0$. The particle's speed $v$ at any point $(x,y)$ on the path is determined by the conservation of mechanical energy. If it starts from rest at $y=0$, then its potential energy $PE = -mgy$ (relative to $y=0$) is converted to kinetic energy $KE = \frac{1}{2}mv^2$. Thus, $mgy = \frac{1}{2}mv^2$, which yields $v = \sqrt{2gy}$.

The time $T$ taken for the particle to travel along an infinitesimal arc length $ds$ is $dt = \frac{ds}{v}$. For a curve $y(x)$, the arc length element is $ds = \sqrt{(dx)^2 + (dy)^2} = \sqrt{1 + (y'(x))^2} dx$, where $y'(x) = \frac{dy}{dx}$.

Substituting these into the integral for total time $T$:
$$T[y(x)] = \int_{x_1}^{x_2} \frac{\sqrt{1 + (y'(x))^2}}{\sqrt{2gy(x)}} dx$$
This is a functional of the form $T[y(x)] = \frac{1}{\sqrt{2g}} \int_{x_1}^{x_2} F(y(x), y'(x)) dx$, where the integrand is $F(y, y') = \frac{\sqrt{1 + (y')^2}}{\sqrt{y}}$.

To find the function $y(x)$ that minimizes this functional, we apply the **Euler-Lagrange equation**:
$$\frac{\partial F}{\partial y} - \frac{d}{dx}\left(\frac{\partial F}{\partial y'}\right) = 0$$
Since $F$ does not explicitly depend on $x$ (i.e., $\frac{\partial F}{\partial x} = 0$), we can use the **Beltrami identity** (a first integral of the Euler-Lagrange equation):
$$F - y'\frac{\partial F}{\partial y'} = C$$
where $C$ is a constant.

Calculating the necessary partial derivative:
$$\frac{\partial F}{\partial y'} = \frac{\partial}{\partial y'} \left( (1 + (y')^2)^{1/2} y^{-1/2} \right) = y^{-1/2} \cdot \frac{1}{2} (1 + (y')^2)^{-1/2} (2y') = \frac{y'}{\sqrt{y}\sqrt{1 + (y')^2}}$$
Substituting $F$ and $\frac{\partial F}{\partial y'}$ into the Beltrami identity:
$$\frac{\sqrt{1 + (y')^2}}{\sqrt{y}} - y' \left( \frac{y'}{\sqrt{y}\sqrt{1 + (y')^2}} \right) = C$$
$$\frac{1 + (y')^2 - (y')^2}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
$$\frac{1}{\sqrt{y}\sqrt{1 + (y')^2}} = C$$
Rearranging and letting $\frac{1}{C} = \sqrt{2a}$ (where $a$ is a constant related to the radius of the generating circle):
$$y(1 + (y')^2) = 2a$$
$$(y')^2 = \frac{2a - y}{y}$$
$$\frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$$
This is a first-order separable ordinary differential equation. To solve it, we separate variables:
$$dx = \sqrt{\frac{y}{2a - y}} dy$$
A standard substitution to integrate this form is $y = a(1 - \cos\theta)$. This implies $dy = a\sin\theta d\theta$. Substituting these into the integral for $dx$:
$$dx = \sqrt{\frac{a(1 - \cos\theta)}{a(1 + \cos\theta)}} (a\sin\theta d\theta) = \sqrt{\frac{1 - \cos\theta}{1 + \cos\theta}} (a\sin\theta d\theta)$$
Using the half-angle identities $1 - \cos\theta = 2\sin^2(\theta/2)$ and $1 + \cos\theta = 2\cos^2(\theta/2)$, and $\sin\theta = 2\sin(\theta/2)\cos(\theta/2)$:
$$dx = \sqrt{\frac{2\sin^2(\theta/2)}{2\cos^2(\theta/2)}} (a \cdot 2\sin(\theta/2)\cos(\theta/2) d\theta) = \tan(\theta/2) (2a\sin(\theta/2)\cos(\theta/2) d\theta)$$
$$dx = \frac{\sin(\theta/2)}{\cos(\theta/2)} (2a\sin(\theta/2)\cos(\theta/2) d\theta) = 2a\sin^2(\theta/2) d\theta$$
Using the identity $\sin^2(\theta/2) = \frac{1 - \cos\theta}{2}$:
$$dx = 2a \left(\frac{1 - \cos\theta}{2}\right) d\theta = a(1 - \cos\theta) d\theta$$
Integrating both sides:
$$x = \int a(1 - \cos\theta) d\theta = a(\theta - \sin\theta) + K$$
Assuming the particle starts at $(0,0)$, then when $y=0$, $\theta=0$ (from $y = a(1 - \cos\theta)$). Substituting these into the equation for $x$ gives $K=0$.
Thus, the parametric equations for the path are:
$$x(\theta) = a(\theta - \sin\theta)$$
$$y(\theta) = a(1 - \cos\theta)$$
These are the standard parametric equations for a **cycloid**, the curve traced by a point on the circumference of a circle of radius $a$ as it rolls along a straight line. The constant $a$ is determined by the specific boundary conditions $(x_1, y_1)$ and $(x_2, y_2)$.

**Reference:**
*   Gelfand, I. M., & Fomin, S. V. (2000). *Calculus of Variations*. Dover Publications. (Chapter 2, Section 2.1, Example 1)
*   Arfken, G. B., Weber, H. J., & Harris, F. E. (2012). *Mathematical Methods for Physicists* (7th ed.). Academic Press. (Chapter 17, Section 17.2)

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to illustrate the concept.

```text
       Start Point P1 (0,0)
       .
       |\
       | \  (Straight line - shortest distance, but not fastest time)
       |  \
       |   \
       |    \
       |     \
       |      \
       |       \
       |        \
       |         \
       |          \  (Cycloid - the Brachistochrone, fastest time)
       |           \
       |            \
       |             \
       |              \
       |               . End Point P2 (X,Y)
       |               
       V Gravity
```
This diagram shows two paths between a start point P1 and an end point P2. The straight dashed line represents the shortest distance. The curved solid line represents the cycloid, which is the path of shortest time (Brachistochrone). It dips lower than the straight line initially to gain speed.

```text
       _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _