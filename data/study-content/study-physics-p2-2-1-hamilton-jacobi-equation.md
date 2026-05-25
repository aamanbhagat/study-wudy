## 1. What it is — in plain English

Imagine you're trying to figure out where a tiny rocket will go, or how a planet will orbit the sun. Usually, you'd write down equations that describe all the forces acting on it, and then solve those equations to trace its path step by step. This can be incredibly complicated, especially if there are many interacting parts.

The Hamilton-Jacobi equation offers a completely different, and often much more elegant, way to solve these problems. Instead of tracking the particle's path directly, it asks you to find a single, special "master function" – let's call it $S$. Think of $S$ like a magic map.

This magic map $S$ doesn't tell you the position directly, but rather, its contours (lines of constant $S$) act like wavefronts. The path of our rocket or planet is always perpendicular to these wavefronts, like a light ray traveling through a medium. If you have this $S$ function, you don't need to solve any messy differential equations for the path; you can just "read off" everything you need to know about the system's motion.

So, in essence, the Hamilton-Jacobi equation is a single, powerful equation that, when solved, gives you this "master function" $S$. Once you have $S$, you can instantly determine the position and momentum of every part of your system at any future time, without ever having to solve Newton's laws or Hamilton's equations directly. It transforms a complex problem of many interacting particles into a single, albeit often challenging, partial differential equation.

## 2. Why it matters — real-world applications

The Hamilton-Jacobi equation, and the principles behind it, are fundamental across many fields of physics and engineering. Its power lies in its ability to provide a global perspective on system dynamics, often simplifying problems that are intractable with other methods.

1.  **Optimal Trajectory Planning in Aerospace:** When launching a rocket or spacecraft, engineers need to calculate the most fuel-efficient or fastest trajectory to reach a destination. This is a classic optimal control problem. The Hamilton-Jacobi-Bellman (HJB) equation, a generalization of the Hamilton-Jacobi equation, is the cornerstone of dynamic programming and optimal control theory. Companies like **SpaceX** or **NASA** use these principles to design mission profiles, plan rendezvous maneuvers, and optimize interplanetary trajectories, ensuring probes reach their targets with minimal propellant expenditure.

2.  **Quantum Mechanics (Semiclassical Approximation):** The Hamilton-Jacobi equation provides a crucial bridge between classical and quantum mechanics. In the WKB approximation (Wentzel–Kramers–Brillouin), the classical action $S$ from the Hamilton-Jacobi equation appears directly in the phase of the quantum mechanical wave function. This allows physicists to understand how quantum systems behave in the limit where Planck's constant approaches zero, effectively showing how classical mechanics emerges from quantum mechanics. This is vital for understanding phenomena from electron tunneling in semiconductors to the behavior of atoms in strong fields.

3.  **Geometric Optics and Wave Propagation:** The Hamilton-Jacobi equation has a direct analog in optics called the Eikonal equation. This equation describes the propagation of wavefronts in a medium, where the "master function" $S$ represents the optical path length. The paths of light rays are then perpendicular to these wavefronts, consistent with Fermat's Principle of Least Time. This is used in designing lenses, fiber optics (e.g., at **Corning Inc.**), and understanding how light bends through varying refractive indices, such as in mirages or atmospheric lensing.

4.  **Reinforcement Learning and Robotics (Control Theory):** In machine learning, particularly in reinforcement learning, agents learn to make decisions to maximize a cumulative reward over time. The Hamilton-Jacobi-Bellman equation again appears as a continuous-time formulation of the Bellman equation, which is central to dynamic programming algorithms like Q-learning or value iteration. This is applied in training robots (e.g., **Boston Dynamics**' Spot or Atlas) to navigate complex environments, balance, or perform intricate tasks by finding optimal control policies that minimize "cost" or maximize "reward."

## 3. Prerequisites — what you must know first

Before diving into the Hamilton-Jacobi equation, a solid understanding of the following concepts is absolutely essential. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Lagrangian Mechanics:**
    *   **Generalized Coordinates ($q_i$):** A set of independent coordinates that completely describe the configuration of a system, often different from Cartesian coordinates (e.g., angles, radii).
    *   **Lagrangian ($L$):** A function defined as $L = T - V$, where $T$ is the kinetic energy and $V$ is the potential energy, expressed in terms of generalized coordinates and velocities.
    *   **Euler-Lagrange Equations:** The set of differential equations ($\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$) that describe the equations of motion for a system, derived from the principle of least action.

*   **Hamiltonian Mechanics:**
    *   **Generalized Momenta ($p_i$):** Defined as $p_i = \frac{\partial L}{\partial \dot{q}_i}$, these are the momenta conjugate to the generalized coordinates.
    *   **Hamiltonian ($H$):** A function defined by a Legendre transformation of the Lagrangian: $H(q, p, t) = \sum_i p_i \dot{q}_i - L(q, \dot{q}, t)$. It represents the total energy for many systems.
    *   **Hamilton's Equations:** A set of $2N$ first-order differential equations ($\dot{q}_i = \frac{\partial H}{\partial p_i}$, $\dot{p}_i = -\frac{\partial H}{\partial q_i}$) that describe the time evolution of the system in phase space.
    *   **Phase Space:** A $2N$-dimensional space where each point represents the complete state of a system (all $q_i$ and $p_i$).

*   **Canonical Transformations:**
    *   **Concept:** A transformation from one set of generalized coordinates and momenta $(q_i, p_i)$ to another set $(Q_i, P_i)$ such that Hamilton's equations retain their form in the new variables.
    *   **Generating Functions ($F_1, F_2, F_3, F_4$):** Special functions that define canonical transformations. For example, an $F_2(q, P, t)$ generating function relates old coordinates and new momenta.
    *   **Conditions for Canonical Transformation:** The relationships between old and new coordinates/momenta and their derivatives with respect to the generating function.

*   **Partial Differential Equations (PDEs):**
    *   **Basic Concepts:** Understanding what a PDE is, and how it differs from an ordinary differential equation (ODE).
    *   **Method of Separation of Variables:** A common technique for solving certain types of PDEs by assuming the solution can be written as a product of functions, each depending on a single independent variable.

*   **Calculus of Variations:**
    *   **Action ($A$):** The integral of the Lagrangian over time, $A = \int L \, dt$.
    *   **Principle of Least Action:** The path taken by a system between two states is the one for which the action is stationary (a minimum for classical mechanics).

## 4. The core idea — step by step

The Hamilton-Jacobi equation is a powerful technique that allows us to find the equations of motion for a system by solving a single partial differential equation, rather than a system of $2N$ first-order ordinary differential equations (Hamilton's equations). The core idea is to find a very specific canonical transformation that simplifies the system's dynamics to the point where the new coordinates and momenta are all constants.

### Step 1: The Challenge of Hamilton's Equations

*   **Plain English:** Hamilton's equations give us $2N$ equations that describe how our system changes over time. While they're "first-order" (meaning they only involve first derivatives), solving them can still be incredibly difficult, especially for complex systems. We're looking for a way to make the problem even simpler.

*   **Concrete Example:** For a simple pendulum, Hamilton's equations are two coupled ODEs. For a system of three interacting planets, it's six coupled ODEs (three coordinates and three momenta for each). The more particles, the harder it gets.

*   **Formal/Mathematical Version:** Hamilton's equations are:
    $$ \dot{q}_i = \frac{\partial H}{\partial p_i} $$
    $$ \dot{p}_i = -\frac{\partial H}{\partial q_i} $$
    where $H(q_i, p_i, t)$ is the Hamiltonian.

*   **What could go wrong:** Students might think Hamilton's equations are easy enough. The "difficulty" here isn't just about the number of equations, but their potential non-linearity and coupling, making analytical solutions rare.

### Step 2: The Goal: Trivializing the System with a Canonical Transformation

*   **Plain English:** Imagine we could transform our problem into a new set of coordinates and momenta where everything is constant. If the new coordinates and momenta don't change at all, then the system's motion in these new variables is "trivial" – it's just standing still! If we can find such a transformation, we can then transform back to the original coordinates to find the actual motion.

*   **Concrete Example:** Think of a rotating object. Its position in fixed Cartesian coordinates is complicated. But if we transform to a rotating coordinate system that moves with the object, its position in the new system might be constant.

*   **Formal/Mathematical Version:** We seek a canonical transformation from $(q_i, p_i)$ to $(Q_i, P_i)$ such that the new Hamiltonian, $K(Q_i, P_i, t)$, is zero or a constant. If $K=0$, then Hamilton's equations in the new variables become:
    $$ \dot{Q}_i = \frac{\partial K}{\partial P_i} = 0 \implies Q_i = \text{constant} $$
    $$ \dot{P}_i = -\frac{\partial K}{\partial Q_i} = 0 \implies P_i = \text{constant} $$
    The new coordinates $Q_i$ and momenta $P_i$ are then simply constants, which we'll call $\alpha_i$ and $\beta_i$ respectively.

*   **What could go wrong:** Forgetting that $Q_i$ and $P_i$ are *constants* in this desired trivial system. The goal isn't just *any* canonical transformation, but one that makes the new Hamiltonian zero or constant.

### Step 3: Introducing Hamilton's Principal Function $S(q, P, t)$

*   **Plain English:** To achieve the goal of Step 2, we use a special type of generating function for our canonical transformation. This function, called Hamilton's Principal Function and denoted $S$, depends on the old coordinates ($q$), the new *constant* momenta ($P$, which we'll call $\alpha$), and time ($t$). This $S$ function is the "magic map" we talked about earlier.

*   **Concrete Example:** If you knew a function $S(x, \alpha_x, t)$ for a particle, its derivatives would directly give you its momentum and its initial position (or some other constant of motion).

*   **Formal/Mathematical Version:** We choose a generating function of type $F_2(q, P, t)$. From the theory of canonical transformations with an $F_2$ generating function, we have:
    $$ p_i = \frac{\partial F_2}{\partial q_i} $$
    $$ Q_i = \frac{\partial F_2}{\partial P_i} $$
    And the new Hamiltonian $K$ is related to the old Hamiltonian $H$ by:
    $$ K = H + \frac{\partial F_2}{\partial t} $$
    We choose $F_2$ to be Hamilton's Principal Function, $S(q_1, \dots, q_N, P_1, \dots, P_N, t)$. The new momenta $P_i$ are constants of motion, so we denote them as $\alpha_i$. Thus, $S = S(q_1, \dots, q_N, \alpha_1, \dots, \alpha_N, t)$.

*   **What could go wrong:** Confusing $S$ with the action integral $A = \int L \, dt$. While related, $S$ is a function of coordinates, new momenta, and time, whereas $A$ is a functional. Also, confusing $P_i$ (new momenta) with $p_i$ (old momenta).

### Step 4: Deriving the Hamilton-Jacobi Equation

*   **Plain English:** Now we combine the desire for a trivial new Hamiltonian with the properties of our generating function $S$. We want the new Hamiltonian $K$ to be zero. So, we set $K=0$ in the transformation equation and substitute the expressions for the old momenta $p_i$ in terms of $S$. This directly gives us the Hamilton-Jacobi equation.

*   **Concrete Example:** If $H$ is a function of $q$ and $p$, and we know $p = \partial S / \partial q$, then we can replace $p$ in $H$ with $\partial S / \partial q$. Then, adding $\partial S / \partial t$ and setting it to zero gives the H-J equation.

*   **Formal/Mathematical Version:**
    We set $K=0$. From Step 3, we have:
    $$ K = H(q, p, t) + \frac{\partial S}{\partial t} = 0 $$
    We also know that $p_i = \frac{\partial S}{\partial q_i}$. Substituting this into the Hamiltonian $H$:
    $$ H\left(q_1, \dots, q_N, \frac{\partial S}{\partial q_1}, \dots, \frac{\partial S}{\partial q_N}, t\right) + \frac{\partial S}{\partial t} = 0 $$
    This is the **Hamilton-Jacobi equation**. It's a single first-order partial differential equation for $S(q_1, \dots, q_N, \alpha_1, \dots, \alpha_N, t)$.

*   **What could go wrong:** Incorrectly substituting $p_i$ or mixing up the arguments of $H$. The Hamiltonian $H$ is a function of $q$, $p$, and $t$. After substitution, $H$ becomes a function of $q$, $\partial S / \partial q$, and $t$.

### Step 5: Solving the Hamilton-Jacobi Equation and Finding the Motion

*   **Plain English:** Once we solve the H-J equation for $S$, we have our "magic map." From this $S$ function, we can directly find the actual paths of our particles. The new coordinates $Q_i$ are constants, and they are found by taking derivatives of $S$ with respect to the new constant momenta $\alpha_i$. These $Q_i$ are also constants, which we can call $\beta_i$. These equations relate our original coordinates $q_i$ to time and the constants $\alpha_i$ and $\beta_i$, thus giving us the full solution.

*   **Concrete Example:** If we found $S(q, \alpha, t)$ for a particle, then taking $\partial S / \partial \alpha = \beta$ would give us an equation like $q(t, \alpha, \beta) = \text{expression}$. This is the equation of motion for $q$.

*   **Formal/Mathematical Version:**
    The Hamilton-Jacobi equation is a first-order PDE. Its complete solution $S(q_1, \dots, q_N, \alpha_1, \dots, \alpha_N, t)$ will contain $N$ arbitrary constants of integration, $\alpha_1, \dots, \alpha_N$. These constants are precisely the new constant momenta $P_i$.
    The new constant coordinates $Q_i$ (which we call $\beta_i$) are given by:
    $$ Q_i = \beta_i = \frac{\partial S}{\partial P_i} = \frac{\partial S}{\partial \alpha_i} $$
    These $N$ equations, along with $p_i = \frac{\partial S}{\partial q_i}$, provide $2N$ equations that describe the motion of the system in terms of $q_i(t)$ and $p_i(t)$, parameterized by the $2N$ constants $\alpha_i$ and $\beta_i$.

*   **What could go wrong:** Forgetting to integrate the H-J equation to find $S$. Also, forgetting that the constants of integration *are* the new constant momenta $\alpha_i$. Misinterpreting $\beta_i$ as initial positions rather than constants derived from the generating function.

### Step 6: Hamilton's Characteristic Function $W(q, \alpha)$ (Time-Independent Case)

*   **Plain English:** For many systems, the Hamiltonian doesn't explicitly depend on time (it's "time-independent"). In these cases, we can simplify the H-J equation by separating out the time dependence from $S$. We assume $S$ can be written as a function of only coordinates (let's call it $W$) minus a term involving the total energy and time. This $W$ function is called Hamilton's Characteristic Function.

*   **Concrete Example:** For a particle in a conservative potential, its total energy is constant. This constant energy will be one of our $\alpha$ constants.

*   **Formal/Mathematical Version:**
    If $H$ does not explicitly depend on time ($\partial H / \partial t = 0$), then the total energy $E$ is conserved. We can assume a solution for $S$ of the form:
    $$ S(q, \alpha, t) = W(q, \alpha) - E(\alpha)t $$
    where $W(q, \alpha)$ is Hamilton's Characteristic Function and $E(\alpha)$ is the energy, which is one of the constant new momenta $\alpha_i$.
    Substituting this into the H-J equation:
    $$ H\left(q, \frac{\partial W}{\partial q}\right) + \frac{\partial}{\partial t}(W - Et) = 0 $$
    $$ H\left(q, \frac{\partial W}{\partial q}\right) - E = 0 $$
    $$ H\left(q, \frac{\partial W}{\partial q}\right) = E $$
    This is the **time-independent Hamilton-Jacobi equation**. It's a PDE for $W(q, \alpha)$. Once $W$ is found, we can use the relations from Step 5:
    $$ p_i = \frac{\partial W}{\partial q_i} $$
    $$ \beta_i = \frac{\partial W}{\partial \alpha_i} - t \frac{\partial E}{\partial \alpha_i} $$
    Note: if $E$ is chosen as one of the $\alpha_i$, say $\alpha_1$, then $\frac{\partial E}{\partial \alpha_1} = 1$ and $\frac{\partial E}{\partial \alpha_j} = 0$ for $j \neq 1$. So, for $\alpha_1=E$:
    $$ \beta_1 = \frac{\partial W}{\partial E} - t $$
    $$ \beta_j = \frac{\partial W}{\partial \alpha_j} \quad \text{for } j \neq 1 $$

*   **What could go wrong:** Incorrectly separating variables or forgetting the minus sign in front of $Et$. Misidentifying $E$ as just *any* constant, instead of the specific constant of motion related to the time-independence of $H$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Free Particle in One Dimension

**Problem:** A free particle of mass $m$ moves in one dimension. Use the Hamilton-Jacobi equation to find its motion.

**Given:**
*   Mass $m$
*   No potential energy, so $V=0$.
*   One dimension, so $q$ is the position and $p$ is the momentum.

**Want:** Equations of motion $q(t)$ and $p(t)$.

**Solution:**

1.  **Formulate the Hamiltonian:**
    *   Kinetic energy $T = \frac{1}{2}m\dot{q}^2$.
    *   Lagrangian $L = T - V = \frac{1}{2}m\dot{q}^2$.
    *   Generalized momentum $p = \frac{\partial L}{\partial \dot{q}} = m\dot{q}$. So, $\dot{q} = \frac{p}{m}$.
    *   Hamiltonian $H = p\dot{q} - L = p\left(\frac{p}{m}\right) - \frac{1}{2}m\left(\frac{p}{m}\right)^2 = \frac{p^2}{m} - \frac{p^2}{2m} = \frac{p^2}{2m}$.
    *   *Explanation:* We start by defining the system's energy in terms of generalized coordinates and momenta. For a free particle, the energy is purely kinetic.

2.  **Set up the Hamilton-Jacobi equation:**
    *   Since $H$ does not explicitly depend on time, we use the time-independent form: $H\left(q, \frac{\partial W}{\partial q}\right) = E$.
    *   Substitute $p = \frac{\partial W}{\partial q}$ into the Hamiltonian:
        $$ \frac{1}{2m}\left(\frac{\partial W}{\partial q}\right)^2 = E $$
    *   *Explanation:* The H-J equation replaces $p_i$ with $\partial S / \partial q_i$ (or $\partial W / \partial q_i$ for time-independent $H$). We are looking for $W(q, E)$. $E$ is our constant $\alpha_1$.

3.  **Solve the PDE for $W(q, E)$:**
    *   Rearrange the equation:
        $$ \left(\frac{\partial W}{\partial q}\right)^2 = 2mE $$
    *   Take the square root:
        $$ \frac{\partial W}{\partial q} = \pm \sqrt{2mE} $$
    *   Integrate with respect to $q$:
        $$ W(q, E) = \pm \sqrt{2mE} \, q + C $$
    *   *Explanation:* This is a simple ODE since $W$ only depends on $q$. We integrate to find $W$. The constant of integration $C$ can be absorbed into the definition of $S$ or $W$ without loss of generality, or it can be considered one of the $\alpha_i$ constants. For simplicity, we'll omit it here, as it doesn't affect the physical motion.

4.  **Formulate Hamilton's Principal Function $S(q, E, t)$:**
    *   $S(q, E, t) = W(q, E) - Et$
    *   $$ S(q, E, t) = \pm \sqrt{2mE} \, q - Et $$
    *   *Explanation:* This is the complete solution for $S$, the "magic map."

5.  **Find the equations of motion:**
    *   The new constant coordinate $Q_1$ (which we call $\beta_1$) is given by $\beta_1 = \frac{\partial S}{\partial E}$.
    *   $$ \beta_1 = \frac{\partial}{\partial E}\left(\pm \sqrt{2mE} \, q - Et\right) $$
    *   $$ \beta_1 = \pm \frac{1}{2}\frac{\sqrt{2m}}{\sqrt{E}} \, q - t $$
    *   Rearrange to solve for $q$:
        $$ q(t) = \pm \frac{\sqrt{E}}{\sqrt{2m}} (\beta_1 + t) $$
        $$ q(t) = \pm \sqrt{\frac{E}{2m}} (\beta_1 + t) $$
    *   *Explanation:* Taking the derivative of $S$ with respect to the new constant momentum (which is $E$ in this case) gives us the new constant coordinate $\beta_1$. This equation directly gives $q$ as a function of $t$ and the constants $E$ and $\beta_1$.
    *   Now find the momentum $p = \frac{\partial S}{\partial q}$:
        $$ p = \frac{\partial}{\partial q}\left(\pm \sqrt{2mE} \, q - Et\right) $$
        $$ p = \pm \sqrt{2mE} $$
    *   *Explanation:* Taking the derivative of $S$ with respect to $q$ recovers the momentum. As expected for a free particle, momentum is constant.

6.  **Interpret the results:**
    *   Let $v_0 = \pm \sqrt{\frac{E}{2m}}$. This is the constant velocity of the particle.
    *   Let $q_0 = v_0 \beta_1$. This is the initial position at $t=0$.
    *   Then $q(t) = v_0 t + q_0$.
    *   And $p = mv_0$.
    *   **Final Answer:**
        $$ \boxed{q(t) = v_0 t + q_0} $$
        $$ \boxed{p(t) = mv_0} $$
    *   *Explanation:* These are the well-known equations for a free particle in one dimension. The constants $E$ and $\beta_1$ are directly related to the initial velocity and position.

**Reflection:** This example was relatively easy because the Hamiltonian was simple and separation of variables was trivial (only one coordinate). The key was correctly setting up the H-J equation and then using the derivatives of $S$ to extract $q$ and $p$.

---

### Example 2: Simple Harmonic Oscillator in One Dimension

**Problem:** Use the Hamilton-Jacobi equation to find the motion of a one-dimensional simple harmonic oscillator with mass $m$ and spring constant $k$.

**Given:**
*   Mass $m$
*   Spring constant $k$
*   Potential energy $V(q) = \frac{1}{2}kq^2$.

**Want:** Equations of motion $q(t)$ and $p(t)$.

**Solution:**

1.  **Formulate the Hamiltonian:**
    *   Kinetic energy $T = \frac{1}{2}m\dot{q}^2$.
    *   Lagrangian $L = T - V = \frac{1}{2}m\dot{q}^2 - \frac{1}{2}kq^2$.
    *   Generalized momentum $p = \frac{\partial L}{\partial \dot{q}} = m\dot{q}$. So, $\dot{q} = \frac{p}{m}$.
    *   Hamiltonian $H = p\dot{q} - L = p\left(\frac{p}{m}\right) - \left(\frac{1}{2}m\left(\frac{p}{m}\right)^2 - \frac{1}{2}kq^2\right) = \frac{p^2}{m} - \frac{p^2}{2m} + \frac{1}{2}kq^2 = \frac{p^2}{2m} + \frac{1}{2}kq^2$.
    *   *Explanation:* Similar to the free particle, we derive the Hamiltonian. Here, the potential energy term is added.

2.  **Set up the Hamilton-Jacobi equation:**
    *   Since $H$ does not explicitly depend on time, we use $H\left(q, \frac{\partial W}{\partial q}\right) = E$.
    *   Substitute $p = \frac{\partial W}{\partial q}$ into the Hamiltonian:
        $$ \frac{1}{2m}\left(\frac{\partial W}{\partial q}\right)^2 + \frac{1}{2}kq^2 = E $$
    *   *Explanation:* We replace $p$ with $\partial W / \partial q$ and set the Hamiltonian equal to the constant energy $E$.

3.  **Solve the PDE for $W(q, E)$:**
    *   Rearrange the equation to isolate $\frac{\partial W}{\partial q}$:
        $$ \frac{1}{2m}\left(\frac{\partial W}{\partial q}\right)^2 = E - \frac{1}{2}kq^2 $$
        $$ \left(\frac{\partial W}{\partial q}\right)^2 = 2mE - mkq^2 $$
        $$ \frac{\partial W}{\partial q} = \pm \sqrt{2mE - mkq^2} $$
    *   Integrate with respect to $q$:
        $$ W(q, E) = \int \pm \sqrt{2mE - mkq^2} \, dq $$
        Let $\omega = \sqrt{k/m}$ be the angular frequency. Then $mk = m^2\omega^2$.
        $$ W(q, E) = \int \pm \sqrt{2mE - m^2\omega^2q^2} \, dq $$
        Factor out $m\omega$:
        $$ W(q, E) = \int \pm m\omega \sqrt{\frac{2E}{m\omega^2} - q^2} \, dq $$
        Let $A^2 = \frac{2E}{m\omega^2}$. This $A$ represents the amplitude of oscillation.
        $$ W(q, E) = \int \pm m\omega \sqrt{A^2 - q^2} \, dq $$
        This integral is of the form $\int \sqrt{a^2 - x^2} \, dx = \frac{x}{2}\sqrt{a^2 - x^2} + \frac{a^2}{2}\arcsin\left(\frac{x}{a}\right)$.
        $$ W(q, E) = \pm m\omega \left[ \frac{q}{2}\sqrt{A^2 - q^2} + \frac{A^2}{2}\arcsin\left(\frac{q}{A}\right) \right] $$
    *   *Explanation:* This integration is more involved. We make a substitution to simplify the square root term and recognize it as a standard integral.

4.  **Formulate Hamilton's Principal Function $S(q, E, t)$:**
    *   $S(q, E, t) = W(q, E) - Et$
    *   $$ S(q, E, t) = \pm m\omega \left[ \frac{q}{2}\sqrt{A^2 - q^2} + \frac{A^2}{2}\arcsin\left(\frac{q}{A}\right) \right] - Et $$
    *   *Explanation:* We add the time-dependent term back to get the complete $S$ function.

5.  **Find the equations of motion:**
    *   The new constant coordinate $\beta_1 = \frac{\partial S}{\partial E}$.
    *   Recall $A^2 = \frac{2E}{m\omega^2}$, so $\frac{\partial A^2}{\partial E} = \frac{2}{m\omega^2}$.
    *   $$ \beta_1 = \frac{\partial}{\partial E} \left( \pm m\omega \left[ \frac{q}{2}\sqrt{A^2 - q^2} + \frac{A^2}{2}\arcsin\left(\frac{q}{A}\right) \right] - Et \right) $$
    *   The derivative of the first term inside the bracket involves $\frac{\partial}{\partial E}\sqrt{A^2-q^2} = \frac{1}{2\sqrt{A^2-q^2}}\frac{\partial A^2}{\partial E}$.
    *   The derivative of the second term inside the bracket involves $\frac{\partial}{\partial E}\left(\frac{A^2}{2}\arcsin\left(\frac{q}{A}\right)\right)$.
    *   Let's focus on the term $\frac{\partial}{\partial E} \left[ \frac{A^2}{2}\arcsin\left(\frac{q}{A}\right) \right]$ as it simplifies nicely.
        $$ \frac{\partial}{\partial E} \left[ \frac{A^2}{2}\arcsin\left(\frac{q}{A}\right) \right] = \frac{1}{2}\frac{\partial A^2}{\partial E}\arcsin\left(\frac{q}{A}\right) + \frac{A^2}{2} \frac{1}{\sqrt{1-(q/A)^2}} \left(-\frac{q}{A^2}\right)\frac{\partial A}{\partial E} $$
        $$ = \frac{1}{2}\frac{\partial A^2}{\partial E}\arcsin\left(\frac{q}{A}\right) - \frac{q}{2\sqrt{A^2-q^2}}\frac{\partial A^2}{\partial E} $$
    *   Combining terms for $\frac{\partial W}{\partial E}$:
        $$ \frac{\partial W}{\partial E} = \pm m\omega \left[ \frac{q}{4\sqrt{A^2-q^2}}\frac{\partial A^2}{\partial E} + \frac{1}{4}\frac{\partial A^2}{\partial E}\arcsin\left(\frac{q}{A}\right) + \frac{A^2}{2}\frac{1}{\sqrt{A^2-q^2}}(-\frac{q}{A^2})\frac{\partial A}{\partial E} \right] $$
        This is getting very messy. Let's use a trick for the derivative of $\int \sqrt{A^2-q^2} dq$.
        We know $p = \frac{\partial W}{\partial q} = \pm m\omega \sqrt{A^2 - q^2}$.
        And $\beta_1 = \frac{\partial W}{\partial E} - t$.
        $$ \frac{\partial W}{\partial E} = \frac{\partial}{\partial E} \int p(q,E) \, dq = \int \frac{\partial p(q,E)}{\partial E} \, dq $$
        $$ \frac{\partial p}{\partial E} = \frac{\partial}{\partial E} \left( \pm \sqrt{2mE - m^2\omega^2q^2} \right) = \pm \frac{1}{2\sqrt{2mE - m^2\omega^2q^2}} (2m) = \pm \frac{m}{\sqrt{2mE - m^2\omega^2q^2}} $$
        So,
        $$ \beta_1 = \int \pm \frac{m}{\sqrt{2mE - m^2\omega^2q^2}} \, dq - t $$
        $$ \beta_1 = \int \pm \frac{m}{m\omega\sqrt{A^2 - q^2}} \, dq - t = \pm \frac{1}{\omega} \int \frac{dq}{\sqrt{A^2 - q^2}} - t $$
        $$ \beta_1 = \pm \frac{1}{\omega} \arcsin\left(\frac{q}{A}\right) - t $$
    *   Rearranging for $q$:
        $$ \arcsin\left(\frac{q}{A}\right) = \pm \omega (\beta_1 + t) $$
        $$ \frac{q}{A} = \sin(\pm \omega (\beta_1 + t)) $$
        Since $\sin(-x) = -\sin(x)$, the $\pm$ sign can be absorbed into the constant $\beta_1$ or the amplitude $A$. Let's choose the positive sign for $\omega$.
        $$ q(t) = A \sin(\omega t + \phi) $$
        where $\phi = \omega \beta_1$ is a phase constant.
    *   *Explanation:* This is the standard equation of motion for an SHO. The constants $A$ (amplitude) and $\phi$ (phase) are determined by the initial conditions, which are encoded in $E$ and $\beta_1$.
    *   Now find the momentum $p = \frac{\partial S}{\partial q}$:
        $$ p = \frac{\partial W}{\partial q} = \pm \sqrt{2mE - mkq^2} $$
        Substitute $A^2 = \frac{2E}{m\omega^2}$ and $q = A\sin(\omega t + \phi)$:
        $$ p = \pm \sqrt{m^2\omega^2A^2 - m^2\omega^2A^2\sin^2(\omega t + \phi)} $$
        $$ p = \pm m\omega A \sqrt{1 - \sin^2(\omega t + \phi)} $$
        $$ p = \pm m\omega A \cos(\omega t + \phi) $$
        Choosing the sign consistent with $q(t) = A\sin(\omega t + \phi)$, so $p = m\dot{q} = mA\omega\cos(\omega t + \phi)$.
    *   **Final Answer:**
        $$ \boxed{q(t) = A \sin(\omega t + \phi)} $$
        $$ \boxed{p(t) = mA\omega \cos(\omega t + \phi)} $$
        where $A = \sqrt{\frac{2E}{m\omega^2}}$ and $\phi = \omega \beta_1$.

**Reflection:** This example was harder due to the integral for $W$ and the subsequent differentiation. It highlights the power of H-J: despite the complex intermediate steps, the final form of the solution is elegantly derived. The key trick was recognizing the integral form $\int \frac{dx}{\sqrt{a^2-x^2}}$ and being careful with the derivatives.

---

### Example 3: Particle in a Uniform Gravitational Field (Vertical Motion)

**Problem:** A particle of mass $m$ is thrown vertically upwards in a uniform gravitational field $g$. Use the Hamilton-Jacobi equation to find its motion.

**Given:**
*   Mass $m$
*   Gravitational acceleration $g$ (downwards)
*   Potential energy $V(q) = mgq$, where $q$ is the height above the ground.

**Want:** Equations of motion $q(t)$ and $p(t)$.

**Solution:**

1.  **Formulate the Hamiltonian:**
    *   Kinetic energy $T = \frac{1}{2}m\dot{q}^2$.
    *   Lagrangian $L = T - V = \frac{1}{2}m\dot{q}^2 - mgq$.
    *   Generalized momentum $p = \frac{\partial L}{\partial \dot{q}} = m\dot{q}$. So, $\dot{q} = \frac{p}{m}$.
    *   Hamiltonian $H = p\dot{q} - L = p\left(\frac{p}{m}\right) - \left(\frac{1}{2}m\left(\frac{p}{m}\right)^2 - mgq\right) = \frac{p^2}{2m} + mgq$.
    *   *Explanation:* The Hamiltonian is the sum of kinetic and potential energy, as expected for a conservative system.

2.  **Set up the Hamilton-Jacobi equation:**
    *   Since $H$ does not explicitly depend on time, we use $H\left(q, \frac{\partial W}{\partial q}\right) = E$.
    *   Substitute $p = \frac{\partial W}{\partial q}$ into the Hamiltonian:
        $$ \frac{1}{2m}\left(\frac{\partial W}{\partial q}\right)^2 + mgq = E $$
    *   *Explanation:* Replace $p$ with $\partial W / \partial q$ and set equal to $E$.

3.  **Solve the PDE for $W(q, E)$:**
    *   Rearrange the equation:
        $$ \frac{1}{2m}\left(\frac{\partial W}{\partial q}\right)^2 = E - mgq $$
        $$ \left(\frac{\partial W}{\partial q}\right)^2 = 2m(E - mgq) $$
        $$ \frac{\partial W}{\partial q} = \pm \sqrt{2m(E - mgq)} $$
    *   Integrate with respect to $q$:
        $$ W(q, E) = \int \pm \sqrt{2m(E - mgq)} \, dq $$
        Let $u = E - mgq$. Then $du = -mg \, dq$, so $dq = -\frac{1}{mg} \, du$.
        $$ W(q, E) = \int \pm \sqrt{2mu} \left(-\frac{1}{mg}\right) \, du $$
        $$ W(q, E) = \mp \frac{\sqrt{2m}}{mg} \int u^{1/2} \, du $$
        $$ W(q, E) = \mp \frac{\sqrt{2m}}{mg} \left(\frac{2}{3}u^{3/2}\right) $$
        Substitute $u = E - mgq$ back:
        $$ W(q, E) = \mp \frac{2\sqrt{2m}}{3mg} (E - mgq)^{3/2} $$
    *   *Explanation:* This involves a substitution to handle the square root of a linear term in $q$. Careful with the signs during integration.

4.  **Formulate Hamilton's Principal Function $S(q, E, t)$:**
    *   $S(q, E, t) = W(q, E) - Et$
    *   $$ S(q, E, t) = \mp \frac{2\sqrt{2m}}{3mg} (E - mgq)^{3/2} - Et $$
    *   *Explanation:* Add the time-dependent term.

5.  **Find the equations of motion:**
    *   The new constant coordinate $\beta_1 = \frac{\partial S}{\partial E}$.
    *   $$ \beta_1 = \frac{\partial}{\partial E} \left( \mp \frac{2\sqrt{2m}}{3mg} (E - mgq)^{3/2} - Et \right) $$
    *   $$ \beta_1 = \mp \frac{2\sqrt{2m}}{3mg} \cdot \frac{3}{2} (E - mgq)^{1/2} \cdot (1) - t $$
    *   $$ \beta_1 = \mp \frac{\sqrt{2m}}{mg} \sqrt{E - mgq} - t $$
    *   Rearrange to solve for $q$:
        $$ (\beta_1 + t) = \mp \frac{\sqrt{2m}}{mg} \sqrt{E - mgq} $$
        Square both sides (taking care of the $\mp$ sign, which implies we can choose it to make the RHS positive or negative, but squaring removes this distinction, so we must be careful with initial conditions later):
        $$ (\beta_1 + t)^2 = \frac{2m}{(mg)^2} (E - mgq) $$
        $$ (\beta_1 + t)^2 = \frac{2}{mg} (E - mgq) $$
        $$ E - mgq = \frac{mg}{2}(\beta_1 + t)^2 $$
        $$ mgq = E - \frac{mg}{2}(\beta_1 + t)^2 $$
        $$ q(t) = \frac{E}{mg} - \frac{1}{2}g(\beta_1 + t)^2 $$
    *   *Explanation:* This is the standard parabolic trajectory equation. Let's relate constants: $E/mg$ is the maximum height $q_{max}$ if the particle starts with $p=0$ at $q_{max}$. If we define $t_0 = -\beta_1$ as the time of maximum height, then $q(t) = q_{max} - \frac{1}{2}g(t-t_0)^2$. This is correct.
    *   Now find the momentum $p = \frac{\partial S}{\partial q}$:
        $$ p = \frac{\partial W}{\partial q} = \mp \frac{2\sqrt{2m}}{3mg} \cdot \frac{3}{2} (E - mgq)^{1/2} \cdot (-mg) $$
        $$ p = \pm \sqrt{2m(E - mgq)} $$
        From $q(t) = \frac{E}{mg} - \frac{1}{2}g(\beta_1 + t)^2$, we can find $\dot{q}$:
        $$ \dot{q}(t) = -g(\beta_1 + t) $$
        So $p(t) = m\dot{q}(t) = -mg(\beta_1 + t)$.
        Comparing this with $p = \pm \sqrt{2m(E - mgq)}$:
        Substitute $E - mgq = \frac{mg}{2}(\beta_1 + t)^2$:
        $$ p = \pm \sqrt{2m \cdot \frac{mg}{2}(\beta_1 + t)^2} = \pm \sqrt{m^2g(\beta_1 + t)^2} = \pm mg(\beta_1 + t) $$
        For the particle thrown upwards, initial velocity is positive, then becomes negative. So $p$ should decrease from positive to negative.
        If we choose the positive sign for $p = \frac{\partial W}{\partial q}$ initially for upward motion, then $p = mg(\beta_1+t)$ would mean $\beta_1+t$ must be positive. If it's a downward motion, $p$ is negative, so $\beta_1+t$ must be negative.
        The choice of sign here depends on the direction of motion. The $\mp$ in $W$ and $S$ implies that $p$ can be positive or negative.
        Let's choose the initial $p$ to be positive for upward motion. Then we must choose the positive sign for $\frac{\partial W}{\partial q} = \sqrt{2m(E - mgq)}$.
        Then $p(t) = m\dot{q}(t) = -mg(\beta_1 + t)$.
        This implies that the positive square root corresponds to $p = -mg(\beta_1 + t)$ if $\beta_1+t$ is negative (downward motion), and the negative square root corresponds to $p = -mg(\beta_1 + t)$ if $\beta_1+t$ is positive (upward motion).
        This is a common subtlety with square roots. A more robust way is to use the relation $p=m\dot{q}$ directly from the $q(t)$ solution.

    *   **Final Answer:**
        $$ \boxed{q(t) = q_0 + v_0 t - \frac{1}{2}gt^2} $$
        $$ \boxed{p(t) = mv_0 - mgt} $$
        where $q_0 = \frac{E}{mg} - \frac{1}{2}g\beta_1^2$ and $v_0 = -g\beta_1$. (Or, $q_0 = \frac{E}{mg} - \frac{1}{2}g t_{max}^2$ and $v_0 = g t_{max}$ if $\beta_1 = -t_{max}$ is the time to reach max height).

**Reflection:** This example demonstrates the care needed with signs when dealing with square roots and integrating. The constants $E$ and $\beta_1$ are directly related to the initial conditions (e.g., initial velocity and position, or maximum height and time to reach it).

---

### Example 4: Particle on a Circular Wire (Angular Motion)

**Problem:** A particle of mass $m$ slides without friction on a circular wire of radius $R$ in a vertical plane. Use the Hamilton-Jacobi equation to find its motion.

**Given:**
*   Mass $m$
*   Radius $R$
*   Angle $\theta$ from the vertical (downwards) as generalized coordinate.
*   Potential energy $V(\theta) = -mgR\cos\theta$ (assuming $V=0$ at the top of the circle).

**Want:** Equation of motion $\theta(t)$.

**Solution:**

1.  **Formulate the Hamiltonian:**
    *   Position $x = R\sin\theta$, $y = -R\cos\theta$.
    *   Velocity $\dot{x} = R\cos\theta \dot{\theta}$, $\dot{y} = R\sin\theta \dot{\theta}$.
    *   Kinetic energy $T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) = \frac{1}{2}m(R^2\cos^2\theta \dot{\theta}^2 + R^2\sin^2\theta \dot{\theta}^2) = \frac{1}{2}mR^2\dot{\theta}^2$.
    *   Lagrangian $L = T - V = \frac{1}{2}mR^2\dot{\theta}^2 + mgR\cos\theta$.
    *   Generalized momentum $p_\theta = \frac{\partial L}{\partial \dot{\theta}} = mR^2\dot{\theta}$. So, $\dot{\theta} = \frac{p_\theta}{mR^2}$.
    *   Hamiltonian $H = p_\theta\dot{\theta} - L = p_\theta\left(\frac{p_\theta}{mR^2}\right) - \left(\frac{1}{2}mR^2\left(\frac{p_\theta}{mR^2}\right)^2 + mgR\cos\theta\right)$
        $$ H = \frac{p_\theta^2}{mR^2} - \frac{p_\theta^2}{2mR^2} - mgR\cos\theta = \frac{p_\theta^2}{2mR^2} - mgR\cos\theta $$
    *   *Explanation:* We use angular coordinates, so kinetic energy involves angular velocity, and potential energy depends on the angle.

2.  **Set up the Hamilton-Jacobi equation:**
    *   Since $H$ does not explicitly depend on time, we use $H\left(\theta, \frac{\partial W}{\partial \theta}\right) = E$.
    *   Substitute $p_\theta = \frac{\partial W}{\partial \theta}$ into the Hamiltonian:
        $$ \frac{1}{2mR^2}\left(\frac{\partial W}{\partial \theta}\right)^2 - mgR\cos\theta = E $$
    *   *Explanation:* Replace $p_\theta$ with $\partial W / \partial \theta$ and set equal to the constant energy $E$.

3.  **Solve the PDE for $W(\theta, E)$:**
    *   Rearrange the equation:
        $$ \frac{1}{2mR^2}\left(\frac{\partial W}{\partial \theta}\right)^2 = E + mgR\cos\theta $$
        $$ \left(\frac{\partial W}{\partial \theta}\right)^2 = 2mR^2(E + mgR\cos\theta) $$
        $$ \frac{\partial W}{\partial \theta} = \pm \sqrt{2mR^2(E + mgR\cos\theta)} $$
    *   Integrate with respect to $\theta$:
        $$ W(\theta, E) = \int \pm \sqrt{2mR^2(E + mgR\cos\theta)} \, d\theta $$
        $$ W(\theta, E) = \pm R\sqrt{2m} \int \sqrt{E + mgR\cos\theta} \, d\theta $$
        This integral is an **elliptic integral** and cannot be expressed in terms of elementary functions.
    *   *Explanation:* This is a critical point. Not all H-J equations are solvable analytically in elementary functions. The H-J equation gives us the *formal* solution, but the actual integration might be complex or require numerical methods. For problems like this, we usually stop here or express the solution in terms of elliptic integrals.

4.  **Find the equation of motion (formal solution):**
    *   Even if we can't analytically integrate $W$, we can still write down the formal solution for $\theta(t)$.
    *   We use $\beta_1 = \frac{\partial S}{\partial E} = \frac{\partial W}{\partial E} - t$.
    *   $$ \frac{\partial W}{\partial E} = \frac{\partial}{\partial E} \left( \int \pm R\sqrt{2m} \sqrt{E + mgR\cos\theta} \, d\theta \right) $$
    *   $$ \frac{\partial W}{\partial E} = \pm R\sqrt{2m} \int \frac{\partial}{\partial E} \sqrt{E + mgR\cos\theta} \, d\theta $$
    *   $$ \frac{\partial W}{\partial E} = \pm R\sqrt{2m} \int \frac{1}{2\sqrt{E + mgR\cos\theta}} \, d\theta $$
    *   So,
        $$ \beta_1 = \pm \frac{R\sqrt{2m}}{2} \int \frac{d\theta}{\sqrt{E + mgR\cos\theta}} - t $$
    *   Rearranging for $t$:
        $$ t - \beta_1 = \mp \frac{R\sqrt{2m}}{2} \int \frac{d\theta}{\sqrt{E + mgR\cos\theta}} $$
        $$ t - \beta_1 = \mp \frac{1}{\sqrt{2}} \sqrt{\frac{mR^2}{E}} \int \frac{d\theta}{\sqrt{1 + \frac{mgR}{E}\cos\theta}} $$
        Let $t_0 = \beta_1$ be an initial phase constant.
        $$ t - t_0 = \mp \frac{1}{\sqrt{2}} \sqrt{\frac{mR^2}{E}} \int \frac{d\theta}{\sqrt{1 + \frac{mgR}{E}\cos\theta}} $$
    *   *Explanation:* This equation implicitly defines $\theta(t)$. To find $\theta(t)$ explicitly, one would need to invert this integral, which is generally not possible in closed form. This shows that the H-J method provides the solution, even if it's not a simple algebraic expression.

    *   **Final Answer (implicit form):**
        $$ \boxed{t - t_0 = \pm \frac{R\sqrt{2m}}{2} \int^{\theta(t)} \frac{d\theta'}{\sqrt{E + mgR\cos\theta'}}} $$
        $$ \boxed{p_\theta(t) = \pm \sqrt{2mR^2(E + mgR\cos\theta(t))}} $$
    *   *Explanation:* The first equation relates time to the angle, and the second gives the angular momentum. The choice of $\pm$ sign depends on the direction of motion.

**Reflection:** This example demonstrates that while the Hamilton-Jacobi equation always provides a path to the solution, the resulting integral may not be solvable in terms of elementary functions. This is not a failure of the method, but a characteristic of the problem itself. It's important to recognize when a problem leads to non-elementary integrals.

## 6. Common mistakes and traps

1.  **Confusing Hamilton's Principal Function ($S$) with the Action ($A$):** While related (the action integral is often denoted $S$), Hamilton's Principal Function $S(q, \alpha, t)$ is a function whose partial derivatives give momenta and new coordinates. The action $A = \int L \, dt$ is a functional. They are distinct concepts, though $S$ is related to the value of the action along the actual path.
2.  **Incorrectly applying the chain rule or partial derivatives:** The H-J equation involves partial derivatives with respect to $q_i$ and $t$. When substituting $p_i = \partial S / \partial q_i$ into $H$, remember that $H$ is a function of $q_i$, *not* $\partial S / \partial q_i$ explicitly in its original form. The substitution is a transformation.
3.  **Forgetting constants of integration:** When solving the H-J PDE, you'll introduce $N$ constants of integration. These are precisely the new constant momenta $\alpha_i$. Forgetting them or not identifying them correctly will lead to an incomplete solution.
4.  **Misinterpreting the constants $\alpha_i$ and $\beta_i$:** The $\alpha_i$ are the new constant momenta (and are the constants of integration for $S$). The $\beta_i$ are the new constant coordinates, derived by taking $\partial S / \partial \alpha_i$. They are *not* necessarily initial positions or initial momenta in the old coordinate system, though they are related to them by the transformation.
5.  **Sign errors with square roots:** When integrating $\frac{\partial W}{\partial q} = \pm \sqrt{f(q)}$, remember the $\pm$ sign. The physical interpretation of this sign typically corresponds to the direction of motion. Forgetting it can lead to incorrect trajectories.
6.  **Assuming time-independence when it's not present:** Only for time-independent Hamiltonians can you separate $S(q, \alpha, t) = W(q, \alpha) - Et$. If the Hamiltonian explicitly depends on time, you must solve the full time-dependent H-J equation.
7.  **Algebraic errors in solving the PDE:** The H-J equation can be a complex PDE. Errors in integration, differentiation, or algebraic manipulation are common and can derail the entire solution.

## 7. Textbook-precise explanation

The Hamilton-Jacobi equation is a fundamental result in analytical mechanics that provides an alternative, often more powerful, method for solving the equations of motion of a classical system. It is derived from the theory of canonical transformations.

Consider a canonical transformation from old coordinates $(q_i, p_i)$ to new coordinates $(Q_i, P_i)$. Such a transformation is defined by a generating function, say of type $F_2(q, P, t)$. The relations between the old and new variables are:
$$ p_i = \frac{\partial F_2}{\partial q_i} $$
$$ Q_i = \frac{\partial F_2}{\partial P_i} $$
And the new Hamiltonian $K(Q, P, t)$ is related to the old Hamiltonian $H(q, p, t)$ by:
$$ K = H + \frac{\partial F_2}{\partial t} $$

The core idea of the Hamilton-Jacobi method is to choose the generating function $F_2$ such that the new Hamiltonian $K$ is identically zero. If $K=0$, then Hamilton's equations in the new variables become trivial:
$$ \dot{Q}_i = \frac{\partial K}{\partial P_i} = 0 \implies Q_i = \text{constant} $$
$$ \dot{P}_i = -\frac{\partial K}{\partial Q_i} = 0 \implies P_i = \text{constant} $$
The new coordinates $Q_i$ and momenta $P_i$ are thus constants of motion. We denote these constants as $\beta_i$ and $\alpha_i$, respectively.

The generating function $F_2$ that achieves this is called **Hamilton's Principal Function**, denoted $S(q_1, \dots, q_N, \alpha_1, \dots, \alpha_N, t)$.
Substituting $K=0$ and $F_2 = S$ into the transformation equation for $K$, we get:
$$ H(q, p, t) + \frac{\partial S}{\partial t} = 0 $$
Now, we substitute $p_i = \frac{\partial S}{\partial q_i}$ into the Hamiltonian $H$. This yields the **Hamilton-Jacobi Equation**:
$$ H\left(q_1, \dots, q_N, \frac{\partial S}{\partial q_1}, \dots, \frac{\partial S}{\partial q_N}, t\right) + \frac{\partial S}{\partial t} = 0 $$
This is a first-order, non-linear partial differential equation for $S(q, \alpha, t)$. A complete solution to this PDE will contain $N$ arbitrary constants of integration, which we identify as the new constant momenta $\alpha_1, \dots, \alpha_N$.

Once a complete solution $S(q, \alpha, t)$ is found, the equations of motion for the system are given by:
$$ p_i = \frac{\partial S}{\partial q_i} $$
$$ Q_i = \beta_i = \frac{\partial S}{\partial \alpha_i} $$
These $2N$ equations implicitly define the trajectory of the system in phase space $(q_i(t), p_i(t))$ in terms of the $2N$ constants $\alpha_i$ and $\beta_i$, which are determined by initial conditions.

**For Time-Independent Hamiltonians:**
If the Hamiltonian $H$ does not explicitly depend on time ($\partial H / \partial t = 0$), then the total energy $E$ is a constant of motion. In this case, Hamilton's Principal Function can be separated into a time-independent part and a time-dependent part:
$$ S(q, \alpha, t) = W(q, \alpha) - E(\alpha)t $$
where $W(q, \alpha)$ is called **Hamilton's Characteristic Function**. Substituting this into the Hamilton-Jacobi equation:
$$ H\left(q, \frac{\partial W}{\partial q}\right) + \frac{\partial}{\partial t}(W - E t) = 0 $$
$$ H\left(q, \frac{\partial W}{\partial q}\right) - E = 0 $$
$$ H\left(q, \frac{\partial W}{\partial q}\right) = E $$
This is the **time-independent Hamilton-Jacobi equation**. Here, $E$ is one of the constant momenta $\alpha_i$. If we denote $E = \alpha_1$, then the equations of motion are derived from $W$:
$$ p_i = \frac{\partial W}{\partial q_i} $$
$$ \beta_1 = \frac{\partial W}{\partial E} - t $$
$$ \beta_j = \frac{\partial W}{\partial \alpha_j} \quad \text{for } j=2, \dots, N $$

This formulation demonstrates that the problem of solving $2N$ first-order ODEs (Hamilton's equations) is transformed into solving a single first-order PDE, which can often be solved by separation of variables if suitable coordinate systems are chosen.

**(Ref: Goldstein, H., Classical Mechanics, 3rd ed., Chapter 10; Landau, L. D., & Lifshitz, E. M., Mechanics, 3rd ed., Chapter 7)**

## 8. ASCII diagrams

```text
       The "Wavefront" Analogy for Hamilton's Principal Function S(q,t)

   Imagine S(q,t) as a scalar field, like temperature or elevation.
   Lines of constant S (isotherms, contour lines) represent "wavefronts".

   At any point (q,t) in configuration-time space:
   - The *momentum* vector (p) is always perpendicular to the S-wavefronts.
   - The *path* of the particle (q(t)) is like a "ray" that follows this perpendicular direction.

   Configuration Space (q)
   ^
   |
   |      S=S_2 (later wavefront)
   |     /   /
   |    /   /
   |   /   /
   |  /   /
   | /   /
   |/   /
   +--------------->
           q-axis

   Example: A particle moving in 1D.

       q-axis
       ^
       |
       |  S(q,t)=constant  (wavefronts)
       |      \  \  \  \  \
       |       \  \  \  \  \  <-- Propagating "wave"
       |        \  \  \  \  \
       |         \  \  \  \  \
       |          \  \  \  \  \
       |           \  \  \  \  \
       |            \  \  \  \  \
       +-----------------------------> t-axis
          (Time)

   A particle's trajectory (q(t)) is a curve that always
   intersects these wavefronts perpendicularly.

   Visualizing the transformation:

   Original Phase Space (q, p)       Canonical Transformation (S)      New Phase Space (Q, P)
   (Complex, time-varying motion)                                     (Simple, constant motion)
   ^ p                                ^ S                              ^ P (constant alpha)
   |                                  |