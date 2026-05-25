## 1. What it is — in plain English

Imagine you have a complex machine, like a rocket or a satellite. You want to understand how it moves, where it will be, and how its energy changes over time. In basic physics, we often use its position and how fast it's moving (its velocity) to describe it. This is like looking at a car's speedometer and odometer.

The Hamiltonian is a different, often more powerful, way to describe the same system. Instead of using position and velocity, it uses position and *momentum*. Think of momentum as how much "oomph" something has – its mass multiplied by its velocity. So, the Hamiltonian is a function that tells you about the system's state using its position and its "oomph."

Why would we want to switch? Sometimes, momentum is a more fundamental or convenient quantity to work with, especially in advanced physics like quantum mechanics or when dealing with very complex systems. It's like having two different ways to describe your financial health: one based on your income and expenses (Lagrangian), and another based on your assets and liabilities (Hamiltonian). Both tell you about your finances, but they offer different perspectives and are useful for different types of analysis.

Crucially, for many common systems, the Hamiltonian turns out to be the total energy of the system. So, it often represents a system's total energy expressed in terms of its positions and momenta. This makes it incredibly useful because energy is often conserved, providing a powerful tool for understanding how systems evolve.

The exact definition, $H = \Sigma p_i \dot{q}_i - L$, is a mathematical recipe for converting from the "position and velocity" view (Lagrangian, $L$) to the "position and momentum" view (Hamiltonian, $H$). The $p_i$ represents the generalized momentum, and $\dot{q}_i$ represents the generalized velocity for each degree of freedom $i$.

## 2. Why it matters — real-world applications

The Hamiltonian formulation is not just an abstract mathematical curiosity; it underpins vast areas of modern physics and engineering.

1.  **Quantum Mechanics:** The Hamiltonian is *the* central operator in quantum mechanics. The time-dependent Schrödinger equation, $i\hbar \frac{\partial}{\partial t} |\Psi \rangle = \hat{H} |\Psi \rangle$, directly uses the Hamiltonian operator ($\hat{H}$) to describe how a quantum system's state evolves over time. Without the Hamiltonian, there would be no quantum mechanics as we know it, making it fundamental to understanding everything from atomic structure to particle physics and the design of quantum computers.

2.  **Astrodynamics and Spacecraft Trajectory Optimization:** When designing trajectories for spacecraft, especially for missions involving multiple gravitational bodies or complex maneuvers (like gravity assists), the Hamiltonian formulation (specifically, Pontryagin's Minimum Principle, which is a generalization of Hamiltonian mechanics) is indispensable. Engineers at NASA, SpaceX, and ESA use these principles to calculate fuel-optimal or time-optimal paths for probes, satellites, and crewed missions, ensuring they reach their destinations efficiently and safely.

3.  **Statistical Mechanics:** In statistical mechanics, the Hamiltonian describes the total energy of a many-particle system. It's used to define the partition function, which in turn allows us to calculate macroscopic properties (like temperature, pressure, entropy) from the microscopic behavior of atoms and molecules. This is crucial for understanding phase transitions, material properties, and designing new materials.

4.  **Control Systems and Robotics:** For complex robotic systems or autonomous vehicles, the Hamiltonian framework provides a powerful tool for optimal control. By defining a "cost function" (related to energy consumption, time, or accuracy) and converting it into a Hamiltonian, engineers can derive control laws that minimize this cost. This is applied in designing agile robots, self-driving cars, and even precision manufacturing processes.

5.  **Machine Learning (Hamiltonian Monte Carlo):** In advanced machine learning, especially for Bayesian inference and sampling from complex probability distributions, Hamiltonian Monte Carlo (HMC) is a powerful algorithm. HMC uses the principles of Hamiltonian dynamics to efficiently explore high-dimensional parameter spaces, allowing for more accurate and robust model training. This technique is used in fields ranging from computational biology to financial modeling.

## 3. Prerequisites — what you must know first

Before diving deep into the Hamiltonian, ensure you have a solid grasp of these foundational concepts:

*   **Calculus (Multivariable):** Proficiency with derivatives, partial derivatives, integrals, and the chain rule is essential for manipulating equations and understanding how quantities change.
*   **Vectors and Tensors:** Understanding vector quantities (like position, velocity, momentum) and how they transform under coordinate changes, as well as the basics of tensor notation, is helpful for generalized coordinates.
*   **Newtonian Mechanics:** A firm understanding of Newton's laws of motion, kinetic energy, potential energy, force, and linear/angular momentum in their classical forms.
*   **Lagrangian Mechanics:** This is a direct precursor. You must understand:
    *   **Generalized Coordinates ($q_i$):** A set of independent variables that completely describe the configuration of a system.
    *   **Generalized Velocities ($\dot{q}_i$):** The time derivatives of the generalized coordinates.
    *   **Lagrangian ($L$):** Defined as $L = T - V$, where $T$ is kinetic energy and $V$ is potential energy, expressed in terms of $q_i$, $\dot{q}_i$, and $t$.
    *   **Euler-Lagrange Equations:** The equations of motion derived from the Lagrangian: $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$.
*   **Legendre Transformation:** This is the mathematical operation at the heart of defining the Hamiltonian. You should understand its purpose: to transform a function of a variable and its derivative into a function of the variable and its *conjugate* variable (e.g., from $L(q, \dot{q})$ to $H(q, p)$).

## 4. The core idea — step by step

The transition from Lagrangian to Hamiltonian mechanics is a powerful mathematical maneuver, essentially a change of variables that provides a new, insightful perspective on a system's dynamics. Let's break it down.

### ### Step 1: The Problem with Lagrangian

*   **Plain English:** Lagrangian mechanics describes a system using its positions ($q_i$) and how fast those positions are changing (its velocities, $\dot{q}_i$). This is often very convenient, especially when dealing with constraints. However, sometimes we want to describe the system using its positions and its "oomph" (its momenta, $p_i$) instead. Why? Because momentum is often a conserved quantity, and in quantum mechanics, position and momentum play a very symmetric role.
*   **Small Concrete Example:** For a simple pendulum swinging, its state is described by its angle $\theta$ and its angular velocity $\dot{\theta}$. The Lagrangian would be $L(\theta, \dot{\theta}, t)$. But what if we want to work with $\theta$ and its angular momentum $p_\theta$?
*   **Formal/Mathematical Version:** The Lagrangian is a function of generalized coordinates $q_i$, generalized velocities $\dot{q}_i$, and possibly time $t$:
    $$L(q_1, \dots, q_N, \dot{q}_1, \dots, \dot{q}_N, t) \equiv L(\mathbf{q}, \dot{\mathbf{q}}, t)$$
*   **What Could Go Wrong:** Not appreciating *why* we're making this change. It's not just a random mathematical trick; it's motivated by a desire for a different, often more fundamental, description of the system's state.

### ### Step 2: Introducing Generalized Momentum

*   **Plain English:** If we want to switch from velocities to momenta, we first need a precise way to define momentum in the generalized coordinate system. In Newtonian mechanics, momentum is mass times velocity ($p=mv$). In Lagrangian mechanics, the generalized momentum associated with a particular generalized coordinate $q_i$ is defined as the partial derivative of the Lagrangian with respect to the corresponding generalized velocity $\dot{q}_i$.
*   **Small Concrete Example:** For a free particle moving in 1D, its kinetic energy is $T = \frac{1}{2}m\dot{x}^2$ and potential energy $V=0$. So $L = \frac{1}{2}m\dot{x}^2$. The generalized momentum $p_x$ is $\frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2\right) = m\dot{x}$. This matches our classical definition of linear momentum.
*   **Formal/Mathematical Version:** The generalized momentum $p_i$ conjugate to the generalized coordinate $q_i$ is defined as:
    $$p_i = \frac{\partial L}{\partial \dot{q}_i}$$
    This definition holds for each degree of freedom $i$.
*   **What Could Go Wrong:** Forgetting the partial derivative or taking it with respect to $q_i$ instead of $\dot{q}_i$. Also, assuming $p_i$ is *always* just $m\dot{q}_i$; this is only true for simple systems without magnetic fields or velocity-dependent potentials.

### ### Step 3: The Desire for a New Function

*   **Plain English:** We have a function $L$ that depends on $q_i$ and $\dot{q}_i$. We want a new function, let's call it $H$, that depends on $q_i$ and $p_i$. This means we need a mathematical way to swap out all the $\dot{q}_i$ variables for $p_i$ variables.
*   **Small Concrete Example:** If we have $L(x, \dot{x})$ and we know $p_x = \partial L / \partial \dot{x}$, we want to construct $H(x, p_x)$.
*   **Formal/Mathematical Version:** We are seeking a function $H$ such that:
    $$H(q_1, \dots, q_N, p_1, \dots, p_N, t) \equiv H(\mathbf{q}, \mathbf{p}, t)$$
    This function should contain the same physical information as $L(\mathbf{q}, \dot{\mathbf{q}}, t)$, but in a different set of variables.
*   **What Could Go Wrong:** Not understanding that $H$ is a *different* function of *different* independent variables. It's not just $L$ with $\dot{q}$ replaced by $p$; it's a specific mathematical transformation.

### ### Step 4: The Legendre Transformation — The Mathematical Bridge

*   **Plain English:** The Legendre transformation is a mathematical "tool" specifically designed to change the independent variables of a function in this way. If you have a function $f(x)$ and you want a new function $f^*(y)$ where $y = df/dx$, the Legendre transform allows you to do this. It essentially swaps the role of a variable and its derivative. The recipe is: $f^*(y) = xy - f(x)$.
*   **Small Concrete Example:** Consider a simple function $f(x) = \frac{1}{2}ax^2$. Its derivative is $y = df/dx = ax$. So $x = y/a$. Applying the Legendre transform: $f^*(y) = xy - f(x) = (y/a)y - \frac{1}{2}a(y/a)^2 = \frac{y^2}{a} - \frac{y^2}{2a} = \frac{y^2}{2a}$. We've successfully created a new function of $y$ from the original function of $x$.
*   **Formal/Mathematical Version:** For a function $F(x_1, \dots, x_N, t)$, its Legendre transform with respect to the variables $x_i$ is defined as $F^*(y_1, \dots, y_N, t) = \sum_i y_i x_i - F(x_1, \dots, x_N, t)$, where $y_i = \frac{\partial F}{\partial x_i}$. The crucial step is that after forming the sum, you must express $x_i$ in terms of $y_i$ (and other variables) before substituting.
*   **What Could Go Wrong:** Misunderstanding the mechanics of the Legendre transformation. It's not just a simple substitution; it involves solving for the original variable in terms of its conjugate.

### ### Step 5: Applying Legendre Transformation to Lagrangian

*   **Plain English:** Now we apply the Legendre transformation to our Lagrangian $L(\mathbf{q}, \dot{\mathbf{q}}, t)$. We want to swap the generalized velocities $\dot{q}_i$ for the generalized momenta $p_i$. Following the recipe from Step 4, the Hamiltonian $H$ is constructed by taking the sum of $p_i \dot{q}_i$ for all degrees of freedom, and then subtracting the Lagrangian $L$. But remember the crucial part: after forming this expression, we *must* replace all instances of $\dot{q}_i$ with their equivalents in terms of $p_i$, $q_i$, and $t$.
*   **Small Concrete Example:** Let's revisit the free particle $L = \frac{1}{2}m\dot{x}^2$. We found $p_x = m\dot{x}$, which means $\dot{x} = p_x/m$.
    Now, apply the definition: $H = p_x \dot{x} - L$.
    Substitute $\dot{x} = p_x/m$:
    $H = p_x \left(\frac{p_x}{m}\right) - \frac{1}{2}m\left(\frac{p_x}{m}\right)^2$
    $H = \frac{p_x^2}{m} - \frac{1}{2}m\frac{p_x^2}{m^2} = \frac{p_x^2}{m} - \frac{p_x^2}{2m} = \frac{p_x^2}{2m}$.
    So, $H(x, p_x) = \frac{p_x^2}{2m}$. This is exactly the kinetic energy expressed in terms of momentum!
*   **Formal/Mathematical Version:** The Hamiltonian $H(\mathbf{q}, \mathbf{p}, t)$ is defined as:
    $$H(\mathbf{q}, \mathbf{p}, t) = \sum_{i=1}^{N} p_i \dot{q}_i - L(\mathbf{q}, \dot{\mathbf{q}}, t)$$
    where, crucially, after forming this expression, all $\dot{q}_i$ must be expressed as functions of $\mathbf{q}$, $\mathbf{p}$, and $t$ using the relations $p_i = \frac{\partial L}{\partial \dot{q}_i}$. This inversion step is often the most challenging part.
*   **What Could Go Wrong:** The single biggest mistake is forgetting to express $\dot{q}_i$ in terms of $p_i$ (and $q_i$, $t$) before writing down the final form of $H$. If you leave $\dot{q}_i$ in the Hamiltonian, it's not truly a function of $(q, p, t)$.

### ### Step 6: The Meaning of H — Energy and Conservation

*   **Plain English:** After all this mathematical work, what does $H$ actually represent? For a large class of systems, especially those where the kinetic energy is a simple quadratic function of velocities and the potential energy doesn't depend on velocities, the Hamiltonian turns out to be the total mechanical energy of the system ($T+V$). Furthermore, if the Hamiltonian does not explicitly depend on time (i.e., $\partial H / \partial t = 0$), then the Hamiltonian is a conserved quantity, meaning its value stays constant throughout the system's motion. This is incredibly powerful!
*   **Small Concrete Example:** For the simple harmonic oscillator, $L = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2$. We'll show later that $H = \frac{p_x^2}{2m} + \frac{1}{2}kx^2$. This is exactly the total energy (kinetic + potential) of the oscillator. Since $H$ does not explicitly contain $t$, the total energy is conserved.
*   **Formal/Mathematical Version:**
    If the kinetic energy $T$ is a homogeneous quadratic function of the generalized velocities (i.e., $T = \sum_{i,j} A_{ij}(q,t) \dot{q}_i \dot{q}_j$) and the potential energy $V$ is independent of velocities, then $H = T+V$.
    If $\frac{\partial H}{\partial t} = 0$, then $H$ is a constant of motion.
*   **What Could Go Wrong:** Assuming $H$ is *always* the total energy. This is not true if the potential energy depends on velocity (e.g., in an electromagnetic field, where the potential includes terms like $q\mathbf{A}\cdot\dot{\mathbf{r}}$) or if the constraints are time-dependent. In such cases, $H$ is still a valid Hamiltonian, but it doesn't necessarily represent the total energy. It *is* always a conserved quantity if $\partial H / \partial t = 0$.

## 5. Worked examples — multiple, with every step shown

Let's apply the definition $H = \Sigma p_i \dot{q}_i - L$ to several systems.

### ### Example 1: Free Particle in One Dimension

**Problem:** Find the Hamiltonian for a free particle of mass $m$ moving in one dimension.

**Given:**
*   Mass $m$
*   Position coordinate $x$
*   Velocity $\dot{x}$
*   No potential energy (free particle)

**What we want:** The Hamiltonian $H(x, p_x)$.

**Solution:**

1.  **Write down the Lagrangian $L$.**
    The kinetic energy is $T = \frac{1}{2}m\dot{x}^2$. The potential energy $V=0$ (since it's a free particle).
    $$L = T - V = \frac{1}{2}m\dot{x}^2 - 0 = \frac{1}{2}m\dot{x}^2$$
    *Explanation:* The Lagrangian is defined as kinetic energy minus potential energy. For a free particle, there's no potential, only kinetic energy.

2.  **Calculate the generalized momentum $p_x$.**
    The generalized momentum $p_x$ conjugate to $x$ is defined as $\frac{\partial L}{\partial \dot{x}}$.
    $$p_x = \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2\right) = m\dot{x}$$
    *Explanation:* We take the partial derivative of $L$ with respect to $\dot{x}$, treating $x$ and $t$ as constants. This gives us the familiar linear momentum.

3.  **Express $\dot{x}$ in terms of $p_x$.**
    From the previous step, we have $p_x = m\dot{x}$. We need to solve for $\dot{x}$.
    $$\dot{x} = \frac{p_x}{m}$$
    *Explanation:* This is the crucial inversion step. We need to replace $\dot{x}$ in the Hamiltonian definition with an expression involving $p_x$.

4.  **Construct the Hamiltonian $H = p_x \dot{x} - L$.**
    Substitute the expressions for $p_x$, $\dot{x}$, and $L$ into the definition.
    $$H = p_x \left(\frac{p_x}{m}\right) - \left(\frac{1}{2}m\left(\frac{p_x}{m}\right)^2\right)$$
    *Explanation:* We're plugging in the derived expressions. Note that we substitute $\dot{x}$ in the $L$ term as well, to ensure $H$ is solely a function of $x$ and $p_x$.

5.  **Simplify the expression for $H$.**
    $$H = \frac{p_x^2}{m} - \frac{1}{2}m\frac{p_x^2}{m^2}$$
    $$H = \frac{p_x^2}{m} - \frac{p_x^2}{2m}$$
    $$H = \frac{2p_x^2 - p_x^2}{2m}$$
    $$\boxed{H(x, p_x) = \frac{p_x^2}{2m}}$$
    *Explanation:* Combine the terms. The final Hamiltonian is expressed entirely in terms of $x$ and $p_x$ (though $x$ doesn't appear in this simple case).

**Reflection:** This example was straightforward because $p_x$ was a simple linear function of $\dot{x}$, making the inversion easy. The Hamiltonian is just the kinetic energy expressed in terms of momentum, which is expected for a free particle.

### ### Example 2: Simple Harmonic Oscillator in One Dimension

**Problem:** Find the Hamiltonian for a simple harmonic oscillator of mass $m$ and spring constant $k$ in one dimension.

**Given:**
*   Mass $m$
*   Spring constant $k$
*   Position coordinate $x$
*   Velocity $\dot{x}$

**What we want:** The Hamiltonian $H(x, p_x)$.

**Solution:**

1.  **Write down the Lagrangian $L$.**
    Kinetic energy $T = \frac{1}{2}m\dot{x}^2$. Potential energy for a spring $V = \frac{1}{2}kx^2$.
    $$L = T - V = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2$$
    *Explanation:* Standard definition of Lagrangian for SHO.

2.  **Calculate the generalized momentum $p_x$.**
    $$p_x = \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2\right) = m\dot{x}$$
    *Explanation:* The potential energy term does not depend on $\dot{x}$, so its partial derivative with respect to $\dot{x}$ is zero. The momentum is the same as for the free particle.

3.  **Express $\dot{x}$ in terms of $p_x$.**
    From $p_x = m\dot{x}$, we get:
    $$\dot{x} = \frac{p_x}{m}$$
    *Explanation:* Same inversion as in Example 1.

4.  **Construct the Hamiltonian $H = p_x \dot{x} - L$.**
    Substitute the expressions for $p_x$, $\dot{x}$, and $L$.
    $$H = p_x \left(\frac{p_x}{m}\right) - \left(\frac{1}{2}m\left(\frac{p_x}{m}\right)^2 - \frac{1}{2}kx^2\right)$$
    *Explanation:* Carefully substitute all terms, remembering the parentheses around the entire Lagrangian to correctly handle the subtraction.

5.  **Simplify the expression for $H$.**
    $$H = \frac{p_x^2}{m} - \left(\frac{1}{2}m\frac{p_x^2}{m^2} - \frac{1}{2}kx^2\right)$$
    $$H = \frac{p_x^2}{m} - \frac{p_x^2}{2m} + \frac{1}{2}kx^2$$
    $$H = \frac{p_x^2}{2m} + \frac{1}{2}kx^2$$
    $$\boxed{H(x, p_x) = \frac{p_x^2}{2m} + \frac{1}{2}kx^2}$$
    *Explanation:* Combine the kinetic energy terms and add the potential energy. This result is the total mechanical energy ($T+V$) of the simple harmonic oscillator, expressed in terms of position and momentum. Since $H$ does not explicitly depend on time, this total energy is conserved.

**Reflection:** This example reinforces the process and shows that for conservative systems with standard kinetic energy, the Hamiltonian equals the total energy. The key is still the careful substitution and algebraic simplification.

### ### Example 3: Particle in a Uniform Magnetic Field (2D)

**Problem:** Find the Hamiltonian for a particle of charge $q$ and mass $m$ moving in the $xy$-plane under a uniform magnetic field $\mathbf{B} = B\hat{\mathbf{k}}$.

**Given:**
*   Mass $m$, charge $q$
*   Magnetic field $\mathbf{B} = B\hat{\mathbf{k}}$
*   Coordinates $x, y$
*   Velocities $\dot{x}, \dot{y}$

**What we want:** The Hamiltonian $H(x, y, p_x, p_y)$.

**Solution:**

1.  **Write down the Lagrangian $L$.**
    The kinetic energy is $T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2)$.
    For a magnetic field, the potential energy is given by $V = q\phi - q\mathbf{A}\cdot\dot{\mathbf{r}}$, where $\phi$ is the scalar potential (zero here) and $\mathbf{A}$ is the magnetic vector potential. For a uniform magnetic field $\mathbf{B} = B\hat{\mathbf{k}}$, a common choice for $\mathbf{A}$ is $\mathbf{A} = \frac{1}{2}B(-y\hat{\mathbf{i}} + x\hat{\mathbf{j}})$.
    So, $\mathbf{A}\cdot\dot{\mathbf{r}} = \frac{1}{2}B(-y\dot{x} + x\dot{y})$.
    The Lagrangian is $L = T - V = T - (-q\mathbf{A}\cdot\dot{\mathbf{r}}) = T + q\mathbf{A}\cdot\dot{\mathbf{r}}$.
    $$L = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) + \frac{qB}{2}(x\dot{y} - y\dot{x})$$
    *Explanation:* This Lagrangian includes a velocity-dependent potential energy term due to the magnetic field. This is where things get interesting, as $p_x$ and $p_y$ will not be simple $m\dot{x}$ and $m\dot{y}$.

2.  **Calculate the generalized momenta $p_x$ and $p_y$.**
    $$p_x = \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2 + \frac{1}{2}m\dot{y}^2 + \frac{qB}{2}x\dot{y} - \frac{qB}{2}y\dot{x}\right)$$
    $$p_x = m\dot{x} - \frac{qB}{2}y$$
    $$p_y = \frac{\partial L}{\partial \dot{y}} = \frac{\partial}{\partial \dot{y}}\left(\frac{1}{2}m\dot{x}^2 + \frac{1}{2}m\dot{y}^2 + \frac{qB}{2}x\dot{y} - \frac{qB}{2}y\dot{x}\right)$$
    $$p_y = m\dot{y} + \frac{qB}{2}x$$
    *Explanation:* Notice that $p_x$ and $p_y$ are not simply $m\dot{x}$ and $m\dot{y}$. They include terms related to the magnetic field. These are the *canonical* momenta, which are different from the *kinetic* momenta ($m\dot{x}$, $m\dot{y}$) in the presence of a vector potential.

3.  **Express $\dot{x}$ and $\dot{y}$ in terms of $p_x, p_y, x, y$.**
    We have a system of two linear equations:
    (1) $p_x = m\dot{x} - \frac{qB}{2}y \implies m\dot{x} = p_x + \frac{qB}{2}y \implies \dot{x} = \frac{1}{m}\left(p_x + \frac{qB}{2}y\right)$
    (2) $p_y = m\dot{y} + \frac{qB}{2}x \implies m\dot{y} = p_y - \frac{qB}{2}x \implies \dot{y} = \frac{1}{m}\left(p_y - \frac{qB}{2}x\right)$
    *Explanation:* This is the most complex algebraic step. We need to solve for the generalized velocities in terms of the generalized momenta and coordinates.

4.  **Construct the Hamiltonian $H = p_x \dot{x} + p_y \dot{y} - L$.**
    Substitute the expressions for $\dot{x}$, $\dot{y}$, and $L$.
    $$H = p_x \left[\frac{1}{m}\left(p_x + \frac{qB}{2}y\right)\right] + p_y \left[\frac{1}{m}\left(p_y - \frac{qB}{2}x\right)\right] - \left[\frac{1}{2}m(\dot{x}^2 + \dot{y}^2) + \frac{qB}{2}(x\dot{y} - y\dot{x})\right]$$
    *Explanation:* This looks messy, but we are just substituting. Remember to substitute $\dot{x}$ and $\dot{y}$ inside the $L$ term as well.

5.  **Simplify the expression for $H$.**
    Let's expand the first two terms:
    $$p_x \dot{x} + p_y \dot{y} = \frac{p_x^2}{m} + \frac{qB}{2m}p_x y + \frac{p_y^2}{m} - \frac{qB}{2m}p_y x$$
    Now, let's look at the $-L$ term. Note that $\frac{qB}{2}(x\dot{y} - y\dot{x}) = \frac{qB}{2}x\dot{y} - \frac{qB}{2}y\dot{x}$.
    Also, $p_x \dot{x} + p_y \dot{y} - \left(\frac{qB}{2}x\dot{y} - \frac{qB}{2}y\dot{x}\right) = (m\dot{x} - \frac{qB}{2}y)\dot{x} + (m\dot{y} + \frac{qB}{2}x)\dot{y} - \left(\frac{qB}{2}x\dot{y} - \frac{qB}{2}y\dot{x}\right)$
    $= m\dot{x}^2 - \frac{qB}{2}y\dot{x} + m\dot{y}^2 + \frac{qB}{2}x\dot{y} - \frac{qB}{2}x\dot{y} + \frac{qB}{2}y\dot{x}$
    $= m\dot{x}^2 + m\dot{y}^2$
    So, $H = m\dot{x}^2 + m\dot{y}^2 - \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2)$.
    Now, substitute the expressions for $\dot{x}$ and $\dot{y}$ from Step 3 into this simplified form:
    $$H = \frac{1}{2}m \left[ \frac{1}{m^2}\left(p_x + \frac{qB}{2}y\right)^2 + \frac{1}{m^2}\left(p_y - \frac{qB}{2}x\right)^2 \right]$$
    $$H = \frac{1}{2m} \left[ \left(p_x + \frac{qB}{2}y\right)^2 + \left(p_y - \frac{qB}{2}x\right)^2 \right]$$
    $$\boxed{H(x, y, p_x, p_y) = \frac{1}{2m} \left[ \left(p_x + \frac{qB}{2}y\right)^2 + \left(p_y - \frac{qB}{2}x\right)^2 \right]}$$
    *Explanation:* This required careful algebra. Notice that $H$ is equal to the kinetic energy, $T$, but expressed in terms of the canonical momenta $p_x, p_y$ and coordinates $x, y$. The presence of the magnetic field means $H \neq T+V$ in the usual sense, because the "potential energy" here is velocity-dependent. However, $H$ still represents the total energy of the system.

**Reflection:** This example highlights that $p_i$ is not always $m\dot{q}_i$. The inversion step becomes a system of equations. Also, $H$ is not simply $T+V$ when $V$ is velocity-dependent, but it still represents the total energy. This problem is a common source of error due to the algebraic complexity and the distinction between canonical and kinetic momentum.

### ### Example 4: Bead on a Rotating Hoop

**Problem:** A bead of mass $m$ slides without friction on a circular hoop of radius $R$. The hoop rotates about a vertical diameter with a constant angular velocity $\omega$. Find the Hamiltonian of the bead.

**Given:**
*   Mass $m$, radius $R$
*   Constant angular velocity $\omega$
*   Frictionless motion

**What we want:** The Hamiltonian $H(\theta, p_\theta)$.

**Solution:**

1.  **Choose generalized coordinates and write down the Lagrangian $L$.**
    Let's use spherical coordinates, but since the bead is on a hoop, its radial coordinate $r$ is fixed at $R$. We can use the angle $\theta$ from the vertical axis as our generalized coordinate.
    The coordinates $(x,y,z)$ of the bead are:
    $x = R \sin\theta \cos(\omega t)$
    $y = R \sin\theta \sin(\omega t)$
    $z = R \cos\theta$
    Now, find the velocities:
    $\dot{x} = R \dot{\theta} \cos\theta \cos(\omega t) - R \sin\theta \sin(\omega t) \omega$
    $\dot{y} = R \dot{\theta} \cos\theta \sin(\omega t) + R \sin\theta \cos(\omega t) \omega$
    $\dot{z} = -R \dot{\theta} \sin\theta$
    Kinetic energy $T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2 + \dot{z}^2)$.
    After squaring and summing (and simplifying using $\cos^2(\omega t) + \sin^2(\omega t) = 1$):
    $T = \frac{1}{2}m[ (R\dot{\theta})^2 + (R\omega\sin\theta)^2 ] = \frac{1}{2}mR^2(\dot{\theta}^2 + \omega^2\sin^2\theta)$
    Potential energy $V = mgz = mgR\cos\theta$.
    $$L = T - V = \frac{1}{2}mR^2(\dot{\theta}^2 + \omega^2\sin^2\theta) - mgR\cos\theta$$
    *Explanation:* This is a classic Lagrangian problem. The kinetic energy has two parts: one from the bead's motion along the hoop ($\dot{\theta}$) and one from the hoop's rotation ($\omega$). The potential energy is due to gravity.

2.  **Calculate the generalized momentum $p_\theta$.**
    $$p_\theta = \frac{\partial L}{\partial \dot{\theta}} = \frac{\partial}{\partial \dot{\theta}}\left(\frac{1}{2}mR^2\dot{\theta}^2 + \frac{1}{2}mR^2\omega^2\sin^2\theta - mgR\cos\theta\right)$$
    $$p_\theta = mR^2\dot{\theta}$$
    *Explanation:* Only the $\dot{\theta}^2$ term contributes to the partial derivative. The other terms do not depend on $\dot{\theta}$. This is the angular momentum about the center of the hoop, if the hoop were fixed.

3.  **Express $\dot{\theta}$ in terms of $p_\theta$.**
    From $p_\theta = mR^2\dot{\theta}$:
    $$\dot{\theta} = \frac{p_\theta}{mR^2}$$
    *Explanation:* Simple inversion.

4.  **Construct the Hamiltonian $H = p_\theta \dot{\theta} - L$.**
    Substitute the expressions for $p_\theta$, $\dot{\theta}$, and $L$.
    $$H = p_\theta \left(\frac{p_\theta}{mR^2}\right) - \left[\frac{1}{2}mR^2\left(\left(\frac{p_\theta}{mR^2}\right)^2 + \omega^2\sin^2\theta\right) - mgR\cos\theta\right]$$
    *Explanation:* Be careful with the substitution into the $L$ term, especially the $\dot{\theta}^2$ part.

5.  **Simplify the expression for $H$.**
    $$H = \frac{p_\theta^2}{mR^2} - \left[\frac{1}{2}mR^2\frac{p_\theta^2}{(mR^2)^2} + \frac{1}{2}mR^2\omega^2\sin^2\theta - mgR\cos\theta\right]$$
    $$H = \frac{p_\theta^2}{mR^2} - \left[\frac{p_\theta^2}{2mR^2} + \frac{1}{2}mR^2\omega^2\sin^2\theta - mgR\cos\theta\right]$$
    $$H = \frac{p_\theta^2}{mR^2} - \frac{p_\theta^2}{2mR^2} - \frac{1}{2}mR^2\omega^2\sin^2\theta + mgR\cos\theta$$
    $$H = \frac{p_\theta^2}{2mR^2} - \frac{1}{2}mR^2\omega^2\sin^2\theta + mgR\cos\theta$$
    $$\boxed{H(\theta, p_\theta) = \frac{p_\theta^2}{2mR^2} - \frac{1}{2}mR^2\omega^2\sin^2\theta + mgR\cos\theta}$$
    *Explanation:* Combine terms. Notice that $H$ is not simply $T+V$. The term $-\frac{1}{2}mR^2\omega^2\sin^2\theta$ arises from the rotation and is sometimes called a "centrifugal potential." The Hamiltonian explicitly contains $\theta$ (position) and $p_\theta$ (momentum). It does not explicitly contain $t$, so $H$ is a conserved quantity, representing the total energy of the system in the rotating frame, or more precisely, the energy of the system plus the energy associated with the transformation to the rotating frame.

**Reflection:** This example shows a more complex Lagrangian where the kinetic energy has terms dependent on both $\dot{\theta}$ and $\theta$. The resulting Hamiltonian is still the total energy, but it includes the "effective potential" terms related to the non-inertial frame. The process remains the same: find $L$, find $p_i$, invert for $\dot{q}_i$, and substitute into $H = \Sigma p_i \dot{q}_i - L$.

## 6. Common mistakes and traps

1.  **Forgetting to express $\dot{q}_i$ in terms of $p_i$ (and $q_i, t$)**: This is by far the most common and critical error. The Hamiltonian $H$ *must* be a function of $(\mathbf{q}, \mathbf{p}, t)$, not $(\mathbf{q}, \dot{\mathbf{q}}, t)$. If you leave $\dot{q}_i$ in the final expression for $H$, you haven't completed the Legendre transformation.
2.  **Confusing canonical momentum $p_i$ with kinetic momentum $m\dot{q}_i$**: While $p_i = m\dot{q}_i$ for simple systems, this is not universally true. For systems with velocity-dependent potentials (like charged particles in magnetic fields, Example 3), $p_i = \frac{\partial L}{\partial \dot{q}_i}$ will include additional terms. Always use the definition $p_i = \frac{\partial L}{\partial \dot{q}_i}$.
3.  **Incorrectly performing the partial derivative for $p_i$**: Ensure you are taking the partial derivative with respect to $\dot{q}_i$, treating all other variables ($q_j$, $\dot{q}_j$ for $j \neq i$, and $t$) as constants.
4.  **Sign errors when subtracting $L$**: The definition is $H = \Sigma p_i \dot{q}_i - L$. It's easy to forget to distribute the negative sign to all terms within the Lagrangian, especially if $L$ has multiple terms.
5.  **Missing the summation $\Sigma$ for multiple degrees of freedom**: If a system has multiple generalized coordinates ($q_1, q_2, \dots$), the summation $\Sigma p_i \dot{q}_i$ must include all of them ($p_1\dot{q}_1 + p_2\dot{q}_2 + \dots$).
6.  **Assuming $H$ is always the total energy $T+V$**: While often true for conservative systems where $T$ is quadratic in velocities and $V$ is velocity-independent, it's not a universal rule. For example, if $V$ depends on $\dot{q}$ (as in electromagnetism), $H$ will still be a conserved quantity if $\partial H / \partial t = 0$, but it might not simply be $T+V$.

## 7. Textbook-precise explanation

In analytical mechanics, the transition from the Lagrangian formulation to the Hamiltonian formulation is achieved via a Legendre transformation.

Let a mechanical system be described by $N$ generalized coordinates $q_i$ ($i=1, \dots, N$) and their corresponding generalized velocities $\dot{q}_i$. The state of the system is fully characterized by the Lagrangian $L(\mathbf{q}, \dot{\mathbf{q}}, t)$, where $\mathbf{q} = (q_1, \dots, q_N)$ and $\dot{\mathbf{q}} = (\dot{q}_1, \dots, \dot{q}_N)$.

The **generalized momentum** $p_i$ canonically conjugate to the generalized coordinate $q_i$ is defined as:
$$p_i = \frac{\partial L}{\partial \dot{q}_i}$$
This definition establishes a mapping from the space of generalized velocities to the space of generalized momenta. For this transformation to be unique and invertible, the Hessian matrix of $L$ with respect to $\dot{q}_i$ must be non-singular: $\det\left(\frac{\partial^2 L}{\partial \dot{q}_i \partial \dot{q}_j}\right) \neq 0$. This ensures that $\dot{q}_i$ can be uniquely expressed as a function of $\mathbf{q}$, $\mathbf{p}$, and $t$.

The **Hamiltonian** $H$ is then defined as the Legendre transform of the Lagrangian $L$ with respect to the generalized velocities $\dot{q}_i$ and their conjugate momenta $p_i$. Specifically, it is given by:
$$H(\mathbf{q}, \mathbf{p}, t) = \sum_{i=1}^{N} p_i \dot{q}_i - L(\mathbf{q}, \dot{\mathbf{q}}, t)$$
It is crucial that, after forming this expression, the generalized velocities $\dot{q}_i$ on the right-hand side are eliminated by expressing them in terms of $\mathbf{q}$, $\mathbf{p}$, and $t$ using the relations $p_i = \frac{\partial L}{\partial \dot{q}_i}$. The resulting function $H$ is thus solely a function of generalized coordinates, generalized momenta, and time.

The total differential of the Hamiltonian can be shown to be:
$$dH = \sum_i \left(\frac{\partial H}{\partial q_i} dq_i + \frac{\partial H}{\partial p_i} dp_i\right) + \frac{\partial H}{\partial t} dt$$
Comparing this with the total differential derived from its definition, $dH = \sum_i (dp_i \dot{q}_i + p_i d\dot{q}_i) - \left(\sum_i \frac{\partial L}{\partial q_i} dq_i + \sum_i \frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i + \frac{\partial L}{\partial t} dt\right)$, and using $p_i = \frac{\partial L}{\partial \dot{q}_i}$ and the Euler-Lagrange equations $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$, we arrive at Hamilton's canonical equations of motion:
$$\dot{q}_i = \frac{\partial H}{\partial p_i}$$
$$\dot{p}_i = -\frac{\partial H}{\partial q_i}$$
These equations, along with $\frac{\partial H}{\partial t} = -\frac{\partial L}{\partial t}$, fully describe the system's dynamics in phase space $(\mathbf{q}, \mathbf{p})$.

For scleronomous (time-independent constraints) and conservative systems where the kinetic energy $T$ is a homogeneous quadratic function of generalized velocities and the potential energy $V$ is independent of velocities, the Hamiltonian $H$ is equal to the total mechanical energy $E = T+V$. Furthermore, if the Hamiltonian does not explicitly depend on time (i.e., $\frac{\partial H}{\partial t} = 0$), then $H$ is a constant of motion.

(Refer to: Goldstein, H., Poole, C. P., & Safko, J. L. (2002). *Classical Mechanics* (3rd ed.). Addison Wesley. Chapter 8, Section 8.1.)
(Refer to: Landau, L. D., & Lifshitz, E. M. (1976). *Mechanics* (Vol. 1, 3rd ed.). Butterworth-Heinemann. Chapter 7, Section 40.)

## 8. ASCII diagrams

```text
                                  The Hamiltonian Transformation

        Lagrangian Space (Configuration-Velocity Space)        Phase Space (Configuration-Momentum Space)
        -----------------------------------------------        ------------------------------------------

       L(q₁, ..., qN, q̇₁, ..., q̇N, t) ---------------------> H(q₁, ..., qN, p₁, ..., pN, t)
                                 |                                 ^
                                 |  Mathematical Bridge:           |
                                 |  Legendre Transformation        |
                                 |                                 |
                                 |  1. Define Canonical Momenta:   |
                                 |     pᵢ = ∂L/∂q̇ᵢ                 |
                                 |                                 |
                                 |  2. Invert to express q̇ᵢ in terms of pᵢ:
                                 |     q̇ᵢ = f(q, p, t)             |
                                 |                                 |
                                 |  3. Apply the Definition:       |
                                 |     H = Σ pᵢq̇ᵢ - L             |
                                 |     (Substitute q̇ᵢ from step 2) |
                                 V                                 |
                                  ---------------------------------
                                                 |
                                                 V
                                         Hamilton's Equations:
                                         q̇ᵢ = ∂H/∂pᵢ
                                         ṗᵢ = -∂H/∂qᵢ
```

**Description of Diagram:**
The diagram illustrates the conceptual flow from the Lagrangian formulation to the Hamiltonian formulation. On the left is "Lagrangian Space," where the system is described by generalized coordinates ($q$) and generalized velocities ($\dot{q}$). On the right is "Phase Space," where the system is described by generalized coordinates ($q$) and generalized momenta ($p$). The arrow from $L$ to $H$ represents the Legendre Transformation, which acts as a "mathematical bridge." This bridge involves three key steps: (1) defining the generalized momenta $p_i$ from the Lagrangian, (2) inverting these definitions to express $\dot{q}_i$ in terms of $p_i$ (and $q_i, t$), and (3) substituting these into the definition $H = \Sigma p_i \dot{q}_i - L$. The final Hamiltonian $H(q, p, t)$ then allows for the derivation of Hamilton's canonical equations of motion, which govern the system's evolution in phase space.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of the Hamiltonian as a "High-Energy Party" (H for High-Energy). At this party, "People Quit Drinking Less" (P-Q-dot minus L).
    *   **H** = **P**-**Q̇** - **L**
    *   The "P" and "Q̇" are for each degree of freedom, so it's a summation: $\Sigma p_i \dot{q}_i$.
    *   The key is to remember that after you write this formula, you *must* kick out all the "Drinking" ($\dot{q}_i$) and replace them with "People" ($p_i$). So, $H$ is ultimately a function of $q_i$ and $p_i$.

2.  **Formulas/Facts to Overlearn:**
    *   **Generalized Momentum Definition:** $p_i = \frac{\partial L}{\partial \dot{q}_i}$ (This is the first step in *every* Hamiltonian problem).
    *   **Hamiltonian Definition:** $H = \sum_i p_i \dot{q}_i - L$ (and the *critical* follow-up: express all $\dot{q}_i$ in terms of $p_i, q_i, t$).
    *   **Hamiltonian as Energy (often, but not always):** For conservative systems with kinetic energy quadratic in velocities and potential energy independent of velocities, $H = T+V$.

3.  **Spaced-Repetition Schedule:**
    *   **Today (Day 0):** Immediately after this lesson, review the definition and work through Example 2 (SHO) again without looking at the solution.
    *   **Day 1:** Review the definition, the mnemonic, and the crucial step of eliminating $\dot{q}_i$. Work through Example 3 (magnetic field) again.
    *   **Day 3:** Re-derive the Hamiltonian for a free particle and a simple pendulum (not covered, but a good test).
    *   **Day 7:** Write down the definition of $p_i$ and $H$ from memory. Explain in your own words why we use Legendre transform.
    *   **Day 16:** Solve a new problem involving a system with two degrees of freedom and a slightly more complex potential.
    *   **Day 35:** Explain the connection between the Hamiltonian and total energy, and when they differ.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the definition of the Hamiltonian, you can rebuild it from the desire to change variables.
    1.  **Start with the total differential of the Lagrangian:** $dL = \sum_i \left(\frac{\partial L}{\partial q_i} dq_i + \frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i\right) + \frac{\partial L}{\partial t} dt$.
    2.  **Introduce generalized momentum:** Substitute $p_i = \frac{\partial L}{\partial \dot{q}_i}$ into the differential: $dL = \sum_i \left(\frac{\partial L}{\partial q_i} dq_i + p_i d\dot{q}_i\right) + \frac{\partial L}{\partial t} dt$.
    3.  **Rearrange to isolate $p_i d\dot{q}_i$ terms:** We want a function of $q$ and $p$. So, we need to get $dp_i$ terms. Consider the term $\sum_i p_i d\dot{q}_i$. We know from calculus that $d(\sum_i p_i \dot{q}_i) = \sum_i (dp_i \dot{q}_i + p_i d\dot{q}_i)$.
    4.  **Substitute and define H:** From the above, we can write $\sum_i p_i d\dot{q}_i = d(\sum_i p_i \dot{q}_i) - \sum_i \dot{q}_i dp_i$.
        Substitute this back into the $dL$ equation:
        $dL = \sum_i \frac{\partial L}{\partial q_i} dq_i + d\left(\sum_i p_i \dot{q}_i\right) - \sum_i \dot{q}_i dp_i + \frac{\partial L}{\partial t} dt$.
        Rearrange terms to define $H$:
        $d\left(\sum_i p_i \dot{q}_i - L\right) = \sum_i \dot{q}_i dp_i - \sum_i \frac{\partial L}{\partial q_i} dq_i - \frac{\partial L}{\partial t} dt$.
        Let $H = \sum_i p_i \dot{q}_i - L$. Then $dH = \sum_i \dot{q}_i dp_i - \sum_i \frac{\partial L}{\partial q_i} dq_i - \frac{\partial L}{\partial t} dt$.
    5.  **Identify partial derivatives of H:** By comparing this $dH$ with the general form $dH = \sum_i \left(\frac{\partial H}{\partial q_i} dq_i + \frac{\partial H}{\partial p_i} dp_i\right) + \frac{\partial H}{\partial t} dt$, you can then identify Hamilton's equations and the relations for $\partial H / \partial t$. This derivation confirms the structure of the Legendre transform.

## 10. Connections — what this leads to

The Hamiltonian is a cornerstone concept that unlocks vast areas of advanced physics and mathematics. Understanding its definition is the first step towards:

1.  **Hamilton's Canonical Equations of Motion:** The most direct consequence. Once you have the Hamiltonian $H(q, p, t)$, the equations of motion become a set of first-order differential equations: $\dot{q}_i = \frac{\partial H}{\partial p_i}$ and $\dot{p}_i = -\frac{\partial H}{\partial q_i}$. These are often easier to solve than the second-order Euler-Lagrange equations, especially for complex systems.
2.  **Phase Space Dynamics:** The Hamiltonian naturally lives in phase space, a multi-dimensional space where each point represents a unique state of the system ($(\mathbf{q}, \mathbf{p})$). The evolution of the system is a trajectory in this phase space. This perspective is fundamental in statistical mechanics and chaos theory.
3.  **Canonical Transformations:** These are transformations in phase space that preserve the form of Hamilton's equations. They are incredibly powerful for simplifying complex problems by finding new "canonical" coordinates and momenta where the Hamiltonian takes a simpler form (e.g., cyclic coordinates).
4.  **Hamilton-Jacobi Equation:** A single, first-order partial differential equation that can describe the entire dynamics of a system. It's a powerful tool for solving problems, especially in celestial mechanics and optics, and provides a direct link to quantum mechanics.
5.  **Action-Angle Variables:** A specific type of canonical transformation that is particularly useful for analyzing periodic or quasi-periodic systems, allowing for the calculation of frequencies and other conserved quantities.
6.  **Quantum Mechanics (Hamiltonian Operator):** As mentioned, the classical Hamiltonian is directly promoted to the Hamiltonian operator ($\hat{H}$) in quantum mechanics. This operator represents the total energy of the quantum system, and its eigenvalues are the possible energy levels. Its role in the Schrödinger equation is central to all quantum phenomena.
7.  **Perturbation Theory:** When a system's Hamiltonian is slightly modified, perturbation theory (both classical and quantum) allows us to approximate the new dynamics or energy levels based on the known solutions of the unperturbed system.
8.  **Liouville's Theorem:** In statistical mechanics, this theorem describes the conservation of phase space volume for a Hamiltonian system, crucial for understanding ensembles and equilibrium states.
9.  **Optimal Control Theory:** The Hamiltonian (often generalized to a "Hamiltonian function" or "Pontryagin's function") is central to finding optimal control strategies for dynamic systems, minimizing cost functions in engineering applications (like rocket trajectories).

## 11. Self-check questions

1.  A particle of mass $m$ is constrained to move on the surface of a sphere of radius $R$. Using spherical coordinates $(\theta, \phi)$, write down the Lagrangian and then derive the Hamiltonian $H(\theta, \phi, p_\theta, p_\phi)$. Assume no gravity.
2.  Consider a particle of mass $m$ moving in one dimension under a potential $V(x) = \alpha x$, where $\alpha$ is a constant.
    a) Find the Lagrangian $L(x, \dot{x})$.
    b) Calculate the generalized momentum $p_x$.
    c) Derive the Hamiltonian $H(x, p_x)$.
    d) Is this Hamiltonian equal to $T+V$? Explain why or why not.
3.  A system has a Lagrangian given by $L = \frac{1}{2}a\dot{q}^2 - \frac{1}{2}b\dot{q}q^2 - \frac{1}{2}cq^2$, where $a, b, c$ are constants.
    a) Find the generalized momentum $p$.
    b) Express $\dot{q}$ in terms of $p$ and $q$.
    c) Derive the Hamiltonian $H(q, p)$.
    d) What makes this Lagrangian (and its Hamiltonian derivation) different from the simpler examples?
4.  A relativistic particle of mass $m$ has kinetic energy $T = mc^2(\sqrt{1 + (\frac{\dot{x}}{c})^2} - 1)$ and moves in a potential $V(x)$.
    a) Write down the Lagrangian $L(x, \dot{x})$.
    b) Calculate the generalized momentum $p_x$.
    c) Derive the Hamiltonian $H(x, p_x)$.
    d) Discuss the form of the Hamiltonian and its relation to energy in the non-relativistic limit.
5.  Explain in detail why the step of expressing $\dot{q}_i$ in terms of $p_i$ is crucial for the Hamiltonian to be a valid function of phase space variables. What would happen if this step were omitted? Use the total differential of $H$ to illustrate your point.