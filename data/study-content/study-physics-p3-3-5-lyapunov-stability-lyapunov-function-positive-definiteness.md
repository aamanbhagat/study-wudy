## 1. What it is — in plain English

Imagine you have a ball. If you place this ball at the very bottom of a perfectly smooth bowl, and then give it a tiny nudge, what happens? It rolls up a bit, then rolls back down, oscillating for a while, and eventually settles back at the bottom. This ball-in-a-bowl scenario is a great picture of **stability**. The bottom of the bowl is a stable "home" for the ball.

Now, imagine you place that same ball precisely on the very top of a perfectly smooth, upside-down bowl (a dome). Give it even the tiniest nudge, and what happens? It immediately rolls off and falls away, never returning to the top. This is an example of **instability**.

In rocket science and physics, we often have complex systems that we want to behave predictably. We want our rocket to stay on its intended trajectory, or our satellite to maintain its orientation. **Lyapunov stability** is a powerful mathematical tool that lets us figure out if a system will behave like the ball in the bowl (stable) or the ball on the dome (unstable), *without actually having to solve the incredibly complicated equations that describe its movement*.

The trick lies in finding a special mathematical function, called a **Lyapunov function**. Think of this function as an "energy meter" for our system. If we can find an "energy meter" that is always positive (like height above ground) and whose value always decreases over time as the system evolves, then we know the system must eventually settle down to a state where this "energy" is at its minimum – typically, our desired stable operating point. This "energy meter" must also have a property called **positive definiteness**, which simply means it's always positive everywhere except at the specific point we're checking for stability, where it's exactly zero.

## 2. Why it matters — real-world applications

Lyapunov stability analysis is a cornerstone of modern engineering, particularly in fields where system reliability and safety are paramount.

1.  **Aerospace Engineering (Guidance, Navigation & Control - GNC):** This is perhaps its most direct and critical application.
    *   **Satellite Attitude Control:** When a satellite needs to maintain a specific orientation (e.g., pointing its antenna at Earth), GNC systems use Lyapunov-based controllers to ensure that even if external disturbances (like solar radiation pressure) nudge it, the satellite will return to its desired attitude. Companies like **SpaceX** and **Maxar Technologies** heavily rely on these principles for their spacecraft.
    *   **Rocket Trajectory Stabilization:** During launch and ascent, rockets like the **Falcon 9** are inherently unstable due to their tall, slender design. Lyapunov stability analysis is used to design the flight control algorithms that constantly adjust thrust vectors and fin positions to keep the rocket on its intended path and prevent it from tumbling.
    *   **Drone Flight Control:** Quadcopters and other UAVs (Unmanned Aerial Vehicles) are multi-input, multi-output systems. Lyapunov stability helps design controllers that guarantee stable hovering, robust trajectory tracking, and recovery from disturbances, crucial for companies like **DJI** or military contractors developing surveillance drones.

2.  **Robotics:** Ensuring that robots perform tasks reliably and safely.
    *   **Stable Walking Robots:** For bipedal or quadrupedal robots (e.g., **Boston Dynamics' Spot or Atlas**), maintaining balance is a continuous challenge. Lyapunov functions are used to prove that the robot's gait and balance control algorithms will keep it upright even on uneven terrain or after external pushes.
    *   **Manipulator Arm Control:** Industrial robot arms need to move precisely and stably without oscillations or unexpected movements. Lyapunov theory helps design controllers that ensure the arm reaches its target position and stays there, even when carrying varying loads.

3.  **Power Systems:** Maintaining the stability of electrical grids.
    *   **Grid Stability:** Large-scale power grids are complex networks of generators, transmission lines, and loads. If a generator fails or a large load suddenly disconnects, the grid can become unstable, leading to cascading blackouts. Lyapunov stability analysis helps engineers understand the conditions under which a grid will remain stable and design control strategies to prevent widespread outages. **Siemens Energy** and **GE Grid Solutions** are major players in this area.

4.  **Machine Learning and Optimization:** Proving convergence and stability of algorithms.
    *   **Neural Network Training:** In advanced machine learning, especially for recurrent neural networks or adaptive control, Lyapunov theory can be used to prove that the learning algorithm will converge to a stable solution, preventing divergence or oscillatory behavior during training. This is critical in areas like **DeepMind's** research into stable reinforcement learning agents.
    *   **Optimization Algorithms:** Many optimization algorithms seek to find the minimum of a cost function. Lyapunov-like functions (often the cost function itself) can be used to prove that these algorithms will converge to a local or global minimum, ensuring that the learning process is stable and effective.

## 3. Prerequisites — what you must know first

To fully grasp Lyapunov stability, you'll need a solid foundation in several core mathematical and physics concepts. If any of these feel unfamiliar, pause and review them first.

*   **Differential Equations (ODEs):** The mathematical language for describing how systems change over time. You should be comfortable with first-order systems, solving simple ODEs, and understanding what $\dot{x}$ means.
*   **Equilibrium Points:** The "resting states" of a system described by ODEs, where all rates of change are zero (i.e., $\dot{\mathbf{x}} = \mathbf{0}$).
*   **Vector Calculus:**
    *   **Partial Derivatives:** How a multivariable function changes with respect to one variable while holding others constant.
    *   **Gradient:** A vector containing all partial derivatives of a scalar function, pointing in the direction of the steepest ascent.
    *   **Chain Rule for Multivariable Functions:** Crucial for calculating the time derivative of a Lyapunov function, e.g., $\frac{d}{dt} V(x_1(t), ..., x_n(t))$.
*   **Linear Algebra:**
    *   **Vectors and Matrices:** Operations like vector-matrix multiplication, transpose.
    *   **Quadratic Forms:** Functions of the form $\mathbf{x}^T P \mathbf{x}$, where $P$ is a symmetric matrix.
    *   **Positive Definite Matrices:** A symmetric matrix $P$ is positive definite if $\mathbf{x}^T P \mathbf{x} > 0$ for all non-zero vectors $\mathbf{x}$. This is key to defining positive definite functions.
    *   **Eigenvalues:** Understanding how eigenvalues of a matrix relate to system stability in linear systems (though Lyapunov extends beyond this).
*   **Multivariable Calculus:**
    *   **Functions of Several Variables:** Understanding $f(x_1, x_2, ..., x_n)$.
    *   **Local Extrema:** How to find minimum/maximum points of a multivariable function.
*   **System Dynamics (State-Space Representation):** Representing a system's behavior using a set of first-order differential equations, typically as $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}, t)$ or $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$ for autonomous systems, where $\mathbf{x}$ is the state vector.

## 4. The core idea — step by step

Let's break down Lyapunov stability piece by piece, building from intuition to formal definitions.

### ### Step 1: What is Stability?

*   **Plain English:** Imagine a system, like a satellite in orbit or a robot standing upright. If you give it a small push or a tiny disturbance, does it stay close to its original state, or does it wander far away? If it stays close, it's "stable." If it eventually returns to its original state, it's even better: "asymptotically stable." If it just keeps moving away, it's "unstable."

*   **Small Concrete Example:**
    *   **Stable:** A perfectly balanced spinning top. If you nudge it, it wobbles but continues spinning in roughly the same spot.
    *   **Asymptotically Stable:** A pendulum at rest. If you push it, it swings for a bit, but friction eventually brings it back to its original resting position.
    *   **Unstable:** An inverted pendulum (standing straight up). The slightest nudge makes it fall over.

*   **Formal/Mathematical Version:**
    Consider an autonomous system described by the differential equation:
    $$ \dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}) $$
    where $\mathbf{x} \in \mathbb{R}^n$ is the state vector and $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^n$ is a continuously differentiable function. Let $\mathbf{x}_e$ be an equilibrium point, meaning $\mathbf{f}(\mathbf{x}_e) = \mathbf{0}$. Without loss of generality, we can shift the coordinates so that the equilibrium point is at the origin, $\mathbf{x}_e = \mathbf{0}$.

    The origin $\mathbf{x}=\mathbf{0}$ is **Lyapunov stable** (or simply stable) if for every $\epsilon > 0$, there exists a $\delta > 0$ such that if $||\mathbf{x}(t_0)|| < \delta$, then $||\mathbf{x}(t)|| < \epsilon$ for all $t \ge t_0$.
    This means that if you start close enough to the equilibrium (within $\delta$), you will stay arbitrarily close (within $\epsilon$) forever.

    The origin $\mathbf{x}=\mathbf{0}$ is **asymptotically stable** if it is Lyapunov stable and, in addition, $\lim_{t \to \infty} \mathbf{x}(t) = \mathbf{0}$.
    This means not only do you stay close, but you eventually return to the equilibrium point.

*   **What Could Go Wrong:** Many students confuse "stable" with "asymptotically stable." A system can be stable (it won't run away) but not asymptotically stable (it won't necessarily return to its exact starting point, but might orbit around it, like a satellite in a perfect circular orbit). For most engineering applications, we desire asymptotic stability.

### ### Step 2: The Challenge of Stability Analysis

*   **Plain English:** How do we figure out if a system is stable? The most straightforward way would be to solve its differential equations to find $\mathbf{x}(t)$ and then see what happens as $t \to \infty$. But for many real-world systems, especially non-linear ones, solving these equations exactly is impossible! We need a method that doesn't require us to find the explicit solution.

*   **Small Concrete Example:** Imagine a rocket's full dynamics, including aerodynamics, thrust vectoring, fuel slosh, and atmospheric disturbances. The equations are incredibly complex and non-linear. There's no simple formula for $\mathbf{x}(t)$. How do we know it won't tumble out of control?

*   **Formal/Mathematical Version:** For linear systems $\dot{\mathbf{x}} = A\mathbf{x}$, stability can be determined by examining the eigenvalues of matrix $A$. However, for general non-linear systems $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$, there is no general analytical method to find explicit solutions $\mathbf{x}(t)$. Numerical simulations can provide insights, but they don't offer mathematical proof of stability for all possible initial conditions or disturbances. This is where Lyapunov's Direct Method becomes invaluable.

*   **What Could Go Wrong:** Thinking that linearizing a non-linear system around an equilibrium point (and analyzing its eigenvalues) is always sufficient. While this gives local stability information, it doesn't guarantee global stability or even stability for larger deviations from the equilibrium. Lyapunov stability is a more powerful tool for non-linear analysis.

### ### Step 3: Introducing the Lyapunov Function (The "Energy" Analogy)

*   **Plain English:** Since we can't solve the equations, let's try a different approach. What if we could find a scalar function, let's call it $V(\mathbf{x})$, that behaves like an "energy" or "potential" for our system? If this "energy" is always positive (except at the equilibrium, where it's zero) and always decreasing as the system evolves, then the system *must* eventually settle down to the state where this "energy" is at its minimum. That minimum is our equilibrium point!

*   **Small Concrete Example:** The ball in the bowl again. Let $V(x,y)$ be the height of the ball at position $(x,y)$. The lowest point (equilibrium) is at $V=0$. Anywhere else, $V > 0$. When the ball rolls, its potential energy (height) decreases due to friction. Since the height can't go below zero, it must eventually come to rest at the lowest point.

*   **Formal/Mathematical Version:** A **Lyapunov function candidate** is a scalar function $V(\mathbf{x}): \mathbb{R}^n \to \mathbb{R}$ that we propose to use for stability analysis. Its properties are defined in the next step. The time derivative of $V(\mathbf{x})$ along the system's trajectories is given by the chain rule:
    $$ \dot{V}(\mathbf{x}) = \frac{\partial V}{\partial x_1} \dot{x_1} + \frac{\partial V}{\partial x_2} \dot{x_2} + \dots + \frac{\partial V}{\partial x_n} \dot{x_n} = \nabla V(\mathbf{x}) \cdot \mathbf{f}(\mathbf{x}) $$
    where $\nabla V(\mathbf{x})$ is the gradient of $V$.

*   **What Could Go Wrong:** Misinterpreting $V(\mathbf{x})$ as actual physical energy. While it often *can* be related to physical energy, it doesn't have to be. It's an abstract mathematical construct that helps us prove stability. Any function that satisfies the Lyapunov conditions works.

### ### Step 4: Properties of a Lyapunov Function Candidate

*   **Plain English:** For our "energy meter" $V(\mathbf{x})$ to work for proving stability, it needs two critical characteristics:
    1.  **It must be like a bowl:** It has to be zero *only* at the equilibrium point we're interested in, and positive everywhere else nearby. This is called "positive definiteness."
    2.  **It must always go downhill:** As the system moves, the "energy" value $V(\mathbf{x})$ must either stay the same or (ideally) strictly decrease over time. This means its time derivative, $\dot{V}(\mathbf{x})$, must be negative or zero.

*   **Small Concrete Example:**
    1.  **Bowl-like:** For a 1D system with equilibrium at $x=0$, $V(x) = x^2$ is bowl-like. $V(0)=0$ and $V(x)>0$ for $x \neq 0$. $V(x) = x^2 - 1$ is NOT bowl-like because $V(0)=-1 \neq 0$.
    2.  **Goes downhill:** If $\dot{V}(x) = -x^2$, this means $V(x)$ is always decreasing (unless $x=0$). This implies asymptotic stability. If $\dot{V}(x) = 0$, it means $V(x)$ stays constant, implying only stability (it won't run away, but might not return to the equilibrium).

*   **Formal/Mathematical Version:** Let $\mathbf{x}=\mathbf{0}$ be an equilibrium point for $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$. A continuously differentiable function $V: D \to \mathbb{R}$ (where $D$ is a domain containing the origin) is a Lyapunov function for the system if:
    1.  **Positive Definiteness:** $V(\mathbf{0}) = 0$ and $V(\mathbf{x}) > 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$.
    2.  **Negative Semidefiniteness of its derivative:** $\dot{V}(\mathbf{x}) = \nabla V(\mathbf{x}) \cdot \mathbf{f}(\mathbf{x}) \le 0$ for all $\mathbf{x} \in D$.

    If these two conditions hold, the equilibrium point $\mathbf{x}=\mathbf{0}$ is **Lyapunov stable**.

    If, in addition to conditions 1 and 2, we have:
    3.  **Negative Definiteness of its derivative:** $\dot{V}(\mathbf{x}) < 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$.
    Then the equilibrium point $\mathbf{x}=\mathbf{0}$ is **asymptotically stable**.

*   **What Could Go Wrong:** Confusing positive definite with positive semidefinite, or negative definite with negative semidefinite.
    *   Positive definite: $V(\mathbf{x}) > 0$ for $\mathbf{x} \neq \mathbf{0}$, $V(\mathbf{0})=0$.
    *   Positive semidefinite: $V(\mathbf{x}) \ge 0$ for all $\mathbf{x}$, $V(\mathbf{0})=0$. (Could be zero at points other than the origin).
    *   Negative definite: $V(\mathbf{x}) < 0$ for $\mathbf{x} \neq \mathbf{0}$, $V(\mathbf{0})=0$. (Used for $\dot{V}$).
    *   Negative semidefinite: $V(\mathbf{x}) \le 0$ for all $\mathbf{x}$, $V(\mathbf{0})=0$. (Used for $\dot{V}$).
    The distinction between strict inequality ($>0$, $<0$) and non-strict inequality ($\ge 0$, $\le 0$) is crucial for asymptotic stability vs. mere stability.

### ### Step 5: Positive Definiteness (Formal Definition)

*   **Plain English:** A function $V(\mathbf{x})$ is "positive definite" if it's like a perfectly shaped bowl where the very bottom (the minimum value) is exactly at the origin ($\mathbf{x}=\mathbf{0}$), and at that bottom, the value of the function is exactly zero. Everywhere else away from the origin, the function's value is strictly positive. It's a fundamental requirement for a Lyapunov function because it establishes the equilibrium point as a unique "energy well."

*   **Small Concrete Example:**
    *   $V(x) = x^2$: $V(0)=0$, $V(x)>0$ for $x \neq 0$. Positive definite.
    *   $V(x_1, x_2) = x_1^2 + x_2^2$: $V(0,0)=0$, $V(x_1,x_2)>0$ for $(x_1,x_2) \neq (0,0)$. Positive definite.
    *   $V(x_1, x_2) = (x_1 - 1)^2 + x_2^2$: $V(1,0)=0$, but not at the origin. Not positive definite *at the origin*.
    *   $V(x_1, x_2) = x_1^2 + (x_1+x_2)^2$: $V(0,0)=0$. If $x_1 \neq 0$ or $x_2 \neq 0$, then $V > 0$. Positive definite.
    *   $V(x_1, x_2) = x_1^2$: $V(0,0)=0$. However, if $x_1=0$ but $x_2 \neq 0$ (e.g., $(0, 5)$), then $V(0,5)=0$. This is not strictly positive everywhere except the origin. It's positive *semidefinite*.

*   **Formal/Mathematical Version:** A continuous function $V: D \to \mathbb{R}$ is said to be **positive definite** on a domain $D \subset \mathbb{R}^n$ containing the origin if $V(\mathbf{0}) = 0$ and $V(\mathbf{x}) > 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$.
    Similarly, it is **negative definite** if $V(\mathbf{0}) = 0$ and $V(\mathbf{x}) < 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$.
    It is **positive semidefinite** if $V(\mathbf{0}) = 0$ and $V(\mathbf{x}) \ge 0$ for all $\mathbf{x} \in D$.
    It is **negative semidefinite** if $V(\mathbf{0}) = 0$ and $V(\mathbf{x}) \le 0$ for all $\mathbf{x} \in D$.

    For quadratic forms $V(\mathbf{x}) = \mathbf{x}^T P \mathbf{x}$, where $P$ is a symmetric matrix, $V(\mathbf{x})$ is positive definite if and only if $P$ is a positive definite matrix (all its eigenvalues are positive, or by Sylvester's criterion, all its leading principal minors are positive).

*   **What Could Go Wrong:** Not rigorously checking *all* conditions for positive definiteness. For example, a function like $V(x_1, x_2) = x_1^2$ is zero at $(0,0)$ and positive elsewhere, but it's also zero along the entire $x_2$-axis (when $x_1=0$). This makes it positive *semidefinite*, not positive *definite*. This distinction is critical.

### ### Step 6: The Lyapunov Stability Theorem (Lyapunov's Direct Method)

*   **Plain English:** This is the big payoff! If you can successfully find a function $V(\mathbf{x})$ that meets all the criteria (it's positive definite, and its derivative $\dot{V}(\mathbf{x})$ is negative semidefinite), then you've proven the system is stable. If $\dot{V}(\mathbf{x})$ is strictly negative definite, you've proven it's asymptotically stable. The beauty is you did all this without solving the original differential equations!

*   **Small Concrete Example:** We'll see this in the worked examples, but essentially, if we propose $V(x) = x^2$ for $\dot{x} = -x$, we find $\dot{V} = 2x \cdot (-x) = -2x^2$. Since $V(x)=x^2$ is positive definite, and $\dot{V}(x)=-2x^2$ is negative definite, we immediately know that $x=0$ is an asymptotically stable equilibrium for $\dot{x}=-x$.

*   **Formal/Mathematical Version:** (Lyapunov's Direct Method, First Theorem)
    Let $\mathbf{x}=\mathbf{0}$ be an equilibrium point for the autonomous system $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$. Let $D \subset \mathbb{R}^n$ be a domain containing $\mathbf{0}$. If there exists a continuously differentiable function $V: D \to \mathbb{R}$ such that:
    1.  $V(\mathbf{0}) = 0$ and $V(\mathbf{x}) > 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$ (i.e., $V$ is positive definite), and
    2.  $\dot{V}(\mathbf{x}) = \nabla V(\mathbf{x}) \cdot \mathbf{f}(\mathbf{x}) \le 0$ for all $\mathbf{x} \in D$ (i.e., $\dot{V}$ is negative semidefinite),
    then the equilibrium point $\mathbf{x}=\mathbf{0}$ is **Lyapunov stable**.

    Furthermore, if condition (2) is strengthened to:
    3.  $\dot{V}(\mathbf{x}) < 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$ (i.e., $\dot{V}$ is negative definite),
    then the equilibrium point $\mathbf{x}=\mathbf{0}$ is **asymptotically stable**.

*   **What Could Go Wrong:** The theorem states "if there exists..." This means if you *find* such a function, you've proven stability. But if you *fail* to find one, it doesn't mean the system is unstable. It just means you haven't found the right Lyapunov function yet. Finding a suitable Lyapunov function is often the hardest part!

## 5. Worked examples — multiple, with every step shown

### Example 1: Scalar System (Easy)

**Problem:** Determine the stability of the equilibrium point $x=0$ for the system $\dot{x} = -x^3$.

**Given:** System dynamics $\dot{x} = -x^3$.
**Want:** Determine if $x=0$ is Lyapunov stable or asymptotically stable.

**Solution:**

1.  **Identify the equilibrium point:**
    Set $\dot{x} = 0$:
    $$-x^3 = 0$$
    $$x = 0$$
    *Explanation:* This confirms that $x=0$ is indeed an equilibrium point.

2.  **Choose a Lyapunov function candidate:**
    A common choice for scalar systems is $V(x) = \frac{1}{2}x^2$ or $V(x) = x^2$. Let's use $V(x) = \frac{1}{2}x^2$.
    *Explanation:* This choice is simple, continuously differentiable, and generally works well for systems where the origin is the equilibrium. It's a "bowl-shaped" function.

3.  **Check positive definiteness of $V(x)$:**
    *   $V(0) = \frac{1}{2}(0)^2 = 0$.
    *   For $x \neq 0$, $x^2 > 0$, so $V(x) = \frac{1}{2}x^2 > 0$.
    *Explanation:* Since $V(0)=0$ and $V(x)>0$ for all $x \neq 0$, $V(x)$ is positive definite. This condition is satisfied.

4.  **Calculate the time derivative of $V(x)$, $\dot{V}(x)$:**
    Using the chain rule, $\dot{V}(x) = \frac{dV}{dx} \dot{x}$.
    First, find $\frac{dV}{dx}$:
    $$ \frac{dV}{dx} = \frac{d}{dx}\left(\frac{1}{2}x^2\right) = x $$
    Now, substitute $\dot{x} = -x^3$:
    $$ \dot{V}(x) = (x)(-x^3) = -x^4 $$
    *Explanation:* We're finding how the "energy" $V(x)$ changes as the system evolves according to $\dot{x} = -x^3$.

5.  **Check the definiteness of $\dot{V}(x)$:**
    *   $\dot{V}(0) = -(0)^4 = 0$.
    *   For $x \neq 0$, $x^4 > 0$, so $\dot{V}(x) = -x^4 < 0$.
    *Explanation:* Since $\dot{V}(0)=0$ and $\dot{V}(x)<0$ for all $x \neq 0$, $\dot{V}(x)$ is negative definite.

6.  **Conclusion:**
    Since $V(x)$ is positive definite and $\dot{V}(x)$ is negative definite, by Lyapunov's Direct Method, the equilibrium point $x=0$ is **asymptotically stable**.

    $$\boxed{\text{The equilibrium point } x=0 \text{ is asymptotically stable.}}$$

**Reflection:** This example was straightforward because the system was scalar and non-linear. The choice of $V(x) = \frac{1}{2}x^2$ is often a good first guess for systems with equilibrium at the origin, as it's simple and clearly positive definite. The key was correctly calculating $\dot{V}(x)$ and checking its definiteness.

---

### Example 2: 2D Linear System (Medium)

**Problem:** Determine the stability of the equilibrium point $\mathbf{x}=\mathbf{0}$ for the system:
$$ \begin{pmatrix} \dot{x_1} \\ \dot{x_2} \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} $$
i.e., $\dot{x_1} = -x_1$ and $\dot{x_2} = -2x_2$.

**Given:** System dynamics $\dot{\mathbf{x}} = A\mathbf{x}$ where $A = \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix}$.
**Want:** Determine if $\mathbf{x}=\mathbf{0}$ is Lyapunov stable or asymptotically stable.

**Solution:**

1.  **Identify the equilibrium point:**
    Set $\dot{\mathbf{x}} = \mathbf{0}$:
    $$ \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
    This implies $-x_1 = 0$ and $-2x_2 = 0$, so $x_1=0, x_2=0$.
    Thus, $\mathbf{x}=\mathbf{0}$ is the equilibrium point.
    *Explanation:* This confirms the origin is our equilibrium.

2.  **Choose a Lyapunov function candidate:**
    For linear systems, a common and effective choice is a quadratic form $V(\mathbf{x}) = \mathbf{x}^T P \mathbf{x}$, where $P$ is a symmetric positive definite matrix. A simple choice for $P$ is the identity matrix, so let's try $P = I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.
    Then $V(\mathbf{x}) = \mathbf{x}^T I \mathbf{x} = x_1^2 + x_2^2$.
    *Explanation:* Quadratic forms are good candidates because they are "bowl-shaped" around the origin. We need to ensure $P$ is positive definite for $V(\mathbf{x})$ to be positive definite. Here, $P=I$ is clearly positive definite.

3.  **Check positive definiteness of $V(\mathbf{x})$:**
    *   $V(\mathbf{0}) = 0^2 + 0^2 = 0$.
    *   For $\mathbf{x} \neq \mathbf{0}$ (i.e., either $x_1 \neq 0$ or $x_2 \neq 0$), $x_1^2 \ge 0$ and $x_2^2 \ge 0$. Since they cannot both be zero, $x_1^2 + x_2^2 > 0$.
    *Explanation:* $V(\mathbf{x})$ is positive definite. This condition is satisfied.

4.  **Calculate the time derivative of $V(\mathbf{x})$, $\dot{V}(\mathbf{x})$:**
    For $V(\mathbf{x}) = x_1^2 + x_2^2$, the derivative is:
    $$ \dot{V}(\mathbf{x}) = \frac{\partial V}{\partial x_1}\dot{x_1} + \frac{\partial V}{\partial x_2}\dot{x_2} $$
    First, find the partial derivatives:
    $$ \frac{\partial V}{\partial x_1} = 2x_1 $$
    $$ \frac{\partial V}{\partial x_2} = 2x_2 $$
    Now, substitute the system dynamics $\dot{x_1} = -x_1$ and $\dot{x_2} = -2x_2$:
    $$ \dot{V}(\mathbf{x}) = (2x_1)(-x_1) + (2x_2)(-2x_2) $$
    $$ \dot{V}(\mathbf{x}) = -2x_1^2 - 4x_2^2 $$
    *Explanation:* We're finding how the "energy" $V(\mathbf{x})$ changes along the system's trajectories.

5.  **Check the definiteness of $\dot{V}(\mathbf{x})$:**
    *   $\dot{V}(\mathbf{0}) = -2(0)^2 - 4(0)^2 = 0$.
    *   For $\mathbf{x} \neq \mathbf{0}$ (i.e., either $x_1 \neq 0$ or $x_2 \neq 0$), $x_1^2 \ge 0$ and $x_2^2 \ge 0$. Since they cannot both be zero, $2x_1^2 \ge 0$ and $4x_2^2 \ge 0$. Therefore, $-2x_1^2 - 4x_2^2 < 0$.
    *Explanation:* Since $\dot{V}(\mathbf{0})=0$ and $\dot{V}(\mathbf{x})<0$ for all $\mathbf{x} \neq \mathbf{0}$, $\dot{V}(\mathbf{x})$ is negative definite.

6.  **Conclusion:**
    Since $V(\mathbf{x})$ is positive definite and $\dot{V}(\mathbf{x})$ is negative definite, by Lyapunov's Direct Method, the equilibrium point $\mathbf{x}=\mathbf{0}$ is **asymptotically stable**.

    $$\boxed{\text{The equilibrium point } \mathbf{x}=\mathbf{0} \text{ is asymptotically stable.}}$$

**Reflection:** This example demonstrates the application to a 2D linear system. The choice of $V(\mathbf{x}) = \mathbf{x}^T I \mathbf{x}$ worked perfectly. For linear systems $\dot{\mathbf{x}} = A\mathbf{x}$, a more general approach involves finding a positive definite matrix $P$ such that $A^T P + PA = -Q$ for some positive definite matrix $Q$. If such $P$ exists, then $V(\mathbf{x}) = \mathbf{x}^T P \mathbf{x}$ is a valid Lyapunov function. In this case, $A = \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix}$. If we choose $P = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, then $A^T P + PA = \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} + \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix} + \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix} = \begin{pmatrix} -2 & 0 \\ 0 & -4 \end{pmatrix}$. So $Q = \begin{pmatrix} 2 & 0 \\ 0 & 4 \end{pmatrix}$, which is positive definite. This confirms our choice of $V(\mathbf{x})$ was indeed a valid Lyapunov function.

---

### Example 3: 2D Non-linear System (Harder)

**Problem:** Determine the stability of the equilibrium point $\mathbf{x}=\mathbf{0}$ for the system:
$$ \begin{cases} \dot{x_1} = -x_1 + x_2^2 \\ \dot{x_2} = -x_2 \end{cases} $$

**Given:** System dynamics $\dot{x_1} = -x_1 + x_2^2$ and $\dot{x_2} = -x_2$.
**Want:** Determine if $\mathbf{x}=\mathbf{0}$ is Lyapunov stable or asymptotically stable.

**Solution:**

1.  **Identify the equilibrium point:**
    Set $\dot{x_1} = 0$ and $\dot{x_2} = 0$:
    $$ -x_1 + x_2^2 = 0 \quad (1) $$
    $$ -x_2 = 0 \quad (2) $$
    From (2), $x_2=0$.
    Substitute $x_2=0$ into (1):
    $$ -x_1 + (0)^2 = 0 $$
    $$ -x_1 = 0 \implies x_1 = 0 $$
    Thus, $\mathbf{x}=\mathbf{0}$ is the unique equilibrium point.
    *Explanation:* Always start by confirming the equilibrium point.

2.  **Choose a Lyapunov function candidate:**
    A common first choice for non-linear systems, especially when quadratic terms are involved, is a simple quadratic sum: $V(\mathbf{x}) = x_1^2 + x_2^2$.
    *Explanation:* This is the simplest "energy-like" function that is zero at the origin and increases with distance from it.

3.  **Check positive definiteness of $V(\mathbf{x})$:**
    *   $V(\mathbf{0}) = 0^2 + 0^2 = 0$.
    *   For $\mathbf{x} \neq \mathbf{0}$, $x_1^2 \ge 0$ and $x_2^2 \ge 0$. Since they cannot both be zero, $x_1^2 + x_2^2 > 0$.
    *Explanation:* $V(\mathbf{x})$ is positive definite. This condition is satisfied.

4.  **Calculate the time derivative of $V(\mathbf{x})$, $\dot{V}(\mathbf{x})$:**
    $$ \dot{V}(\mathbf{x}) = \frac{\partial V}{\partial x_1}\dot{x_1} + \frac{\partial V}{\partial x_2}\dot{x_2} $$
    First, find the partial derivatives:
    $$ \frac{\partial V}{\partial x_1} = 2x_1 $$
    $$ \frac{\partial V}{\partial x_2} = 2x_2 $$
    Now, substitute the system dynamics $\dot{x_1} = -x_1 + x_2^2$ and $\dot{x_2} = -x_2$:
    $$ \dot{V}(\mathbf{x}) = (2x_1)(-x_1 + x_2^2) + (2x_2)(-x_2) $$
    $$ \dot{V}(\mathbf{x}) = -2x_1^2 + 2x_1 x_2^2 - 2x_2^2 $$
    *Explanation:* This is the crucial step where the non-linearity of the system comes into play.

5.  **Check the definiteness of $\dot{V}(\mathbf{x})$:**
    We need to determine if $-2x_1^2 + 2x_1 x_2^2 - 2x_2^2$ is negative definite or negative semidefinite.
    *   $\dot{V}(\mathbf{0}) = -2(0)^2 + 2(0)(0)^2 - 2(0)^2 = 0$.
    *   Consider $\mathbf{x} \neq \mathbf{0}$. We want to see if $\dot{V}(\mathbf{x}) < 0$.
        The term $2x_1 x_2^2$ can be positive or negative depending on $x_1$. This makes it tricky.
        Let's try to complete the square or bound the terms.
        We can rewrite $\dot{V}(\mathbf{x})$ as:
        $$ \dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2 + 2x_1 x_2^2 $$
        Notice that if $x_1$ is positive and $x_2$ is non-zero, $2x_1 x_2^2$ is positive, which could potentially make $\dot{V}(\mathbf{x})$ positive. This would mean $V(\mathbf{x})$ is not always decreasing, and thus $V(\mathbf{x}) = x_1^2 + x_2^2$ is *not* a valid Lyapunov function for proving asymptotic stability.

        Let's try a different approach: can we find a region where $\dot{V}(\mathbf{x}) > 0$?
        If $x_1=1$ and $x_2=1$: $\dot{V}(1,1) = -2(1)^2 - 2(1)^2 + 2(1)(1)^2 = -2 - 2 + 2 = -2$. This is negative.
        If $x_1=1$ and $x_2=0.5$: $\dot{V}(1,0.5) = -2(1)^2 - 2(0.5)^2 + 2(1)(0.5)^2 = -2 - 0.5 + 0.5 = -2$. This is negative.

        It seems $\dot{V}(\mathbf{x})$ might be negative definite. Let's analyze $2x_1 x_2^2$.
        We know that $-2x_1^2 - 2x_2^2$ is negative definite.
        We need to show that $|2x_1 x_2^2|$ is always "smaller" than $|-2x_1^2 - 2x_2^2|$ for $\mathbf{x} \neq \mathbf{0}$.
        This is not immediately obvious.

        *Self-correction/Alternative approach:* The initial choice of $V(\mathbf{x}) = x_1^2 + x_2^2$ might not be the correct Lyapunov function for this system. The term $2x_1 x_2^2$ makes $\dot{V}(\mathbf{x})$'s definiteness hard to determine. Let's try a different $V(\mathbf{x})$ or modify the current one.
        Consider $V(\mathbf{x}) = x_1^2 + ax_2^2$ for some $a > 0$.
        $\dot{V}(\mathbf{x}) = 2x_1(-x_1 + x_2^2) + 2ax_2(-x_2) = -2x_1^2 + 2x_1 x_2^2 - 2ax_2^2$.
        This still has the problematic $2x_1 x_2^2$ term.

        What if we try to eliminate the $x_2^2$ term from $\dot{x_1}$?
        Let's consider $V(\mathbf{x}) = \frac{1}{2}x_1^2 + \frac{1}{2}x_2^2$.
        $\dot{V}(\mathbf{x}) = x_1 \dot{x_1} + x_2 \dot{x_2} = x_1(-x_1 + x_2^2) + x_2(-x_2)$
        $$ \dot{V}(\mathbf{x}) = -x_1^2 + x_1 x_2^2 - x_2^2 $$
        This is the same issue. We need to find a way to make sure $x_1 x_2^2$ doesn't make $\dot{V}$ positive.

        Let's use a trick: add $x_2^2$ to the first equation. No, that's changing the system.
        The problem term is $x_1 x_2^2$. We need to "cancel" it out. This often means including cross-terms in $V(\mathbf{x})$.
        Consider $V(\mathbf{x}) = \frac{1}{2}x_1^2 + \frac{1}{2}x_2^2 + \alpha x_1 x_2^2$. This is not a quadratic form and might not be positive definite.

        Let's re-examine $\dot{V}(\mathbf{x}) = -x_1^2 + x_1 x_2^2 - x_2^2$.
        We know $x_1 x_2^2 \le |x_1| x_2^2$.
        We can use Young's inequality: $ab \le \frac{1}{2}(\epsilon a^2 + \frac{1}{\epsilon} b^2)$.
        Let $a = x_1$ and $b = x_2^2$.
        $x_1 x_2^2 \le \frac{1}{2}(\epsilon x_1^2 + \frac{1}{\epsilon} (x_2^2)^2) = \frac{1}{2}(\epsilon x_1^2 + \frac{1}{\epsilon} x_2^4)$. This makes it worse with $x_2^4$.

        Let's try to bound $x_1 x_2^2$ by terms like $x_1^2$ and $x_2^2$.
        Consider the term $2x_1 x_2^2$. We need to make sure it's "dominated" by $-2x_1^2 - 2x_2^2$.
        This is not always true. For example, if $x_1 = 100$, $x_2 = 0.1$.
        $\dot{V} = -2(100)^2 - 2(0.1)^2 + 2(100)(0.1)^2 = -20000 - 0.02 + 2 = -19998.02$. This is negative.
        What if $x_1$ is small and $x_2$ is large?
        If $x_1 = 0.1$, $x_2 = 100$.
        $\dot{V} = -2(0.1)^2 - 2(100)^2 + 2(0.1)(100)^2 = -0.02 - 20000 + 2000 = -18000.02$. Still negative.

        It looks like $\dot{V}(\mathbf{x}) = -2x_1^2 + 2x_1 x_2^2 - 2x_2^2$ IS negative definite.
        Let's prove it.
        We can rewrite $\dot{V}(\mathbf{x})$ by completing the square or bounding.
        $$ \dot{V}(\mathbf{x}) = -x_1^2 - x_2^2 - x_1^2 + x_1 x_2^2 - x_2^2 $$
        This doesn't seem to help.

        Let's use a simpler argument.
        If $x_2=0$, then $\dot{V}(\mathbf{x}) = -2x_1^2$. If $x_1 \neq 0$, $\dot{V}(\mathbf{x}) < 0$.
        If $x_1=0$, then $\dot{V}(\mathbf{x}) = -2x_2^2$. If $x_2 \neq 0$, $\dot{V}(\mathbf{x}) < 0$.
        So if $x_1=0$ or $x_2=0$ (but not both zero), $\dot{V}(\mathbf{x}) < 0$.

        Now consider $x_1 \neq 0$ and $x_2 \neq 0$.
        We have $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2 + 2x_1 x_2^2$.
        We know that for any real numbers $a,b$, $(a-b)^2 \ge 0 \implies a^2 - 2ab + b^2 \ge 0 \implies 2ab \le a^2 + b^2$.
        Let $a = x_1$ and $b = x_2^2$. Then $2x_1 x_2^2 \le x_1^2 + (x_2^2)^2 = x_1^2 + x_2^4$.
        So, $\dot{V}(\mathbf{x}) \le -2x_1^2 - 2x_2^2 + x_1^2 + x_2^4 = -x_1^2 - 2x_2^2 + x_2^4$.
        This doesn't guarantee negative definiteness, because $x_2^4$ could be larger than $2x_2^2$ for large $x_2$.
        This indicates that $V(\mathbf{x}) = x_1^2 + x_2^2$ is not a valid Lyapunov function for *global* asymptotic stability. It might only be valid in a *local* region around the origin.

        Let's try to make the $\dot{V}$ strictly negative.
        Consider $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2 + 2x_1 x_2^2$.
        We can factor out $-2x_2^2$:
        $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2(1 - x_1)$.
        If $x_1 > 1$, then $(1-x_1)$ is negative, so $-2x_2^2(1-x_1)$ is positive. This means $\dot{V}(\mathbf{x})$ could be positive.
        For example, if $x_1=2, x_2=1$:
        $\dot{V}(2,1) = -2(2)^2 - 2(1)^2(1-2) = -8 - 2(-1) = -8 + 2 = -6$. Still negative.
        What if $x_1=10, x_2=1$:
        $\dot{V}(10,1) = -2(10)^2 - 2(1)^2(1-10) = -200 - 2(-9) = -200 + 18 = -182$. Still negative.

        This form $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2(1 - x_1)$ is actually always negative definite *if we restrict the domain*.
        If we consider a domain $D$ where $x_1 < 1$, then $(1-x_1) > 0$.
        In this case, $-2x_2^2(1-x_1)$ is negative (or zero if $x_2=0$).
        So, for $x_1 < 1$:
        $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2(1-x_1)$.
        If $x_1 \neq 0$ or $x_2 \neq 0$:
        *   If $x_1 \neq 0$, then $-2x_1^2 < 0$.
        *   If $x_2 \neq 0$, then $-2x_2^2(1-x_1) < 0$ (since $1-x_1 > 0$).
        So, if $x_1 < 1$ and $\mathbf{x} \neq \mathbf{0}$, then $\dot{V}(\mathbf{x}) < 0$.

        This means that $V(\mathbf{x}) = x_1^2 + x_2^2$ is a valid Lyapunov function for *local* asymptotic stability within the domain where $x_1 < 1$.

        Let's formalize this.
        $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2 + 2x_1 x_2^2$.
        We need to show $\dot{V}(\mathbf{x}) < 0$ for $\mathbf{x} \neq \mathbf{0}$.
        Consider the case where $x_1 > 0$. We need $2x_1 x_2^2 < 2x_1^2 + 2x_2^2$.
        This inequality holds if $x_1^2 - x_1 x_2^2 + x_2^2 > 0$.
        We can rewrite this as $x_1^2 - x_1 x_2^2 + \frac{1}{4}x_2^4 - \frac{1}{4}x_2^4 + x_2^2 > 0$.
        No, this is not simple.

        Let's use a simpler inequality: $2|ab| \le a^2 + b^2$.
        $|2x_1 x_2^2| \le x_1^2 + (x_2^2)^2 = x_1^2 + x_2^4$.
        So $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2 + 2x_1 x_2^2 \le -2x_1^2 - 2x_2^2 + |2x_1 x_2^2| \le -2x_1^2 - 2x_2^2 + x_1^2 + x_2^4 = -x_1^2 - 2x_2^2 + x_2^4$.
        This expression can be positive for large $x_2$. For instance, if $x_1=0$, $\dot{V} = -2x_2^2 + 2(0)x_2^2 = -2x_2^2$, which is negative definite.
        But the inequality $2x_1 x_2^2 \le x_1^2 + x_2^4$ is not the one to use for the *signed* term.

        Let's go back to $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2(1 - x_1)$.
        If we restrict our analysis to a region where $|x_1| < 1$, say $D = \{ \mathbf{x} \in \mathbb{R}^2 : x_1 \in (-1, 1) \}$.
        In this domain, $1-x_1 > 0$.
        Then $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2(1-x_1)$.
        For any $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$:
        *   If $x_1 \neq 0$, then $-2x_1^2 < 0$.
        *   If $x_2 \neq 0$, then $-2x_2^2(1-x_1) < 0$ (since $1-x_1 > 0$).
        Therefore, $\dot{V}(\mathbf{x}) < 0$ for all $\mathbf{x} \in D, \mathbf{x} \neq \mathbf{0}$.
        So, $\dot{V}(\mathbf{x})$ is negative definite *in the domain D*.

6.  **Conclusion:**
    Since $V(\mathbf{x}) = x_1^2 + x_2^2$ is positive definite, and $\dot{V}(\mathbf{x}) = -2x_1^2 - 2x_2^2(1 - x_1)$ is negative definite in the domain $D = \{ \mathbf{x} \in \mathbb{R}^2 : x_1 \in (-1, 1) \}$, by Lyapunov's Direct Method, the equilibrium point $\mathbf{x}=\mathbf{0}$ is **locally asymptotically stable**.

    $$\boxed{\text{The equilibrium point } \mathbf{x}=\mathbf{0} \text{ is locally asymptotically stable.}}$$

**Reflection:** This example highlights a common challenge with non-linear systems: finding a Lyapunov function that proves *global* stability can be very difficult or impossible. Often, we can only prove *local* stability, meaning the system returns to equilibrium only if it starts sufficiently close. The term $2x_1 x_2^2$ in $\dot{V}(\mathbf{x})$ was the problematic part, requiring us to consider a restricted domain where its influence couldn't destabilize the system. This demonstrates that choosing a Lyapunov function is often an art, requiring trial and error and clever algebraic manipulation.

---

### Example 4: System with a Parameter (More Complex)

**Problem:** For the system:
$$ \begin{cases} \dot{x_1} = -x_1 + \alpha x_2 \\ \dot{x_2} = -x_2 - x_1 \end{cases} $$
where $\alpha$ is a real parameter, find the range of $\alpha$ for which the equilibrium point $\mathbf{x}=\mathbf{0}$ is asymptotically stable using the Lyapunov function candidate $V(\mathbf{x}) = x_1^2 + x_2^2$.

**Given:** System dynamics $\dot{x_1} = -x_1 + \alpha x_2$ and $\dot{x_2} = -x_2 - x_1$.
**Want:** Range of $\alpha$ for asymptotic stability, using $V(\mathbf{x}) = x_1^2 + x_2^2$.

**Solution:**

1.  **Identify the equilibrium point:**
    Set $\dot{x_1} = 0$ and $\dot{x_2} = 0$:
    $$ -x_1 + \alpha x_2 = 0 \quad (1) $$
    $$ -x_2 - x_1 = 0 \quad (2) $$
    From (2), $x_1 = -x_2$.
    Substitute $x_1 = -x_2$ into (1):
    $$ -(-x_2) + \alpha x_2 = 0 $$
    $$ x_2 + \alpha x_2 = 0 $$
    $$ (1 + \alpha)x_2 = 0 $$
    If $1+\alpha \neq 0$, then $x_2=0$, which implies $x_1=0$. So $\mathbf{x}=\mathbf{0}$ is the unique equilibrium point.
    If $1+\alpha = 0$ (i.e., $\alpha = -1$), then $(1+\alpha)x_2=0$ is true for any $x_2$. In this case, $x_1 = -x_2$, so any point on the line $x_1=-x_2$ is an equilibrium point. We are usually interested in isolated equilibrium points for stability analysis. So we will assume $\alpha \neq -1$.
    *Explanation:* We confirm the origin is the equilibrium point for most values of $\alpha$. The case $\alpha=-1$ leads to a line of equilibria, which requires different stability analysis (e.g., center manifold theory), so we exclude it for this problem.

2.  **Check positive definiteness of $V(\mathbf{x})$:**
    The candidate Lyapunov function is $V(\mathbf{x}) = x_1^2 + x_2^2$.
    *   $V(\mathbf{0}) = 0^2 + 0^2 = 0$.
    *   For $\mathbf{x} \neq \mathbf{0}$, $x_1^2 \ge 0$ and $x_2^2 \ge 0$. Since they cannot both be zero, $x_1^2 + x_2^2 > 0$.
    *Explanation:* $V(\mathbf{x})$ is positive definite for all $\mathbf{x}$. This condition is satisfied regardless of $\alpha$.

3.  **Calculate the time derivative of $V(\mathbf{x})$, $\dot{V}(\mathbf{x})$:**
    $$ \dot{V}(\mathbf{x}) = \frac{\partial V}{\partial x_1}\dot{x_1} + \frac{\partial V}{\partial x_2}\dot{x_2} $$
    Partial derivatives:
    $$ \frac{\partial V}{\partial x_1} = 2x_1 $$
    $$ \frac{\partial V}{\partial x_2} = 2x_2 $$
    Substitute system dynamics:
    $$ \dot{V}(\mathbf{x}) = (2x_1)(-x_1 + \alpha x_2) + (2x_2)(-x_2 - x_1) $$
    $$ \dot{V}(\mathbf{x}) = -2x_1^2 + 2\alpha x_1 x_2 - 2x_2^2 - 2x_1 x_2 $$
    $$ \dot{V}(\mathbf{x}) = -2x_1^2 + (2\alpha - 2)x_1 x_2 - 2x_2^2 $$
    *Explanation:* We've computed $\dot{V}(\mathbf{x})$ in terms of $x