## 1. What it is — in plain English

Imagine you're watching a complex machine, like a robot arm or a satellite orbiting Earth. You want to predict exactly where it will be and how fast it will be moving at any future moment. Newton's laws of motion do this by focusing on *forces* acting on the machine. Lagrangian mechanics, which you've already studied, does it by focusing on the difference between the machine's "motion energy" (kinetic energy) and its "stored energy" (potential energy).

Hamilton's equations offer a *third* powerful way to predict this future behavior. Instead of forces or just energy differences, they focus on two key ingredients: the machine's "position" (where it is) and its "momentum" (how much 'oomph' its motion has).

Think of it like this: if Newton's laws are like a detailed blueprint showing all the pushes and pulls, and Lagrangian mechanics is like a manual focusing on the overall energy budget, then Hamilton's equations are like a special control panel. This panel has dials for every "position" and every "momentum" in your system. By knowing how these dials are set *now*, Hamilton's equations tell you exactly how quickly each dial needs to turn to predict the next moment's state.

It's a more abstract, but incredibly elegant and symmetrical way to describe how physical systems evolve. It repackages all the information about forces and energy into a set of equations that describe the rate of change of position and momentum directly.

## 2. Why it matters — real-world applications

Hamilton's equations are not just a theoretical curiosity; they are a cornerstone of modern physics and engineering, enabling solutions to incredibly complex problems.

1.  **Orbital Mechanics and Spacecraft Trajectory Optimization:** When launching satellites or planning interplanetary missions, engineers need to precisely calculate trajectories, fuel consumption, and maneuver timings. Hamiltonian mechanics provides a robust framework for this. By defining the system's Hamiltonian, aerospace engineers at agencies like NASA or SpaceX can use Hamilton's equations to model the spacecraft's path through the gravitational fields of multiple celestial bodies, optimizing for fuel efficiency or specific orbital parameters. This is crucial for guiding probes to Mars or maintaining constellations of communication satellites.

2.  **Quantum Mechanics Foundation:** Perhaps the most profound application is its role as the direct classical precursor to quantum mechanics. The "Hamiltonian" in classical mechanics directly translates into the "Hamiltonian operator" in quantum mechanics, which represents the total energy of a quantum system. The time-dependent Schrödinger equation, fundamental to all quantum phenomena, is essentially a quantum version of Hamilton's equations, describing how the quantum state evolves over time based on its energy. Without classical Hamiltonian mechanics, the development of quantum theory would have been vastly different, if not impossible.

3.  **Control Systems for Robotics and Autonomous Vehicles:** For complex robotic systems, like robotic arms with many joints or autonomous drones, designing controllers that ensure stable and efficient movement is critical. Hamiltonian mechanics, particularly its connection to optimal control theory (e.g., Pontryagin's Maximum Principle), offers powerful tools. It allows engineers to formulate control problems in terms of minimizing an "action" integral, much like the principle behind Lagrangian mechanics, but with the added benefit of explicit momentum variables. This helps in designing trajectories for robots that minimize energy consumption or complete tasks in the shortest possible time.

4.  **Statistical Mechanics and Condensed Matter Physics:** In fields like statistical mechanics, which bridge the gap between microscopic particle behavior and macroscopic material properties (like temperature, pressure), Hamilton's equations are essential. They describe the evolution of individual particles in a many-body system. The concept of "phase space," which is the natural domain for Hamiltonian mechanics (a space defined by all positions and momenta), is central to understanding ensembles of particles and deriving thermodynamic properties. This is used in simulating material properties, understanding phase transitions, and designing new materials.

5.  **Machine Learning (Hamiltonian Monte Carlo):** In advanced machine learning, especially for sampling complex probability distributions (e.g., in Bayesian inference), a technique called Hamiltonian Monte Carlo (HMC) is highly effective. HMC treats the parameters of a model as particles moving in a "potential energy" landscape defined by the probability distribution. It uses Hamilton's equations to simulate the "path" these particles take, allowing for efficient exploration of the distribution and faster convergence to accurate parameter estimates than traditional methods. This is used in training deep learning models and performing complex statistical analyses.

## 3. Prerequisites — what you must know first

To truly grasp Hamilton's equations of motion, you need a solid foundation in several key areas. If any of these concepts are unfamiliar, it's crucial to pause and review them thoroughly before proceeding.

*   **Newton's Laws of Motion:** The fundamental principles governing the motion of objects under the influence of forces. You should be comfortable with concepts like force, mass, acceleration, and how to apply $\vec{F} = m\vec{a}$.
*   **Calculus (Differential and Integral):**
    *   **Partial Derivatives:** Essential for defining generalized momentum and deriving Hamilton's equations. You must understand how to differentiate a multivariable function with respect to one variable while treating others as constants.
    *   **Total Differentials:** Understanding how a small change in a function depends on small changes in all its independent variables.
    *   **Chain Rule:** For differentiating composite functions.
*   **Kinetic Energy ($T$) and Potential Energy ($V$):** What they represent, how to calculate them for various systems, and the concept of conservative forces (where $V$ exists).
*   **Generalized Coordinates ($q_i$):** A set of independent variables (not necessarily Cartesian coordinates) that completely describe the configuration of a system. For example, angles for a pendulum, or radial distance and angle for a particle in polar coordinates.
*   **Generalized Velocities ($\dot{q}_i$):** The time derivatives of the generalized coordinates, representing the rates of change of these coordinates.
*   **Lagrangian Mechanics:**
    *   **Lagrangian ($L$):** Defined as the difference between kinetic and potential energy, $L = T - V$.
    *   **Euler-Lagrange Equations:** The equations of motion derived from the Lagrangian, given by $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$. This is the direct precursor to Hamiltonian mechanics.
*   **Variational Calculus (Calculus of Variations):** The mathematical framework underlying Lagrangian mechanics, specifically the concept of minimizing an "action integral" to find the path of least action. While not strictly required to *apply* Hamilton's equations, understanding its role in the derivation of the Euler-Lagrange equations provides deeper context.
*   **Legendre Transformation:** A mathematical technique used to switch the independent variables of a function while preserving the information content. This is the crucial mathematical step in transforming from the Lagrangian to the Hamiltonian formulation. You should understand its purpose and how to perform it for a simple function.

## 4. The core idea — step by step

Let's build Hamilton's equations from the ground up, understanding the motivation and the mathematical machinery involved.

### Step 1: The Limitations of Lagrangian Mechanics (and the desire for a new view)

**Plain English:** Lagrangian mechanics, with its Euler-Lagrange equations, is incredibly powerful. It describes motion in terms of generalized coordinates ($q_i$) and generalized velocities ($\dot{q}_i$). But sometimes, especially when dealing with advanced topics like quantum mechanics or statistical mechanics, we want to describe the system's state using its *position* and its *momentum* directly, rather than position and velocity. Why? Because momentum is often a more fundamental quantity, especially when thinking about conserved quantities or the "oomph" of a particle.

**Small Concrete Example:** For a simple mass on a spring, the Lagrangian uses position $x$ and velocity $\dot{x}$. We might want a description that uses $x$ and its linear momentum $p_x = m\dot{x}$ instead.

**Formal/Mathematical Version:** The Lagrangian $L(q_i, \dot{q}_i, t)$ describes the system in configuration space (or velocity phase space). The Euler-Lagrange equations are:
$$ \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0 $$
We want to move from a description based on $(q_i, \dot{q}_i)$ to one based on $(q_i, p_i)$, where $p_i$ is a new kind of momentum.

**What could go wrong:** Not appreciating *why* we're making this shift. It's not just a mathematical trick; it's a fundamental change in perspective that simplifies many advanced problems.

### Step 2: Introducing Generalized Momentum

**Plain English:** Just as we have "generalized coordinates" ($q_i$) that aren't always simple Cartesian distances, we need a concept of "generalized momentum" ($p_i$) that isn't always just mass times velocity ($m\vec{v}$). This generalized momentum is defined in a very specific way using the Lagrangian. It's the "oomph" associated with a particular generalized coordinate.

**Small Concrete Example:**
*   For a particle moving in 1D, $L = \frac{1}{2}m\dot{x}^2 - V(x)$. The generalized coordinate is $q_1 = x$.
    The generalized momentum $p_1 = p_x = \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2 - V(x)\right) = m\dot{x}$. This is just the familiar linear momentum.
*   For a particle moving in a plane using polar coordinates $(r, \theta)$, $L = \frac{1}{2}m(\dot{r}^2 + r^2\dot{\theta}^2) - V(r, \theta)$.
    The generalized momentum for $q_1 = r$ is $p_r = \frac{\partial L}{\partial \dot{r}} = m\dot{r}$.
    The generalized momentum for $q_2 = \theta$ is $p_\theta = \frac{\partial L}{\partial \dot{\theta}} = mr^2\dot{\theta}$. This is the angular momentum for motion in the plane.

**Formal/Mathematical Version:** The generalized momentum $p_i$ (also called canonical momentum) corresponding to the generalized coordinate $q_i$ is defined as:
$$ p_i = \frac{\partial L}{\partial \dot{q}_i} $$
where $L(q_1, \dots, q_n, \dot{q}_1, \dots, \dot{q}_n, t)$ is the Lagrangian.

**What could go wrong:** Confusing generalized momentum with simple linear momentum, or incorrectly calculating the partial derivative. Remember, $p_i$ is defined *from* the Lagrangian.

### Step 3: The Legendre Transformation — Switching Variables

**Plain English:** We have a function, the Lagrangian $L$, that depends on positions ($q_i$) and velocities ($\dot{q}_i$). We want a new function, the Hamiltonian $H$, that depends on positions ($q_i$) and *momenta* ($p_i$). How do we switch out the velocities for momenta? This is where a mathematical tool called the Legendre transformation comes in. It's a way to change the "primary" variables of a function.

Imagine you have a function $f(x)$ and you want a new function $g(y)$ where $y = df/dx$. The Legendre transform does exactly this. For our case, we want to replace $\dot{q}_i$ with $p_i$.

**Small Concrete Example:** Let $L(\dot{q})$ be a simple function, say $L = \frac{1}{2}m\dot{q}^2$.
1.  Calculate $p = \frac{\partial L}{\partial \dot{q}} = m\dot{q}$.
2.  Solve for $\dot{q}$ in terms of $p$: $\dot{q} = \frac{p}{m}$.
3.  Form the Hamiltonian $H = p\dot{q} - L$. Substitute $\dot{q}$:
    $H = p\left(\frac{p}{m}\right) - \frac{1}{2}m\left(\frac{p}{m}\right)^2 = \frac{p^2}{m} - \frac{1}{2}m\frac{p^2}{m^2} = \frac{p^2}{m} - \frac{p^2}{2m} = \frac{p^2}{2m}$.
    Notice that $H = T+V$. For this simple case (no potential energy), $H = T = \frac{1}{2}m\dot{q}^2 = \frac{p^2}{2m}$.

**Formal/Mathematical Version:** The Hamiltonian $H$ is defined via the Legendre transformation as:
$$ H(q_1, \dots, q_n, p_1, \dots, p_n, t) = \sum_{i=1}^n p_i \dot{q}_i - L(q_1, \dots, q_n, \dot{q}_1, \dots, \dot{q}_n, t) $$
Crucially, after forming this sum, you *must* express all $\dot{q}_i$ in terms of $q_i$ and $p_i$ using the definition $p_i = \frac{\partial L}{\partial \dot{q}_i}$. This ensures $H$ is solely a function of $q_i$, $p_i$, and $t$.

**What could go wrong:** Forgetting to substitute $\dot{q}_i$ in terms of $p_i$ and $q_i$. The Hamiltonian *must not* depend on $\dot{q}_i$. This is the most common mistake!

### Step 4: Deriving Hamilton's Equations of Motion

**Plain English:** Now that we have the Hamiltonian $H(q_i, p_i, t)$, we want to find equations that tell us how $q_i$ and $p_i$ change over time. We can do this by taking the total differential of $H$ and comparing it to the total differential of the definition of $H$. It's a bit of a mathematical dance, but the result is beautiful and symmetrical.

**Small Concrete Example:** Let's use the simple example from Step 3: $H = \frac{p^2}{2m}$.
1.  $\frac{\partial H}{\partial p} = \frac{2p}{2m} = \frac{p}{m}$. We know $p = m\dot{q}$, so $\frac{p}{m} = \dot{q}$. Thus, $\dot{q} = \frac{\partial H}{\partial p}$.
2.  $\frac{\partial H}{\partial q} = 0$ (since $H$ doesn't depend on $q$). So, $\dot{p} = -\frac{\partial H}{\partial q} = 0$. This means momentum is conserved, which is true for a free particle.

**Formal/Mathematical Version:**
Start with the total differential of $H$:
$$ dH = \sum_i \left(\frac{\partial H}{\partial q_i} dq_i + \frac{\partial H}{\partial p_i} dp_i\right) + \frac{\partial H}{\partial t} dt \quad (*)$$
Now take the total differential of the definition of $H$: $H = \sum_i p_i \dot{q}_i - L$.
$$ dH = \sum_i (dp_i \dot{q}_i + p_i d\dot{q}_i) - dL $$
Substitute $dL = \sum_i \left(\frac{\partial L}{\partial q_i} dq_i + \frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i\right) + \frac{\partial L}{\partial t} dt$:
$$ dH = \sum_i (dp_i \dot{q}_i + p_i d\dot{q}_i) - \sum_i \left(\frac{\partial L}{\partial q_i} dq_i + \frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i\right) - \frac{\partial L}{\partial t} dt $$
Recall $p_i = \frac{\partial L}{\partial \dot{q}_i}$. So the terms $p_i d\dot{q}_i$ and $-\frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i$ cancel out!
$$ dH = \sum_i (\dot{q}_i dp_i - \frac{\partial L}{\partial q_i} dq_i) - \frac{\partial L}{\partial t} dt $$
From the Euler-Lagrange equations, we know $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) = \frac{\partial L}{\partial q_i}$. Since $p_i = \frac{\partial L}{\partial \dot{q}_i}$, then $\dot{p}_i = \frac{d}{dt} p_i = \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right)$.
Therefore, we can substitute $\frac{\partial L}{\partial q_i} = \dot{p}_i$:
$$ dH = \sum_i (\dot{q}_i dp_i - \dot{p}_i dq_i) - \frac{\partial L}{\partial t} dt \quad (**)$$
Now, compare $(*)$ and $(**)$ term by term:
$$ \frac{\partial H}{\partial q_i} = -\dot{p}_i \quad \implies \quad \dot{p}_i = -\frac{\partial H}{\partial q_i} $$
$$ \frac{\partial H}{\partial p_i} = \dot{q}_i \quad \implies \quad \dot{q}_i = \frac{\partial H}{\partial p_i} $$
$$ \frac{\partial H}{\partial t} = -\frac{\partial L}{\partial t} $$
These are **Hamilton's Canonical Equations of Motion**.

**What could go wrong:** Forgetting the negative sign in the $\dot{p}_i$ equation. This is a common and critical error. Also, mixing up the partial derivatives (e.g., taking $\partial H / \partial q_i$ for $\dot{q}_i$).

### Step 5: Interpretation of Hamilton's Equations and Phase Space

**Plain English:** Hamilton's equations give us $2n$ first-order differential equations (where $n$ is the number of generalized coordinates). For each coordinate $q_i$, we get an equation for its rate of change ($\dot{q}_i$) and an equation for the rate of change of its corresponding momentum ($\dot{p}_i$). This means we can track the evolution of the system if we know its initial position and momentum.

The space defined by all possible generalized coordinates ($q_i$) and generalized momenta ($p_i$) is called **phase space**. It's a $2n$-dimensional space. A point in phase space $(q_1, \dots, q_n, p_1, \dots, p_n)$ completely describes the state of the system at any instant. As the system evolves, this point traces a path, or trajectory, in phase space. Hamilton's equations tell us the "velocity" of this point in phase space.

**Small Concrete Example:** For a 1D harmonic oscillator, the phase space is 2D, with axes $x$ and $p_x$. The trajectory in phase space is an ellipse (or circle if scaled properly). The equations $\dot{x} = \frac{\partial H}{\partial p_x}$ and $\dot{p}_x = -\frac{\partial H}{\partial x}$ tell us how quickly a point $(x, p_x)$ moves along this ellipse.

**Formal/Mathematical Version:**
The set of $2n$ first-order differential equations are:
$$ \dot{q}_i = \frac{\partial H}{\partial p_i} $$
$$ \dot{p}_i = -\frac{\partial H}{\partial q_i} $$
These equations describe the time evolution of the system in **phase space** $(q_1, \dots, q_n, p_1, \dots, p_n)$. Each point in phase space represents a unique state of the system. The equations define a vector field in phase space, and the system's trajectory is an integral curve of this vector field.

An important consequence: If the Hamiltonian $H$ does not explicitly depend on time ($ \frac{\partial H}{\partial t} = 0 $), then $H$ is a conserved quantity. Furthermore, if the generalized coordinate $q_k$ is cyclic (meaning $L$ and thus $H$ does not depend on $q_k$, i.e., $\frac{\partial H}{\partial q_k} = 0$), then its corresponding generalized momentum $p_k$ is conserved ($\dot{p}_k = 0$). This is a powerful tool for identifying conserved quantities.

**What could go wrong:** Not understanding that phase space is distinct from configuration space. Configuration space only describes position; phase space describes both position and momentum, giving a complete snapshot of the system's state.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Harmonic Oscillator (1D)

**Problem:** A mass $m$ is attached to a spring with spring constant $k$ and moves in one dimension. Find the Hamiltonian and Hamilton's equations of motion.

**Given:**
*   Mass $m$
*   Spring constant $k$
*   Position $x$
*   Velocity $\dot{x}$

**We want:**
*   The Hamiltonian $H(x, p_x)$
*   Hamilton's equations: $\dot{x} = \frac{\partial H}{\partial p_x}$ and $\dot{p}_x = -\frac{\partial H}{\partial x}$

---

**Step 1: Write down the kinetic energy ($T$) and potential energy ($V$).**
*   The kinetic energy for a mass $m$ moving with velocity $\dot{x}$ is $T = \frac{1}{2}m\dot{x}^2$.
*   The potential energy stored in a spring with constant $k$ stretched by $x$ is $V = \frac{1}{2}kx^2$.

**Step 2: Formulate the Lagrangian ($L$).**
*   The Lagrangian is defined as $L = T - V$.
$$ L(x, \dot{x}) = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2 $$
    *This is the starting point for both Lagrangian and Hamiltonian mechanics.*

**Step 3: Calculate the generalized momentum ($p_x$).**
*   The generalized momentum corresponding to the coordinate $x$ is $p_x = \frac{\partial L}{\partial \dot{x}}$.
$$ p_x = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2\right) $$
$$ p_x = m\dot{x} $$
    *This defines the momentum in terms of velocity. For this simple case, it's just the familiar linear momentum.*

**Step 4: Express $\dot{x}$ in terms of $p_x$.**
*   From the previous step, we have $p_x = m\dot{x}$. We need to solve for $\dot{x}$ because the Hamiltonian must be a function of $x$ and $p_x$, not $\dot{x}$.
$$ \dot{x} = \frac{p_x}{m} $$
    *This is a crucial substitution for the Legendre transformation.*

**Step 5: Formulate the Hamiltonian ($H$).**
*   The Hamiltonian is defined as $H = p_x\dot{x} - L$.
*   Substitute $L$ and the expression for $\dot{x}$ from Step 4.
$$ H(x, p_x) = p_x\left(\frac{p_x}{m}\right) - \left(\frac{1}{2}m\left(\frac{p_x}{m}\right)^2 - \frac{1}{2}kx^2\right) $$
$$ H(x, p_x) = \frac{p_x^2}{m} - \left(\frac{1}{2}m\frac{p_x^2}{m^2} - \frac{1}{2}kx^2\right) $$
$$ H(x, p_x) = \frac{p_x^2}{m} - \frac{p_x^2}{2m} + \frac{1}{2}kx^2 $$
$$ H(x, p_x) = \frac{p_x^2}{2m} + \frac{1}{2}kx^2 $$
    *Notice that the Hamiltonian $H = T + V$. This is generally true for systems where the potential energy does not depend on velocity and the transformation between Cartesian and generalized coordinates does not explicitly depend on time. This is a good check.*

**Step 6: Derive Hamilton's equations of motion.**
*   We need two equations: $\dot{x} = \frac{\partial H}{\partial p_x}$ and $\dot{p}_x = -\frac{\partial H}{\partial x}$.

    **Equation for $\dot{x}$:**
$$ \dot{x} = \frac{\partial H}{\partial p_x} = \frac{\partial}{\partial p_x}\left(\frac{p_x^2}{2m} + \frac{1}{2}kx^2\right) $$
$$ \dot{x} = \frac{2p_x}{2m} $$
$$ \dot{x} = \frac{p_x}{m} $$
    *This equation relates the rate of change of position to momentum, which is consistent with our definition of $p_x = m\dot{x}$.*

    **Equation for $\dot{p}_x$:**
$$ \dot{p}_x = -\frac{\partial H}{\partial x} = -\frac{\partial}{\partial x}\left(\frac{p_x^2}{2m} + \frac{1}{2}kx^2\right) $$
$$ \dot{p}_x = -\frac{1}{2}k(2x) $$
$$ \dot{p}_x = -kx $$
    *This equation relates the rate of change of momentum to position. Since $\dot{p}_x = F_x$ (Newton's second law), this tells us $F_x = -kx$, which is Hooke's Law for a spring. This confirms our derivation.*

---
**Final Answer:**
The Hamiltonian for the 1D Simple Harmonic Oscillator is:
$$ \boxed{H(x, p_x) = \frac{p_x^2}{2m} + \frac{1}{2}kx^2} $$
Hamilton's equations of motion are:
$$ \boxed{\dot{x} = \frac{p_x}{m}} $$
$$ \boxed{\dot{p}_x = -kx} $$

**Reflection:** This example was relatively straightforward because the generalized coordinate was simply $x$, and the generalized momentum $p_x$ was the usual linear momentum. The Hamiltonian turned out to be the total mechanical energy $T+V$, which is often the case for conservative systems with scleronomous (time-independent) constraints and velocity-independent potentials. The derivation clearly showed how Hamilton's equations reproduce Newton's second law in the momentum form.

### Example 2: Planar Pendulum

**Problem:** A simple pendulum consists of a mass $m$ attached to a rigid, massless rod of length $l$, swinging in a vertical plane. Find the Hamiltonian and Hamilton's equations of motion.

**Given:**
*   Mass $m$
*   Length of rod $l$
*   Angle $\theta$ from the vertical
*   Acceleration due to gravity $g$

**We want:**
*   The Hamiltonian $H(\theta, p_\theta)$
*   Hamilton's equations: $\dot{\theta} = \frac{\partial H}{\partial p_\theta}$ and $\dot{p}_\theta = -\frac{\partial H}{\partial \theta}$

---

**Step 1: Write down the kinetic energy ($T$) and potential energy ($V$).**
*   We use polar coordinates with the origin at the pivot point. The generalized coordinate is $\theta$.
*   The velocity of the mass $m$ is $v = l\dot{\theta}$.
*   Kinetic energy: $T = \frac{1}{2}mv^2 = \frac{1}{2}m(l\dot{\theta})^2 = \frac{1}{2}ml^2\dot{\theta}^2$.
*   Potential energy: Let's set the reference point for $V=0$ at the pivot. The height of the mass is $-l\cos\theta$ (negative because it's below the pivot).
    $V = mg(-l\cos\theta) = -mgl\cos\theta$.

**Step 2: Formulate the Lagrangian ($L$).**
$$ L(\theta, \dot{\theta}) = T - V = \frac{1}{2}ml^2\dot{\theta}^2 - (-mgl\cos\theta) $$
$$ L(\theta, \dot{\theta}) = \frac{1}{2}ml^2\dot{\theta}^2 + mgl\cos\theta $$
    *This Lagrangian describes the system's dynamics in terms of the angle and angular velocity.*

**Step 3: Calculate the generalized momentum ($p_\theta$).**
*   The generalized momentum corresponding to $\theta$ is $p_\theta = \frac{\partial L}{\partial \dot{\theta}}$.
$$ p_\theta = \frac{\partial}{\partial \dot{\theta}}\left(\frac{1}{2}ml^2\dot{\theta}^2 + mgl\cos\theta\right) $$
$$ p_\theta = ml^2\dot{\theta} $$
    *This is the angular momentum of the pendulum bob about the pivot.*

**Step 4: Express $\dot{\theta}$ in terms of $p_\theta$.**
*   From $p_\theta = ml^2\dot{\theta}$, we solve for $\dot{\theta}$:
$$ \dot{\theta} = \frac{p_\theta}{ml^2} $$
    *This substitution is vital for converting the Lagrangian to the Hamiltonian.*

**Step 5: Formulate the Hamiltonian ($H$).**
*   The Hamiltonian is $H = p_\theta\dot{\theta} - L$.
*   Substitute $L$ and $\dot{\theta}$:
$$ H(\theta, p_\theta) = p_\theta\left(\frac{p_\theta}{ml^2}\right) - \left(\frac{1}{2}ml^2\left(\frac{p_\theta}{ml^2}\right)^2 + mgl\cos\theta\right) $$
$$ H(\theta, p_\theta) = \frac{p_\theta^2}{ml^2} - \left(\frac{1}{2}ml^2\frac{p_\theta^2}{m^2l^4} + mgl\cos\theta\right) $$
$$ H(\theta, p_\theta) = \frac{p_\theta^2}{ml^2} - \frac{p_\theta^2}{2ml^2} - mgl\cos\theta $$
$$ H(\theta, p_\theta) = \frac{p_\theta^2}{2ml^2} - mgl\cos\theta $$
    *Again, $H=T+V$. The kinetic energy term is $\frac{1}{2}ml^2\dot{\theta}^2 = \frac{1}{2}ml^2\left(\frac{p_\theta}{ml^2}\right)^2 = \frac{p_\theta^2}{2ml^2}$. The potential energy is $-mgl\cos\theta$. The Hamiltonian is indeed the total energy.*

**Step 6: Derive Hamilton's equations of motion.**
*   We need $\dot{\theta} = \frac{\partial H}{\partial p_\theta}$ and $\dot{p}_\theta = -\frac{\partial H}{\partial \theta}$.

    **Equation for $\dot{\theta}$:**
$$ \dot{\theta} = \frac{\partial H}{\partial p_\theta} = \frac{\partial}{\partial p_\theta}\left(\frac{p_\theta^2}{2ml^2} - mgl\cos\theta\right) $$
$$ \dot{\theta} = \frac{2p_\theta}{2ml^2} $$
$$ \dot{\theta} = \frac{p_\theta}{ml^2} $$
    *This matches our definition of $\dot{\theta}$ in terms of $p_\theta$, confirming consistency.*

    **Equation for $\dot{p}_\theta$:**
$$ \dot{p}_\theta = -\frac{\partial H}{\partial \theta} = -\frac{\partial}{\partial \theta}\left(\frac{p_\theta^2}{2ml^2} - mgl\cos\theta\right) $$
$$ \dot{p}_\theta = -(-mgl(-\sin\theta)) $$
$$ \dot{p}_\theta = -mgl\sin\theta $$
    *This equation describes the rate of change of angular momentum. Since $\dot{p}_\theta$ is the generalized force (torque) for the coordinate $\theta$, this is the torque due to gravity, $-mgl\sin\theta$. This matches the Euler-Lagrange equation for the pendulum.*

---
**Final Answer:**
The Hamiltonian for the Planar Pendulum is:
$$ \boxed{H(\theta, p_\theta) = \frac{p_\theta^2}{2ml^2} - mgl\cos\theta} $$
Hamilton's equations of motion are:
$$ \boxed{\dot{\theta} = \frac{p_\theta}{ml^2}} $$
$$ \boxed{\dot{p}_\theta = -mgl\sin\theta} $$

**Reflection:** This example involved an angular coordinate and angular momentum, demonstrating how generalized coordinates and momenta work beyond simple linear motion. The Hamiltonian again represented the total energy, which is conserved since $H$ does not explicitly depend on time. The resulting equations are equivalent to the Euler-Lagrange equations, showing the consistency of the formulations.

### Example 3: Particle in a Central Force Field (2D, Polar Coordinates)

**Problem:** A particle of mass $m$ moves in a plane under the influence of a central force described by a potential $V(r)$. Find the Hamiltonian and Hamilton's equations of motion using polar coordinates $(r, \theta)$.

**Given:**
*   Mass $m$
*   Potential energy $V(r)$ (only depends on radial distance)
*   Polar coordinates $r, \theta$
*   Velocities $\dot{r}, \dot{\theta}$

**We want:**
*   The Hamiltonian $H(r, \theta, p_r, p_\theta)$
*   Hamilton's equations: $\dot{r} = \frac{\partial H}{\partial p_r}$, $\dot{\theta} = \frac{\partial H}{\partial p_\theta}$, $\dot{p}_r = -\frac{\partial H}{\partial r}$, $\dot{p}_\theta = -\frac{\partial H}{\partial \theta}$

---

**Step 1: Write down the kinetic energy ($T$) and potential energy ($V$).**
*   In polar coordinates, the kinetic energy is:
$$ T = \frac{1}{2}m(\dot{r}^2 + r^2\dot{\theta}^2) $$
*   The potential energy is given as $V(r)$.

**Step 2: Formulate the Lagrangian ($L$).**
$$ L(r, \theta, \dot{r}, \dot{\theta}) = T - V = \frac{1}{2}m(\dot{r}^2 + r^2\dot{\theta}^2) - V(r) $$
    *The Lagrangian depends on two generalized coordinates ($r, \theta$) and their respective velocities ($\dot{r}, \dot{\theta}$). Note that $L$ does not explicitly depend on $\theta$ or time $t$.*

**Step 3: Calculate the generalized momenta ($p_r, p_\theta$).**
*   For $q_1 = r$:
$$ p_r = \frac{\partial L}{\partial \dot{r}} = \frac{\partial}{\partial \dot{r}}\left(\frac{1}{2}m\dot{r}^2 + \frac{1}{2}mr^2\dot{\theta}^2 - V(r)\right) $$
$$ p_r = m\dot{r} $$
    *This is the radial component of momentum.*

*   For $q_2 = \theta$:
$$ p_\theta = \frac{\partial L}{\partial \dot{\theta}} = \frac{\partial}{\partial \dot{\theta}}\left(\frac{1}{2}m\dot{r}^2 + \frac{1}{2}mr^2\dot{\theta}^2 - V(r)\right) $$
$$ p_\theta = mr^2\dot{\theta} $$
    *This is the angular momentum about the origin.*

**Step 4: Express $\dot{r}$ and $\dot{\theta}$ in terms of $p_r, p_\theta, r, \theta$.**
*   From $p_r = m\dot{r}$:
$$ \dot{r} = \frac{p_r}{m} $$
*   From $p_\theta = mr^2\dot{\theta}$:
$$ \dot{\theta} = \frac{p_\theta}{mr^2} $$
    *These are the crucial substitutions for the Hamiltonian.*

**Step 5: Formulate the Hamiltonian ($H$).**
*   The Hamiltonian is $H = p_r\dot{r} + p_\theta\dot{\theta} - L$.
*   Substitute $L$, $\dot{r}$, and $\dot{\theta}$:
$$ H(r, \theta, p_r, p_\theta) = p_r\left(\frac{p_r}{m}\right) + p_\theta\left(\frac{p_\theta}{mr^2}\right) - \left(\frac{1}{2}m\left(\frac{p_r}{m}\right)^2 + \frac{1}{2}mr^2\left(\frac{p_\theta}{mr^2}\right)^2 - V(r)\right) $$
$$ H = \frac{p_r^2}{m} + \frac{p_\theta^2}{mr^2} - \left(\frac{p_r^2}{2m} + \frac{1}{2}mr^2\frac{p_\theta^2}{m^2r^4} - V(r)\right) $$
$$ H = \frac{p_r^2}{m} + \frac{p_\theta^2}{mr^2} - \frac{p_r^2}{2m} - \frac{p_\theta^2}{2mr^2} + V(r) $$
$$ H(r, \theta, p_r, p_\theta) = \frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + V(r) $$
    *The Hamiltonian is the total energy $T+V$. The first term is radial kinetic energy, the second is angular kinetic energy, and the third is potential energy.*

**Step 6: Derive Hamilton's equations of motion.**
*   We need four equations: $\dot{r} = \frac{\partial H}{\partial p_r}$, $\dot{\theta} = \frac{\partial H}{\partial p_\theta}$, $\dot{p}_r = -\frac{\partial H}{\partial r}$, $\dot{p}_\theta = -\frac{\partial H}{\partial \theta}$.

    **Equation for $\dot{r}$:**
$$ \dot{r} = \frac{\partial H}{\partial p_r} = \frac{\partial}{\partial p_r}\left(\frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + V(r)\right) $$
$$ \dot{r} = \frac{2p_r}{2m} $$
$$ \dot{r} = \frac{p_r}{m} $$
    *Consistent with $p_r = m\dot{r}$.*

    **Equation for $\dot{\theta}$:**
$$ \dot{\theta} = \frac{\partial H}{\partial p_\theta} = \frac{\partial}{\partial p_\theta}\left(\frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + V(r)\right) $$
$$ \dot{\theta} = \frac{2p_\theta}{2mr^2} $$
$$ \dot{\theta} = \frac{p_\theta}{mr^2} $$
    *Consistent with $p_\theta = mr^2\dot{\theta}$.*

    **Equation for $\dot{p}_r$:**
$$ \dot{p}_r = -\frac{\partial H}{\partial r} = -\frac{\partial}{\partial r}\left(\frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + V(r)\right) $$
$$ \dot{p}_r = -\left(0 + \frac{p_\theta^2}{2m}\frac{\partial}{\partial r}(r^{-2}) + \frac{\partial V}{\partial r}\right) $$
$$ \dot{p}_r = -\left(\frac{p_\theta^2}{2m}(-2r^{-3}) + \frac{dV}{dr}\right) $$
$$ \dot{p}_r = \frac{p_\theta^2}{mr^3} - \frac{dV}{dr} $$
    *Here, $\frac{p_\theta^2}{mr^3}$ is the centrifugal force term, and $-\frac{dV}{dr}$ is the radial force from the potential. This matches the radial Euler-Lagrange equation.*

    **Equation for $\dot{p}_\theta$:**
$$ \dot{p}_\theta = -\frac{\partial H}{\partial \theta} = -\frac{\partial}{\partial \theta}\left(\frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + V(r)\right) $$
$$ \dot{p}_\theta = -(0 + 0 + 0) $$
$$ \dot{p}_\theta = 0 $$
    *Since $H$ does not depend on $\theta$ (i.e., $\theta$ is a cyclic coordinate), its conjugate momentum $p_\theta$ is conserved. This is the conservation of angular momentum for a central force problem.*

---
**Final Answer:**
The Hamiltonian for a particle in a central force field is:
$$ \boxed{H(r, \theta, p_r, p_\theta) = \frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + V(r)} $$
Hamilton's equations of motion are:
$$ \boxed{\dot{r} = \frac{p_r}{m}} $$
$$ \boxed{\dot{\theta} = \frac{p_\theta}{mr^2}} $$
$$ \boxed{\dot{p}_r = \frac{p_\theta^2}{mr^3} - \frac{dV}{dr}} $$
$$ \boxed{\dot{p}_\theta = 0} $$

**Reflection:** This example involved two generalized coordinates and their momenta, leading to four Hamilton's equations. It beautifully illustrated the power of Hamiltonian mechanics in identifying conserved quantities (like angular momentum $p_\theta$) when a coordinate is cyclic. The terms in $\dot{p}_r$ clearly show the balance between the centrifugal force and the central force. This setup is fundamental for understanding planetary motion and orbital mechanics.

### Example 4: Bead on a Rotating Wire

**Problem:** A bead of mass $m$ slides without friction on a circular wire of radius $R$. The wire is rotating in a horizontal plane with a constant angular velocity $\omega$ about a vertical axis passing through its center. Find the Hamiltonian and Hamilton's equations of motion.

**Given:**
*   Mass $m$
*   Radius of wire $R$ (constant)
*   Constant angular velocity of wire $\omega$
*   Angle $\phi$ describing the bead's position relative to the rotating wire.

**We want:**
*   The Hamiltonian $H(\phi, p_\phi)$
*   Hamilton's equations: $\dot{\phi} = \frac{\partial H}{\partial p_\phi}$ and $\dot{p}_\phi = -\frac{\partial H}{\partial \phi}$

---

**Step 1: Define coordinates and velocities.**
*   Let the fixed inertial frame be $(X, Y)$. The rotating wire defines a frame $(x, y)$ rotating with angular velocity $\omega$.
*   The position of the bead in the fixed frame is $(X, Y)$.
*   The angle of the bead relative to the *rotating* wire is $\phi$.
*   The total angle of the bead in the fixed frame is $\Theta = \omega t + \phi$.
*   The coordinates of the bead are $X = R\cos\Theta = R\cos(\omega t + \phi)$ and $Y = R\sin\Theta = R\sin(\omega t + \phi)$.
*   The velocities in the fixed frame are:
    $\dot{X} = -R\sin(\omega t + \phi)(\omega + \dot{\phi})$
    $\dot{Y} = R\cos(\omega t + \phi)(\omega + \dot{\phi})$

**Step 2: Write down the kinetic energy ($T$) and potential energy ($V$).**
*   Since the motion is in a horizontal plane, there is no gravitational potential energy. We can set $V=0$.
*   Kinetic energy: $T = \frac{1}{2}m(\dot{X}^2 + \dot{Y}^2)$.
    $\dot{X}^2 + \dot{Y}^2 = R^2\sin^2(\omega t + \phi)(\omega + \dot{\phi})^2 + R^2\cos^2(\omega t + \phi)(\omega + \dot{\phi})^2$
    $\dot{X}^2 + \dot{Y}^2 = R^2(\omega + \dot{\phi})^2(\sin^2(\omega t + \phi) + \cos^2(\omega t + \phi))$
    $\dot{X}^2 + \dot{Y}^2 = R^2(\omega + \dot{\phi})^2$
$$ T = \frac{1}{2}mR^2(\omega + \dot{\phi})^2 $$
    *This kinetic energy depends on $\dot{\phi}$ and also explicitly on time through $\omega t$ if we expand it, but it's simpler to keep it as $(\omega+\dot{\phi})^2$. The potential energy $V=0$.*

**Step 3: Formulate the Lagrangian ($L$).**
$$ L(\phi, \dot{\phi}, t) = T - V = \frac{1}{2}mR^2(\omega + \dot{\phi})^2 - 0 $$
$$ L(\phi, \dot{\phi}, t) = \frac{1}{2}mR^2(\omega^2 + 2\omega\dot{\phi} + \dot{\phi}^2) $$
    *Note that the Lagrangian explicitly depends on time through $\omega t$ in the expanded form, or implicitly through the term $\omega$ if we consider $\omega$ as a function of time (even if it's constant, it's a parameter of the system's time evolution). This means the Hamiltonian might not be conserved!*

**Step 4: Calculate the generalized momentum ($p_\phi$).**
*   The generalized momentum corresponding to $\phi$ is $p_\phi = \frac{\partial L}{\partial \dot{\phi}}$.
$$ p_\phi = \frac{\partial}{\partial \dot{\phi}}\left(\frac{1}{2}mR^2(\omega + \dot{\phi})^2\right) $$
$$ p_\phi = \frac{1}{2}mR^2 \cdot 2(\omega + \dot{\phi}) \cdot 1 $$
$$ p_\phi = mR^2(\omega + \dot{\phi}) $$
    *This is the angular momentum of the bead with respect to the fixed vertical axis.*

**Step 5: Express $\dot{\phi}$ in terms of $p_\phi$.**
*   From $p_\phi = mR^2(\omega + \dot{\phi})$:
$$ \frac{p_\phi}{mR^2} = \omega + \dot{\phi} $$
$$ \dot{\phi} = \frac{p_\phi}{mR^2} - \omega $$
    *This substitution is key for the Hamiltonian.*

**Step 6: Formulate the Hamiltonian ($H$).**
*   The Hamiltonian is $H = p_\phi\dot{\phi} - L$.
*   Substitute $L$ and $\dot{\phi}$:
$$ H(\phi, p_\phi, t) = p_\phi\left(\frac{p_\phi}{mR^2} - \omega\right) - \left(\frac{1}{2}mR^2\left(\omega + \left(\frac{p_\phi}{mR^2} - \omega\right)\right)^2\right) $$
$$ H = \frac{p_\phi^2}{mR^2} - p_\phi\omega - \left(\frac{1}{2}mR^2\left(\frac{p_\phi}{mR^2}\right)^2\right) $$
$$ H = \frac{p_\phi^2}{mR^2} - p_\phi\omega - \frac{1}{2}mR^2\frac{p_\phi^2}{m^2R^4} $$
$$ H = \frac{p_\phi^2}{mR^2} - p_\phi\omega - \frac{p_\phi^2}{2mR^2} $$
$$ H(\phi, p_\phi, t) = \frac{p_\phi^2}{2mR^2} - p_\phi\omega $$
    *Notice that this Hamiltonian does not include the potential energy $V=0$. Also, it explicitly depends on $\omega$, which is a constant but derived from a time-dependent coordinate transformation. The Hamiltonian $H$ is conserved if $\frac{\partial H}{\partial t} = -\frac{\partial L}{\partial t} = 0$. In this case, $L$ *does* explicitly depend on time (through $\omega t$ in the expanded form of $\omega+\dot{\phi}$), so $H$ is not necessarily the total energy and is not conserved. However, since $\omega$ is a constant, $H$ as derived here does not explicitly depend on $t$, so it *is* conserved. This is a subtle point: $H$ is conserved if $\frac{\partial H}{\partial t}=0$, and $\frac{\partial H}{\partial t} = -\frac{\partial L}{\partial t}$. In this case $\frac{\partial L}{\partial t} = mR^2\omega^2 + mR^2\omega\dot{\phi}$... wait, no. The $\omega$ is a constant, so $\frac{\partial L}{\partial t}$ is zero. So $H$ *is* conserved. The term $p_\phi\omega$ does not make it time-dependent explicitly.*

**Step 7: Derive Hamilton's equations of motion.**
*   We need $\dot{\phi} = \frac{\partial H}{\partial p_\phi}$ and $\dot{p}_\phi = -\frac{\partial H}{\partial \phi}$.

    **Equation for $\dot{\phi}$:**
$$ \dot{\phi} = \frac{\partial H}{\partial p_\phi} = \frac{\partial}{\partial p_\phi}\left(\frac{p_\phi^2}{2mR^2} - p_\phi\omega\right) $$
$$ \dot{\phi} = \frac{2p_\phi}{2mR^2} - \omega $$
$$ \dot{\phi} = \frac{p_\phi}{mR^2} - \omega $$
    *Consistent with our expression for $\dot{\phi}$ in terms of $p_\phi$.*

    **Equation for $\dot{p}_\phi$:**
$$ \dot{p}_\phi = -\frac{\partial H}{\partial \phi} = -\frac{\partial}{\partial \phi}\left(\frac{p_\phi^2}{2mR^2} - p_\phi\omega\right) $$
$$ \dot{p}_\phi = -(0 - 0) $$
$$ \dot{p}_\phi = 0 $$
    *Since $H$ does not depend on $\phi$ (i.e., $\phi$ is a cyclic coordinate), its conjugate momentum $p_\phi$ is conserved. This means the angular momentum of the bead relative to the rotating frame is conserved.*

---
**Final Answer:**
The Hamiltonian for the bead on a rotating wire is:
$$ \boxed{H(\phi, p_\phi, t) = \frac{p_\phi^2}{2mR^2} - p_\phi\omega} $$
Hamilton's equations of motion are:
$$ \boxed{\dot{\phi} = \frac{p_\phi}{mR^2} - \omega} $$
$$ \boxed{\dot{p}_\phi = 0} $$

**Reflection:** This example was harder because the coordinate system itself was rotating, introducing an explicit time dependence in the transformation equations from Cartesian to generalized coordinates. This often leads to a Hamiltonian that is *not* simply $T+V$, and may not be conserved if $L$ explicitly depends on time. In this specific case, $L$ did not explicitly depend on $t$ (because $\omega$ is constant), so $H$ *is* conserved. The term $-p_\phi\omega$ is interesting; it's a coupling term between the bead's angular momentum and the wire's rotation. The conservation of $p_\phi$ simplifies the problem greatly, allowing us to immediately integrate $\dot{\phi}$ to find $\phi(t)$. This demonstrates how Hamiltonian mechanics can reveal conserved quantities even in non-trivial systems.

## 6. Common mistakes and traps

1.  **Forgetting to substitute $\dot{q}_i$ in terms of $p_i$ and $q_i$ when forming $H$**: The Hamiltonian $H$ *must* be a function of $(q_i, p_i, t)$ only. If you leave any $\dot{q}_i$ in the expression for $H$, your Hamiltonian is incorrect, and your Hamilton's equations will be wrong. This is the single most frequent and critical error.
2.  **Incorrectly performing the Legendre Transformation**: This often happens when solving $p_i = \frac{\partial L}{\partial \dot{q}_i}$ for $\dot{q}_i$. For systems with multiple degrees of freedom, you might have a system of equations to solve, or the relationship might be non-linear. Forgetting to solve for *all* $\dot{q}_i$ or making algebraic errors here will propagate.
3.  **Forgetting the negative sign in $\dot{p}_i = -\frac{\partial H}{\partial q_i}$**: This is a classic sign error that can completely change the physics. The negative sign is fundamental to the structure of Hamilton's equations and is not arbitrary.
4.  **Confusing the Hamiltonian ($H$) with the total energy ($E$)**: While for many common systems (conservative, scleronomous constraints, potential not velocity-dependent), $H = T+V = E$, this is not universally true. If the Lagrangian explicitly depends on time ($\frac{\partial L}{\partial t} \neq 0$), then $H \neq E$. Even if $H=E$, $H$ is only conserved if $\frac{\partial H}{\partial t} = 0$. Always check the conditions.
5.  **Incorrectly identifying cyclic coordinates**: A coordinate $q_k$ is cyclic if the Lagrangian (and thus the Hamiltonian) does not explicitly depend on $q_k$. If $q_k$ is cyclic, its conjugate momentum $p_k$ is conserved. Students sometimes miss this or incorrectly identify a coordinate as cyclic.
6.  **Errors in partial differentiation**: Hamiltonian mechanics relies heavily on partial derivatives. Simple algebraic or calculus errors in these steps will lead to incorrect equations of motion. Double-check your derivatives.

## 7. Textbook-precise explanation

The Hamiltonian formulation of classical mechanics provides an alternative, and often more powerful, description of a system's dynamics compared to the Lagrangian formulation. It shifts the focus from generalized coordinates and velocities to generalized coordinates and their conjugate momenta as the fundamental variables.

Consider a holonomic dynamical system described by $n$ generalized coordinates $q_1, q_2, \dots, q_n$. The time derivatives of these coordinates, $\dot{q}_1, \dot{q}_2, \dots, \dot{q}_n$, are the generalized velocities. The dynamics of such a system are governed by the Lagrangian, $L(q_i, \dot{q}_i, t)$, which is typically defined as the difference between the kinetic energy $T$ and the potential energy $V$, i.e., $L = T - V$.

The **generalized (or canonical) momentum** $p_i$ conjugate to the generalized coordinate $q_i$ is defined as:
$$ p_i = \frac{\partial L}{\partial \dot{q}_i} $$
This definition establishes a relationship between the generalized velocities and the generalized momenta. For the Hamiltonian formulation, we aim to transform the description of the system from $(q_i, \dot{q}_i, t)$ to $(q_i, p_i, t)$. This is achieved through a **Legendre transformation**.

The **Hamiltonian** $H$ is defined as:
$$ H(q_1, \dots, q_n, p_1, \dots, p_n, t) = \sum_{i=1}^n p_i \dot{q}_i - L(q_1, \dots, q_n, \dot{q}_1, \dots, \dot{q}_n, t) $$
Crucially, after this definition, all generalized velocities $\dot{q}_i$ must be eliminated from the expression for $H$ by using the relations $p_i = \frac{\partial L}{\partial \dot{q}_i}$ to express $\dot{q}_i$ as functions of $q_j$, $p_j$, and $t$. The Hamiltonian $H$ is thus a function solely of the generalized coordinates, generalized momenta, and possibly time.

The **Hamilton's Canonical Equations of Motion** are derived by considering the total differential of $H$ and comparing it with the total differential of its defining relation. The total differential of $H(q_i, p_i, t)$ is:
$$ dH = \sum_{i=1}^n \left(\frac{\partial H}{\partial q_i} dq_i + \frac{\partial H}{\partial p_i} dp_i\right) + \frac{\partial H}{\partial t} dt $$
By substituting the definition of $H$ and the Euler-Lagrange equations into its total differential, one arrives at:
$$ dH = \sum_{i=1}^n (\dot{q}_i dp_i - \dot{p}_i dq_i) - \frac{\partial L}{\partial t} dt $$
Comparing these two expressions for $dH$ yields Hamilton's equations:
$$ \dot{q}_i = \frac{\partial H}{\partial p_i} $$
$$ \dot{p}_i = -\frac{\partial H}{\partial q_i} $$
And for the explicit time dependence:
$$ \frac{\partial H}{\partial t} = -\frac{\partial L}{\partial t} $$

These $2n$ first-order differential equations describe the time evolution of the system in **phase space**, which is a $2n$-dimensional space spanned by the generalized coordinates $q_i$ and their conjugate momenta $p_i$. A point in phase space $(q_1, \dots, q_n, p_1, \dots, p_n)$ fully specifies the state of the system at any instant.

**Key properties of the Hamiltonian:**
*   If the transformation equations from Cartesian to generalized coordinates do not explicitly depend on time (i.e., the constraints are scleronomous), and the potential energy $V$ does not depend on generalized velocities, then the kinetic energy $T$ is a homogeneous quadratic function of the generalized velocities. In this common case, $H = T + V$, which is the total mechanical energy of the system.
*   If the Hamiltonian $H$ does not explicitly depend on time ($\frac{\partial H}{\partial t} = 0$), then $H$ is a conserved quantity. In the case where $H = T+V$, this means the total mechanical energy is conserved.
*   If a generalized coordinate $q_k$ is cyclic (i.e., $H$ does not explicitly depend on $q_k$, so $\frac{\partial H}{\partial q_k} = 0$), then its conjugate momentum $p_k$ is conserved ($\dot{p}_k = 0$).

This formulation is foundational for advanced topics in classical mechanics, quantum mechanics, statistical mechanics, and control theory.

(Refer to: Goldstein, H., Classical Mechanics, 3rd ed., Chapter 8; Landau, L.D. and Lifshitz, E.M., Mechanics, 3rd ed., Chapter 7; Thornton, S.T. and Marion, J.B., Classical Dynamics of Particles and Systems, 5th ed., Chapter 7.)

## 8. ASCII diagrams

```text
                                  THE PATH TO HAMILTON'S EQUATIONS

                                 +---------------------------------+
                                 |  System Description: Mass, K, V |
                                 +---------------------------------+
                                                 |
                                                 v
                                 +---------------------------------+
                                 |  Choose Generalized Coordinates |
                                 |      q_1, q_2, ..., q_n         |
                                 +---------------------------------+
                                                 |
                                                 v
                                 +---------------------------------+
                                 |  Kinetic Energy (T)             |
                                 |  Potential Energy (V)           |
                                 +---------------------------------+
                                                 |
                                                 v
                                 +---------------------------------+
                                 |  Lagrangian L = T - V           |
                                 |  L(q_i, q_dot_i, t)             |
                                 +---------------------------------+
                                                 |
                                                 v
                     Step 1: Define Generalized Momenta (p_i)
                     +-------------------------------------------------+
                     |  p_i = ∂L / ∂(q_dot_i)                            |
                     +-------------------------------------------------+
                                                 |
                                                 v
                     Step 2: Express q_dot_i in terms of p_i, q_i, t
                     +-------------------------------------------------+
                     |  Solve p_i = f(q_i, q_dot_i, t) for q_dot_i     |
                     |  q_dot_i = g(q_i, p_i, t)                         |
                     +-------------------------------------------------+
                                                 |
                                                 v
                     Step 3: Form the Hamiltonian (H) using Legendre Transform
                     +-------------------------------------------------+
                     |  H = Σ (p_i * q_dot_i) - L                      |
                     |  (Substitute q_dot_i from Step 2)               |
                     |  H(q_i, p_i, t)                                 |
                     +-------------------------------------------------+
                                                 |
                                                 v
                     Step 4: Derive Hamilton's Equations of Motion
                     +-------------------------------------------------+
                     |  ∂H / ∂p_i = q_dot_i  (Evolution of position)   |
                     |  ∂H / ∂q_i = -p_dot_i (Evolution of momentum)  |
                     |  ∂H / ∂t = -∂L / ∂t   (Energy conservation)     |
                     +-------------------------------------------------+
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Imagine "Hamilton's House" (H). It has two main doors.
    *   One door is for "Position" ($q$). When you go through it, you get the *rate of change of momentum* ($\dot{p}$). But there's a guard at this door who says "No!" (