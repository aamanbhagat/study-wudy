## 1. What it is — in plain English

Imagine you're driving from your home to a friend's house. There are many possible routes you could take: the shortest route, the scenic route, the route with the least traffic, or even a ridiculously long, winding one. Which route do you usually pick? Often, you try to find the "best" route based on some criteria, like minimizing travel time or distance.

Nature, it turns out, seems to do something similar. When a particle or a system moves from one state to another, it doesn't just pick any random path. Instead, it seems to "choose" a specific path out of all the infinitely many possible paths it *could* take.

Hamilton's principle, often called the Principle of Least Action, states that the path a physical system actually follows between two points in time is the one for which a special quantity, called "action," is "stationary." Think of "stationary" as being at a minimum, maximum, or a saddle point, but most often it turns out to be a minimum.

This "action" isn't a simple distance or time. It's a calculated value that takes into account the system's kinetic energy (energy of motion) and potential energy (stored energy) over the entire duration of its journey. So, in essence, nature is a superb optimizer, always finding the most "efficient" or "natural" way to evolve.

## 2. Why it matters — real-world applications

Hamilton's principle is not just a theoretical curiosity; it's a profound and unifying principle that underpins vast areas of physics and engineering, leading to practical applications across various fields.

1.  **Aerospace Engineering (Optimal Trajectories):** When launching rockets, satellites, or designing interplanetary missions, engineers need to calculate the most fuel-efficient and timely trajectories. Hamilton's principle, through its derived equations of motion (Euler-Lagrange equations), provides the fundamental framework for optimal control theory. This allows for the precise calculation of paths that minimize fuel consumption or travel time, crucial for missions by agencies like NASA or SpaceX, ensuring payloads reach their destinations efficiently and safely.

2.  **Quantum Mechanics and Field Theory (Fundamental Laws):** While initially formulated for classical mechanics, Hamilton's principle has a deep connection to quantum mechanics. Richard Feynman's path integral formulation of quantum mechanics is a direct generalization of the principle of least action. Instead of a single path, it considers *all possible paths* a particle can take, assigning a probability amplitude to each, with the classical path being the one that dominates the sum. In quantum field theory, the fundamental equations governing elementary particles and forces (like the Standard Model) are derived from a Lagrangian density and an action principle, demonstrating its role in describing the universe at its most fundamental level.

3.  **Robotics and Control Systems (Efficient Movement):** Designing robots that move smoothly, efficiently, and with minimal energy expenditure is a complex task. Hamilton's principle provides a powerful tool for deriving the equations of motion for multi-jointed robotic arms or autonomous vehicles. Engineers use variational methods, inspired by the principle, to program robots to execute tasks (e.g., picking up an object, navigating a terrain) along paths that optimize performance metrics like speed, energy, or accuracy. This is a core component of advanced robotics and automation, used by companies developing industrial robots or self-driving cars.

4.  **Machine Learning (Variational Inference):** In advanced machine learning, particularly in Bayesian methods, variational inference is a technique used to approximate intractable probability distributions. This often involves minimizing a "variational free energy" or "KL divergence," which can be seen as an optimization problem where one seeks to find the "best" approximating distribution. While not directly minimizing "action" in the physical sense, the mathematical machinery of calculus of variations, which is central to Hamilton's principle, provides a conceptual and sometimes direct framework for solving these optimization problems in complex probabilistic models.

## 3. Prerequisites — what you must know first

Before diving deep into Hamilton's principle, a solid foundation in several key mathematical and physics concepts is essential. If any of these feel unfamiliar, it's highly recommended to pause and review them.

*   **Calculus of Variations:** This is the *most critical* prerequisite. Hamilton's principle is fundamentally an application of the calculus of variations. You must understand how to find functions that extremize (minimize or maximize) a functional (an integral whose integrand depends on a function and its derivatives). This includes understanding the Euler-Lagrange equation.
    *   *One-line explanation:* A branch of mathematics concerned with finding functions that optimize integrals (functionals).

*   **Lagrangian Mechanics:** Hamilton's principle is the foundation upon which Lagrangian mechanics is built. You should be familiar with the concepts of generalized coordinates, generalized velocities, kinetic energy ($T$), potential energy ($V$), and the Lagrangian ($L = T - V$).
    *   *One-line explanation:* A reformulation of classical mechanics using generalized coordinates and the Lagrangian function, often simplifying problem-solving.

*   **Classical Mechanics (Newtonian):** A strong grasp of Newton's laws of motion, concepts of force, momentum, work, kinetic energy, and potential energy in a Cartesian coordinate system is necessary to appreciate how Hamilton's principle provides an alternative and often more powerful formulation.
    *   *One-line explanation:* The study of motion and its causes, based on Newton's laws, describing the behavior of macroscopic objects.

*   **Multivariable Calculus:** Essential for understanding partial derivatives (e.g., $\frac{\partial L}{\partial q}$, $\frac{\partial L}{\partial \dot{q}}$), line integrals, and surface integrals, which appear in the context of generalized coordinates and fields.
    *   *One-line explanation:* Calculus extended to functions of multiple variables, involving partial derivatives and multiple integrals.

*   **Differential Equations:** The Euler-Lagrange equations derived from Hamilton's principle are differential equations. You need to be able to solve ordinary differential equations (ODEs), particularly second-order ODEs, to find the actual paths of motion.
    *   *One-line explanation:* Equations involving derivatives of an unknown function, used to model dynamic systems.

*   **Vector Calculus:** While not as directly central as Calculus of Variations, understanding gradients, divergence, and curl can provide a deeper appreciation for how forces and fields are represented and how energy functions are constructed.
    *   *One-line explanation:* Calculus extended to vector fields, dealing with operations like gradient, divergence, and curl.

## 4. The core idea — step by step

Let's break down Hamilton's principle into its fundamental components, building from intuition to formal mathematics.

### Step 1: Paths and Trajectories

*   **Plain English Statement:** Imagine a particle starting at a specific point in space at a specific time, and ending at another specific point in space at another specific time. There are countless ways, or "paths," it *could* travel between these two points. We are interested in finding the one path it *actually* takes.

*   **Small Concrete Example:** Think of throwing a ball from your hand (point A, time $t_1$) to a catcher's mitt (point B, time $t_2$). The ball follows a parabolic arc. But mathematically, you could imagine a path where the ball briefly shoots straight up, then zig-zags, then drops down to the mitt. This is a "possible" path, even if it's not the physical one.

*   **Formal/Mathematical Version:** We describe the position of a particle (or the configuration of a system) using generalized coordinates, denoted by $q_i(t)$. For a single particle in 1D, it's just $q(t)$. A "path" or "trajectory" is then a function $q(t)$ that describes its position as a function of time, subject to fixed initial and final conditions: $q(t_1) = q_1$ and $q(t_2) = q_2$.

    $$ q(t) $$
    where $t_1 \le t \le t_2$.

*   **What Could Go Wrong:** A common mistake is to confuse the *actual* physical path with any arbitrary mathematical function that connects the two endpoints. Hamilton's principle tells us how to *select* the physical path from the infinite possibilities.

### Step 2: The Lagrangian

*   **Plain English Statement:** For any given system at any given moment, we can calculate a special "score" that reflects its energy state. This score, called the Lagrangian, is simply the difference between the system's kinetic energy (energy of motion) and its potential energy (stored energy due to position or configuration).

*   **Small Concrete Example:** Consider a simple mass $m$ attached to a spring, oscillating horizontally. Its kinetic energy is $T = \frac{1}{2}m\dot{x}^2$ (where $\dot{x}$ is its velocity). Its potential energy, stored in the spring, is $V = \frac{1}{2}kx^2$ (where $k$ is the spring constant and $x$ is its displacement from equilibrium). The Lagrangian for this system at any instant is $L = T - V = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2$.

*   **Formal/Mathematical Version:** The Lagrangian, $L$, is a function of the generalized coordinates $q_i$, their time derivatives (generalized velocities) $\dot{q}_i$, and possibly time $t$ explicitly. It is defined as:

    $$ L(q_i, \dot{q}_i, t) = T(q_i, \dot{q}_i, t) - V(q_i, t) $$
    where $T$ is the total kinetic energy and $V$ is the total potential energy of the system.

*   **What Could Go Wrong:** The most frequent error here is getting the sign wrong: it's *kinetic minus potential*, not the other way around, and not kinetic plus potential (which would be the Hamiltonian, a different concept). Also, ensure you use generalized coordinates and velocities correctly.

### Step 3: The Action

*   **Plain English Statement:** If the Lagrangian is a "scorecard" for an instant, the "action" is the *total score* accumulated over an entire path, from the start time to the end time. We calculate it by adding up (integrating) the Lagrangian's value along the entire path. Each possible path will have its own unique total action value.

*   **Small Concrete Example:** For our thrown ball, we can imagine calculating its kinetic energy minus potential energy at every tiny moment along its path. Summing all these instantaneous values from the moment it leaves your hand until it hits the mitt gives you the total action for *that specific path*. If the ball took a different, wiggly path, the sum of $T-V$ along that path would be a different total action.

*   **Formal/Mathematical Version:** The action, $S$, is a functional (a function of a function) that takes a path $q(t)$ as its input and outputs a single scalar value. It is defined as the time integral of the Lagrangian along that path:

    $$ S[q(t)] = \int_{t_1}^{t_2} L(q(t), \dot{q}(t), t) dt $$
    The square brackets around $q(t)$ emphasize that $S$ depends on the *entire function* $q(t)$, not just a single value.

*   **What Could Go Wrong:** Forgetting that $S$ is an integral over time, or confusing the Lagrangian $L$ (an instantaneous value) with the action $S$ (an accumulated value over a path). The integration limits $t_1$ and $t_2$ are fixed.

### Step 4: Hamilton's Principle (Principle of Stationary Action)

*   **Plain English Statement:** Out of all the infinitely many possible paths a system could take from point A at time $t_1$ to point B at time $t_2$, the path that the system *actually* follows is the one for which the total action ($S$) is "stationary." This usually means the action is a minimum for the actual path, but more generally, it means the action doesn't change for small variations around that path.

*   **Small Concrete Example:** Imagine you have a valley with many possible paths down. The water will always flow down the path of steepest descent, which locally minimizes its potential energy. Hamilton's principle is similar but for the "action" functional. The thrown ball doesn't take a wiggly path; it takes the smooth, parabolic path that makes its total action value a minimum (or stationary).

*   **Formal/Mathematical Version:** Hamilton's Principle states that for a physical system, the path $q(t)$ taken between two fixed points $(q_1, t_1)$ and $(q_2, t_2)$ is such that the variation of the action functional is zero:

    $$ \delta S = 0 $$
    Here, $\delta S$ represents a "variation" of the action. It means that if we consider a tiny deviation from the actual path, the change in the action for that tiny deviation is zero, similar to how the derivative of a function is zero at a minimum or maximum. The endpoints $q(t_1)$ and $q(t_2)$ are held fixed during this variation.

*   **What Could Go Wrong:** A common misconception is to assume "least action" *always* means a global minimum. While often true in classical mechanics, mathematically it's a *stationary* point. The term "least action" is historical and generally holds for sufficiently short time intervals.

### Step 5: Deriving Euler-Lagrange Equations

*   **Plain English Statement:** "Stationary action" is a mathematical condition. To find the specific path $q(t)$ that satisfies this condition, we use a powerful mathematical tool from the Calculus of Variations. This tool gives us a set of differential equations, called the Euler-Lagrange equations, which are the actual equations of motion for the system. Solving these equations reveals the physical path.

*   **Small Concrete Example:** If we apply the Euler-Lagrange equation to our simple mass-spring system, it will yield the equation $m\ddot{x} + kx = 0$, which is precisely Hooke's law in differential form, describing simple harmonic motion. This means Hamilton's principle correctly reproduces the known physics.

*   **Formal/Mathematical Version:** Given the action $S[q(t)] = \int_{t_1}^{t_2} L(q(t), \dot{q}(t), t) dt$, the condition $\delta S = 0$ leads directly to the Euler-Lagrange equation for each generalized coordinate $q_i$:

    $$ \frac{\partial L}{\partial q_i} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) = 0 $$
    This equation is a second-order ordinary differential equation (ODE) for $q_i(t)$. Solving this ODE, subject to the initial and final conditions, gives the actual physical trajectory $q_i(t)$.

*   **What Could Go Wrong:** This step involves careful differentiation. Errors often arise from:
    1.  Confusing partial derivatives ($\frac{\partial L}{\partial q_i}$ and $\frac{\partial L}{\partial \dot{q}_i}$) with total derivatives.
    2.  Incorrectly applying the chain rule when calculating $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right)$. Remember that $\frac{\partial L}{\partial \dot{q}_i}$ itself might be a function of $q_i$, $\dot{q}_i$, and $t$, so its total time derivative will involve multiple terms.

## 5. Worked examples — multiple, with every step shown

We will now apply Hamilton's principle to derive the equations of motion for various systems.

### Example 1: Free Particle in One Dimension

**Problem:** A particle of mass $m$ moves freely along the x-axis. Use Hamilton's principle to find its equation of motion.

**Given:**
*   Mass of particle: $m$
*   Position: $x(t)$
*   No external forces (free particle), so potential energy $V=0$.

**Want:** The equation of motion, $\frac{\partial L}{\partial x} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right) = 0$.

**Solution:**

1.  **Identify Kinetic Energy (T):**
    For a particle moving in one dimension, the kinetic energy is given by:
    $$ T = \frac{1}{2}m\dot{x}^2 $$
    *Explanation: Kinetic energy depends on mass and the square of velocity. Here, velocity is $\dot{x}$.*

2.  **Identify Potential Energy (V):**
    The problem states it's a "free particle" with no external forces. Therefore, the potential energy is zero:
    $$ V = 0 $$
    *Explanation: Potential energy is associated with forces. No forces means no potential energy.*

3.  **Formulate the Lagrangian (L):**
    The Lagrangian is defined as $L = T - V$.
    $$ L(x, \dot{x}) = \frac{1}{2}m\dot{x}^2 - 0 = \frac{1}{2}m\dot{x}^2 $$
    *Explanation: Substitute the expressions for T and V into the definition of L.*

4.  **Calculate $\frac{\partial L}{\partial x}$:**
    We need to find the partial derivative of $L$ with respect to $x$. Since $L = \frac{1}{2}m\dot{x}^2$ does not explicitly depend on $x$:
    $$ \frac{\partial L}{\partial x} = \frac{\partial}{\partial x}\left(\frac{1}{2}m\dot{x}^2\right) = 0 $$
    *Explanation: The term $\dot{x}$ is treated as independent of $x$ for partial differentiation.*

5.  **Calculate $\frac{\partial L}{\partial \dot{x}}$:**
    We need to find the partial derivative of $L$ with respect to $\dot{x}$.
    $$ \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2\right) = m\dot{x} $$
    *Explanation: Differentiate $\frac{1}{2}m\dot{x}^2$ with respect to $\dot{x}$ using the power rule.*

6.  **Calculate $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right)$:**
    Now we take the total time derivative of the result from the previous step.
    $$ \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right) = \frac{d}{dt}(m\dot{x}) = m\ddot{x} $$
    *Explanation: $m$ is a constant. The time derivative of velocity ($\dot{x}$) is acceleration ($\ddot{x}$).*

7.  **Apply the Euler-Lagrange Equation:**
    Substitute the calculated terms into the Euler-Lagrange equation: $\frac{\partial L}{\partial x} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right) = 0$.
    $$ 0 - m\ddot{x} = 0 $$
    $$ \boxed{m\ddot{x} = 0} $$
    *Explanation: This is Newton's second law ($F=ma$) for a free particle, where $F=0$. It implies that the acceleration is zero, meaning the particle moves with constant velocity.*

**Reflection:** This example was straightforward because the potential energy was zero and the Lagrangian was simple. It demonstrates how Hamilton's principle correctly yields Newton's first law (or second law with zero force). The trickiness, if any, often comes from careful differentiation.

---

### Example 2: Simple Harmonic Oscillator (Mass-Spring System)

**Problem:** A particle of mass $m$ is attached to a spring with spring constant $k$, oscillating along the x-axis. Use Hamilton's principle to find its equation of motion. Assume the equilibrium position is $x=0$.

**Given:**
*   Mass of particle: $m$
*   Position: $x(t)$
*   Spring constant: $k$

**Want:** The equation of motion.

**Solution:**

1.  **Identify Kinetic Energy (T):**
    For a particle oscillating in one dimension, the kinetic energy is:
    $$ T = \frac{1}{2}m\dot{x}^2 $$
    *Explanation: Standard formula for kinetic energy.*

2.  **Identify Potential Energy (V):**
    The potential energy stored in a spring, when displaced by $x$ from equilibrium, is:
    $$ V = \frac{1}{2}kx^2 $$
    *Explanation: This is the elastic potential energy, proportional to the square of the displacement.*

3.  **Formulate the Lagrangian (L):**
    $$ L(x, \dot{x}) = T - V = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2 $$
    *Explanation: Substitute T and V into the definition of L.*

4.  **Calculate $\frac{\partial L}{\partial x}$:**
    Differentiate $L$ with respect to $x$:
    $$ \frac{\partial L}{\partial x} = \frac{\partial}{\partial x}\left(\frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2\right) = 0 - \frac{1}{2}k(2x) = -kx $$
    *Explanation: The term $\frac{1}{2}m\dot{x}^2$ does not depend on $x$, so its partial derivative is 0. The derivative of $-\frac{1}{2}kx^2$ with respect to $x$ is $-kx$.*

5.  **Calculate $\frac{\partial L}{\partial \dot{x}}$:**
    Differentiate $L$ with respect to $\dot{x}$:
    $$ \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2\right) = \frac{1}{2}m(2\dot{x}) - 0 = m\dot{x} $$
    *Explanation: The term $-\frac{1}{2}kx^2$ does not depend on $\dot{x}$, so its partial derivative is 0. The derivative of $\frac{1}{2}m\dot{x}^2$ with respect to $\dot{x}$ is $m\dot{x}$.*

6.  **Calculate $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right)$:**
    Take the total time derivative of $m\dot{x}$:
    $$ \frac{d}{dt}\left(m\dot{x}\right) = m\ddot{x} $$
    *Explanation: $m$ is constant. The time derivative of velocity ($\dot{x}$) is acceleration ($\ddot{x}$).*

7.  **Apply the Euler-Lagrange Equation:**
    Substitute the calculated terms into $\frac{\partial L}{\partial x} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right) = 0$:
    $$ -kx - m\ddot{x} = 0 $$
    Rearranging the terms:
    $$ \boxed{m\ddot{x} + kx = 0} $$
    *Explanation: This is the well-known differential equation for a simple harmonic oscillator, which is a direct consequence of Hooke's Law ($F = -kx$) and Newton's second law ($F=ma$).*

**Reflection:** This example shows how Hamilton's principle elegantly derives Hooke's law. The key is correctly identifying both kinetic and potential energy and performing the derivatives carefully.

---

### Example 3: Particle in a Uniform Gravitational Field (Projectile Motion)

**Problem:** A particle of mass $m$ moves in a two-dimensional vertical plane (x-y plane) under the influence of a uniform gravitational field. Use Hamilton's principle to find its equations of motion. Assume gravity acts in the negative y-direction.

**Given:**
*   Mass of particle: $m$
*   Position: $(x(t), y(t))$
*   Acceleration due to gravity: $g$ (constant)

**Want:** The equations of motion for $x(t)$ and $y(t)$.

**Solution:**

1.  **Identify Kinetic Energy (T):**
    For a particle moving in two dimensions, the kinetic energy is:
    $$ T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) $$
    *Explanation: Kinetic energy is $\frac{1}{2}mv^2$, and in 2D, $v^2 = \dot{x}^2 + \dot{y}^2$.*

2.  **Identify Potential Energy (V):**
    The potential energy due to a uniform gravitational field is $mgy$, where $y$ is the height.
    $$ V = mgy $$
    *Explanation: Potential energy increases with height. We define the reference point for potential energy (e.g., $y=0$) such that it is $mgy$.*

3.  **Formulate the Lagrangian (L):**
    $$ L(x, y, \dot{x}, \dot{y}) = T - V = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy $$
    *Explanation: Substitute T and V into the definition of L.*

4.  **Apply Euler-Lagrange for $x$ coordinate:**
    The Euler-Lagrange equation for $x$ is: $\frac{\partial L}{\partial x} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right) = 0$.

    *   **Calculate $\frac{\partial L}{\partial x}$:**
        $$ \frac{\partial L}{\partial x} = \frac{\partial}{\partial x}\left(\frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy\right) = 0 $$
        *Explanation: $L$ does not explicitly depend on $x$.*

    *   **Calculate $\frac{\partial L}{\partial \dot{x}}$:**
        $$ \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy\right) = m\dot{x} $$
        *Explanation: Differentiate $\frac{1}{2}m\dot{x}^2$ with respect to $\dot{x}$. Other terms are independent of $\dot{x}$.*

    *   **Calculate $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{x}}\right)$:**
        $$ \frac{d}{dt}(m\dot{x}) = m\ddot{x} $$
        *Explanation: Time derivative of $m\dot{x}$ is $m\ddot{x}$.*

    *   **Substitute into E-L equation for $x$:**
        $$ 0 - m\ddot{x} = 0 $$
        $$ \boxed{m\ddot{x} = 0} $$
        *Explanation: This implies no acceleration in the x-direction, meaning horizontal velocity is constant, as expected for projectile motion without air resistance.*

5.  **Apply Euler-Lagrange for $y$ coordinate:**
    The Euler-Lagrange equation for $y$ is: $\frac{\partial L}{\partial y} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{y}}\right) = 0$.

    *   **Calculate $\frac{\partial L}{\partial y}$:**
        $$ \frac{\partial L}{\partial y} = \frac{\partial}{\partial y}\left(\frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy\right) = -mg $$
        *Explanation: Differentiate $-mgy$ with respect to $y$. Other terms are independent of $y$.*

    *   **Calculate $\frac{\partial L}{\partial \dot{y}}$:**
        $$ \frac{\partial L}{\partial \dot{y}} = \frac{\partial}{\partial \dot{y}}\left(\frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - mgy\right) = m\dot{y} $$
        *Explanation: Differentiate $\frac{1}{2}m\dot{y}^2$ with respect to $\dot{y}$. Other terms are independent of $\dot{y}$.*

    *   **Calculate $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{y}}\right)$:**
        $$ \frac{d}{dt}(m\dot{y}) = m\ddot{y} $$
        *Explanation: Time derivative of $m\dot{y}$ is $m\ddot{y}$.*

    *   **Substitute into E-L equation for $y$:**
        $$ -mg - m\ddot{y} = 0 $$
        $$ \boxed{m\ddot{y} = -mg \quad \Rightarrow \quad \ddot{y} = -g} $$
        *Explanation: This implies a constant downward acceleration $g$ in the y-direction, which is exactly what we expect from gravity. These two equations together describe projectile motion.*

**Reflection:** This example demonstrates the power of Hamilton's principle to handle multiple degrees of freedom simultaneously. Each coordinate gets its own Euler-Lagrange equation. The trickiest part is ensuring you correctly take partial derivatives with respect to each generalized coordinate and its velocity.

---

### Example 4: Simple Pendulum

**Problem:** A simple pendulum consists of a point mass $m$ attached to a rigid, massless rod of length $l$, pivoted at one end. The pendulum swings in a vertical plane. Use Hamilton's principle to find its equation of motion.

**Given:**
*   Mass of pendulum bob: $m$
*   Length of rod: $l$
*   Angle with vertical: $\theta(t)$ (our generalized coordinate)
*   Acceleration due to gravity: $g$

**Want:** The equation of motion for $\theta(t)$.

**Solution:**

1.  **Choose Generalized Coordinate(s):**
    For a simple pendulum, the angle $\theta$ from the vertical is the natural choice.
    *Explanation: The system has one degree of freedom, so one generalized coordinate is sufficient.*

2.  **Express Cartesian Coordinates in terms of Generalized Coordinate:**
    Let the pivot point be the origin $(0,0)$. The position of the mass $m$ is $(x,y)$.
    $$ x = l\sin\theta $$
    $$ y = -l\cos\theta $$
    *Explanation: Using trigonometry, with the pendulum hanging vertically down at $\theta=0$. We choose the negative sign for $y$ so that $y=0$ is at the pivot and $y$ increases upwards. The potential energy will then be positive.*

3.  **Calculate Velocities in Cartesian Coordinates:**
    Take the time derivatives of $x$ and $y$:
    $$ \dot{x} = \frac{d}{dt}(l\sin\theta) = l\cos\theta \cdot \dot{\theta} $$
    $$ \dot{y} = \frac{d}{dt}(-l\cos\theta) = l\sin\theta \cdot \dot{\theta} $$
    *Explanation: Apply the chain rule, as $\theta$ is a function of time $t$.*

4.  **Identify Kinetic Energy (T):**
    $$ T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) $$
    Substitute $\dot{x}$ and $\dot{y}$:
    $$ T = \frac{1}{2}m((l\cos\theta \cdot \dot{\theta})^2 + (l\sin\theta \cdot \dot{\theta})^2) $$
    $$ T = \frac{1}{2}m(l^2\cos^2\theta \cdot \dot{\theta}^2 + l^2\sin^2\theta \cdot \dot{\theta}^2) $$
    $$ T = \frac{1}{2}ml^2\dot{\theta}^2(\cos^2\theta + \sin^2\theta) $$
    Using the identity $\cos^2\theta + \sin^2\theta = 1$:
    $$ T = \frac{1}{2}ml^2\dot{\theta}^2 $$
    *Explanation: This is the rotational kinetic energy, $\frac{1}{2}I\omega^2$, where $I=ml^2$ is the moment of inertia and $\omega=\dot{\theta}$ is the angular velocity.*

5.  **Identify Potential Energy (V):**
    We need to choose a reference point for potential energy. Let's set $V=0$ at the pivot point (where $y=0$). The height of the mass is $y = -l\cos\theta$. Since gravity acts downwards, the potential energy is $mg$ times the height *above* a reference. If we choose the pivot as $y=0$, then the height of the bob *relative to the pivot* is $y = -l\cos\theta$. For potential energy, it's often easier to set $V=0$ at the lowest point of the swing. If we set $V=0$ at $y=-l$ (lowest point), then the height above this lowest point is $h = y - (-l) = -l\cos\theta + l = l(1-\cos\theta)$.
    $$ V = mgh = mg l(1-\cos\theta) $$
    *Explanation: Potential energy is $mgy'$, where $y'$ is the height above a chosen reference. Choosing the lowest point of the swing as $y'=0$ simplifies the expression. At $\theta=0$, $V=0$. At $\theta=\pi$, $V=2mgl$.*

6.  **Formulate the Lagrangian (L):**
    $$ L(\theta, \dot{\theta}) = T - V = \frac{1}{2}ml^2\dot{\theta}^2 - mgl(1-\cos\theta) $$
    *Explanation: Substitute T and V into the definition of L.*

7.  **Calculate $\frac{\partial L}{\partial \theta}$:**
    Differentiate $L$ with respect to $\theta$:
    $$ \frac{\partial L}{\partial \theta} = \frac{\partial}{\partial \theta}\left(\frac{1}{2}ml^2\dot{\theta}^2 - mgl(1-\cos\theta)\right) $$
    $$ \frac{\partial L}{\partial \theta} = 0 - mgl(0 - (-\sin\theta)) = -mgl\sin\theta $$
    *Explanation: The first term does not depend on $\theta$. The derivative of $-\cos\theta$ is $\sin\theta$.*

8.  **Calculate $\frac{\partial L}{\partial \dot{\theta}}$:**
    Differentiate $L$ with respect to $\dot{\theta}$:
    $$ \frac{\partial L}{\partial \dot{\theta}} = \frac{\partial}{\partial \dot{\theta}}\left(\frac{1}{2}ml^2\dot{\theta}^2 - mgl(1-\cos\theta)\right) $$
    $$ \frac{\partial L}{\partial \dot{\theta}} = \frac{1}{2}ml^2(2\dot{\theta}) - 0 = ml^2\dot{\theta} $$
    *Explanation: The second term does not depend on $\dot{\theta}$.*

9.  **Calculate $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}}\right)$:**
    Take the total time derivative of $ml^2\dot{\theta}$:
    $$ \frac{d}{dt}(ml^2\dot{\theta}) = ml^2\ddot{\theta} $$
    *Explanation: $m$ and $l$ are constants. The time derivative of angular velocity ($\dot{\theta}$) is angular acceleration ($\ddot{\theta}$).*

10. **Apply the Euler-Lagrange Equation:**
    Substitute the calculated terms into $\frac{\partial L}{\partial \theta} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}}\right) = 0$:
    $$ -mgl\sin\theta - ml^2\ddot{\theta} = 0 $$
    Divide by $-ml^2$ (since $m, l \ne 0$):
    $$ \frac{g}{l}\sin\theta + \ddot{\theta} = 0 $$
    $$ \boxed{\ddot{\theta} + \frac{g}{l}\sin\theta = 0} $$
    *Explanation: This is the well-known differential equation for a simple pendulum. For small angles ($\sin\theta \approx \theta$), it reduces to $\ddot{\theta} + \frac{g}{l}\theta = 0$, which describes simple harmonic motion.*

**Reflection:** This example highlights the power of using generalized coordinates. Instead of dealing with forces and torques in Cartesian coordinates, the Lagrangian approach automatically handles constraints (the fixed length of the rod) and yields the correct equation of motion in a single step. The trickiest part is correctly setting up the kinetic and potential energies in terms of the chosen generalized coordinate and its derivatives.

## 6. Common mistakes and traps

Students often encounter specific pitfalls when working with Hamilton's principle and Lagrangian mechanics. Being aware of these can save a lot of frustration.

1.  **Confusing Action with Energy:** The action $S$ is an integral of the Lagrangian ($T-V$) over time. It is *not* energy. Energy ($T+V$ or $T-V$ for the Lagrangian) is an instantaneous quantity, while action is an accumulated quantity over a path.
    *   *Why it happens:* Both involve kinetic and potential energy, and the term "least action" sounds like "least energy."

2.  **Assuming "Least Action" Always Means a Global Minimum:** While often true for classical paths over short time intervals, the principle mathematically states that the action is *stationary* ($\delta S = 0$). This means it could be a local minimum, a local maximum, or a saddle point.
    *   *Why it happens:* The historical name "least action" is misleading. Rigorously, it's the Principle of Stationary Action.

3.  **Incorrect Application of Euler-Lagrange Equation:** This is a common source of algebraic errors.
    *   *Why it happens:*
        *   **Partial vs. Total Derivatives:** Forgetting that $\frac{\partial L}{\partial q_i}$ treats $\dot{q}_i$ as independent of $q_i$, but $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right)$ involves a total time derivative, meaning $\frac{\partial L}{\partial \dot{q}_i}$ itself might be a function of $q_i$, $\dot{q}_i$, and $t$, requiring the chain rule.
        *   **Sign Errors:** Forgetting the minus sign between $\frac{\partial L}{\partial q_i}$ and $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right)$.
        *   **Missing Terms:** Not differentiating all terms in $L$ that depend on $q_i$ or $\dot{q}_i$.

4.  **Incorrectly Identifying Kinetic and Potential Energy:** The setup of $T$ and $V$ is crucial.
    *   *Why it happens:*
        *   **Wrong Coordinates:** Expressing $T$ and $V$ in Cartesian coordinates when generalized coordinates are more appropriate (e.g., for constrained motion like a pendulum).
        *   **Wrong Reference for Potential Energy:** While the choice of $V=0$ reference doesn't affect the equations of motion (only adds a constant to $L$), a poorly chosen reference can make the expression for $V$ more complex than necessary.
        *   **Missing Forces:** Forgetting to include potential energy terms for all relevant conservative forces. Non-conservative forces (like friction) cannot be directly incorporated into the Lagrangian in this simple form.

5.  **Misinterpreting "Possible Paths" vs. "Physical Path":** The variation $\delta q(t)$ in $\delta S = 0$ refers to arbitrary, infinitesimally close paths that connect the *same fixed endpoints* $(q_1, t_1)$ and $(q_2, t_2)$.
    *   *Why it happens:* Students might forget the fixed boundary conditions, which are essential for the derivation of the Euler-Lagrange equations.

6.  **Not Understanding the Significance of Cyclic Coordinates:** If a generalized coordinate $q_i$ does not appear explicitly in the Lagrangian ($L$), then $\frac{\partial L}{\partial q_i} = 0$. The Euler-Lagrange equation then simplifies to $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) = 0$, implying that the quantity $\frac{\partial L}{\partial \dot{q}_i}$ is a constant of motion (a conserved quantity). This is a powerful insight often missed.
    *   *Why it happens:* Over-focusing on the mechanics of differentiation and missing the physical implications of the resulting equations.

## 7. Textbook-precise explanation

Hamilton's principle is a cornerstone of analytical mechanics, providing a variational approach to deriving the equations of motion for a physical system. It states that the actual path taken by a system is an extremum (often a minimum) of a quantity called the action functional.

Consider a system described by $N$ generalized coordinates $q_1, q_2, \ldots, q_N$. The state of the system at any time $t$ is given by the vector $\mathbf{q}(t) = (q_1(t), \ldots, q_N(t))$. A path or trajectory of the system between two fixed times $t_1$ and $t_2$ is a function $\mathbf{q}(t)$ such that $\mathbf{q}(t_1)$ and $\mathbf{q}(t_2)$ are fixed.

The **Lagrangian** of the system, denoted by $L$, is a function of the generalized coordinates $\mathbf{q}$, their time derivatives (generalized velocities) $\dot{\mathbf{q}}$, and possibly time $t$ explicitly:
$$ L(\mathbf{q}, \dot{\mathbf{q}}, t) = T(\mathbf{q}, \dot{\mathbf{q}}, t) - V(\mathbf{q}, t) $$
where $T$ is the total kinetic energy and $V$ is the total potential energy of the system.

The **Action Functional**, $S$, for a given path $\mathbf{q}(t)$ between $t_1$ and $t_2$ is defined as the time integral of the Lagrangian along that path:
$$ S[\mathbf{q}(t)] = \int_{t_1}^{t_2} L(\mathbf{q}(t), \dot{\mathbf{q}}(t), t) dt $$

**Hamilton's Principle (Principle of Stationary Action)** states that the actual path $\mathbf{q}(t)$ taken by the system from time $t_1$ to time $t_2$ is the one for which the action functional $S$ is stationary with respect to variations in the path that keep the endpoints fixed. Mathematically, this is expressed as:
$$ \delta S = 0 $$
where $\delta S$ represents the first variation of the action. This means that if we consider a varied path $\mathbf{q}'(t) = \mathbf{q}(t) + \epsilon \boldsymbol{\eta}(t)$, where $\epsilon$ is an infinitesimal parameter and $\boldsymbol{\eta}(t)$ is an arbitrary differentiable function satisfying $\boldsymbol{\eta}(t_1) = \boldsymbol{\eta}(t_2) = \mathbf{0}$ (fixed endpoints), then the change in action $\Delta S = S[\mathbf{q}'(t)] - S[\mathbf{q}(t)]$ will be zero to first order in $\epsilon$.

Applying the techniques of the Calculus of Variations, the condition $\delta S = 0$ leads directly to a set of $N$ **Euler-Lagrange Equations**, one for each generalized coordinate $q_i$:
$$ \frac{\partial L}{\partial q_i} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) = 0 \quad \text{for } i = 1, 2, \ldots, N $$
These are second-order ordinary differential equations that describe the equations of motion for the system.

**Derivation Sketch of Euler-Lagrange Equations from $\delta S = 0$:**
Let $q(t)$ be the actual path and $q'(t) = q(t) + \epsilon \eta(t)$ be a varied path, with $\eta(t_1) = \eta(t_2) = 0$.
The action for the varied path is $S[q+\epsilon\eta] = \int_{t_1}^{t_2} L(q+\epsilon\eta, \dot{q}+\epsilon\dot{\eta}, t) dt$.
The condition $\delta S = 0$ is equivalent to $\left.\frac{dS}{d\epsilon}\right|_{\epsilon=0} = 0$.
Using the chain rule for differentiation under the integral sign:
$$ \frac{dS}{d\epsilon} = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q}\frac{\partial (q+\epsilon\eta)}{\partial \epsilon} + \frac{\partial L}{\partial \dot{q}}\frac{\partial (\dot{q}+\epsilon\dot{\eta})}{\partial \epsilon} \right) dt $$
$$ \frac{dS}{d\epsilon} = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q}\eta + \frac{\partial L}{\partial \dot{q}}\dot{\eta} \right) dt $$
Setting $\epsilon=0$ gives the original path $q(t)$. So, we evaluate at $\epsilon=0$:
$$ \left.\frac{dS}{d\epsilon}\right|_{\epsilon=0} = \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q}\eta + \frac{\partial L}{\partial \dot{q}}\dot{\eta} \right) dt = 0 $$
Now, integrate the second term by parts: $\int u \, dv = uv - \int v \, du$.
Let $u = \frac{\partial L}{\partial \dot{q}}$ and $dv = \dot{\eta} dt$. Then $du = \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) dt$ and $v = \eta$.
$$ \int_{t_1}^{t_2} \frac{\partial L}{\partial \dot{q}}\dot{\eta} dt = \left[ \eta \frac{\partial L}{\partial \dot{q}} \right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \eta \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) dt $$
Since $\eta(t_1) = \eta(t_2) = 0$ (fixed endpoints), the boundary term $\left[ \eta \frac{\partial L}{\partial \dot{q}} \right]_{t_1}^{t_2}$ is zero.
Substituting this back into the $\delta S = 0$ expression:
$$ \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q}\eta - \eta \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) \right) dt = 0 $$
$$ \int_{t_1}^{t_2} \eta(t) \left( \frac{\partial L}{\partial q} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) \right) dt = 0 $$
Since $\eta(t)$ is an arbitrary variation (and using the Fundamental Lemma of Calculus of Variations), the term in the parenthesis must be identically zero:
$$ \frac{\partial L}{\partial q} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) = 0 $$
This derivation holds for each generalized coordinate $q_i$.

**References:**
*   Goldstein, H., Poole, C. P., & Safko, J. L. (2002). *Classical Mechanics* (3rd ed.). Addison-Wesley. (Chapter 2, especially sections 2.1-2.3)
*   Landau, L. D., & Lifshitz, E. M. (1976). *Mechanics* (Vol. 1, 3rd ed.). Pergamon Press. (Chapter 1, sections 1-2)
*   Fetter, A. L., & Walecka, J. D. (2003). *Theoretical Mechanics of Particles and Continua*. Dover Publications. (Chapter 1, sections 1-2)

## 8. ASCII diagrams

Here's a conceptual diagram illustrating possible paths and the physical path:

```text
       q(t) ^
            |
            |      * B (q_2, t_2)
            |     /|`\
            |    / | ` \   <-- Possible paths (infinitely many)
            |   /  |   `\
            |  /   |    `\
            | /    |     `\
            |/-----+-------\ <-- The physical path (often smooth)
            * A (q_1, t_1)
            +------------------> t
            t1          t2

Figure 1: Illustration of multiple possible trajectories q(t) between two fixed
          endpoints (q_1, t_1) and (q_2, t_2). Hamilton's principle states that
          the actual physical path is the one for which the action S is stationary.
          This path is typically the "smoothest" or most "direct" in terms of action.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a **L**azy **A**ctor **G**oing **R**eally **A**round **N**ature's **G**reat **I**ntricate **A**ction **N**etwork. He seeks the path of **L**east **A**ction, which is governed by the **E**legant **L**aw of **E**uler-Lagrange.
    *   **LAGRANGIAN:** $L = T - V$ (The "actor" who defines the "score" at each moment)
    *   **ACTION:** $S = \int L \, dt$ (The "great intricate action network" - the total score for a path)
    *   **EULER-LAGRANGE:** $\frac{\partial L}{\partial q} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) = 0$ (The "elegant law" that finds the "least action" path)

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    1.  **The Lagrangian:** $L = T - V$ (Kinetic energy minus potential energy). This is the fundamental building block.
    2.  **The Action:** $S = \int_{t_1}^{t_2} L(q, \dot{q}, t) dt$. This is the functional that is extremized.
    3.  **The Euler-Lagrange Equation:** $\frac{\partial L}{\partial q_i} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) = 0$. This is the equation of motion derived from the principle.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** In 1 day (tomorrow). Re-derive the Euler-Lagrange equation for a free particle.
    *   **Review 2:** In 3 days. Re-derive for a simple harmonic oscillator.
    *   **Review 3:** In 7 days. Re-derive for a simple pendulum. Explain the "stationary" vs. "minimum" distinction.
    *   **Review 4:** In 16 days. Explain the connection between Hamilton's principle and Newton's laws. Why is it more fundamental?
    *   **Review 5:** In 35 days. Attempt a more complex problem (e.g., a particle on an inclined plane or a bead on a rotating wire). Articulate the full derivation of Euler-Lagrange from $\delta S = 0$.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the Euler-Lagrange equation, you can always rebuild it by recalling the core idea:
    1.  **Start with the Action:** $S = \int_{t_1}^{t_2} L(q, \dot{q}, t) dt$.
    2.  **State Hamilton's Principle:** $\delta S = 0$. This means for a small variation $\eta(t)$ such that $q'(t) = q(t) + \epsilon \eta(t)$ and $\eta(t_1) = \eta(t_2) = 0$, we have $\left.\frac{dS}{d\epsilon}\right|_{\epsilon=0} = 0$.
    3.  **Perform the $\epsilon$-derivative:** $\int_{t_1}^{t_2} \left( \frac{\partial L}{\partial q}\eta + \frac{\partial L}{\partial \dot{q}}\dot{\eta} \right) dt = 0$.
    4.  **Integrate by Parts:** Apply integration by parts to the second term: $\int \frac{\partial L}{\partial \dot{q}}\dot{\eta} dt = \left[ \eta \frac{\partial L}{\partial \dot{q}} \right]_{t_1}^{t_2} - \int \eta \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) dt$.
    5.  **Apply Fixed Endpoints:** The boundary term $\left[ \eta \frac{\partial L}{\partial \dot{q}} \right]_{t_1}^{t_2}$ vanishes because $\eta(t_1) = \eta(t_2) = 0$.
    6.  **Rearrange and Apply Fundamental Lemma:** This leaves $\int_{t_1}^{t_2} \eta(t) \left( \frac{\partial L}{\partial q} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) \right) dt = 0$. Since $\eta(t)$ is arbitrary, the term in the parenthesis must be zero.
    7.  **Result:** $\frac{\partial L}{\partial q} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) = 0$.

## 10. Connections — what this leads to

Hamilton's principle is not an isolated concept; it's a foundational idea that branches out into nearly every advanced area of theoretical physics and engineering. Mastering it unlocks a deeper understanding of the universe's mechanics and provides powerful tools for problem-solving.

1.  **Hamiltonian Mechanics:** Hamilton's principle is the direct precursor to Hamiltonian mechanics, which reformulates classical mechanics in terms of canonical coordinates ($q_i$, $p_i$) and the Hamiltonian function $H(q, p, t)$. The Hamiltonian is related to the Lagrangian by a Legendre transformation ($H = \sum_i p_i \dot{q}_i - L$). This framework is crucial for understanding canonical transformations, phase space, and is the starting point for quantum mechanics.

2.  **Quantum Mechanics (Feynman Path Integrals):** Richard Feynman's path integral formulation of quantum mechanics is a direct generalization of Hamilton's principle. Instead of a single classical path of stationary action, quantum mechanics considers *all possible paths* a particle can take, each contributing a probability amplitude determined by the action for that path. The classical path is the one for which the action is stationary, leading to constructive interference of amplitudes.

3.  **Field Theory (Classical and Quantum):** In classical field theory (e.g., electromagnetism, general relativity), the concept of a Lagrangian is extended to a Lagrangian density $\mathcal{L}(\phi, \partial_\mu \phi)$, which is integrated over spacetime to form the action $S = \int \mathcal{L} d^4x$. Applying Hamilton's principle to this action yields the field equations (e.g., Maxwell's equations, Einstein's field equations). This framework is then quantized in quantum field theory to describe fundamental particles and forces.

4.  **General Relativity (Geodesics and Einstein-Hilbert Action):** In general relativity, particles in free fall follow geodesics (the "straightest possible paths") in curved spacetime. These geodesics can be derived from a variational principle, where the action is related to the proper time interval along the path. Furthermore, Einstein's field equations, which describe how spacetime is curved by matter and energy, can themselves be derived from a variational principle using the Einstein-Hilbert action.

5.  **Optimal Control Theory:** This engineering discipline is concerned with finding a control policy for a dynamic system that optimizes some performance criterion (e.g., minimizing fuel consumption, maximizing speed, reaching a target state). The mathematical foundation of optimal control (e.g., Pontryagin's Minimum Principle) is deeply rooted in the calculus of variations and Hamilton's principle. It's applied in aerospace (rocket trajectories), robotics, economics, and process control.

6.  **Analytical Mechanics (Beyond Newtonian):** Hamilton's principle offers a more elegant and often simpler approach to solving complex mechanical problems compared to Newtonian mechanics, especially for systems with constraints or in non-Cartesian coordinate systems. It naturally leads to conserved quantities (e.g., momentum, energy) via Noether's theorem, which states that every continuous symmetry of the action corresponds to a conserved quantity.

## 11. Self-check questions

1.  **Easy:** Define the Lagrangian $L$ and the Action $S$. What is the mathematical relationship between them?
2.  **Medium:** State Hamilton's Principle in your own words. Why is it sometimes called the "Principle of Stationary Action" instead of "Least Action"?
3.  **Medium-Hard:** A particle of mass $m$ moves in one dimension under a potential $V(x) = \frac{1}{2}\alpha x^4$. Using Hamilton's principle, derive its equation of motion.
4.  **Hard:** Consider a particle of mass $m$ constrained to move on the surface of a sphere of radius $R$. Use spherical coordinates $(\theta, \phi)$ as generalized coordinates. Set up the Lagrangian for this system (assuming no other forces than the constraint). Do not derive the full Euler-Lagrange equations, but show the expressions for $T$ and $V$.
5.  **Very Hard:** Explain the role of the fixed endpoints in time and space ($q(t_1)$ and $q(t_2)$) in the derivation of the Euler-Lagrange equations from $\delta S = 0$. What would happen if the endpoints were *not* fixed? (Hint: Consider the implications for the integration by parts step.)